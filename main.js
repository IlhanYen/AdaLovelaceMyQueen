const { readUnanswered, resetUnansweredFlags,updateAnsweredFlag } = require('./updateQuestions');
const { addToStoreJSON, resetScore, getScore } = require("./updateScore")

const filePath = './data.json';

// Step 1: Reset score & flags
resetUnansweredFlags(filePath); // TODO: sync / promise here
resetScore();   // TODO and here

// Step 2.1: Load the unanswered
let unansweredData = readUnanswered(filePath)
let questions = unansweredData.map(item => item.Question);
let score = getScore()


// Step 2.2: Repeat while questions size >= 1
while (questions.length >= 1) {
    // wheel and wait until wheel calls back

    unansweredData = readUnanswered(filePath)
    questions = unansweredData.map(item => item.Question);

    // Wheel(Questions, Answer, Wrong Answers)
}

console.log("Program finished executing; all the questions have been exhausted!")
