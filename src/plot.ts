import {NodeType, INxtx, Package, Node} from '../nxtx';

declare const nxtx: INxtx;
const defaultOptions = {
    y: {
        prefix: '',
        decimals: 0,
        values: []
    }
};

const pkg: Package = {
    name: 'plot',
    commands: {
        plot: (optionsNode: Node) => {
            const options = Object.assign({}, defaultOptions, nxtx.jsArgument(optionsNode));
            //let {type, y, ylabel, xlabel} = dictionaryNode.value;
            const canvas = <HTMLCanvasElement>nxtx.htmlLite("canvas", {});
            const ctx = canvas.getContext("2d");


            const normalizedY = normalize(options.y.values);
            const yLabels = generateYLabels(options.y.values, 10);
            const labelLengths = yLabels.map(x => getStringLength(x));
            const yLabelLength = Math.max(...labelLengths);
            const graphMarginTop = 10;
            const graphMarginBottom = 20;
            const graphMarginRight = 10;

            let graphMarginLeft = 30;
            if(graphMarginLeft < yLabelLength){
                graphMarginLeft = yLabelLength;
            }

            const canvasHeight = canvas.height = 220;
            const canvasWidth = canvas.width = 400;

            const graphHeight = canvasHeight - graphMarginTop - graphMarginBottom;
            const graphWidth = canvasWidth - graphMarginLeft - graphMarginRight;

            canvas.style.margin = "auto";
            canvas.style.display = "block";
            const spacing = graphWidth / (normalizedY.length - 1);

            ctx.imageSmoothingEnabled = true;
            ctx.translate(0.5, 0.5);


            ///////////// Y labels
            ctx.textAlign = "right";
            const verticalSpacing = graphHeight / (yLabels.length - 1);

            ctx.beginPath();
            for (let i = 0; i < yLabels.length; i++) {
                line(ctx, graphMarginLeft, (verticalSpacing * i) + graphMarginTop, graphMarginLeft + 5, (verticalSpacing * i) + graphMarginTop, 1);
                ctx.fillText(String(yLabels[yLabels.length - (i + 1)]),
                    graphMarginLeft - 4,
                    i * verticalSpacing + graphMarginTop + 4)
            }
            ctx.stroke();
            ctx.closePath();

            ///////////// X Labels
            const xMaxAmount = Math.round(graphWidth / 30);
            const xAmount = options.y.values.length;

            const xSpacing = graphWidth / xAmount;
            ctx.beginPath();
            if(xAmount < xMaxAmount){
                for(let i = 0; i < xAmount+1 ; i++){
                    ctx.fillText((i+1).toString(),(i * xSpacing) + graphMarginLeft+4,canvasHeight-graphMarginBottom+11);
                    line(ctx,(i * xSpacing) + graphMarginLeft,canvasHeight-graphMarginBottom,(i * xSpacing) + graphMarginLeft,canvasHeight-graphMarginBottom-4,1)
                }
            }
            else
            {
                for(let i = 0; i < xMaxAmount+1 ; i++){
                    ctx.fillText((i+1).toString(),(i * (graphWidth/xMaxAmount)) + graphMarginLeft+4,canvasHeight-graphMarginBottom+11);
                    line(ctx,(i * (graphWidth/xMaxAmount)) + graphMarginLeft,canvasHeight-graphMarginBottom,(i * (graphWidth/xMaxAmount)) + graphMarginLeft,canvasHeight-graphMarginBottom-4,1)
                }
            }
            ctx.stroke();
            ctx.closePath();



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
        output.push(Math.round(((min + (delta * i))*10))/10);

    return output;
}

function getStringLength(input) {
    const inputString = input.toString();
     let number = inputString.length * 6 + 4;
     if(input < 0) {
         number -= 2;
     }
     if (inputString.includes('.')) {
        number -= 4;
    }
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