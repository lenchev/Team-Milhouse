window.onload = function() {
    var cvs = document.getElementById("d-canvas");
    var ctx = cvs.getContext("2d");

    var levelLame = new Image();
    levelLame.src = 'images/levelLame.png';

    levelLame.onload = function () {
        ctx.drawImage(levelLame, 20, 20);
    }

    var levelDecent = new Image();
    levelDecent.src = 'images/levelDecent.png';

    levelDecent.onload = function () {
        ctx.drawImage(levelDecent, 315, 20);
    }

    var levelPro = new Image();
    levelPro.src = 'images/levelPro.png';

    levelPro.onload = function () {
        ctx.drawImage(levelPro, 610, 20);
    }

    var chooseText = new Image();
    chooseText.src = 'images/chooseDiff.png';

    chooseText.onload = function () {
        ctx.drawImage(chooseText, 115, 490);
    }
}

