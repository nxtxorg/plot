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

            const canvasHeight = canvas.height = 100;
            canvas.width = 100;

            canvas.style.height = "200px";
            canvas.style.width = "400px";

            const normalizedY = normalize(y);

            ctx.beginPath();
            for (let i = 0; i < normalizedY.length - 1; i++) {
                ctx.moveTo(i, normalizedY[i] * canvasHeight);
                ctx.lineTo(i + 1, normalizedY[i + 1] * canvasHeight);
                ctx.stroke();
            }

            console.log("Done drawing");
            return canvas;
        }
    },
};

function normalize(array) {
    const min = Math.min(...array);
    const max = Math.max(...array) - min;
    return array.map(e => (e - min) / max);
}
if(nxtx) nxtx.registerPackage(pkg);


export default pkg;