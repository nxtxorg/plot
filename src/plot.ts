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
            const graphMarginBottom = 10;
            const graphMarginRight = 10;
            const graphMarginLeft = 30;

            const canvasHeight = canvas.height = 200;
            const canvasWidth = canvas.width = 400;

            const graphHeight = canvasHeight - graphMarginTop - graphMarginBottom;
            const graphWidth = canvasWidth - graphMarginLeft - graphMarginRight;

            canvas.style.margin = "auto";
            canvas.style.display = "block";
            const normalizedY = normalize(yValue);
            const spacing = graphWidth / (normalizedY.length - 1);

            ctx.imageSmoothingEnabled = true;
            ctx.translate(0.5, 0.5);


            ///////////// Y labels
            const yLabels = generateYLabels(yValue, 10);
            const verticalSpacing = graphHeight / (yLabels.length - 1);

            ctx.beginPath();
            const labelLengths = yLabels.map(x => getStringLength(x));
            console.log(yLabels.map(x => getStringLength(x)));
            for (let i = 0; i < yLabels.length; i++) {
                line(ctx, offset, (verticalSpacing * i) + graphMarginTop, offset + 5, (verticalSpacing * i) + graphMarginTop, 1);
                ctx.fillText(String(yLabels[yLabels.length - (i + 1)]),
                    graphMarginLeft - Math.max(...labelLengths),
                    i * verticalSpacing + graphMarginTop + 4)
            }
            ctx.stroke();
            ctx.closePath();

            ///////////// X Labels
            const XLabelAmount = Math.round(graphWidth / 30);

            ///////////// Graph
            ctx.beginPath();
            for (let i = 0; i < normalizedY.length - 1; i++) {
                line(ctx, i * spacing + graphMarginLeft, graphHeight - (normalizedY[i] * graphHeight) + graphMarginTop,
                    (i + 1) * spacing + graphMarginLeft, graphHeight - (normalizedY[i + 1] * graphHeight) + graphMarginTop, 1);
            }

            ctx.stroke();
            ctx.lineCap = "round";


            //////// Borders
            line(ctx, graphMarginLeft, graphMarginTop, graphMarginLeft, canvasHeight - graphMarginBottom); //left
            line(ctx, canvasWidth - graphMarginRight, graphMarginTop, canvasWidth - graphMarginRight, canvasHeight - graphMarginBottom); //left

            line(ctx, graphMarginLeft, graphMarginTop, canvasWidth - graphMarginRight, graphMarginTop); //top
            line(ctx, graphMarginLeft, canvasHeight - graphMarginBottom, canvasWidth - graphMarginRight, canvasHeight - graphMarginBottom); //bottom


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
        output.push(Math.round((min + (delta * i)*10))/10);

    return output;
}

function getStringLength(input) {
    console.log(input);
    const inputString = input.toString();
    console.log(inputString);
     let number = inputString.length * 8;
     console.log(number);
     if(input < 0) {
         number -= 4;
     }
     if (inputString.includes('.')) {
        console.log("dot");
        number -= 4;
    }
     console.log(number);
     console.log("outputnumber",number);
    return number
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