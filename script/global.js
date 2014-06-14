var level, //of difficult 0, 1 or 2
    remaining, //for countdown timer, begin with full time of current level of difficult (selected at the beginning)
    intervalAfterAnswered = 1000, //time for see right answer and special animations (bart and both healths)

    player = 0, //current player 0 or 1, but actually begin  (1 - initialPlayer)
    answered = false, //true or false if current player is already selected one of possible answers
    selectedAnswer, //selected answer
    truenessOfSelectedAnswer, //true, false, null (by time up)

    //default points and change players' points by ... depend his answer or time up
    points = {
        defaultPoints: 100,

        changePlayerPointsByTrue: 0,
        changeOppositePointsByTrue: -20,

        changePlayerPointsByFalse: -20,
        changeOppositePointsByFalse: 0,

        changePlayerPointsByTimesUp: -10,
        changeOppositePointsByTimesUp: 0
    },

    totalPoints = [points.defaultPoints, points.defaultPoints]; //total points of both players

//playfield dimensions
var playfieldWidth = 1000;

//timer field
var timer = {
    x: 50,
    y: 50,
    width: 700,
    height: 70,

    fullTime: [3, 5, 7],
    atBeginning: 'Timer',
    remaining: 'remainig: ',
    up: "Time's up!",

    fill: 'white',
    opacity: 0.9,
    fontSize: 35
};

// field
var questions = {
    x: timer.x,
    y: timer.y + timer.height,
    width: timer.width,
    height: 100,

    fill: 'white',
    opacity: 0.9,
    fontSize: 35
};

//answers field
var answers = {
    x: questions.x,
    y: questions.y + questions.height,
    width: questions.width,
    height: 90,

    fill: 'white',
    opacity: 0.9
};

//foeach answer
var answer = {
    width: 50,
    height: 30,

    fill: '#A00005',
    stroke: '#A00005',
    fontSize: 40,

    overFill: '#FF0008',
    overStroke: '#FF0008',
    overFontSize: 50,

    selectedTrueFill: 'blue',
    selectedTrueStroke: 'blue',
    selectedTrueFontSize: 50,

    selectedFalseFill: '#FF0008',
    selectedFalseStroke: '#FF0008',
    selectedFalseFontSize: 50,

    //selectedFalseFill: 'gray',
    //selectedFalseStroke: 'violet',
    //selectedFalseFontSize: 45
};

//bart field
var bart = {
    x: timer.x + timer.width,
    y: timer.y,
    width: playfieldWidth - timer.width,
    height: timer.height + questions.height + answers.height,

    fill: 'white',
    opacity: 0.9,
    fontSize: 30
}

//health field
var health = {
    x: timer.x,
    y: answers.y + answers.height,
    width: playfieldWidth,
    height: 50,

    fill: 'white',
    opacity: 0.9,
    fontSize: 30
}

//extend for adding className to Raphael element
Raphael.el.addClass = function (className) {
    this.node.setAttribute("class", className);
    return this;
};

//sleep for
function sleep(milliseconds) {
    var start = new Date().getTime();
    while (true) {
        if (milliseconds < new Date().getTime() - start) {
            break;
        }
    }
}