class Test {
  private questions: Question[] = []
  private questionsAmount: number = 0
  private correctAnswers: string[] = []

  public addQuestion(question: Question) {
    this.questions.push(question)
    this.questionsAmount++
  }
  private get25PercentOfQuestions() {
    let percentAmount = Math.floor(this.questionsAmount * (25 / 100))
    console.log(percentAmount)
    return percentAmount
  }

  public start() {
    this.displayQuestions()

    let endTestButton = document.createElement('button')
    endTestButton.setAttribute('id', 'end__test')
    endTestButton.innerText = 'end test'
    document.body.appendChild(endTestButton)
    let timer = new Timer()
    timer.start()

    if (timer.hasExpired()) {
      this.end(timer)
    }

    endTestButton.onclick = () => {
      this.end(timer)
    }
  }

  public end(timer: Timer) {
    timer.stop()

    let statisticsDiv = document.createElement('div')
    statisticsDiv.classList.add('stats')
    statisticsDiv.innerHTML = `correct answers: ${this.correctAnswers.length}/${this.questionsAmount}`
    document.body.appendChild(statisticsDiv)
  }

  public getRandomQuestions() {
    let p = this.get25PercentOfQuestions()

    let partialQuestions: Question[] = this.questions

    for (let i = 0; i < p; i++) {
      var randomItem = Math.floor(Math.random() * this.questions.length)
      partialQuestions.splice(randomItem, 1)
    }
    console.log('pk')
    console.log(partialQuestions)

    this.questions = partialQuestions
  }

  public displayQuestions() {
    this.questions.forEach(q => {
      this.createQuestionMarkup(q)
    })
  }

  private createQuestionMarkup(question: Question) {
    let classRef = this
    let questionsWrapper: HTMLDivElement = document.querySelector(
      '.questions__wrapper',
    )!

    // quesion itself
    let currentQuestion: HTMLDivElement = document.createElement('div')
    currentQuestion.classList.add('question')
    // title
    let currentQuestionTitle: HTMLDivElement = document.createElement('div')
    currentQuestionTitle.classList.add('question__title')
    currentQuestionTitle.innerText = question.title
    currentQuestion.appendChild(currentQuestionTitle)
    // answers
    for (let answerIdx in question.answers) {
      // answer

      let answerDiv = document.createElement('div')
      answerDiv.classList.add('question__answer')
      currentQuestion.appendChild(answerDiv)
      let answerRadioButton = document.createElement('input')
      answerRadioButton.type = 'radio'
      console.log(question.answers[answerIdx])

      answerRadioButton.innerText = question.answers[answerIdx]

      let answerLabel: HTMLLabelElement = document.createElement('label')
      answerLabel.classList.add('question__answer__label')
      answerLabel.innerText = question.answers[answerIdx]

      answerDiv.appendChild(answerRadioButton)
      answerDiv.appendChild(answerLabel)
      // answer logic
      answerRadioButton.onclick = function () {
        console.log(`clicked ${answerIdx}`)
        let isCorrect = question.checkAnswer(+answerIdx)
        questionsWrapper.querySelectorAll('input').forEach(i => {
          if (i != answerRadioButton) {
            i.checked = false
          }
        })

        // correct/incorrect answers

        if (isCorrect) {
          currentQuestion.classList.add('question__correct')
          if (question.answers[answerIdx] in classRef.correctAnswers) {
          } else {
            classRef.correctAnswers.push(question.answers[answerIdx])
          }
          console.log(`correct answers: ${classRef.correctAnswers}`)
          // cursor position
        } else {
          currentQuestion.classList.add('question__incorrect')
        }
      }
    }

    questionsWrapper.appendChild(currentQuestion)
  }
}

class Question {
  title: string
  answers: string[]
  correctAnswerIdx: number

  constructor(title: string, answers: string[], correctAnswerIdx: number) {
    this.title = title
    this.answers = answers
    this.correctAnswerIdx = correctAnswerIdx
  }
  checkAnswer(answerIdx: number): boolean {
    return this.correctAnswerIdx == answerIdx
  }
}

class Timer {
  public seconds: number
  private intervalId: number | null
  constructor(public minutes = 5) {
    this.seconds = minutes * 60
    this.intervalId = null
  }

  hasExpired() {
    return this.seconds === 0
  }

  start() {
    this.intervalId = setInterval(() => {
      this.seconds -= 1
      let minutes = Math.floor((this.seconds % 3600) / 60)
      let seconds = this.seconds % 60

      document.getElementById('timer__wrapper')!.innerText = `${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

      if (this.seconds === 0) this.stop()
    }, 1000)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}

// main

let startButton: HTMLButtonElement = document.querySelector('#start__test')!

startButton.onclick = function () {
  let test = new Test()
  let questions = [
    new Question('how to get array element 1', ['array[i]', 'Array.get(i)'], 0),
    new Question('how to get array element 2', ['array[i]', 'Array.get(i)'], 0),
    new Question('how to get array element 3', ['array[i]', 'Array.get(i)'], 0),
    new Question('how to get array element 4', ['array[i]', 'Array.get(i)'], 0),
    new Question('how to get array element 5', ['array[i]', 'Array.get(i)'], 0),
    new Question('how to get array element 6', ['array[i]', 'Array.get(i)'], 0),
    new Question('how to get array element 7', ['array[i]', 'Array.get(i)'], 0),
    new Question('how to get array element 8', ['array[i]', 'Array.get(i)'], 0),
    new Question('how to get array element 9', ['array[i]', 'Array.get(i)'], 0),
    new Question(
      'how to get array element 10',
      ['array[i]', 'Array.get(i)'],
      0,
    ),
  ]

  questions.forEach(q => {
    test.addQuestion(q)
  })
  test.getRandomQuestions()
  test.start()
}

// main
