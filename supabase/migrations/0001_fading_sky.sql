/*
  # Initial SafeCircle Schema

  1. New Tables
    - `profiles`
      - User profile information
    - `emergency_contacts`
      - Emergency contacts for each user
    - `alerts`
      - Emergency alerts history
    - `hotspot_zones`
      - Known dangerous areas
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create emergency contacts table
CREATE TABLE IF NOT EXISTS emergency_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE emergency_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own emergency contacts"
  ON emergency_contacts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('button', 'shake', 'offline')),
  location jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own alerts"
  ON alerts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create hotspot zones table
CREATE TABLE IF NOT EXISTS hotspot_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location jsonb NOT NULL,
  risk_level text NOT NULL CHECK (risk_level IN ('high', 'medium', 'low')),
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE hotspot_zones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read hotspot zones"
  ON hotspot_zones
  FOR SELECT
  TO authenticated
  USING (true);