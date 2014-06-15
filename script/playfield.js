/// <reference path="../index.html"/>
/// <reference path="questions.html"/>
/// <reference path="bart.html"/>
/// <reference path="healths.html"/>
/// <reference path="global.js"/>

//global variables
var timerForm,
    questionForm,
    answerForm,
    bartForm,
    healthForm,

    timerContainer,
    questionContainer,
    allPossibleAnswersForm,
    answersContainer = [],
    answersContainerOfHTMLElements = [],
    bartContainer,
    healthContainer,

    countdownTimer,
    bartFrameChanger,

    newQuestionWithPossibleAnswers;

//countdown timer
function countdown() {
    remaining -= 1;

    if (remaining <= 0) {
        clearInterval(countdownTimer);

        timerContainer.attr({
            //text: 'player: ' + player + ' ' + timer.up
            text: timer.up
        });

        truenessOfSelectedAnswer = null;

        if (player === 1) {
            enemyWrongAnswers++;
        }
        else {
            playerWrongAnswers++;
        }

        //renderHealthDamage(true, playerWrongAnswers, enemyWrongAnswers, distanceBetweenTheTwoHealthBlocks);
        //setHealthFrameUpd();

        for (var i = 0; i < maxPossibleAnswersPerQuestion; i++) {
            if (i !== newQuestionWithPossibleAnswers.rightIndex) {
                answersContainer[i].attr({
                    fill: answer.selectedFalseFill,
                    stroke: answer.selectedFalseStroke,
                    'font-size': answer.selectedFalseFontSize
                });
            }
            else {
                answersContainer[i].attr({
                    fill: answer.selectedRightFill,
                    stroke: answer.selectedRightStroke,
                    'font-size': answer.selectedRightFontSize
                });
            }
        }

        //change points
        //animations
        //check for end game
        //animations

        setTimeout(function () {
            setNewQuestion();
        }, intervalAfterAnswered);

        return;
    }

    timerContainer.attr({
        //text: 'player: ' + player + ' ' + timer.remaining + remaining
        text: remaining
    });
}

//change player, reset countdown timer, set new question
function setNewQuestion() {
    clearInterval(countdownTimer);

    if (truenessOfSelectedAnswer === true) {
        totalPoints[player] += points.changePlayerPointsByTrue;
        totalPoints[1 - player] += points.changeOppositePointsByTrue;
    }
    else if (truenessOfSelectedAnswer === false) {
        totalPoints[player] += points.changePlayerPointsByFalse;
        totalPoints[1 - player] += points.changeOppositePointsByFalse;
    }
    else if (truenessOfSelectedAnswer === null) { //after time up
        totalPoints[player] += points.changePlayerPointsByTimesUp;
        totalPoints[1 - player] += points.changeOppositePointsByTimesUp;
    }
    else if (truenessOfSelectedAnswer === undefined) { //at beginnig of new game
        totalPoints[0] = points.defaultPoints;
        totalPoints[1] = points.defaultPoints;
    }

    //checks by points for change animation and game ending
    healthContainer0.attr({
        text: totalPoints[0]
    });

    healthContainer1.attr({
        text: totalPoints[1]
    });

    if (totalPoints[0] <= 0) {
        setEndGame(false);
        return;
    }
    else if (totalPoints[1] <= 0) {
        setEndGame(true);
        return;
    }

    //player = 1 - player;
    answered = false;

    remaining = timer.fullTime[level] + 1;

    //countdownTimer = jQuery.extend(true, {}, countdownTimerGeneral); //deep copy of countdownTimerGeneral, but it already no exist
    countdownTimer = setInterval(function () {
        countdown();
    }, 1000);

    newQuestionWithPossibleAnswers = getQuestionWithPossibleAnswers();

    questionContainer.attr({
        x: questions.width / 7,
        text: newQuestionWithPossibleAnswers.question
    });

    currentPossibleAnswers = newQuestionWithPossibleAnswers.answers.length;

    for (var i = 0; i < maxPossibleAnswersPerQuestion; i++) {
        if (i < currentPossibleAnswers) {
            answersContainer[i].attr({
                x: (i + 1) * answers.width / (currentPossibleAnswers + 1),
                text: newQuestionWithPossibleAnswers.answers[i]
            });
        }
        else {
            answersContainer[i].attr({
                text: ''
            });
        }

        answersContainer[i].attr({
            fill: answer.fill,
            stroke: answer.stroke,
            'font-size': answer.fontSize
        });
    }
}

function removeAllBodyElementsWithout(stayElements) {
    //var startScreen = document.getElementById('startScreen');
    //startScreen.parentNode.removeChild(startScreen);

    var child = document.body.firstChild,
        nextSibling,
        removeIt;

    while (child) {
        nextSibling = child.nextSibling;

        if (child.tagName) {
            removeIt = true;

            for (var i = 0, length = stayElements.length; i < length; i++) {
                if (child.tagName === stayElements[i]) {
                    removeIt = false;
                    break;
                }
            }

            if (removeIt) {
                child.parentNode.removeChild(child);
            }
        }

        child = nextSibling;
    }
}

function setTimerFrame() {
    timerForm = Raphael(timer.x, timer.y, timer.width, timer.height);

    timerForm.rect(timer.width / 3, 0, timer.width / 3, timer.height)
        .attr({
            r: timer.r,
            fill: timer.fill,
            stroke: timer.stroke,
            'stroke-width': timer.strokeWidth,
            opacity: timer.opacity
        });

    timerContainer = timerForm.text(timer.width / 2, timer.height / 2, timer.atBeginning)
        .attr({
            'text-anchor': timer.textAnchor,
            fill: timer.textFill,
            stroke: timer.textStroke,
            'font-size': timer.fontSize
        });
}

function setQuestionFrame() {
    questionForm = Raphael(questions.x, questions.y, questions.width, questions.height);

    questionForm.rect(0, 0, questions.width, questions.height)
        .attr({
            fill: questions.fill,
            stroke: questions.stroke,
            'stroke-width': questions.strokeWidth,
            opacity: questions.opacity
        });

    questionContainer = questionForm.text(questions.width / 9, questions.height / 2, '')
        .attr({
            'text-anchor': question.textAnchor,
            'font-size': question.fontSize
        });
}

function setAnswerFrame() {
    answerForm = Raphael(answers.x, answers.y, answers.width, answers.height);

    answerForm.rect(0, 0, answers.width, answers.height)
        .attr({
            r: answers.r,
            fill: answers.fill,
            stroke: answers.stroke,
            'stroke-width': answers.strokeWidth,
            opacity: answers.opacity
        });

    answerForm.setStart();

    for (var i = 0; i < maxPossibleAnswersPerQuestion; i++) {
        answersContainer.push(answerForm.text((i + 1) * answers.width / (maxPossibleAnswersPerQuestion + 1), answers.height / 2, '')
            .attr({
                'text-anchor': answer.textAnchor,
                fill: answer.fill,
                stroke: answer.stroke,
                'stroke-width': answer.strokeWidth,
                'font-size': answer.fontSize
            }));

        answersContainer[i].addClass('answer answer' + i);
        answersContainerOfHTMLElements.push(document.getElementsByClassName('answer' + i)[0]);

        //listener mouseover on possible answer
        answersContainer[i].mouseover(function (event) {
            if (answered) {
                return;
            }

            for (var j = 0; j < maxPossibleAnswersPerQuestion; j++) {
                if (event.target.parentNode === answersContainerOfHTMLElements[j]) {
                    answersContainer[j].attr({
                        fill: answer.overFill,
                        stroke: answer.overStroke,
                        'font-size': answer.overFontSize
                    });

                    break;
                }
            }
        });

        //listener mouseout of possible answer
        answersContainer[i].mouseout(function (event) {
            if (answered) {
                return;
            }

            for (var j = 0; j < maxPossibleAnswersPerQuestion; j++) {
                if (event.target.parentNode === answersContainerOfHTMLElements[j]) {
                    answersContainer[j].attr({
                        fill: answer.fill,
                        stroke: answer.stroke,
                        'font-size': answer.fontSize
                    });

                    break;
                }
            }
        });

        //listener click for selected answer
        answersContainer[i].click(function (event) {
            answered = true;
            for (selectedAnswer = 0; selectedAnswer < maxPossibleAnswersPerQuestion; selectedAnswer++) {
                if (event.target.parentNode === answersContainerOfHTMLElements[selectedAnswer]) {
                    if (selectedAnswer === newQuestionWithPossibleAnswers.rightIndex) {
                        truenessOfSelectedAnswer = true;

                        if (player === 0) {
                            enemyWrongAnswers++;
                        }
                        else {
                            playerWrongAnswers++;
                        }

                        answersContainer[selectedAnswer].attr({
                            fill: answer.selectedTrueFill,
                            stroke: answer.selectedTrueStroke,
                            'font-size': answer.selectedTrueFontSize
                        });
                    }
                    else {
                        truenessOfSelectedAnswer = false;

                        if (player === 1) {
                            enemyWrongAnswers++;
                        }
                        else {
                            playerWrongAnswers++;
                        }

                        answersContainer[selectedAnswer].attr({
                            fill: answer.selectedFalseFill,
                            stroke: answer.selectedFalseStroke,
                            'font-size': answer.selectedFalseFontSize
                        });

                        answersContainer[newQuestionWithPossibleAnswers.rightIndex].attr({
                            fill: answer.selectedRightFill,
                            stroke: answer.selectedRightStroke,
                            'font-size': answer.selectedRightFontSize
                        });
                    }

                    break;
                }
            }

            clearInterval(countdownTimer); //ще се премести на друго място точно преди края на играта!

            //change points
            //animations
            //check for end game
            //animations

            setTimeout(function () {
                setNewQuestion();
            }, intervalAfterAnswered);
        });
    }

    allPossibleAnswersForm = answerForm.setFinish();
}

function setBartFrame() {
    bartForm = Raphael(bart.x, bart.y, bart.width, bart.height);

    //bartForm.rect(0, 0, bart.width, bart.height).attr({ fill: bart.fill });
    //bartContainer = bartForm.text(bart.width / 2, bart.height / 2, "Bart: Animations")
    //.attr({
    //    'font-size': bart.fontSize,
    //    'text-anchor': 'middle'
    //});

    bartContainer = bartForm.image(allBartFrames[bart.currentFrame], 0, 0, bart.width, bart.height);

    bartFrameChanger = setInterval(function () {
        bart.currentFrame++;
        if (bart.currentFrame === numberOfAllBartFrames) {
            bart.currentFrame = 0;
        }

        bartContainer.attr({
            src: allBartFrames[bart.currentFrame]
        });
    }, bart.changeSpeed);
}

function setHealthFrame() {
    healthForm = Raphael(health.x, health.y, health.width, health.height);

    healthForm.rect(0, 0, health.width, health.height)
        .attr({
            fill: health.fill,
            opacity: health.opacity
        });

    healthContainer0 = healthForm.text(health.width / 4, health.height / 2, totalPoints[0])
        .attr({
            'font-size': health.fontSize,
            'text-anchor': health.textAnchor
        });
    healthContainer1 = healthForm.text(3 * health.width / 4, health.height / 2, totalPoints[1])
        .attr({
            'font-size': health.fontSize,
            'text-anchor': health.textAnchor
        });
}





var healthPositionX = health.leftOrRightWhiteSpaceWidth;
var healthPositionY = health.upOrDownWhiteSpaceHeight;
var healthWidth = (playfieldWidth - 2 * health.leftOrRightWhiteSpaceWidth - health.distanceBetweenHealthBlocks) / 2;
var healthHeight = health.height - 2 * health.upOrDownWhiteSpaceHeight;
var distanceBetweenTheTwoHealthBlocks = health.distanceBetweenHealthBlocks;

var isThePlayersAnswerWrong = false;
var playerWrongAnswers = 0;
var enemyWrongAnswers = 1;

var stage,
    layer;

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
    img.position({
        x: positionX,
        y: positionY + 1
    });

    return img;
}

function renderHealthDamage(isThePlayerAnswerWrong, numberOfWrongPlayerAnswers, numberOfWrongEnemyAnswers, distanceBetweenHealthBlocks) {
    var startRenderingHealthDamagePosition = healthWidth + healthPositionX;

    if (isThePlayerAnswerWrong) {
        var reducedPlayerHealth = renderReducedHealth(startRenderingHealthDamagePosition, healthPositionY, numberOfWrongPlayerAnswers);
        layer.add(reducedPlayerHealth);
    }
    else {
        var startRenderingPosition = startRenderingHealthDamagePosition + distanceBetweenHealthBlocks;
        var reducedEnemyHealth = renderReducedHealth(startRenderingPosition, healthPositionY, numberOfWrongEnemyAnswers);
        layer.add(reducedEnemyHealth);
    }
}

function createHealthBlock(healthPositionX, healthPositionY, healthWidth, healthHeight) {
    var healthBlock = new Kinetic.Rect({
        width: healthWidth,
        height: healthHeight,
        fill: health.fill,
        stroke: health.stroke,
        opacity: health.opacity
    });

    //set coordinates
    healthBlock.position({
        x: healthPositionX,
        y: healthPositionY
    });

    layer.add(healthBlock);
}

function setHealthFrameUpd() {
    healthsForm = document.createElement('div');
    healthsForm.setAttribute('id', 'healthsContainer');
    healthsForm.style.position = 'absolute';
    healthsForm.style.left = health.x + 'px';
    healthsForm.style.top = health.y + 60 + 'px';
    document.body.appendChild(healthsForm);

    stage = new Kinetic.Stage({
        container: 'healthsContainer',
        width: health.width,
        height: health.height
    });

    layer = new Kinetic.Layer();

    createHealthBlock(healthPositionX, healthPositionY, healthWidth, healthHeight); // create Player health block
    createHealthBlock(healthPositionX + healthWidth + distanceBetweenTheTwoHealthBlocks, healthPositionY, healthWidth, healthHeight); // create enemey health block

    renderHealthDamage(isThePlayersAnswerWrong, playerWrongAnswers, enemyWrongAnswers, distanceBetweenTheTwoHealthBlocks); // render the reduced health 

    stage.add(layer);
}





//initialize playfield
function makePlayfield(difficult) {
    level = difficult;
    remaining = 0,
    truenessOfSelectedAnswer = undefined;

    removeAllBodyElementsWithout(['script']);

    setTimerFrame();
    setQuestionFrame();
    setAnswerFrame();
    setBartFrame();
    setHealthFrame();

    //work on
    //setHealthFrameUpd();

    setNewQuestion();
}

function setEndGame(winGame) {
    clearInterval(bartFrameChanger);

    removeAllBodyElementsWithout(['script']);

    answersContainer = [];
    answersContainerOfHTMLElements = [];

    playerWrongAnswers = 0;
    enemyWrongAnswers = 1;

    endGameForm = Raphael(document.documentElement.clientHeight / 2, endGame.y, 900, 800);

    var endGameImage = endGameForm.image(
        'images/endScreen' + (winGame ? 'Win' : 'Lose') + '.png',
        70, 0, 900, 700)
        .attr({
            opacity: 1
        });

    endGameImage.addClass('endGame');

    endGameForm.rect(70, 0, 900, 700)
        .attr({
            r: 20,
            stroke: endGame.stroke,
            'stroke-width': endGame.strokeWidth,
            opacity: endGame.opacity
        });

    endGameImage.click(function () {
        makePlayfield(level);
    });
}