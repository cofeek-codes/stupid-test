var Test = /** @class */ (function () {
    function Test() {
        this.questions = [];
        this.questionsAmount = 0;
        this.correctAnswers = [];
    }
    Test.prototype.addQuestion = function (question) {
        this.questions.push(question);
        this.questionsAmount++;
    };
    Test.prototype.get25PercentOfQuestions = function () {
        var percentAmount = Math.floor(this.questionsAmount * (25 / 100));
        console.log(percentAmount);
        return percentAmount;
    };
    Test.prototype.start = function () {
        var _this = this;
        this.displayQuestions();
        var endTestButton = document.createElement('button');
        endTestButton.setAttribute('id', 'end__test');
        endTestButton.innerText = 'end test';
        document.body.appendChild(endTestButton);
        var timer = new Timer();
        timer.start();
        if (timer.hasExpired()) {
            this.end(timer);
        }
        endTestButton.onclick = function () {
            _this.end(timer);
        };
    };
    Test.prototype.end = function (timer) {
        timer.stop();
        var statisticsDiv = document.createElement('div');
        statisticsDiv.classList.add('stats');
        statisticsDiv.innerHTML = "correct answers: ".concat(this.correctAnswers.length, "/").concat(this.questionsAmount);
        document.body.appendChild(statisticsDiv);
    };
    Test.prototype.getRandomQuestions = function () {
        var p = this.get25PercentOfQuestions();
        var partialQuestions = this.questions;
        for (var i = 0; i < p; i++) {
            var randomItem = Math.floor(Math.random() * this.questions.length);
            partialQuestions.splice(randomItem, 1);
        }
        console.log('pk');
        console.log(partialQuestions);
        this.questions = partialQuestions;
    };
    Test.prototype.displayQuestions = function () {
        var _this = this;
        this.questions.forEach(function (q) {
            _this.createQuestionMarkup(q);
        });
    };
    Test.prototype.createQuestionMarkup = function (question) {
        var classRef = this;
        var questionsWrapper = document.querySelector('.questions__wrapper');
        // quesion itself
        var currentQuestion = document.createElement('div');
        currentQuestion.classList.add('question');
        // title
        var currentQuestionTitle = document.createElement('div');
        currentQuestionTitle.classList.add('question__title');
        currentQuestionTitle.innerText = question.title;
        currentQuestion.appendChild(currentQuestionTitle);
        var _loop_1 = function (answerIdx) {
            // answer
            var answerDiv = document.createElement('div');
            answerDiv.classList.add('question__answer');
            currentQuestion.appendChild(answerDiv);
            var answerRadioButton = document.createElement('input');
            answerRadioButton.type = 'radio';
            console.log(question.answers[answerIdx]);
            answerRadioButton.innerText = question.answers[answerIdx];
            var answerLabel = document.createElement('label');
            answerLabel.classList.add('question__answer__label');
            answerLabel.innerText = question.answers[answerIdx];
            answerDiv.appendChild(answerRadioButton);
            answerDiv.appendChild(answerLabel);
            // answer logic
            answerRadioButton.onclick = function () {
                console.log("clicked ".concat(answerIdx));
                var isCorrect = question.checkAnswer(+answerIdx);
                questionsWrapper.querySelectorAll('input').forEach(function (i) {
                    if (i != answerRadioButton) {
                        i.checked = false;
                    }
                });
                // correct/incorrect answers
                if (isCorrect) {
                    currentQuestion.classList.add('question__correct');
                    if (question.answers[answerIdx] in classRef.correctAnswers) {
                    }
                    else {
                        classRef.correctAnswers.push(question.answers[answerIdx]);
                    }
                    console.log("correct answers: ".concat(classRef.correctAnswers));
                    // cursor position
                }
                else {
                    currentQuestion.classList.add('question__incorrect');
                }
            };
        };
        // answers
        for (var answerIdx in question.answers) {
            _loop_1(answerIdx);
        }
        questionsWrapper.appendChild(currentQuestion);
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
var Timer = /** @class */ (function () {
    function Timer(minutes) {
        if (minutes === void 0) { minutes = 5; }
        this.minutes = minutes;
        this.seconds = minutes * 60;
        this.intervalId = null;
    }
    Timer.prototype.hasExpired = function () {
        return this.seconds === 0;
    };
    Timer.prototype.start = function () {
        var _this = this;
        this.intervalId = setInterval(function () {
            _this.seconds -= 1;
            var minutes = Math.floor((_this.seconds % 3600) / 60);
            var seconds = _this.seconds % 60;
            document.getElementById('timer__wrapper').innerText = "".concat(minutes
                .toString()
                .padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
            if (_this.seconds === 0)
                _this.stop();
        }, 1000);
    };
    Timer.prototype.stop = function () {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };
    return Timer;
}());
// main
var startButton = document.querySelector('#start__test');
startButton.onclick = function () {
    var test = new Test();
    var questions = [
        new Question('how to get array element 1', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 2', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 3', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 4', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 5', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 6', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 7', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 8', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 9', ['array[i]', 'Array.get(i)'], 0),
        new Question('how to get array element 10', ['array[i]', 'Array.get(i)'], 0),
    ];
    questions.forEach(function (q) {
        test.addQuestion(q);
    });
    test.getRandomQuestions();
    test.start();
};
// main
