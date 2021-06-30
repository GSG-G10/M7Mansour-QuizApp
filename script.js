const questionBank = [{
    number: 1,
    question: "question1",
    answer1: "answer1.1",
    answer2: "answer1.2",
    answer3: "answer1.3",
    answer4: "answer1.4",
}, {
    number: 2,
    question: "question2",
    answer1: "answer2.1",
    answer2: "answer2.2",
    answer3: "answer2.3",
    answer4: "answer2.4",
}, {
    number: 3,
    question: "question3",
    answer1: "answer3.1",
    answer2: "answer3.2",
    answer3: "answer3.3",
    answer4: "answer3.4",
}, {
    number: 4,
    question: "question4",
    answer1: "answer4.1",
    answer2: "answer4.2",
    answer3: "answer4.3",
    answer4: "answer4.4",
}, {
    number: 5,
    question: "question1",
    answer1: "answer5.1",
    answer2: "answer5.2",
    answer3: "answer5.3",
    answer4: "answer5.4",
}, {
    number: 6,
    question: "question6",
    answer1: "answer6.1",
    answer2: "answer6.2",
    answer3: "answer6.3",
    answer4: "answer6.4",
}, {
    number: 7,
    question: "question7",
    answer1: "answer7.1",
    answer2: "answer7.2",
    answer3: "answer7.3",
    answer4: "answer7.4",
}, {
    number: 8,
    question: "question8",
    answer1: "answer8.1",
    answer2: "answer8.2",
    answer3: "answer8.3",
    answer4: "answer8.4",
}, {
    number: 9,
    question: "question9",
    answer1: "answer9.1",
    answer2: "answer9.2",
    answer3: "answer9.3",
    answer4: "answer9.4",
}, {
    number: 10,
    question: "question10",
    answer1: "answer10.1",
    answer2: "answer10.2",
    answer3: "answer10.3",
    answer4: "answer10.4",
}];

const board = document.body.querySelector("main");
let leaderBoardPlayers = [];
let currentName;
let currentQuestionNumber = 1;
const start_buttn = document.body.querySelector("#start");

start_buttn.setAttribute("onclick", "startQuiz()");

let leaderBoardShowPlayers = () => {
    let tableRows = document.body.querySelectorAll("table tr");
    for (let i = 0; i < leaderBoardPlayers.length; i++)
        tableRows[i + 1].innerHTML = `<td>${leaderBoardPlayers[i].name}</td>\n<td>${leaderBoardPlayers[i].score}</td>\n<td>${leaderBoardPlayers[i].attempts}</td>\n`;
};
leaderBoardShowPlayers();


let startQuiz = () => {
    currentName = document.body.querySelector("input").value;
    if (currentName == "")
        return alert("Please Enter your name to start the quiz");
    let quiz = document.body.querySelector("#question");
    quiz.style.display = "block";
    board.innerHTML = quiz.outerHTML;
    document.body.querySelector("#question").innerHTML = "";
    board.style.margin = "100px";
    loadQuestion();
}

let loadQuestion = () => {
    const question_text = document.body.querySelector("#question-text p");
    const options = document.body.querySelectorAll(".answer p");
    const qustion_number = document.body.querySelector("#question-num");
    question_text.innerHTML = questionBank[currentQuestionNumber - 1].question;
    qustion_number.innerHTML = questionBank[currentQuestionNumber - 1].number;
    for (let i = 0; i < options.length; i++) {
        options[i].innerHTML = questionBank[currentQuestionNumber - 1][`answer${i + 1}`];
        console.log("F");
    }

    console.log(questionBank[currentQuestionNumber - 1].number);
    currentQuestionNumber++;
}