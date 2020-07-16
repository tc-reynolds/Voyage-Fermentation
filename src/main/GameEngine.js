var ctx = null;
var gameMap = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 1, 1, 0, 2, 1, 1, 1, 0,
    0, 1, 0, 0, 2, 1, 0, 2, 0, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
    0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var tileW = 60, tileH = 60;
var heroW = 20, heroH = 50;
var heroX = 0, heroY = 0;
var mapW = 10, mapH = 10;
var canvasWidth = mapW * tileW + "";
var canvasHeight = mapH * tileH + "";
var currentSecond = 0, frameCount = 0, framesLastSecond = 0;

/*********************Main*****************************/

window.onload = function()
{
    ctx = document.getElementById('game').getContext("2d");

    document.getElementById('game').setAttribute('width', canvasWidth);
    document.getElementById('game').setAttribute('height', canvasHeight);

    ctx.addEventListener("touchstart", touchHandler);
    ctx.addEventListener("touchmove", touchHandler);
    // ctx.addEventListener("touchend", handleEnd);
    // ctx.addEventListener("touchcancel", handleCancel);

    requestAnimationFrame(drawGame);
    ctx.font = "bold 10pt sans-serif";
};
/********************* Main END*****************************/
/********************* Hero Movement Functions START*****************************/
function touchHandler(e) {
    if(e.touches) {
        heroX = e.touches[0].pageX - ctx.offsetLeft - heroW / 2;
        heroY = e.touches[0].pageY - ctx.offsetTop - heroH / 2;
        // output.innerHTML = "Touch: "+ " x: " + heroX + ", y: " + heroY;
        e.preventDefault();
    }
}
function clickHandler(e) {
    if(e.touches) {
        heroX = e.touches[0].pageX - ctx.offsetLeft - heroW / 2;
        heroY = e.touches[0].pageY - ctx.offsetTop - heroH / 2;
        // output.innerHTML = "Touch: "+ " x: " + heroX + ", y: " + heroY;
        e.preventDefault();
    }
}
/*********************Hero Functions END*****************************/

/*********************Draw Functions*****************************/
function drawGame()
{
    if(ctx==null) { return; }
    frameCounter();
    drawWorld();
    drawHero();
    displayFrameCount();
    requestAnimationFrame(drawGame);
}
function drawHero(){
    ctx.fillRect(heroX, heroY, heroW, heroH);
}
function drawWorld(){
    for(var y = 0; y < mapH; ++y) {
        for(var x = 0; x < mapW; ++x) {
            drawMap(x, y);
            drawHero();
        }
    }
}
function drawHero(){
    ctx.fillStyle = "#FFFF00";
    ctx.fillRect( heroX*heroW, heroY*heroH, heroW, heroH);
}
function drawMap(x, y){
    switch(gameMap[((y*mapW)+x)]) {
        case 0:
            ctx.fillStyle = "#000000";
            break;
        case 1:
            ctx.fillStyle = "#234567";
            break;
        case 2:
            ctx.fillStyle = "#8D490E";
            break;
        default:
            ctx.fillStyle = "#1FB2C2";
    }
    ctx.fillRect( x*tileW, y*tileH, tileW, tileH);
}
/*********************Draw Functions END*****************************/

/*********************Frame Functions START*****************************/
function displayFrameCount(){
    ctx.fillStyle = "#ff0000";
    ctx.fillText("FPS: " + framesLastSecond, 10, 20);
}
function frameCounter(){
    var sec = Math.floor(Date.now()/1000);
    if(sec!=currentSecond) {
        currentSecond = sec;
        framesLastSecond = frameCount;
        frameCount = 1;
    }
    else {
        frameCount++;
    }

}
/*********************Frame Functions END*****************************/
