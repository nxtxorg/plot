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
                var canvasHeight = canvas.height = 100;
                canvas.width = 100;
                canvas.style.height = "200px";
                canvas.style.width = "400px";
                var normalizedY = normalize(y);
                ctx.beginPath();
                for (var i = 0; i < normalizedY.length - 1; i++) {
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
        var min = Math.min.apply(Math, array);
        var max = Math.max.apply(Math, array) - min;
        return array.map(function (e) { return (e - min) / max; });
    }
    if (nxtx)
        nxtx.registerPackage(pkg);

    return pkg;

}());
//# sourceMappingURL=plot.js.map
