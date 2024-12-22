export class LocationService {
  private static instance: LocationService;
  private lastKnownLocation: GeolocationPosition | null = null;

  private constructor() {}

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  public async getCurrentLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.lastKnownLocation = position;
          resolve(position);
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  }

  public getLastKnownLocation(): GeolocationPosition | null {
    return this.lastKnownLocation;
  }

  public startWatchingLocation(callback: (position: GeolocationPosition) => void): number {
    return navigator.geolocation.watchPosition(
      (position) => {
        this.lastKnownLocation = position;
        callback(position);
      },
      (error) => console.error('Error watching location:', error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }
}