import {Layer} from "./layer/Layer";

export interface Constructor {
    width?: number,
    height?: number,
    cellWidth?: number,
    cellHeight?: number,
}

export class Dungeon {
    get height(): number {
        return this._height;
    }

    get width(): number {
        return this._width;
    }

    get cellHeight(): number {
        return this._cellHeight;
    }

    get cellWidth(): number {
        return this._cellWidth;
    }

    get totalHeight(): number {
        return this._totalHeight;
    }

    get totalWidth(): number {
        return this._totalWidth;
    }

    private _cellWidth: number = 100; // Cell in px
    private _cellHeight: number = 50;
    private _width: number = 10; // How Many cells
    private _height: number = 20;
    private _totalWidth: number = 0; // Total size in px
    private _totalHeight: number = 0;

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private layers: Layer[] = [];

    constructor(canvas: HTMLCanvasElement, con: Constructor | undefined) {
        this.canvas = canvas;
        const context = canvas.getContext("2d");
        if (!context) {
            throw new Error("Could not create canvas 2d context");
        }
        this.context = context;

        this.setSize(con);
    }

    public async setSize({
                             width = this._width,
                             height = this._height,
                             cellWidth = this._cellWidth,
                             cellHeight = this._cellHeight,
                         } = {}): Promise<void> {
        this._width = width;
        this._height = height;
        this._cellWidth = cellWidth;
        this._cellHeight = cellHeight;
        this._totalWidth = width * cellWidth;
        this._totalHeight = height * cellHeight * 0.5;
        await this.resize()
    }

    /**
     * Resize all, force layers to rerender
     */
    private async resize(): Promise<void> {
        this.canvas.width = this._totalWidth;
        this.canvas.height = this._totalHeight;
    }

    render() {
        this.context.clearRect(0, 0, this._totalWidth, this._totalHeight);

    }

}