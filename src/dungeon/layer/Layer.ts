import {Dungeon} from "../Dungeon";

export interface Canvas {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
}

export interface Cords {
    x: number,
    y: number,
}

export abstract class Layer {

    // Todo blending mode

    protected dungeon: Dungeon; // Dungeon ref, mainly used for sizes

    protected data: any; // TODO Data Class
    protected opacity: number;
    protected enabled: boolean;

    protected renderCanvas: Canvas | undefined;

    constructor(
        dungeon: Dungeon,
        {
            data = null,
            opacity = 1.0,
            enabled = true
        } = {}) {

        this.dungeon = dungeon;
        this.data = data;
        this.opacity = opacity;
        this.enabled = enabled;
        this.renderCanvas = this.generateCanvas()
    }

    public getOptions() {
        //TODO + name
    }

    public setOptions() {

    }

    /**
     * Generate an already resized Canvas interface
     */
    protected generateCanvas(): Canvas {
        let canvas = document.createElement('canvas');
        canvas.width = this.dungeon.totalWidth;
        canvas.height = this.dungeon.totalHeight;
        const context = canvas.getContext('2d');

        if (context === null) {
            throw new Error("Could not create 2d context of HTML Canvas");
        }

        return {
            canvas,
            context,
        };
    }

    /**
     * Calculates the upper right px for a tile
     * @param x
     * @param y
     */
    protected generateTileCords(x: number, y: number): Cords {
        const {cellWidth, cellHeight} = this.dungeon;
        if (y % 2 === 0) {
            return {
                x: x * cellWidth,
                y: Math.floor(y * 0.5) * cellHeight - Math.floor(cellHeight * 0.5),
            };
        }
        return {
            x: x * cellWidth - Math.floor(cellWidth * 0.5),
            y: Math.floor(y * 0.5) * cellHeight,
        };
    }

    /**
     * Generates a 2d Path for the given tile cords
     * @param x
     * @param y
     * @param grow
     */
    protected generateTileRegion(x: number, y: number, {grow = 0} = {}): Path2D {

        const {cellWidth, cellHeight} = this.dungeon;

        const cords = this.generateTileCords(x, y);

        let region = new Path2D();
        region.moveTo(cords.x + Math.floor(cellWidth * 0.5), cords.y - grow);
        region.lineTo(cords.x + cellWidth + grow, cords.y + Math.floor(cellHeight * 0.5));
        region.lineTo(cords.x + Math.floor(cellWidth * 0.5), cords.y + cellHeight + grow);
        region.lineTo(cords.x - grow, cords.y + Math.floor(cellHeight * 0.5));
        region.closePath();

        return region;
    }

    /**
     * Overrided by subclass, renders and returns async
     */
    public async render(): Promise<HTMLCanvasElement> {
        console.warn("Render not implemented by subclass.")

        if (!this.renderCanvas) {
            throw new Error("abstract Layer could not generate an Canvas")
        }

        return this.renderCanvas.canvas;
    }

    /**
     * Return a canvas to merge, does not rerender any changes
     */
    public getRender(): HTMLCanvasElement {

        if (!this.renderCanvas) {
            throw new Error("abstract Layer could not generate an Canvas")
        }

        return this.renderCanvas.canvas;
    }

    /**
     * Export data for longtime storage
     */
    public export() {

    }

}