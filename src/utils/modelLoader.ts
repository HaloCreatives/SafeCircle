import * as tf from '@tensorflow/tfjs';

export class ModelManager {
  private static instance: ModelManager;
  private model: tf.LayersModel | null = null;
  private isWebGPUAvailable: boolean = false;

  private constructor() {
    this.checkWebGPUSupport();
  }

  public static getInstance(): ModelManager {
    if (!ModelManager.instance) {
      ModelManager.instance = new ModelManager();
    }
    return ModelManager.instance;
  }

  private async checkWebGPUSupport() {
    try {
      const adapter = await navigator.gpu?.requestAdapter();
      this.isWebGPUAvailable = !!adapter;
      if (this.isWebGPUAvailable) {
        await tf.setBackend('webgpu');
      } else {
        await tf.setBackend('webgl');
      }
    } catch {
      this.isWebGPUAvailable = false;
      await tf.setBackend('webgl');
    }
  }

  public async loadModel(localModelPath: string, cloudEndpoint: string) {
    try {
      if (navigator.onLine && !this.isWebGPUAvailable) {
        // Use cloud endpoint for inference if online and no WebGPU
        return null; // Handle cloud inference in separate service
      }
      
      // Load local compressed model for WebGPU/WebGL
      this.model = await tf.loadLayersModel(localModelPath);
      return this.model;
    } catch (error) {
      console.error('Error loading model:', error);
      throw error;
    }
  }

  public async predict(input: tf.Tensor): Promise<tf.Tensor> {
    if (!this.model) {
      throw new Error('Model not loaded');
    }
    return this.model.predict(input) as tf.Tensor;
  }
}