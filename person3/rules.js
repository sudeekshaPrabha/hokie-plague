// rules.js
// A player looks like:
// { id, name, team: 'plaguer' | 'survivor' | 'eliminated',
//   lat, lng, updatedAt (ms), lastTagAt (ms or null), outOfBoundsSince (ms or null) }

const config = require('./config');
const { distanceMeters } = require('./geo');

/**
 * Determines if player's location is old
 * @param {*} player 
 * @param {*} now 
 * @returns true or false prob
 */
function isStale(player, now) {
  return now - player.updatedAt > config.STALE_POSITION_SECONDS * 1000;
}

// Returns { ok: true } or { ok: false, reason: '...' }
// now is time
function canTag(tagger, target, now) {
  if (tagger.team !== 'plaguer') return { ok: false, reason: 'not-plaguer' };  // Addresses mismatched roles
  if (target.team !== 'survivor') return { ok: false, reason: 'bad-target' };

  if (isStale(tagger, now) || isStale(target, now)) { // Old position invalid
    return { ok: false, reason: 'stale-position' };
  }

  if (tagger.lastTagAt && now - tagger.lastTagAt < config.TAG_COOLDOWN_SECONDS * 1000) {
    return { ok: false, reason: 'cooldown' };
  }

  if (distanceMeters(tagger, target) > config.TAG_RANGE_METERS) {
    return { ok: false, reason: 'too-far' };
  }

  return { ok: true };
}

module.exports = { canTag, isStale };