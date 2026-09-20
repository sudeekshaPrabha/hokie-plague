// The changeable numbers
const config = {
// Tagging
TAG_RANGE_METERS : 10,  // How close players can be to tag
TAG_COOLDOWN_SECONDS : 30, // Wait time btwn infect attempts

// GPS
STALE_POSITION_SECONDS : 15, // ignore a player's postition after some time

// Boundary
OUT_OF_BOUNDS_SECONDS : 15, // Time before player gets eliminated out of bounds

// Safety zones
SAFE_ZONE_RADIUS_METERS : 15,
SAFE_ZONE_WARNING_SECONDS : 20, // Time left before zone disappears
SAFE_ZONE_DURATION_SECONDS : 120, 

ROUND_DURATION_SECONDS : 30*60
};
module.exports = config; // How file shares with other files
