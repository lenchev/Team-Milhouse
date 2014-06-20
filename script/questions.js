function randomNumber(fromInclusive, toInclusive) {
    return ((Math.random() * (toInclusive - fromInclusive + 1)) | 0) + fromInclusive;
}

function QuestionsWithPossibleAnswers(question, answers, rightIndex) {
    this.question = question;
    this.answers = answers;
    this.rightIndex = rightIndex;
}

var allQuestionsWithPossibleAnswersT = [
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
allQuestionsWithPossibleAnswers = [
    new QuestionsWithPossibleAnswers('Loc it\'s on for the two-triple-oh\nComin\' real, it\'s the next...',
        ['railroad', 'episode', 'tetrapode'], 1),
    new QuestionsWithPossibleAnswers('I\'m representing for them gangstas all \nacross the world Still hitting them corners\n in them lo-lo\'s, ...',
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
        ['zoo', 'crew', 'brew'], 1),
        new QuestionsWithPossibleAnswers('Ya see, I\'m Irish, but I\'m not a leprechaun\nYou wanna fight, then step up and we\'ll get it...',
        ['gone', 'on', 'blown'], 1),
        new QuestionsWithPossibleAnswers('You down with OPP (Yeah you know me)\nWho\'s down with OPP (Every last ...)',
        ['homie', 'mommy', 'ponny'], 0),
         new QuestionsWithPossibleAnswers('Rollin down the street, smokin indo, \nsippin on gin and ...',
        ['goose', 'booze', 'juice'], 2),
         new QuestionsWithPossibleAnswers('War of the masses, the outcome disastrous\nMany of the victim family save they...',
        ['arses', 'ashes', 'matches'], 1),
         new QuestionsWithPossibleAnswers('D.P.\'s got that crazy shit\nWe keep it crunked-up, John Blazed and...',
        ['sh*t', 'Smith'], 0),
         new QuestionsWithPossibleAnswers('Can I kick it? (Yes, you can!)\nWell, I\'m gone (Go on...)',
        ['man', 'then', 'Stan'], 1),
         new QuestionsWithPossibleAnswers('Just see him in the drive way,\nGettin beat like a smoka fool \'cuz it\'s....',
        ['payday', 'Mayday', 'Friday'], 2),
         new QuestionsWithPossibleAnswers('If you\'re having girl problems I feel bad \nfor you, son I\'ve got 99 problems \nbut a ... ain\'t one',
        ['b*tch', 'pitch', 'stich'], 0)
];
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