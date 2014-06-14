function randomNumber(fromInclusive, toInclusive) {
    return ((Math.random() * (toInclusive - fromInclusive + 1)) | 0) + fromInclusive;
}

function QuestionsWithPossibleAnswers(question, answers, rightIndex) {
    this.question = question;
    this.answers = answers;
    this.rightIndex = rightIndex;
}

var allQuestionsWithPossibleAnswers = [
    new QuestionsWithPossibleAnswers('question01',
        ['true', 'false', 'false'], 0),
    new QuestionsWithPossibleAnswers('question02',
        ['true', 'false'], 0),
    new QuestionsWithPossibleAnswers('question03',
        ['true', 'false', 'false'], 0),
    new QuestionsWithPossibleAnswers('question04',
        ['true', 'false', 'false', 'false'], 0),
    new QuestionsWithPossibleAnswers('question05',
        ['true', 'false', 'false'], 0)
],
    numberOfAllQuestionsWithPossibleAnswers = allQuestionsWithPossibleAnswers.length,
    maxPossibleAnswersPerQuestion = 0,
    currentPossibleAnswers = 0;

for (var i = 0; i < numberOfAllQuestionsWithPossibleAnswers; i++) {
    currentPossibleAnswers = allQuestionsWithPossibleAnswers[i].answers.length;
    if (maxPossibleAnswersPerQuestion < currentPossibleAnswers) {
        maxPossibleAnswersPerQuestion = currentPossibleAnswers;
    }
}

Array.prototype.removeElementAt = function (index) {
    removedElement = this[index];
    this.splice(index, 1);
    return removedElement;
}

var unusedQuestions = [],
    numberOfUnusedQuestions = 0;

function fillUnusedQuestions() {
    numberOfUnusedQuestions = numberOfAllQuestionsWithPossibleAnswers;
    for (var i = 0; i < numberOfUnusedQuestions; i++) {
        unusedQuestions.push(allQuestionsWithPossibleAnswers[i]);
    }
}

function getQuestionWithPossibleAnswers() {
    if (numberOfUnusedQuestions === 0) {
        fillUnusedQuestions();
    }

    var questionIndex = randomNumber(0, numberOfUnusedQuestions - 1),
        question = unusedQuestions.removeElementAt(questionIndex);

    numberOfUnusedQuestions--;

    return question;
}

var allQuestionsWithPossibleAnswers = [
    new QuestionsWithPossibleAnswers('Loc it\'s on for the two-triple-oh\nComin\' real, it\'s the next...',
        ['railroad', 'episode', 'tetrapode'], 1),
    new QuestionsWithPossibleAnswers('I\'m representing for them gangstas all across the world\nStill hitting them corners in them lo-lo\'s, ...',
        ['girl', 'squirrel'], 0),
    new QuestionsWithPossibleAnswers('Don\'t push me cause I\'m close to the edge\nI\'m trying not to lose my...',
        ['head', 'bread', 'bed'], 0),
    new QuestionsWithPossibleAnswers('You gotta fight for your right to...',
        ['ante', 'party'], 1),
    new QuestionsWithPossibleAnswers('Now let me welcome everybody\nto the wild, wild...',
        ['next', 'breast', 'west'], 2),
    new QuestionsWithPossibleAnswers('Stop, drop, shut \'em down open up shop\nOh, no, that\'s how Ruff Ryders...',
        ['fart', 'roll', 'go'], 1),
    new QuestionsWithPossibleAnswers('Y\'all niggas had enough?\nGimme some...',
        ['more', 'ore'], 0),
    new QuestionsWithPossibleAnswers('Greetings, earthlings\nWe have now taken over your...',
        ['radio', 'ratio', 'bungalow'], 0),
    new QuestionsWithPossibleAnswers('Keep spending most our lives\nLivin\'in a gangsta\'s...',
        ['merchandise', 'edelweiss', 'paradise'], 2),
    new QuestionsWithPossibleAnswers('What ya\'ll wanna do? Don\'t you know\nWe always coming through, me and my...',
        ['zoo', 'crew', 'brew'], 1)
];