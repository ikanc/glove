/**
 * Created by Ika Balzam and Naor Biton of Net-Comet
 *
 */

(function (){
    var origToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function() {
        var ctx = this.getContext('2d');

        var imageData = ctx.getImageData(0, 0, this.width, this.height);
        var rowLen = this.width * 4;
        var positionMatrix = [
            [-rowLen - 4,   -rowLen,    -rowLen + 4     ],
            [-4,            0,          4               ],
            [rowLen - 4,    rowLen,     rowLen + 4      ]
        ];
        var resultData = ctx.getImageData(0, 0, this.width, this.height);
        var pixel = rowLen + 4; // Start at (1,1)
        var hSlots = this.height - 1;
        var wSlots = this.width - 1;
        var edgePixels = [];
        for (var row = 1; row < hSlots; row++) {
            for (var col = 1; col < wSlots; col++){
                var rCurr = imageData.data[pixel],
                    gCurr = imageData.data[pixel + 1],
                    bCurr = imageData.data[pixel + 2];

                for (var posRow = 0; posRow < 3; posRow++){
                    for (var posCol = 0; posCol < 3; posCol++){
                        if (posRow === 1 && posCol === 1){
                            continue;
                        }
                        var inspectedPix = pixel + positionMatrix[posRow][posCol];

                        var rDiff = Math.abs(imageData.data[inspectedPix] - rCurr),
                            gDiff = Math.abs(imageData.data[inspectedPix + 1] - gCurr),
                            bDiff = Math.abs(imageData.data[inspectedPix + 2] - bCurr),
                            diffAvg = (rDiff + gDiff + bDiff) / 3;

                        if (diffAvg > 30){
                            edgePixels.push(inspectedPix);
                        }
                    }
                }
                pixel += 4;
            }
            pixel = (row * rowLen) + 4;
        }

        for (var ind = 0; ind < 9; ind++){
            var randIndex = Math.floor(Math.random() * edgePixels.length);
            var pixAlphaIndex = edgePixels[randIndex] + 4;
            resultData.data[pixAlphaIndex] = imageData.data[pixAlphaIndex] > 128 ?
                imageData.data[pixAlphaIndex] - 5 :
                imageData.data[pixAlphaIndex] + 5;
        }

        ctx.putImageData(resultData, 0 , 0);

        return origToDataURL.apply(this, arguments);
    };
})();
