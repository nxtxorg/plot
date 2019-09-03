var plot = (function () {
    'use strict';

    var pkg = {
        name: 'plot',
        commands: {
            plot: function (dictionaryNode) {
                console.log("Drawing..");
                var _a = dictionaryNode.value, type = _a.type, y = _a.y, ylabel = _a.ylabel, xlabel = _a.xlabel;
                var canvas = nxtx.htmlLite("canvas", {});
                var yValue = dictionaryNode.value.y.value.map(function (e) { return e.value; });
                console.log(yValue);
                var ctx = canvas.getContext("2d");
                var canvasHeight = canvas.height = 200;
                var canvasWidth = canvas.width = 400;
                canvas.style.margin = "auto";
                canvas.style.display = "block";
                var normalizedY = normalize(yValue);
                var spacing = canvasWidth / (normalizedY.length - 1);
                console.log("spacing ", spacing);
                ctx.beginPath();
                for (var i = 0; i < normalizedY.length - 1; i++) {
                    line(ctx, i * spacing, canvasHeight - (normalizedY[i] * canvasHeight), (i + 1) * spacing, canvasHeight - (normalizedY[i + 1] * canvasHeight));
                }
                line(ctx, 30, 0, 30, canvasHeight - 30);
                console.log("Done drawing");
                return canvas;
            }
        },
    };
    function line(context, x1, y1, x2, y2) {
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }
    function normalize(array) {
        var min = Math.min.apply(Math, array);
        var max = Math.max.apply(Math, array) - min;
        return array.map(function (e) { return (e - min) / max; });
    }
    if (nxtx)
        nxtx.registerPackage(pkg);

    return pkg;

}());
//# sourceMappingURL=plot.js.map
