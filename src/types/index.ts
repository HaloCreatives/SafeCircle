export interface Location {
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface Alert {
  type: 'button' | 'shake' | 'offline';
  location: Location;
  timestamp: number;
}

export interface HotspotZone {
  id: string;
  name: string;
  location: Location;
  riskLevel: 'high' | 'medium' | 'low';
  description: string;
}