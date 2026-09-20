// The changeable numbers
const config = {
// Tagging
TAG_RANGE_METERS : 2,  // How close players can be to tag
TAG_COOLDOWN_SECONDS : 5*60, // Wait time btwn infect attempts

// GPS
STALE_POSITION_SECONDS : 15, // ignore a player's postition after some time

// Boundary
OUT_OF_BOUNDS_SECONDS : 15, // Time before player gets eliminated out of bounds

// Safety zones
SAFE_ZONE_RADIUS_METERS : 15,
SAFE_ZONE_WARNING_SECONDS : 20, // Time left before zone disappears
SAFE_ZONE_DURATION_SECONDS : 120, 
SAFE_ZONE_SPAWN_MINUTES: 15, 

//Death (red) zones 
DEATH_ZONE_RADIUS_METERS: 25, 
DEATH_ZONE_FUZZ_METERS: 15, 

//Round 
SPREAD_OUT_SECONDS : 15, 

ROUND_DURATION_SECONDS : 30*60
};
module.exports = config; // How file shares with other files
