import { supabase } from '$lib/supabase/client';
import type { HotspotZone } from '$lib/types/database';

export async function getNearbyHotspots(
  latitude: number,
  longitude: number,
  radiusKm: number = 5
): Promise<HotspotZone[]> {
  const { data, error } = await supabase
    .from('hotspot_zones')
    .select('*')
    .order('risk_level', { ascending: false });

  if (error) {
    console.error('Error fetching hotspots:', error);
    return [];
  }

  // Filter hotspots by distance client-side
  // In a production app, this would be done with PostGIS on the server
  return data.filter(hotspot => {
    const distance = calculateDistance(
      latitude,
      longitude,
      hotspot.location.latitude,
      hotspot.location.longitude
    );
    return distance <= radiusKm;
  });
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}