class Test {
  private questions: Question[] = []
  private questionsAmount: number = 0

  public addQuestion(question: Question) {
    this.questions.push(question)
  }
  private get75PercentOfQuestions() {
    let percentAmount = (this.questionsAmount / 75) * 100
    console.log(percentAmount)
    return percentAmount
  }

  private getRandomQuestions() {
    let p = this.get75PercentOfQuestions()

    let partialQuestions: Question[] = []

    for (let i = 0; i < p; i++) {
      var randomItem =
        this.questions[Math.floor(Math.random() * this.questions.length)]
      partialQuestions.push(randomItem)
    }
    console.log(partialQuestions)
  }

  public displayQuestions() {
    this.questions.forEach(q => {
      this.createQuestionForDisplay(q)
    })
  }

  private createQuestionForDisplay(question: Question) {
    let questionsWrapper: HTMLDivElement = document.querySelector(
      '.questions__wrapper',
    )!

    // quesion itself
    let l__question: HTMLDivElement = document.createElement('div')
    l__question.classList.add('question')
    // title
    let l__question__title: HTMLDivElement = document.createElement('div')
    l__question__title.classList.add('question__title')
    l__question__title.innerText = question.title
    l__question.appendChild(l__question__title)
    // answers
    for (let answer in question.answers) {
      let answerRadioButton = document.createElement('input')
      answerRadioButton.type = 'radio'
      answerRadioButton.innerText = answer
      l__question.appendChild(answerRadioButton)
    }

    questionsWrapper.appendChild(l__question)
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

let startButton: HTMLButtonElement = document.querySelector('#start__test')!

startButton.onclick = function () {
  let test = new Test()
  let question = new Question(
    'how to get array element',
    ['array[i]', 'Array.get(i)'],
    0,
  )

  test.addQuestion(question)

  test.displayQuestions()
}
