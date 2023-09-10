const questions = [
      {
            question: "Which operator returns true if the two compared values are not equal?",
            answers: [
                  {text: "<>", correct: false},
                  {text: "!==", correct: true},
                  {text: "==!", correct: false},
                  {text: "<=", correct: false},
            ]
      },
      {
            question: "Which property references the DOM object that dispatched an event?",
            answers: [
                  {text: "target", correct: true},
                  {text: "set", correct: false},
                  {text: "object", correct: false},
                  {text: "source", correct: false},
            ]
      },
      {
            question: "Which of the following is not a keyword in JavaScript?",
            answers: [
                  {text: "this", correct: false},
                  {text: "catch", correct: false},
                  {text: "function", correct: false},
                  {text: "array", correct: true},
            ]
      },
      {
            question: "Which choice is not a unary operator?",
            answers: [
                  {text: "typeof", correct: false},
                  {text: "delete", correct: false},
                  {text: "instanceof", correct: true},
                  {text: "void", correct: false},
            ]
      }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
      currentQuestionIndex = 0;
      score = 0;
      nextButton.innerHTML = "Next"
      showQuestion();
}

function showQuestion(){
      resetState();
      let currentQuestion = questions[currentQuestionIndex];
      let questionNo = currentQuestionIndex + 1;
      questionElement.innerHTML = questionNo + ". " + currentQuestion.
      question;

      currentQuestion.answers.forEach(answer => {
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct){
                  button.dataset.correct = answer.correct;
            }
            button.addEventListener("click", selectAnswer);
      });
}

function resetState(){
      nextButton.style.display = "none";
      while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
      }
}

function selectAnswer(e){
      const selectedBtn = e.target;
      const isCorrect = selectedBtn.dataset.correct === "true";
      if(isCorrect){
            selectedBtn.classList.add("correct");
            score++;
      }else{
            selectedBtn.classList.add("incorrect");
      }
      Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                  button.classList.add("correct");
            }
            button.disabled = true;
      });
      nextButton.style.display = "block";
}

function showScore(){
      resetState();
      questionElement.innerHTML = "You scored " + score + " out of " + questions.length + "!";
      nextButton.innerHTML = "Play Again";
      nextButton.style.display = "block";
}

function handleNextButton(){
      currentQuestionIndex++;
      if(currentQuestionIndex < questions.length){
            showQuestion();
      }else{
            showScore();
      }
}


nextButton.addEventListener("click", ()=>{
      if(currentQuestionIndex < questions.length){
            handleNextButton();
      }else{
            startQuiz();
      }
});


startQuiz();
