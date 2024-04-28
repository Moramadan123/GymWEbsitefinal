//The scroller
let el = document.querySelector(".scroller");
let height =
  document.documentElement.scrollHeight - document.documentElement.clientHeight;
window.addEventListener("scroll", () => {
  let scrollTop = document.documentElement.scrollTop;
  el.style.width = `${(scrollTop / height) * 100}%`;
});

//Get Items
var slideImages = Array.from(
  document.querySelectorAll(".slider-container img")
);
//Get Number of Sliders
var SlidesCount = slideImages.length;
//Get First Paper or img
var curentSlider = 1;
//Get Slider His Number
var slideNumberElemnt = document.getElementById("slide-number");

//next and prev Button
var nextBtn = document.getElementById("next");
var prevBtn = document.getElementById("prev");

//Handle click on previous and next buttons
nextBtn.onclick = nextSlide;
prevBtn.onclick = prevSlide;

//Create the Main UL Element
var paginationElement = document.createElement("ul");

//Set ID On Created UI Element
paginationElement.setAttribute("id", "pagination-ul");

// create ListItem Based on Slides Count

for (var i = 1; i <= SlidesCount; i++) {
  //Create Li Element
  var PaginationItem = document.createElement("li");

  //Set Custem Attribute
  PaginationItem.setAttribute("data-index", i);

  //Set Item Content
  PaginationItem.appendChild(document.createTextNode(i));

  //Append Items To The Main UI List
  paginationElement.appendChild(PaginationItem);
}

//Inser Ul In Page
document.getElementById("indictors").appendChild(paginationElement);

//Get The New Created UI
var paginationCreatedUl = document.getElementById("pagination-ul");

//Get Pagination Items
var paginationsBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);

//Loop Through  All Bullets Items
for (var i = 0; i < paginationsBullets.length; i++) {
  paginationsBullets[i].onclick = function () {
    curentSlider = parseInt(this.getAttribute("data-index"));
    theChecker();
  };
}

//Trigger the checker function
theChecker();

//next Slide function
function nextSlide() {
  if (!nextBtn.classList.contains("disabled")) {
    curentSlider++;
    theChecker();
  }
}

//Prev Slide function
function prevSlide() {
  if (!prevBtn.classList.contains("disabled")) {
    curentSlider--;
    theChecker();
  }
}

//craete the checker function

function theChecker() {
  //set the slide number
  slideNumberElemnt.textContent =
    "Slide #" + curentSlider + " of " + SlidesCount;

  //remove All Active Classes
  removeAllActive();

  //set active of class on current slide
  slideImages[curentSlider - 1].classList.add("active");

  //Set Active Class on current pagination
  paginationCreatedUl.children[curentSlider - 1].classList.add("active");

  //check if current slide is the first
  if (curentSlider == 1) {
    //add disabled class on previous button
    prevBtn.classList.add("disabled");
  } else {
    //Remove disabled class From previous button
    prevBtn.classList.remove("disabled");
  }

  //check if current slide is the Last
  if (curentSlider == SlidesCount) {
    //add disabled class on nextBtn button
    nextBtn.classList.add("disabled");
  } else {
    //Remove disabled class From nextBtn button
    nextBtn.classList.remove("disabled");
  }
}

//Remove All Active Classes  From Images And Pagination Buttons

function removeAllActive() {
  //Loop Through Images
  slideImages.forEach(function (img) {
    img.classList.remove("active");
  });

  //Loop through pagination bullets
  paginationsBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}

// start quiz page // /// //////////////////////////////////////////////////////////////////////////////////
// Select Elements
let countSpan = document.querySelector(".count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      // Create Bullets + Set Questions Count
      createBullets(qCount);

      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      // Start CountDown

      // Click On Submit
      submitButton.onclick = () => {
        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);

        // Remove Previous Question
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        // Add Question Data
        addQuestionData(questionsObject[currentIndex], qCount);

        // Handle Bullets Class
        handleBullets();

        // Start CountDown
        clearInterval(countdownInterval);

        // Show Results
        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}

getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;

  // Create Spans
  for (let i = 0; i < num; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");

    // Check If Its First Span
    if (i === 0) {
      theBullet.className = "on";
    }

    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChoosenAnswer = answers[i].dataset.answer;
    }
  }

  if (rAnswer === theChoosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}

function sayHello() {
  console.log("hello");
}

sayHello();
