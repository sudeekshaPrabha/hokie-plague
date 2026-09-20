const { canTag, PLAGUER, SURVIVOR } = require('./rules');
const { distanceMeters } = require('./geo');
const config = require('./config');

// Nearest survivor the plaguer is allowed to infect right now, or null.
// `zones` should be the SAFE zones only (raw Firebase shape).
function nearestTarget(me, players, zones, now = Date.now()) {
  let best = null;
  for (const p of players) {
    if (p.id === me.id) continue;
    if (!canTag(me, p, now, zones).ok) continue;
    const d = distanceMeters(me, p);
    if (!best || d < best.d) best = { player: p, d };
  }
  return best ? best.player : null;
}

// 'infected' | 'survivors' | null (round still going)
function checkRoundEnd(players, endsAt, now = Date.now()) {
  const survivors = players.filter((p) => p.team === SURVIVOR);
  if (survivors.length === 0) return null;
  const alive = survivors.filter((p) => !p.eliminated);
  if (alive.length === 0) return 'infected';
  if (endsAt && now >= endsAt) return 'survivors';
  return null;
}

// Out-of-bounds timer.
// player = { lat, lng }, area = { lat, lng, radius }, since = ms when they first left (or null)
// Returns { status: 'inside' | 'warning' | 'eliminated' | 'no-position',
//           secondsLeft?, outOfBoundsSince }
function checkBounds(player, area, since, now = Date.now()) {
  if (typeof player.lat !== 'number' || typeof player.lng !== 'number') {
    return { status: 'no-position', outOfBoundsSince: since ?? null };
  }
  if (distanceMeters(player, area) <= area.radius) {
    return { status: 'inside', outOfBoundsSince: null }; // back inside resets the timer
  }
  const start = since ?? now; // first time outside: start the clock
  const limitMs = config.OUT_OF_BOUNDS_SECONDS * 1000;
  const elapsed = now - start;
  if (elapsed >= limitMs) return { status: 'eliminated', outOfBoundsSince: start };
  return {
    status: 'warning',
    secondsLeft: Math.ceil((limitMs - elapsed) / 1000),
    outOfBoundsSince: start,
  };
}

module.exports = { nearestTarget, checkRoundEnd, checkBounds, PLAGUER, SURVIVOR };