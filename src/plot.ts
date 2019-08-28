import {NodeType, INxtx, Package, Node} from '../nxtx';

declare const nxtx: INxtx;

const pkg: Package = {
    name: 'plot',
    commands: {
        plot: (dictionaryNode: Node) => {
            let {type, y, ylabel, xlabel} = dictionaryNode.value;
            const canvas = document.createElement("canvas");

            const ctx = canvas.getContext("2d");

            const canvasHeight = canvas.height = 100;
            canvas.width = 100;

            canvas.style.height = "200px";
            canvas.style.width = "400px";

            const normalizedY = normalize(y);

            ctx.beginPath();
            for (let i = 0; i < y.length-1; i++) {
                ctx.moveTo(i, y[i] * canvasHeight);
                ctx.lineTo(i+1,y[i+1]*canvasHeight);
                ctx.stroke();
            }

            return {type:NodeType.Html,value:canvas};
        }
    },
};

function normalize(array) {

    const min = Math.min(...array);
    const max = Math.max(...array) - min;
    return array.map(e => (e - min) / max);
}
if(nxtx !== undefined)
    nxtx.registerPackage(pkg);
export default pkg;