// boundary.js
// Zones (green and red) only appear inside this circle around DDS.

export const PLAY_AREA = {
  center: { latitude: 37.231787, longitude: -80.426823 }, // <-- paste the DDS center here
  radius: 60,                            // meters
};

const M_PER_DEG = 111320;

// distance in meters between two {latitude, longitude} points
export function metersBetween(a, b) {
  const dy = (b.latitude - a.latitude) * M_PER_DEG;
  const dx =
    (b.longitude - a.longitude) * M_PER_DEG * Math.cos((a.latitude * Math.PI) / 180);
  return Math.hypot(dx, dy);
}

// random spot for a green zone, where the whole zone stays inside the play area
export function randomZoneCenter(zoneRadius, area = PLAY_AREA) {
  const maxR = area.radius - zoneRadius;
  if (maxR <= 0) return area.center; // zone bigger than the area: use the middle
  const r = maxR * Math.sqrt(Math.random()); // sqrt = even spread across the circle
  const t = Math.random() * 2 * Math.PI;
  return {
    latitude: area.center.latitude + (r * Math.cos(t)) / M_PER_DEG,
    longitude:
      area.center.longitude +
      (r * Math.sin(t)) / (M_PER_DEG * Math.cos((area.center.latitude * Math.PI) / 180)),
  };
}

// red zone: keep the death spot, but pull it inward if GPS put it outside the play area
export function fitZone(center, zoneRadius, area = PLAY_AREA) {
  const d = metersBetween(area.center, center);
  const limit = area.radius - zoneRadius;
  if (d <= limit || d === 0) return { center, radius: zoneRadius };
  const k = limit / d; // scale the point back onto the allowed edge
  return {
    center: {
      latitude: area.center.latitude + (center.latitude - area.center.latitude) * k,
      longitude: area.center.longitude + (center.longitude - area.center.longitude) * k,
    },
    radius: zoneRadius,
  };
}