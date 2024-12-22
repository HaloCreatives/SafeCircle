import { supabase } from '$lib/supabase/client';
import type { Alert } from '$lib/types/database';

export async function createAlert(
  userId: string,
  type: 'button' | 'shake' | 'offline',
  location: GeolocationPosition
): Promise<Alert | null> {
  const { data, error } = await supabase
    .from('alerts')
    .insert({
      user_id: userId,
      type,
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating alert:', error);
    return null;
  }

  return data;
}

export async function getEmergencyContacts(userId: string) {
  const { data, error } = await supabase
    .from('emergency_contacts')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching emergency contacts:', error);
    return [];
  }

  return data;
}

export async function addEmergencyContact(userId: string, name: string, phone: string) {
  const { error } = await supabase
    .from('emergency_contacts')
    .insert({
      user_id: userId,
      name,
      phone
    });

  return error;
}