import {NodeType, INxtx, Package, Node} from '../nxtx';

declare const nxtx: INxtx;

const pkg: Package = {
    name: 'plot',
    commands: {
        plot: (dictionaryNode: Node) => {
            console.log("Drawing..");
            let {type, y, ylabel, xlabel} = dictionaryNode.value;
            const canvas = <HTMLCanvasElement>nxtx.htmlLite("canvas", {});
            const ctx = canvas.getContext("2d");

            const yValue = dictionaryNode.value.y.value.map(e => e.value);

            const offset = 30;
            const graphMarginTop = 10;
            const graphMarginBottom = 30;
            const graphMarginRight = 30;
            const graphMarginLeft = 30;

            const canvasHeight = canvas.height = 250;
            const canvasWidth = canvas.width = 500;

            const graphHeight = canvasHeight - graphMarginTop - graphMarginBottom;
            const graphWidth = canvasWidth - offset;

            canvas.style.margin = "auto";
            canvas.style.display = "block";
            const normalizedY = normalize(yValue);
            const spacing = graphWidth / (normalizedY.length - 1);

            ctx.imageSmoothingEnabled = true;
            ctx.translate(0.5, 0.5);


            ///////////// Vertical labels
            const yLabels = generateYLabels(yValue, 10);
            const verticalSpacing = graphHeight / (yLabels.length - 1);

            ctx.beginPath();
            for (let i = 0; i < yLabels.length; i++) {
                line(ctx, offset, (verticalSpacing * i)+graphMarginTop, offset + 5, (verticalSpacing * i)+graphMarginTop, 1);
                ctx.fillText(String(Math.round(yLabels[i])), 0, i * verticalSpacing + graphMarginTop + 4);
            }
            ctx.stroke();
            ctx.closePath();


            ///////////// Graph
            ctx.beginPath();
            for (let i = 0; i < normalizedY.length - 1; i++) {
                line(ctx, i * spacing + offset, graphHeight - (normalizedY[i] * graphHeight),
                    (i + 1) * spacing + offset, graphHeight - (normalizedY[i + 1] * graphHeight), 1);
            }

            ctx.stroke();
            ctx.lineCap = "round";


            //////// Borders
            line(ctx, offset, graphMarginTop, offset, canvasHeight - graphMarginBottom);
            line(ctx, graphMarginLeft, canvasHeight - offset, canvasWidth - graphMarginRight, canvasHeight - offset);


            ctx.stroke();
            console.log("Done drawing");

            return canvas;
        }
    },
};


function generateYLabels(values, amount) {
    const min = Math.min(...values);
    const max = Math.max(...values);

    const delta = (max - min) / (amount - 1);
    const output = [];
    for (let i = 0; i <= (amount - 1); i++)
        output.push(min + (delta * i));

    return output;
}

function line(context, x1, y1, x2, y2, lineWidth = 1) {
    context.lineWidth = lineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);

}

function normalize(array) {
    const min = Math.min(...array);
    const max = Math.max(...array) - min;
    return array.map(e => (e - min) / max);
}

if (nxtx) nxtx.registerPackage(pkg);


export default pkg;