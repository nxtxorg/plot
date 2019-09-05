var plot = (function () {
    'use strict';

    var pkg = {
        name: 'plot',
        commands: {
            plot: function (dictionaryNode) {
                console.log("Drawing..");
                var _a = dictionaryNode.value, type = _a.type, y = _a.y, ylabel = _a.ylabel, xlabel = _a.xlabel;
                var canvas = nxtx.htmlLite("canvas", {});
                var ctx = canvas.getContext("2d");
                var yValue = dictionaryNode.value.y.value.map(function (e) { return e.value; });
                var offset = 30;
                var canvasHeight = canvas.height = 200;
                var canvasWidth = canvas.width = 400;
                var graphHeight = canvasHeight - offset;
                var graphWidth = canvasWidth - offset;
                canvas.style.margin = "auto";
                canvas.style.display = "block";
                var normalizedY = normalize(yValue);
                var spacing = graphWidth / (normalizedY.length - 1);
                ctx.imageSmoothingEnabled = true;
                ctx.translate(0.5, 0.5);
                var yLabels = generateYLabels(yValue, 10);
                var verticalSpacing = graphHeight / (yLabels.length - 1);
                ctx.beginPath();
                for (var i = 0; i < yLabels.length; i++) {
                    line(ctx, offset, verticalSpacing * i, offset + 5, verticalSpacing * i, 1);
                    ctx.fillText(String(Math.round(yLabels[i])), 0, i * verticalSpacing + 4);
                }
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                for (var i = 0; i < normalizedY.length - 1; i++) {
                    line(ctx, i * spacing + offset, graphHeight - (normalizedY[i] * graphHeight), (i + 1) * spacing + offset, graphHeight - (normalizedY[i + 1] * graphHeight), 1);
                }
                ctx.stroke();
                ctx.lineCap = "round";
                line(ctx, offset, 0, offset, canvasHeight - offset + 0);
                line(ctx, offset - 0, canvasHeight - offset, canvasWidth, canvasHeight - offset);
                ctx.stroke();
                console.log("Done drawing");
                return canvas;
            }
        },
    };
    function generateYLabels(values, amount) {
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        var delta = (max - min) / (amount - 1);
        var output = [];
        for (var i = 0; i <= (amount - 1); i++)
            output.push(min + (delta * i));
        return output;
    }
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
