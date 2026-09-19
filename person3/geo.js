// Distance helper

function distanceMeters(a, b){
    const R = 6371000; // Earth's radius in meters
    const toRad = (deg) => (deg*Math.PI) / 180;
    const dLat = toRad(b.lat - a.lat); // Diff in lat
    const dLng = toRad(b.lng = a.lng); // Diff in long
    const h =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

module.exports = { distanceMeters };