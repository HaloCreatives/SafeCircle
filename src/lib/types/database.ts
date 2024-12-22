export interface EmergencyContact {
  id: string;
  user_id: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface Alert {
  id: string;
  user_id: string;
  type: 'button' | 'shake' | 'offline';
  location: {
    latitude: number;
    longitude: number;
  };
  created_at: string;
}

export interface HotspotZone {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  risk_level: 'high' | 'medium' | 'low';
  description: string;
  created_at: string;
}