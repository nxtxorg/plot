import {NodeType, INxtx, Package, Node} from '../nxtx';

declare const nxtx: INxtx;

const pkg: Package = {
    name: 'plot',
    commands: {
        plot: (dictionaryNode: Node) => {
            console.log("Drawing..");
            let {type, y, ylabel, xlabel} = dictionaryNode.value;
            const canvas = <HTMLCanvasElement>nxtx.htmlLite("canvas", {});

            const yValue = dictionaryNode.value.y.value.map(e => e.value);

            console.log(yValue);
            const ctx = canvas.getContext("2d");

            const canvasHeight = canvas.height = 200;
            const canvasWidth = canvas.width = 400;

            const offset = 30;
            const graphHeight = canvasHeight -offset;
            const graphWidth = canvasWidth -offset;

            canvas.style.margin = "auto";
            canvas.style.display = "block";
            const normalizedY = normalize(yValue);



            const spacing =graphWidth / (normalizedY.length-1);
            console.log("spacing ",spacing);

            ctx.beginPath();
            ctx.imageSmoothingEnabled = true;
            ctx.translate(0.5,0.5);

            for (let i = 0; i < normalizedY.length - 1; i++) {
                line(ctx,i * spacing + offset, graphHeight-(normalizedY[i] * graphHeight),
                    (i+1)*spacing + offset, graphHeight-(normalizedY[i + 1] * graphHeight),2);
            }

            ctx.stroke();
            ctx.lineCap = "round";

            line(ctx,offset,0,offset,canvasHeight-offset+10);
            line(ctx, offset-10,canvasHeight-offset ,canvasWidth,canvasHeight-offset);


            ctx.stroke();
            console.log("Done drawing");
            return canvas;
        }
    },
};


function line(context,x1,y1,x2,y2,lineWidth = 1) {
    context.lineWidth = lineWidth;
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);

}

function normalize(array) {
    const min = Math.min(...array);
    const max = Math.max(...array) - min;
    return array.map(e => (e - min) / max);
}
if(nxtx) nxtx.registerPackage(pkg);


export default pkg;