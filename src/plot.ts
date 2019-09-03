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

            canvas.style.margin = "auto";
            canvas.style.display = "block";
            const normalizedY = normalize(yValue);

            const spacing =canvasWidth / (normalizedY.length-1);
            console.log("spacing ",spacing);

            ctx.beginPath();
            for (let i = 0; i < normalizedY.length - 1; i++) {
                line(ctx,i * spacing, canvasHeight-(normalizedY[i] * canvasHeight),
                    (i+1)*spacing, canvasHeight-(normalizedY[i + 1] * canvasHeight));
            }

            line(ctx,30,0,30,canvasHeight-30);


            console.log("Done drawing");
            return canvas;
        }
    },
};

function line(context,x1,y1,x2,y2) {
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
}

function normalize(array) {
    const min = Math.min(...array);
    const max = Math.max(...array) - min;
    return array.map(e => (e - min) / max);
}
if(nxtx) nxtx.registerPackage(pkg);


export default pkg;