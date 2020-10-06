import {Layer} from "./Layer";
import {Dungeon} from "../Dungeon";

export class DevLayer extends Layer {

     public async render(): Promise<HTMLCanvasElement> {

         if (!this.renderCanvas) {
             throw new Error("dev Layer has no canvas to render on")
         }

        for (let y = 0; y < this.dungeon.height + 1; y++) {
            for (let x = 0; x < this.dungeon.height + 1; x++) {

                const cords = this.generateTileCords(x, y);
                const context = this.renderCanvas.context;

                context.lineWidth = 1;
                context.strokeStyle = y % 2 === 0 ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
                context.fillStyle = y % 2 === 0 ? 'rgb(255,0,0)' : 'rgb(0,0,255)';
                context.strokeRect(cords.x, cords.y, this.dungeon.cellWidth, this.dungeon.cellHeight);
                context.fillRect(cords.x, cords.y, 8, 8);
                context.fillText(`${x} - ${y}`, cords.x, cords.y);
            }
        }
        return this.renderCanvas.canvas;
    }
}