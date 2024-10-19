const { readUnanswered, resetUnansweredFlags,updateAnsweredFlag } = require('./updateQuestions');
const { addToStoreJSON, resetScore } = require("./updateScore")

const filePath = './data.json';

// Step 1: Reset score & flags
resetUnansweredFlags(filePath);
resetScore();    // TODO: sync / promise here

// Step 2.1: Load the unanswered
unansweredData = readUnanswered(filePath)

console.log(unansweredData.Question)
