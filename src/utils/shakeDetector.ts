export class ShakeDetector {
  private static instance: ShakeDetector;
  private shakeThreshold = 15;
  private lastX: number | null = null;
  private lastY: number | null = null;
  private lastZ: number | null = null;
  private lastUpdate = 0;
  private callbacks: Array<() => void> = [];

  private constructor() {
    this.handleMotion = this.handleMotion.bind(this);
  }

  public static getInstance(): ShakeDetector {
    if (!ShakeDetector.instance) {
      ShakeDetector.instance = new ShakeDetector();
    }
    return ShakeDetector.instance;
  }

  public start() {
    if (typeof DeviceMotionEvent !== 'undefined') {
      window.addEventListener('devicemotion', this.handleMotion);
    }
  }

  public stop() {
    window.removeEventListener('devicemotion', this.handleMotion);
  }

  public onShake(callback: () => void) {
    this.callbacks.push(callback);
  }

  private handleMotion(event: DeviceMotionEvent) {
    const current = Date.now();
    if ((current - this.lastUpdate) > 100) {
      const acceleration = event.accelerationIncludingGravity;
      if (!acceleration) return;

      const { x, y, z } = acceleration;
      if (x === null || y === null || z === null) return;

      const deltaX = this.lastX === null ? 0 : Math.abs(this.lastX - x);
      const deltaY = this.lastY === null ? 0 : Math.abs(this.lastY - y);
      const deltaZ = this.lastZ === null ? 0 : Math.abs(this.lastZ - z);

      if ((deltaX + deltaY + deltaZ) > this.shakeThreshold) {
        this.callbacks.forEach(callback => callback());
      }

      this.lastX = x;
      this.lastY = y;
      this.lastZ = z;
      this.lastUpdate = current;
    }
  }
}