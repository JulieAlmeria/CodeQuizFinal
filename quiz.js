// variables 
var start = document.getElementById("start");
var currentQuestionIndex = 0;
//allow ten seconds per question for a challenge!
var time = questions.length * 10;
var timer = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var choices = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initials = document.getElementById("initials");


//when user clicks the start button, begin the quiz
start.onclick = startQuiz;

  function startQuiz() {

    // start timer once quiz has begun
    timerId = setInterval(clockTick, 1000);

    //display the time left
    timer.textContent = time;

    // display questions once the start button is clicked
    questionsEl.removeAttribute("class");

    //hide welcome screen once the quiz has begun
    var welcomeScreen = document.getElementById("welcome-screen");
    welcomeScreen.setAttribute("class", "hide");
    getQuestion();
} 

//function to get question from the array
function getQuestion() {
  
  var currentQuestion = questions[currentQuestionIndex];
  
      // hide choices from previous question
      choices.innerHTML = "";
    
      //update to following question
      var title = document.getElementById("question-title");
      title.textContent = currentQuestion.title;

      //loop questions
      currentQuestion.choices.forEach(function(choice, i) {
      var choiceNode = document.createElement("button");
      choiceNode.setAttribute("class", "choice");
      choiceNode.setAttribute("value", choice);
      choiceNode.textContent = i + 1 + ". " + choice;
    
      //display the choices for that particular question
      choices.appendChild(choiceNode);
    
      // event listener for when user clicks on a selection
      choiceNode.onclick = choiceClick; 
  });
}

 //if the user's choice is not equal to the correct answer, deduct 20 seconds from timer
function choiceClick() {
   
    if (this.value !== questions[currentQuestionIndex].answer) {
    time -= 20; 
    }
    
    if (time < 0) {
    time = 0;
    }  

  // move to next question
  currentQuestionIndex++;

  //end quiz when all questions have been answered
  if (currentQuestionIndex === questions.length) {
    quizOver();
    } 
    else {
    getQuestion();
    } 
}

//or, end quiz when timer gets to 0
function clockTick() {
  time--;
  timer.textContent = time;
  if (time <= 0) {
    quizOver();
  }
}

function quizOver() {
  
 // hide questions section
 questionsEl.setAttribute("class", "hide");

 // show ending screen
  var endScreen = document.getElementById("quiz-end");
  endScreen.removeAttribute("class");

  // show final score
  var score = document.getElementById("score");
  score.textContent = time * 10 

  //timer stops
  clearInterval(timerId);

}







