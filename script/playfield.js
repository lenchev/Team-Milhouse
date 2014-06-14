/// <reference path="../index.html"/>
/// <reference path="timer.html"/>
/// <reference path="questions.html"/>
/// <reference path="answers.html"/>
/// <reference path="bart.html"/>
/// <reference path="health.html"/>
/// <reference path="coordinatesOfAllParts.js"/>

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

    newQuestionWithPossibleAnswers;

//countdown timer
function countdown() {
    remaining -= 1;
    if (remaining <= 0) {
        clearInterval(countdownTimer);

        timerContainer.attr({
            text: 'player: ' + player + ' ' + timer.up
        });

        truenessOfSelectedAnswer = null;

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
        text: 'player: ' + player + ' ' + timer.remaining + remaining
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

    //player = 1 - player;
    player = 0;
    answered = false;
    remaining = timer.fullTime[level] + 1;

    //countdownTimer = jQuery.extend(true, {}, countdownTimerGeneral); //deep copy of countdownTimerGeneral, but it already no exist
    countdownTimer = setInterval(function () {
        countdown();
    }, 1000);

    newQuestionWithPossibleAnswers = getQuestionWithPossibleAnswers();
    questionContainer.attr({
        x: questions.width / 6,
        text: newQuestionWithPossibleAnswers.question
    });

    currentPossibleAnswers = newQuestionWithPossibleAnswers.answers.length;
    for (var i = 0; i < maxPossibleAnswersPerQuestion; i++) {
        if (i < currentPossibleAnswers) {
            answersContainer[i].attr({
                x: (i + 1) * answers.width / (currentPossibleAnswers + 1),
                text: newQuestionWithPossibleAnswers.answers[i],
                fill: answer.fill,
                stroke: answer.stroke,
                'font-size': answer.fontSize
            });
        }
        else {
            answersContainer[i].attr({
                text: '',
                fill: answer.fill,
                stroke: answer.stroke,
                'font-size': answer.fontSize
            });
        }
    }
}

//initialize playfield
function makePlayfield(difficult) {
    level = difficult;
    remaining = 0,
    truenessOfSelectedAnswer = undefined;

    //remove all html elements with names different of 'script'
    //var startScreen = document.getElementById('startScreen');
    //startScreen.parentNode.removeChild(startScreen);
    var child = document.body.firstChild,
        nextSibling;
    while (child) {
        nextSibling = child.nextSibling;
        if (!child.tagName || child.tagName !== 'script') {
            child.parentNode.removeChild(child);
        }

        child = nextSibling;
    }

    //set timer frame
    timerForm = Raphael(timer.x, timer.y, timer.width, timer.height);
    timerForm.rect(0, 0, timer.width, timer.height)
        .attr({
            fill: timer.fill,
            opacity: 0.9
        });
    timerContainer = timerForm.text(timer.width / 2, timer.height / 2, timer.atBeginning)
        .attr({
            'font-size': timer.fontSize
        });

    //set question frame
    questionForm = Raphael(questions.x, questions.y, questions.width, questions.height);
    questionForm.rect(0, 0, questions.width, questions.height)
        .attr({
            fill: questions.fill,
            opacity: 0.5,
            r: 50
        });
    questionContainer = questionForm.text(questions.width / 6, questions.height / 2, '')
        .attr({
            'font-size': answer.fontSize,
            'text-anchor': 'start'
        });

    //set answers frame
    answerForm = Raphael(answers.x, answers.y, answers.width, answers.height);
    answerForm.rect(0, 0, answers.width, answers.height).attr({ fill: answers.fill });
    answerForm.setStart();
    for (var i = 0; i < maxPossibleAnswersPerQuestion; i++) {
        answersContainer.push(answerForm.text((i + 1) * answers.width / (maxPossibleAnswersPerQuestion + 1), answers.height / 2, '')
        .attr({
            fill: answer.fill,
            stroke: answer.stroke,
            'font-size': answer.fontSize,
            'text-anchor': 'middle'
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
                    answersContainer[selectedAnswer].attr({
                        fill: answer.selectedTrueFill,
                        stroke: answer.selectedTrueStroke,
                        'font-size': answer.selectedTrueFontSize
                    });

                    break;
                }
            }

            clearInterval(countdownTimer); //ще се премести на друго място точно преди края на играта!

            if (selectedAnswer === newQuestionWithPossibleAnswers.rightIndex) {
                truenessOfSelectedAnswer = true;
            }
            else {
                truenessOfSelectedAnswer = false;
            }

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

    //set animations with Bart frame
    bartForm = Raphael(bart.x, bart.y, bart.width, bart.height);
    bartForm.rect(0, 0, bart.width, bart.height).attr({ fill: bart.fill });
    bartContainer = bartForm.text(bart.width / 2, bart.height / 2, "Bart: Animations")
    .attr({
        'font-size': bart.fontSize,
        'text-anchor': 'middle'
    });

    //set players health frame
    healthForm = Raphael(health.x, health.y, health.width, health.height);
    healthForm.rect(0, 0, health.width, health.height).attr({ fill: health.fill });
    healthContainer0 = healthForm.text(health.width / 4, health.height / 2, totalPoints[0])
        .attr({
            'font-size': health.fontSize,
            'text-anchor': 'middle'
        });
    healthContainer1 = healthForm.text(3 * health.width / 4, health.height / 2, totalPoints[1])
        .attr({
            'font-size': health.fontSize,
            'text-anchor': 'middle'
        });

    setNewQuestion();
}