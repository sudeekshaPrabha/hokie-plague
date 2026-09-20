import {
  ref, set, update, push, onValue, get, runTransaction, remove,
} from 'firebase/database';
import { db } from './firebase';
 
// ---------- players ----------
 
// Join Game button: creates the player and returns their unique id
export async function joinGame(code, name) {
  const playerRef = push(ref(db, `games/${code}/players`));
  await set(playerRef, {
    name, team: 'noninfected', eliminated: false,
    lat: null, lng: null, updatedAt: Date.now(),
  });
  return playerRef.key;
}
 
export function leaveGame(code, id) {
  return remove(ref(db, `games/${code}/players/${id}`));
}
 
// Send GPS position (call every ~3 seconds)
export function updateLocation(code, id, lat, lng) {
  return update(ref(db, `games/${code}/players/${id}`), { lat, lng, updatedAt: Date.now() });
}
 
// Live player list. Returns an unsubscribe function.
export function listenPlayers(code, cb) {
  return onValue(ref(db, `games/${code}/players`), (snap) => {
    const v = snap.val() || {};
    cb(Object.entries(v).map(([id, p]) => ({ id, ...p })));
  });
}
 
// ---------- zones ----------
 
export function listenZones(code, cb) {
  return onValue(ref(db, `games/${code}/zones`), (snap) => {
    const v = snap.val() || {};
    cb(Object.entries(v).map(([id, z]) => ({ id, ...z })));
  });
}
 
// Any phone may call this. Only the first write for a slot wins,
// so there is never a duplicate green zone.
export function spawnSafeZoneOnce(code, slot, lat, lng, radius = 15, durationMin = 2) {
  return runTransaction(ref(db, `games/${code}/zones/slot_${slot}`), (cur) => {
    if (cur) return; // already created
    return {
      type: 'safe', lat, lng, radius,
      expiresAt: Date.now() + durationMin * 60 * 1000,
    };
  });
}
 
// ---------- infecting ----------
 
// Marks the victim eliminated, drops a red zone, and records the tagger's cooldown.
export function eliminate(code, victimId, lat, lng, radius = 25, taggerId = null) {
  const zoneId = push(ref(db, `games/${code}/zones`)).key;
  const updates = {
    [`games/${code}/players/${victimId}/eliminated`]: true,
    [`games/${code}/zones/${zoneId}`]: {
      type: 'death', lat, lng, radius,
      expiresAt: Date.now() + 5 * 60 * 1000,
    },
  };
  if (taggerId) updates[`games/${code}/players/${taggerId}/lastTagAt`] = Date.now();
  return update(ref(db), updates);
}
 
export function eliminateSelf(code, id) {
  return update(ref(db, `games/${code}/players/${id}`), { eliminated: true });
}
 
// ---------- round ----------
 
// Anyone can call this. A transaction makes sure only one call actually starts the round.
export async function startRound(code, spreadSec = 5 * 60, huntSec = 25 * 60) {
  const claim = await runTransaction(ref(db, `games/${code}/meta`), (cur) => {
    if (cur && (cur.status === 'playing' || cur.status === 'starting')) return; // abort
    return { status: 'starting' };
  });
  if (!claim.committed) return false;
 
  const snap = await get(ref(db, `games/${code}/players`));
  const ids = Object.keys(snap.val() || {});
  const shuffled = [...ids].sort(() => Math.random() - 0.5);
  // even split: half plaguers (extra player in an odd game is a survivor)
  const infected = new Set(shuffled.slice(0, Math.max(1, Math.floor(ids.length / 2))));
 
  const now = Date.now();
  const huntStartsAt = now + spreadSec * 1000;
  const updates = {};
  ids.forEach((id) => {
    updates[`games/${code}/players/${id}/team`] = infected.has(id) ? 'infected' : 'noninfected';
    updates[`games/${code}/players/${id}/eliminated`] = false;
    updates[`games/${code}/players/${id}/lastTagAt`] = null;
  });
  updates[`games/${code}/zones`] = null; // clear old zones
  // roles and meta are written together so nobody sees "playing" before roles exist
  updates[`games/${code}/meta`] = {
    status: 'playing',
    startedAt: now,
    huntStartsAt,
    endsAt: huntStartsAt + huntSec * 1000,
    winner: null,
  };
  await update(ref(db), updates);
  return true;
}
 
export function listenMeta(code, cb) {
  return onValue(ref(db, `games/${code}/meta`), (snap) => cb(snap.val() || {}));
}
 
export function endRound(code, winner) {
  return update(ref(db, `games/${code}/meta`), { status: 'ended', winner });
}
 