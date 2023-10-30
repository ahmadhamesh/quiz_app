const questions = [
	{
		question:"what is the largest animal in the world?",
		answers: [
				{text: "Shark", correct: false},
				{text: "Blue wale", correct: true},
				{text: "Elephant", correct: false},
				{text: "Girraffe", correct: false},

		]

	},
	{
		question:"what is the largest desert in the world?",
		answers: [
				{text: "Vatican city", correct: false},
				{text: "Bhutan", correct: false},
				{text: "Nepal", correct: false},
				{text: "Antarctica", correct: true},

		]

	},
	{
		question:"what is the smallest continent in the world?",
		answers: [
				{text: "Asia", correct: false},
				{text: "Austrlia", correct: true},
				{text: "Artic", correct: false},
				{text: "Africa", correct: false},

		]
	}

];

const questionElement = document.getElementById('questions');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
	resetState();

	//display question
	let currentQuestion = questions[currentQuestionIndex]; //questions is the obj and curuentQuestionIndex first question get in index 0 and 2nd question in index 1
	let questionNo = currentQuestionIndex + 1; // +1 is use to start from 1 there is index starts from 0  that will be question number
	questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 



	//display answer
	currentQuestion.answers.forEach(answer => {
		const button = document.createElement("button"); // create a button element
		button.innerHTML = answer.text; //in this button add a text from upper object
		button.classList.add("btn"); // this will create a button class name 'btn'
		answerButtons.appendChild(button); // answerButton is html div answer-button
		if (answer.correct) {
			button.dataset.correct = answer.correct
		}
		button.addEventListener("click", selectAnswer);
	});

}


function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild)
	}
	
}


function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct=== 'true';
	if(isCorrect){
		selectedBtn.classList.add('correct');
		score++;
	}
	else{
		selectedBtn.classList.add('incorrect');
	}
	Array.from(answerButtons.children).forEach(button => {
		if (button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}



function showScore(){
	resetState();
	questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
	nextButton.innerHTML = "Play Again";
	nextButton.style.display ="block";
}



function handleNexButton(){
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	}else {
		showScore();
	}
}




nextButton.addEventListener("click", ()=>{
	if (currentQuestionIndex < questions.length) {
		handleNexButton();
	}else{
		startQuiz();
	}
});
startQuiz();








