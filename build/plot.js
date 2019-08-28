var plot = (function () {
    'use strict';

    var NodeType;
    (function (NodeType) {
        NodeType[NodeType["Paragraph"] = 1] = "Paragraph";
        NodeType[NodeType["Command"] = 2] = "Command";
        NodeType[NodeType["Text"] = 3] = "Text";
        NodeType[NodeType["Block"] = 4] = "Block";
        NodeType[NodeType["Html"] = 5] = "Html";
        NodeType[NodeType["Node"] = 6] = "Node";
        NodeType[NodeType["Dictionary"] = 11] = "Dictionary";
        NodeType[NodeType["Array"] = 12] = "Array";
        NodeType[NodeType["Number"] = 13] = "Number";
        NodeType[NodeType["String"] = 14] = "String";
    })(NodeType || (NodeType = {}));

    var pkg = {
        name: 'plot',
        commands: {
            plot: function (dictionaryNode) {
                var _a = dictionaryNode.value, type = _a.type, y = _a.y, ylabel = _a.ylabel, xlabel = _a.xlabel;
                var canvas = nxtx.htmlLite("canvas", {});
                var ctx = canvas.getContext("2d");
                var canvasHeight = canvas.height = 100;
                canvas.width = 100;
                canvas.style.height = "200px";
                canvas.style.width = "400px";
                var normalizedY = normalize(y);
                ctx.beginPath();
                for (var i = 0; i < y.length - 1; i++) {
                    ctx.moveTo(i, y[i] * canvasHeight);
                    ctx.lineTo(i + 1, y[i + 1] * canvasHeight);
                    ctx.stroke();
                }
                return { type: NodeType.Node, value: canvas };
            }
        },
    };
    function normalize(array) {
        var min = Math.min.apply(Math, array);
        var max = Math.max.apply(Math, array) - min;
        return array.map(function (e) { return (e - min) / max; });
    }
    if (nxtx !== undefined)
        nxtx.registerPackage(pkg);

    return pkg;

}());
//# sourceMappingURL=plot.js.map
