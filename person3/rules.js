// rules.js
// A player looks like (matches game.js):
// { id, name, team: 'infected' | 'noninfected', eliminated: true/false,
//   lat, lng, updatedAt (ms), lastTagAt (ms, may be undefined),
//   outOfBoundsSince (ms, may be undefined) }

const config = require('./config');
const { distanceMeters } = require('./geo');
const { isProtected } = require('./safeZones');

// Team names live here so a rename is a one-line fix.
const PLAGUER = 'infected';      // CONFIRM with teammate
const SURVIVOR = 'noninfected';

function hasPosition(p) {
  return typeof p.lat === 'number' && typeof p.lng === 'number';
}

// A position is stale if it's older than the config limit,
// or if there's no timestamp at all.
function isStale(player, now) {
  if (typeof player.updatedAt !== 'number') return true;
  return now - player.updatedAt > config.STALE_POSITION_SECONDS * 1000;
}

// Returns { ok: true } or { ok: false, reason: '...' }
// now = current time in ms (passed in so tests can control it)
function canTag(tagger, target, now, zones = []) {
  if (tagger.team !== PLAGUER || tagger.eliminated) {
    return { ok: false, reason: 'not-plaguer' };
  }
  if (target.team !== SURVIVOR || target.eliminated) {
    return { ok: false, reason: 'bad-target' };
  }

  if (!hasPosition(tagger) || !hasPosition(target)) {
    return { ok: false, reason: 'no-position' };
  }

  if (isStale(tagger, now) || isStale(target, now)) {
    return { ok: false, reason: 'stale-position' };
  }

  if (tagger.lastTagAt && now - tagger.lastTagAt < config.TAG_COOLDOWN_SECONDS * 1000) {
    return { ok: false, reason: 'cooldown' };
  }

  if (isProtected(target, zones, now)) {
    return { ok: false, reason: 'safe-zone' };
  }

  if (distanceMeters(tagger, target) > config.TAG_RANGE_METERS) {
    return { ok: false, reason: 'too-far' };
  }

  return { ok: true };
}

// area = { lat, lng, radius }  (circle, radius in meters)
// outOfBoundsSince = ms timestamp of when the player first left, or undefined/null
//
// Returns one of:
//   { status: 'inside', outOfBoundsSince: null }
//   { status: 'warning', secondsLeft, outOfBoundsSince }
//   { status: 'eliminated', outOfBoundsSince }
//   { status: 'no-position', outOfBoundsSince }   (no GPS fix, timer unchanged)
// The caller (HUD) stores the returned outOfBoundsSince and passes it back next time.
function checkBounds(player, area, outOfBoundsSince, now) {
  if (!hasPosition(player)) {
    return { status: 'no-position', outOfBoundsSince: outOfBoundsSince ?? null };
  }

  if (distanceMeters(player, area) <= area.radius) {
    return { status: 'inside', outOfBoundsSince: null }; // back inside resets the timer
  }

  const start = outOfBoundsSince ?? now; // first time outside: start the clock
  const elapsedMs = now - start;
  const limitMs = config.OUT_OF_BOUNDS_SECONDS * 1000;

  if (elapsedMs >= limitMs) {
    return { status: 'eliminated', outOfBoundsSince: start };
  }

  return {
    status: 'warning',
    secondsLeft: Math.ceil((limitMs - elapsedMs) / 1000),
    outOfBoundsSince: start,
  };
}


module.exports = { canTag, isStale, hasPosition, checkBounds, PLAGUER, SURVIVOR };