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
                var offset = 30;
                var graphHeight = canvasHeight - offset;
                var graphWidth = canvasWidth - offset;
                canvas.style.margin = "auto";
                canvas.style.display = "block";
                var normalizedY = normalize(yValue);
                var spacing = graphWidth / (normalizedY.length - 1);
                console.log("spacing ", spacing);
                ctx.beginPath();
                ctx.imageSmoothingEnabled = true;
                ctx.translate(0.5, 0.5);
                for (var i = 0; i < normalizedY.length - 1; i++) {
                    line(ctx, i * spacing + offset, graphHeight - (normalizedY[i] * graphHeight), (i + 1) * spacing + offset, graphHeight - (normalizedY[i + 1] * graphHeight), 2);
                }
                ctx.stroke();
                ctx.lineCap = "round";
                line(ctx, offset, 0, offset, canvasHeight - offset + 10);
                line(ctx, offset - 10, canvasHeight - offset, canvasWidth, canvasHeight - offset);
                ctx.stroke();
                console.log("Done drawing");
                return canvas;
            }
        },
    };
    function line(context, x1, y1, x2, y2, lineWidth) {
        if (lineWidth === void 0) { lineWidth = 1; }
        context.lineWidth = lineWidth;
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
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
