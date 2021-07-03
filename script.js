// question bank for the quiz
const questionBank = [{
    number: 1,
    question: "question1",
    answer1: "answer1.1",
    answer2: "answer1.2",
    answer3: "answer1.3",
    answer4: "answer1.4",
    correct: 3
}, {
    number: 2,
    question: "question2",
    answer1: "answer2.1",
    answer2: "answer2.2",
    answer3: "answer2.3",
    answer4: "answer2.4",
    correct: 4
}, {
    number: 3,
    question: "question3",
    answer1: "answer3.1",
    answer2: "answer3.2",
    answer3: "answer3.3",
    answer4: "answer3.4",
    correct: 2
}, {
    number: 4,
    question: "question4",
    answer1: "answer4.1",
    answer2: "answer4.2",
    answer3: "answer4.3",
    answer4: "answer4.4",
    correct: 1
}, {
    number: 5,
    question: "question5",
    answer1: "answer5.1",
    answer2: "answer5.2",
    answer3: "answer5.3",
    answer4: "answer5.4",
    correct: 2
}, {
    number: 6,
    question: "question6",
    answer1: "answer6.1",
    answer2: "answer6.2",
    answer3: "answer6.3",
    answer4: "answer6.4",
    correct: 3
}, {
    number: 7,
    question: "question7",
    answer1: "answer7.1",
    answer2: "answer7.2",
    answer3: "answer7.3",
    answer4: "answer7.4",
    correct: 4
}, {
    number: 8,
    question: "question8",
    answer1: "answer8.1",
    answer2: "answer8.2",
    answer3: "answer8.3",
    answer4: "answer8.4",
    correct: 1
}, {
    number: 9,
    question: "question9",
    answer1: "answer9.1",
    answer2: "answer9.2",
    answer3: "answer9.3",
    answer4: "answer9.4",
    correct: 2
}, {
    number: 10,
    question: "question10",
    answer1: "answer10.1",
    answer2: "answer10.2",
    answer3: "answer10.3",
    answer4: "answer10.4",
    correct: 3
}];

// dob elements
const board = document.body.querySelector("main");
const start_buttn = document.body.querySelector("#start");
// global variables
let leaderBoardPlayers = [];
let currentName;
let currentQuestionNumber = 1;
const answers = [];
let quiz;

// add event listener to start button
start_buttn.setAttribute("onclick", "startQuiz()");

// show top players on leader board 
// couldn't complete it because the time is up and a don't have enough experience with local storage
let leaderBoardShowPlayers = () => {
    leaderBoardPlayers = localStorage.getItem("players").split(",");
    if (!leaderBoardPlayers)
        return;
    let tableRows = document.body.querySelectorAll("table tr");
    for (let i = 0; i < leaderBoardPlayers.length; i++) {
        let temp = leaderBoardPlayers[i].split("-");
        tableRows[i + 1].innerHTML = `<td>${temp[0]}</td>\n<td>${temp[1]}</td>\n<td>${temp[2]}</td>\n`;
    }
};
leaderBoardShowPlayers();

// function for starting the quiz
let startQuiz = () => {
    currentName = document.body.querySelector("input").value;
    // if the user didn't enter his/her name the quiz will not begin and the app will alert the user to enter the name
    if (currentName == "")
        return alert("Please Enter your name to start the quiz");
    quiz = document.body.querySelector("#question");
    quiz.style.display = "block";
    board.innerHTML = quiz.outerHTML;
    document.body.querySelector("#question").innerHTML = "";
    board.style.margin = "100px";
    document.body.querySelector("#next").setAttribute("onclick", "loadQuestion(this.id)");
    loadQuestion("start");
};

// function for loadin the next question after finishing the current one
let loadQuestion = (answer) => {
        if (currentQuestionNumber > 11)
            return finalScoreDisplay();
        collectScores(answer);
        if (currentQuestionNumber == 11)
            return finalScoreDisplay();
        const question_text = document.body.querySelector("#question-text p");
        const options = document.body.querySelectorAll(".answer");
        const qustion_number = document.body.querySelector("#question-num");
        question_text.innerHTML = questionBank[currentQuestionNumber - 1].question;
        qustion_number.innerHTML = questionBank[currentQuestionNumber - 1].number;
        for (let i = 0; i < options.length; i++) {
            options[i].setAttribute("onclick", "loadQuestion(this.id)");
            options[i].innerHTML = `<p>${questionBank[currentQuestionNumber - 1][`answer${i + 1}`]}</p>`;
    }
    currentQuestionNumber++;
};

// display the calculated score after finshing the quiz
let finalScoreDisplay = () => {
    quiz.innerHTML = `<div id="empty"></div>
    <div id="final-score">
        <p>Your Score is : </p>
    </div>
    <div id="score-value">
        <p>${calculateScore()} / 10</p>
    </div>
    <div id="empty"></div>
    <div id="empty"></div>`;
};

// handling the score of each question when the user answer it
let collectScores = (answer) => {
    if (answer == "start")
        return;
    if (answer == "next")
        return answers.push(0);
    answer = answer.substr(answer.length - 1);
    if (answer == questionBank[currentQuestionNumber - 2].correct)
        answers.push(1);
    else answers.push(0);
};

// calculate the final score after finshing the quiz
let calculateScore = () => {
    let sum = 0;
    for (let i = 0; i < answers.length; i++)
        sum += answers[i];
    storeScores(sum);
    return sum;
};

// store users scores and attempts
let storeScores = (score) => {
    let tempPlayers = localStorage.getItem("players");
    if(!tempPlayers){
        return emptyHandle(score);
    }

    tempPlayers = tempPlayers.split(",");
    let i;
    let higher = -1;
    for(i = 0 ; i < tempPlayers.length ; i++){
        let temp = tempPlayers[i].split("-");
        if(temp[0] == currentName)
            break;
        if(score >= temp[1] && higher == -1)
            higher = i;
    }

    if(i < tempPlayers.length)
        playerExists(tempPlayers , score , i);
    else if(higher != -1 || tempPlayers.length < 5)
        PlayerNotExists(tempPlayers , score , higher);
};

// handle the case when the players doesn't exist in leaderboard
let PlayerNotExists = (tempPlayers , score , index) => {
    if(tempPlayers.length >= 5)
        tempPlayers.pop();
    let tempStr = "";

    for(let i = 0 ; i < tempPlayers.length ; i++){
        if(index == i)
            tempStr += `${currentName}-${score}-1,`;
        tempStr += tempPlayers[i] + (i == tempPlayers.length - 1 && index != tempPlayers.length && index != -1 ?"" :",");
    }
    if(index == tempPlayers.length || index == -1)
        tempStr += `${currentName}-${score}-1`;
    localStorage.setItem("players" , tempStr);
};

// handle the case when the players exists in leaderboard
let playerExists = (tempPlayers , score , index) => {
    let temp = tempPlayers[index].split("-");
    tempPlayers[index] = `${temp[0]}-${temp[1] > score ?temp[1] :score}-${temp[2] - 0 + 1}`;
    let tempStr = "";
    // sort the leaderboard when existing players is modified
    if(temp[1] < score)
        for(let i = index ; i > 0 ; i--){
            if(score >= tempPlayers[i - 1].split("-")[1]){
                let tempItem = tempPlayers[i - 1];
                tempPlayers[i - 1] = tempPlayers[i];
                tempPlayers[i] = tempItem;
            }
            else break;
        }
    for(let i = 0 ; i < tempPlayers.length ; i++){
        tempStr += tempPlayers[i] + (i == tempPlayers.length - 1 ?"" :",");
    }
    localStorage.setItem("players" , tempStr);
};

// handle the case when the leaderboard is empty
let emptyHandle = (score) => {
    localStorage.setItem("players" , `${currentName}-${score}-1`);
};