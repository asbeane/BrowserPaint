/***************************************************
* Author: Andrew Beane
* Original Date: May 3, 2015
 * Edited Dat April 25, 2016
* browserPaint.JS - Basic Paint Program using HTMl Canvas
****************************************************/

/************************MAIN AREA****************************/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
//ctx.globalAlpha = 0.1;
var choice = document.getElementById("colorChoice");
var paintOnCanvas = false;

ctx.lineWidth = 10;

var squarebrush = document.getElementById("squareBrush");
var roundbrush = document.getElementById("circleBrush");
var eraser = document.getElementById("eraser");
var textBox = document.getElementById("textBox");
var increase = document.getElementById("increase");
var decrease = document.getElementById("decrease");
var fill = document.getElementById("fillButton");
var save = document.getElementById("save");
var restore = document.getElementById("restore");
var eraserTruth = false;
var pixelState;

//var open = false;

function setColor(event) {
    var color = String(choice.color);
    var canv = canvas.getBoundingClientRect();
    var x = event.clientX - canv.left;
    var y = event.clientY - canv.top;
    var pixels = ctx.getImageData(x, y, 1, 1).data;
    var color = '#' + String(choice.color);

    //var convertedColor = convertRGBToHex(pixels[0], pixels[1], pixels[3]);
    var convertedColor = ctx.getImageData(x, y, 1, 1).data;
    console.log($.xcolor.distance(color, convertedColor));
    if ($.xcolor.distance(color, convertedColor) <= 100) {
        return color;
    }
    else {
        return $.xcolor.additive(color, convertRGBToHex(pixels[0], pixels[1], pixels[3])).getHex();
    }
    //var finalColor = $.xcolor.additive(color, convertRGBToHex(pixels[0], pixels[1], pixels[3]));
    color = color.toUpperCase(); 
    //ctx.fillStyle = finalColor.getHex();
    //return color;
    //return finalColor.getHex();
}

save.addEventListener("click", function() {
    //ctx.save();
    pixelState = ctx.getImageData(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
}, false);

restore.addEventListener("click", function() {
    //ctx.restore();
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx.putImageData(pixelState,0,0);
}, false);

fill.addEventListener("click", function() {
    //ctx.globalAlpha = 1.0;
    var color = String(choice.color);
    var canv = canvas.getBoundingClientRect();
    color = color.toUpperCase();
    ctx.fillStyle = "#"+color;
    ctx.fillRect(0,0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    //ctx.globalAlpha = 0.1;
}, false);

squarebrush.addEventListener("click", function() {
    eraserTruth = false;
    ctx.lineWidth = 10;
    ctx.lineCap = "square";
}, false)

roundbrush.addEventListener("click", function() {
    eraserTruth = false;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
}, false);

eraser.addEventListener("click", function() {
    ctx.lineWidth = 20;
    eraserTruth = true;
}, false);

// TODO: Need to implement click and add text box, and choose font, size etc.
textBox.addEventListener("click", function() {
    var box = new CanvasInput({
        canvas: canvas,
        fontSize: 18,
        fontFamily: 'Arial',
        fontColor: '#212121',
        fontWeight: 'bold',
        width: 300,
        padding: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        boxShadow: '1px 1px 0px #fff',
        innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
        placeHolder: 'Enter message here...'
    });
}, false);

increase.addEventListener("click", function() {
    ctx.lineWidth += 2;
}, false);

decrease.addEventListener("click", function() {
    ctx.lineWidth -= 2;
}, false);

canvas.onmousedown = function(event)
{
    paintOnCanvas = true;
    //if (!open) {
    ctx.beginPath();
    //open = true;
    //}

    if (eraserTruth) {
        ctx.strokeStyle = "#FFFFFF";
    } else {
        var color = String(choice.color);
        color = color.toUpperCase();
        ctx.strokeStyle = "#"+color;
        //ctx.strokeStyle = setColor(event);
    }
};

canvas.onmouseup = function() {
    paintOnCanvas = false;
    ctx.closePath();
};

canvas.onmousemove = function(event)
{
    if (paintOnCanvas) {
        var canv = canvas.getBoundingClientRect();
        var x = event.clientX - canv.left;
        var y = event.clientY - canv.top;
        //ctx.strokeStyle = setColor(event);
        //var color = String(choice.color);
        //color = color.toUpperCase();
        //ctx.strokeStyle = "#" + color;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

function convertRGBToHexHelper(x) {
    var hex = x.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function convertRGBToHex(r, g, b) {
    return "#" + convertRGBToHexHelper(r) + convertRGBToHexHelper(g) + convertRGBToHexHelper(b);
}
