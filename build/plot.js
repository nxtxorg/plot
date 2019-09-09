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
                var graphMarginTop = 10;
                var graphMarginBottom = 10;
                var graphMarginRight = 10;
                var graphMarginLeft = 30;
                var canvasHeight = canvas.height = 200;
                var canvasWidth = canvas.width = 400;
                var graphHeight = canvasHeight - graphMarginTop - graphMarginBottom;
                var graphWidth = canvasWidth - graphMarginLeft - graphMarginRight;
                canvas.style.margin = "auto";
                canvas.style.display = "block";
                var normalizedY = normalize(yValue);
                var spacing = graphWidth / (normalizedY.length - 1);
                ctx.imageSmoothingEnabled = true;
                ctx.translate(0.5, 0.5);
                var yLabels = generateYLabels(yValue, 10);
                var verticalSpacing = graphHeight / (yLabels.length - 1);
                ctx.beginPath();
                var labelLengths = yLabels.map(function (x) { return getStringLength(x); });
                console.log(yLabels.map(function (x) { return getStringLength(x); }));
                for (var i = 0; i < yLabels.length; i++) {
                    line(ctx, offset, (verticalSpacing * i) + graphMarginTop, offset + 5, (verticalSpacing * i) + graphMarginTop, 1);
                    ctx.fillText(String(yLabels[yLabels.length - (i + 1)]), graphMarginLeft - Math.max.apply(Math, labelLengths), i * verticalSpacing + graphMarginTop + 4);
                }
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                for (var i = 0; i < normalizedY.length - 1; i++) {
                    line(ctx, i * spacing + graphMarginLeft, graphHeight - (normalizedY[i] * graphHeight) + graphMarginTop, (i + 1) * spacing + graphMarginLeft, graphHeight - (normalizedY[i + 1] * graphHeight) + graphMarginTop, 1);
                }
                ctx.stroke();
                ctx.lineCap = "round";
                line(ctx, graphMarginLeft, graphMarginTop, graphMarginLeft, canvasHeight - graphMarginBottom);
                line(ctx, canvasWidth - graphMarginRight, graphMarginTop, canvasWidth - graphMarginRight, canvasHeight - graphMarginBottom);
                line(ctx, graphMarginLeft, graphMarginTop, canvasWidth - graphMarginRight, graphMarginTop);
                line(ctx, graphMarginLeft, canvasHeight - graphMarginBottom, canvasWidth - graphMarginRight, canvasHeight - graphMarginBottom);
                ctx.stroke();
                console.log("Done drawing");
                return canvas;
            }
        },
    };
    function generateYLabels(values, amount) {
        console.log(values);
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        var delta = (max - min) / (amount - 1);
        var output = [];
        for (var i = 0; i <= (amount - 1); i++)
            output.push(Math.round(((min + (delta * i)) * 10)) / 10);
        console.log(output);
        return output;
    }
    function getStringLength(input) {
        var inputString = input.toString();
        var number = inputString.length * 8;
        if (input < 0) {
            number -= 4;
        }
        if (inputString.includes('.')) {
            number -= 4;
        }
        return number;
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
