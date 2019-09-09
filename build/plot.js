var plot = (function () {
    'use strict';

    var defaultOptions = {
        y: {
            prefix: '',
            decimals: 0,
            values: []
        }
    };
    var pkg = {
        name: 'plot',
        commands: {
            plot: function (optionsNode) {
                console.log("Drawing..");
                var options = Object.assign({}, defaultOptions, nxtx.jsArgument(optionsNode));
                var canvas = nxtx.htmlLite("canvas", {});
                var ctx = canvas.getContext("2d");
                console.log("getting values..");
                console.table(options);
                console.log("values: ", options.y.values);
                var normalizedY = normalize(options.y.values);
                var yLabels = generateYLabels(options.y.values, 10);
                var labelLengths = yLabels.map(function (x) { return getStringLength(x); });
                var yLabelLength = Math.max.apply(Math, labelLengths);
                var graphMarginTop = 10;
                var graphMarginBottom = 20;
                var graphMarginRight = 10;
                var graphMarginLeft = 30;
                if (graphMarginLeft < yLabelLength) {
                    graphMarginLeft = yLabelLength;
                }
                var canvasHeight = canvas.height = 220;
                var canvasWidth = canvas.width = 400;
                var graphHeight = canvasHeight - graphMarginTop - graphMarginBottom;
                var graphWidth = canvasWidth - graphMarginLeft - graphMarginRight;
                canvas.style.margin = "auto";
                canvas.style.display = "block";
                var spacing = graphWidth / (normalizedY.length - 1);
                ctx.imageSmoothingEnabled = true;
                ctx.translate(0.5, 0.5);
                ctx.textAlign = "right";
                var verticalSpacing = graphHeight / (yLabels.length - 1);
                ctx.beginPath();
                for (var i = 0; i < yLabels.length; i++) {
                    line(ctx, graphMarginLeft, (verticalSpacing * i) + graphMarginTop, graphMarginLeft + 5, (verticalSpacing * i) + graphMarginTop, 1);
                    ctx.fillText(String(yLabels[yLabels.length - (i + 1)]), graphMarginLeft - 4, i * verticalSpacing + graphMarginTop + 4);
                }
                ctx.stroke();
                ctx.closePath();
                var xMaxAmount = Math.round(graphWidth / 30);
                var xAmount = options.y.values.length;
                var xSpacing = graphWidth / xAmount;
                console.log(xSpacing);
                ctx.beginPath();
                if (xAmount < xMaxAmount) {
                    for (var i = 0; i < xAmount + 1; i++) {
                        console.log(i.toString(), graphMarginLeft, graphHeight - graphMarginBottom);
                        ctx.fillText((i + 1).toString(), (i * xSpacing) + graphMarginLeft + 4, canvasHeight - graphMarginBottom + 11);
                        line(ctx, (i * xSpacing) + graphMarginLeft, canvasHeight - graphMarginBottom, (i * xSpacing) + graphMarginLeft, canvasHeight - graphMarginBottom - 4, 1);
                    }
                }
                else {
                    for (var i = 0; i < xMaxAmount + 1; i++) {
                        console.log(i.toString(), graphMarginLeft, graphHeight - graphMarginBottom);
                        ctx.fillText((i + 1).toString(), (i * (graphWidth / xMaxAmount)) + graphMarginLeft + 4, canvasHeight - graphMarginBottom + 11);
                        line(ctx, (i * (graphWidth / xMaxAmount)) + graphMarginLeft, canvasHeight - graphMarginBottom, (i * (graphWidth / xMaxAmount)) + graphMarginLeft, canvasHeight - graphMarginBottom - 4, 1);
                    }
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
        var min = Math.min.apply(Math, values);
        var max = Math.max.apply(Math, values);
        var delta = (max - min) / (amount - 1);
        var output = [];
        for (var i = 0; i <= (amount - 1); i++)
            output.push(Math.round(((min + (delta * i)) * 10)) / 10);
        return output;
    }
    function getStringLength(input) {
        var inputString = input.toString();
        var number = inputString.length * 6 + 4;
        if (input < 0) {
            number -= 2;
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
