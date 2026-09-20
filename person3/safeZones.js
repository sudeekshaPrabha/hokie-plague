// safeZones.js
// Pure functions, no database or UI.
// A zone looks like (matches game.js):
// { id, type: 'safe' | 'death', lat, lng, radius (m), expiresAt (ms) }

const config = require('./config');
const { distanceMeters } = require('./geo');

function hasPosition(p) {
  return typeof p.lat === 'number' && typeof p.lng === 'number';
}

// Zones that haven't expired. No expiresAt means it never expires.
function activeZones(zones, now) {
  return (zones || []).filter(
    (z) => typeof z.expiresAt !== 'number' || now < z.expiresAt
  );
}

function isInZone(player, zone) {
  if (!hasPosition(player)) return false;
  return distanceMeters(player, zone) <= zone.radius;
}

// TIES: if a player is inside several active safe zones (they overlap),
// pick the one whose center is closest. If still tied, pick the lower id,
// so every phone gets the same answer.
// A safe zone also beats a death zone when they overlap, because this function
// only looks at safe zones. (Change that rule here if your team decides otherwise.)
// Returns the zone, or null.
function getSafeZoneAt(player, zones, now) {
  const candidates = activeZones(zones, now).filter(
    (z) => z.type === 'safe' && isInZone(player, z)
  );
  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    const diff = distanceMeters(player, a) - distanceMeters(player, b);
    if (diff !== 0) return diff;
    return String(a.id).localeCompare(String(b.id));
  });
  return candidates[0];
}

function isProtected(player, zones, now) {
  return getSafeZoneAt(player, zones, now) !== null;
}

// For the HUD: closest active safe zone and how far away it is.
// Returns { zone, distance } or null.
function nearestSafeZone(player, zones, now) {
  if (!hasPosition(player)) return null;
  let best = null;
  for (const z of activeZones(zones, now)) {
    if (z.type !== 'safe') continue;
    const dist = distanceMeters(player, z);
    if (!best || dist < best.distance) best = { zone: z, distance: dist };
  }
  return best;
}

// "Safe zone appearing soon" warning.
// nextSpawnAt = ms timestamp when the next safe zone will appear (someone must store it).
// Returns { status: 'none' } or { status: 'soon', secondsLeft }
function safeZoneWarning(nextSpawnAt, now) {
  if (typeof nextSpawnAt !== 'number') return { status: 'none' };
  const msLeft = nextSpawnAt - now;
  if (msLeft > 0 && msLeft <= config.SAFE_ZONE_WARNING_SECONDS * 1000) {
    return { status: 'soon', secondsLeft: Math.ceil(msLeft / 1000) };
  }
  return { status: 'none' };
}

module.exports = {
  activeZones, isInZone, getSafeZoneAt, isProtected, nearestSafeZone, safeZoneWarning,
};