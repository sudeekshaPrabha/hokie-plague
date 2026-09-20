const assert = require('assert');
const { distanceMeters } = require('./geo');
const { canTag, isStale, PLAGUER, SURVIVOR } = require('./rules');

const now = Date.now();
const base = { lat: 37.2296, lng: -80.4139, updatedAt: now, eliminated: false };

const plaguer = { ...base, id: 'a', team: PLAGUER };
const nearby  = { ...base, id: 'b', team: SURVIVOR, lat: 37.22961 };  // ~1 m away
const far     = { ...base, id: 'c', team: SURVIVOR, lat: 37.2400 };   // ~1 km away

// geo sanity: 0.0001 degrees of latitude is about 11 m
const d = distanceMeters({ lat: 37, lng: -80 }, { lat: 37.0001, lng: -80 });
assert.ok(d > 10 && d < 12, `distance was ${d}`);

// happy path
assert.strictEqual(canTag(plaguer, nearby, now).ok, true);

// too far
assert.strictEqual(canTag(plaguer, far, now).reason, 'too-far');

// cooldown: tagged 5 seconds ago, then 31 seconds ago
assert.strictEqual(canTag({ ...plaguer, lastTagAt: now - 5000 }, nearby, now).reason, 'cooldown');
assert.strictEqual(canTag({ ...plaguer, lastTagAt: now - 31000 }, nearby, now).ok, true);

// stale: 20 s old fails, 5 s old is fine
assert.strictEqual(canTag(plaguer, { ...nearby, updatedAt: now - 20000 }, now).reason, 'stale-position');
assert.strictEqual(canTag({ ...plaguer, updatedAt: now - 20000 }, nearby, now).reason, 'stale-position');
assert.strictEqual(canTag(plaguer, { ...nearby, updatedAt: now - 5000 }, now).ok, true);
assert.strictEqual(isStale({}, now), true);   // no timestamp counts as stale

// wrong roles
assert.strictEqual(canTag(nearby, plaguer, now).reason, 'not-plaguer');
assert.strictEqual(canTag(plaguer, { ...nearby, eliminated: true }, now).reason, 'bad-target');
assert.strictEqual(canTag({ ...plaguer, eliminated: true }, nearby, now).reason, 'not-plaguer');

// new player with no GPS fix yet (lat/lng missing)
const noGps = { id: 'd', team: SURVIVOR, updatedAt: now, eliminated: false };
assert.strictEqual(canTag(plaguer, noGps, now).reason, 'no-position');

console.log('All tests passed');