window.onload = function() {
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

ctx.font = "30px Arial";
ctx.fillText("Hello World", 20, 20);
    
    draw_lame();

    function draw_lame() {
        var levelLame = new Image();
        levelLame.src = "levelLame.png";
        levelLame.onload = function () {
            context.drawImage(levelLame, 10, 10);
        }
    }

}

