var mycanvas = document.createElement('Canvas');
var myctx = mycanvas.getContext("2d");

var myfillText = myctx.constructor.prototype.fillText;
myctx.constructor.prototype.fillText = function(text, x, y) {
    myfillText.apply(this, arguments);
//	this.fillRect(x+1,y+1,1,1);

    // Get the pixel
    var pixel = this.getImageData(x+2, y-2,1,1);
    console.log(pixel);
    pixel.data[0]+= Math.floor(Math.random()*10);
    pixel.data[1]+= Math.floor(Math.random()*10);
    pixel.data[2]+= Math.floor(Math.random()*10);
    pixel.data[3]+= Math.floor(Math.random()*10);

    /*	for (var ind = 0; ind < pixel.data.length; ind++){
     pixel.data[ind] = 99;
     }*/
    this.putImageData(pixel, x+2, y-2);
}
