export function setupCanvas(canvas: HTMLCanvasElement, width: number, height: number): CanvasRenderingContext2D {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width / dpr;
  canvas.height = height / dpr;
  const rect = canvas.getBoundingClientRect();
  canvas.width = (rect.width || canvas.width) * dpr;
  canvas.height = (rect.height || canvas.height) * dpr;
  return canvas.getContext('2d');
}

export class ImageMatrix {
  src: string;
  canvas: HTMLCanvasElement;

  constructor(src: string) {
    this.src = src;
  }

  public async loadImage(): Promise<void> {
    const promise = new Promise<HTMLCanvasElement>((resolve) => {
      const image = new Image();
      image.src = this.src;
      const canvas = document.createElement('canvas');
      let context: CanvasRenderingContext2D;
      if (image.complete) {
        context = setupCanvas(canvas, image.width, image.height);
        context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
        resolve(canvas);
      } else {
        image.onload = () => {
          context = setupCanvas(canvas, image.width, image.height);
          context.drawImage(image, 0, 0, image.width, image.height, 0, 0, image.width, image.height);
          resolve(canvas);
        };
      }
    });
    this.canvas = await promise;
  }

  public async cutImage(beginX: number, beginY: number, width: number, height: number): Promise<string> {
    let context = this.canvas.getContext('2d');
    const imageData = context.getImageData(beginX, beginY, width, height);
    const canvas = document.createElement('canvas');
    context = setupCanvas(canvas, this.canvas.width / 3, this.canvas.height / 3);
    context.putImageData(imageData, 0, 0);
    const promise = new Promise<string>((resolve) => {
      canvas.toBlob((imageBlob) => {
        const newUrl = URL.createObjectURL(imageBlob);
        resolve(newUrl);
      });
    });
    return await promise;
  }

  public async getImageList(): Promise<string[]> {
    const l: string[] = [];
    const width = this.canvas.width / 3;
    const height = this.canvas.height / 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        l.push(await this.cutImage(j * width, i * height, width, height));
      }
    }
    return l;
  }
}
