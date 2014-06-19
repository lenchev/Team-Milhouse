var level, //of difficult 0, 1 or 2
    remaining, //for countdown timer, begin with full time of current level of difficult (selected at the beginning)
    intervalAfterAnswered = 1500, //time for see right answer and special animations (bart and both healths)

    player = 0, //current player 0 or 1, but actually begin  (1 - initialPlayer)
    answered = false, //true or false if current player is already selected one of possible answers
    selectedAnswer, //selected answer
    truenessOfSelectedAnswer, //true, false, null (by time up)
    
    //default points and change players' points by ... depend his answer or time up
    points = {
        defaultPoints: 100,

        changePlayerPointsByTrue: 0,
        changeOppositePointsByTrue: -25,

        changePlayerPointsByFalse: -25,
        changeOppositePointsByFalse: 0,

        changePlayerPointsByTimesUp: -15,
        changeOppositePointsByTimesUp: 0
    },

    totalPoints = [points.defaultPoints, points.defaultPoints]; //total points of both players

//playfield dimensions
var playfieldWidth = 1000,
    commonDistanceBetweenEveryTwoFrames = 3;

//timer field
var timer = {
    x: 50,
    y: 50,
    width: 700,
    height: 70,
    r: 50,

    fullTime: [10, 7, 5],
    atBeginning: 'Timer',
    remaining: 'remainig: ',
    up: "Time's up!",

    fill: 'white',
    stroke: 'white',
    strokeWidth: 1,
    opacity: 0.7,

    textAnchor: 'middle',
    textFill: 'red',
    textStroke: 'black',
    fontSize: 35
};

// field
var questions = {
    x: timer.x,
    y: timer.y + timer.height + commonDistanceBetweenEveryTwoFrames,
    width: timer.width,
    height: 120,
    r: 20,

    fill: 'white',
    stroke: 'blue',
    strokeWidth: 1,
    opacity: 0.5,
    fontSize: 20
};

//foeach question
var question = {
    width: 700,
    height: 70,

    textAnchor: 'start',
    fill: '#A00005',
    stroke: '#A00005',
    fontSize: 30
};

//answers field
var answers = {
    x: questions.x,
    y: questions.y + questions.height + commonDistanceBetweenEveryTwoFrames,
    width: questions.width,
    height: 90,
    r: 30,

    fill: 'white',
    stroke: 'green',
    strokeWidth: 1,
    opacity: 0.5
};

//foeach answer
var answer = {
    width: 50,
    height: 30,

    textAnchor: 'middle',

    strokeWidth: 1.5,

    fill: 'white',
    stroke: 'dodgerblue',
    fontSize: 30,

    overFill: 'white',
    overStroke: 'black',
    overFontSize: 35,

    selectedTrueFill: 'white',
    selectedTrueStroke: 'green',
    selectedTrueFontSize: 35,

    selectedFalseFill: 'white',
    selectedFalseStroke: 'red',
    selectedFalseFontSize: 35,

    selectedRightFill: 'white',
    selectedRightStroke: 'green',
    selectedRightFontSize: 35
};

var allBartFrames = [],
    numberOfAllBartFrames = 25;
for (var i = 1; i <= numberOfAllBartFrames; i++) {
    allBartFrames.push('images/Bart animation frames/simpson100' + (i < 10 ? '0' : '') + i + '.png');
}

//bart field
var bart = {
    x: timer.x + timer.width + commonDistanceBetweenEveryTwoFrames,
    y: timer.y,
    width: playfieldWidth - timer.width - commonDistanceBetweenEveryTwoFrames,
    height: timer.height + questions.height + commonDistanceBetweenEveryTwoFrames + answers.height + commonDistanceBetweenEveryTwoFrames,

    currentFrame: 0,
    changeSpeed: 10,

    fill: 'white',
    opacity: 0.9,
    fontSize: 30
}

//health field
var health = {
    x: timer.x,
    y: answers.y + answers.height + commonDistanceBetweenEveryTwoFrames,
    width: playfieldWidth,
    height: 50,

    fill: 'red',
    stroke: 'blue',
    strokeWidth: 2,
    opacity: 0,

    textAnchor: 'middle',
    fontSize: 30,

    upOrDownWhiteSpaceHeight: 5,
    leftOrRightWhiteSpaceWidth: 0,
    distanceBetweenHealthBlocks: 100,
}

//end image in rectangle
var endGame = {
    x: timer.x - 1,
    y: timer.y - 1,
    width: document.documentElement.clientHeight/2,
    width: timer.width + commonDistanceBetweenEveryTwoFrames + bart.width + 1,
    height: timer.height + questions.height + answers.height + health.height + 3 * commonDistanceBetweenEveryTwoFrames + 1,

    r: 20,
    stroke: 'black',
    strokeWidth: 1,
    fill: 'white',
    opacity: 0.5
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