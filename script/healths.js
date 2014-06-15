/// <reference path="../index.html"/>
/// <reference path="questions.html"/>
/// <reference path="bart.html"/>
/// <reference path="healths.html"/>
/// <reference path="global.js"/>

var healthsForm = document.createElement('div');
healthsForm.setAttribute('id', 'healthContainer');
document.body.appendChild(healthsForm);

var stage = new Kinetic.Stage({
    container: 'healthContainer',
    width: 500,
    height: 500
});

var layer = new Kinetic.Layer();

var healthPositionX = 50;
var healthPositionY = 50;
var healthWidth = 200;
var healthHeight = 50;
var distanceBetweenTheTwoHealthBlocks = 250;

createHealthBlock(healthWidth, healthHeight, healthPositionX, healthPositionY); // create Player health block
createHealthBlock(healthWidth, healthHeight, healthPositionX + distanceBetweenTheTwoHealthBlocks, healthPositionY); // create enemey health block

var isThePlayersAnswerWrong = false; // 
var playerWrongAnswers = 0;
var enemyWrongAnswers = 1;

renderHealthDamage(isThePlayersAnswerWrong, playerWrongAnswers, enemyWrongAnswers,
                    distanceBetweenTheTwoHealthBlocks);
// render the reduced health 

stage.add(layer);

function renderHealthDamage(isThePlayerAnswerWrong, numberOfWrongPlayerAnswers, numberOfWrongEnemyAnswers, distanceBetweenTheTwoHealthBlocks) {
    var startRenderingHealthDamagePosition = healthWidth + healthPositionX;

    if (isThePlayerAnswerWrong) {
        var reducedPlayerHealth = renderReducedHealth(startRenderingHealthDamagePosition, healthPositionY, numberOfWrongPlayerAnswers);
        layer.add(reducedPlayerHealth);
    }
    else {
        var startRenderingPosition = startRenderingHealthDamagePosition + distanceBetweenTheTwoHealthBlocks;
        var reducedEnemyHealth = renderReducedHealth(startRenderingPosition, healthPositionY, numberOfWrongEnemyAnswers);
        layer.add(reducedEnemyHealth);
    }
}
        
function createHealthBlock(healthWidth, healthHeight, healthPositionX, healthPositionY) {
    var healthBlock = new Kinetic.Rect({
        width: healthWidth,
        height: healthHeight,
        stroke: 'blue',
        fill: 'red',
        opacity: 0.9
    });

    healthBlock.position({ x: healthPositionX, y: healthPositionY }); //set coordinates

    layer.add(healthBlock);
}

function renderReducedHealth(startRenderPosition, height, wrongAnswers) {
    var damage = healthWidth / 5;

    var img = new Kinetic.Rect({
        width: damage,
        height: healthHeight - 2,
        fill: 'white',
        opacity: 0.95
    });

    var positionX = startRenderPosition - damage * wrongAnswers;
    var positionY = height;
    img.position({ x: positionX, y: positionY + 1 });

    return img;
}