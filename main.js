var Test = /** @class */ (function () {
    function Test() {
        this.questions = [];
        this.questionsAmount = 0;
    }
    Test.prototype.addQuestion = function (question) {
        this.questions.push(question);
    };
    Test.prototype.get75PercentOfQuestions = function () {
        var percentAmount = (this.questionsAmount / 75) * 100;
        console.log(percentAmount);
        return percentAmount;
    };
    Test.prototype.getRandomQuestions = function () {
        var p = this.get75PercentOfQuestions();
        var partialQuestions = [];
        for (var i = 0; i < p; i++) {
            var randomItem = this.questions[Math.floor(Math.random() * this.questions.length)];
            partialQuestions.push(randomItem);
        }
        console.log(partialQuestions);
    };
    Test.prototype.displayQuestions = function () {
        var _this = this;
        this.questions.forEach(function (q) {
            _this.createQuestionForDisplay(q);
        });
    };
    Test.prototype.createQuestionForDisplay = function (question) {
        var questionsWrapper = document.querySelector('.questions__wrapper');
        // quesion itself
        var l__question = document.createElement('div');
        l__question.classList.add('question');
        // title
        var l__question__title = document.createElement('div');
        l__question__title.classList.add('question__title');
        l__question__title.innerText = question.title;
        l__question.appendChild(l__question__title);
        // answers
        for (var answer in question.answers) {
            var answerRadioButton = document.createElement('input');
            answerRadioButton.type = 'radio';
            answerRadioButton.innerText = answer;
            l__question.appendChild(answerRadioButton);
        }
        questionsWrapper.appendChild(l__question);
    };
    return Test;
}());
var Question = /** @class */ (function () {
    function Question(title, answers, correctAnswerIdx) {
        this.title = title;
        this.answers = answers;
        this.correctAnswerIdx = correctAnswerIdx;
    }
    Question.prototype.checkAnswer = function (answerIdx) {
        return this.correctAnswerIdx == answerIdx;
    };
    return Question;
}());
var startButton = document.querySelector('#start__test');
startButton.onclick = function () {
    var test = new Test();
    var question = new Question('how to get array element', ['array[i]', 'Array.get(i)'], 0);
    test.addQuestion(question);
    test.displayQuestions();
};
