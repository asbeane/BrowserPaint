/***************************************************
* Author: Andrew Beane
* Date: May 3, 2015
* CGI Final - Problem 8 - Colors
*
*
*
****************************************************/
// Approach
/********************************************************************
* Used Canvas and covered ALl points.
********************************************************************/

/************************MAIN AREA****************************/
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var choice = document.getElementById("colorChoice");
var paintOnCanvas = false;

ctx.lineWidth = 10;

var squarebrush = document.getElementById("squareBrush");
var roundbrush = document.getElementById("circleBrush");
var eraser = document.getElementById("eraser");

var eraserTruth = false;

squarebrush.addEventListener("click", function() {
    eraserTruth = false;
    ctx.lineWidth = 10;
    ctx.lineCap = "square";
}, false)

roundbrush.addEventListener("click", function() {
    eraserTruth = false;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
}, false)

eraser.addEventListener("click", function() {
    eraserTruth = true;
}, false)

canvas.onmousedown = function(event)
{
    paintOnCanvas = true;
    ctx.beginPath();
    
    if (eraserTruth) {
        ctx.lineWidth = 20;
        ctx.strokeStyle = "#FFFFFF";
    } else {
        var color = String(choice.color);
        color = color.toUpperCase();
        ctx.strokeStyle = "#"+color;
    }    
    var x = event.clientX;
    var y = event.clientY;
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    ctx.moveTo(x, y);
};

canvas.onmouseup = function()
{
    paintOnCanvas = false;
    ctx.closePath();
};

canvas.onmousemove = function(event)
{
    if (paintOnCanvas){
        var x = event.clientX;
        var y = event.clientY;
        x -= canvas.offsetLeft;
        y -= canvas.offsetTop;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
};

