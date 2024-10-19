const fs = require('fs');

function readUnanswered(filePath) {
    try {
        // Read and parse the JSON file
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);

        // Extract the required columns and filter out items with AnsweredFlag set to true
        return data
            .filter(item => item.hasOwnProperty("AnsweredFlag") && !item.AnsweredFlag) // Filter for AnsweredFlag: false
            .map(item => ({
                Question: item.Question || "",  // String value
                Answer: item.Answer || "",      // String value
                Type: item.Type || "",          // String value
                "AnsweredFlag": item.AnsweredFlag || false, // Boolean value (default to false if not present)
                "PossibleAnswers": item["PossibleAnswers"] || []  // List of strings
            }));
    } catch (err) {
        console.error("Error reading or parsing the file:", err);
        return [];
    }
}

function resetUnansweredFlags(filepath) {
    // Read the JSON file
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        try {
            // Parse the JSON data
            const questions = JSON.parse(data);

            // Reset all AnsweredFlag values to false
            questions.forEach(question => {
                question.AnsweredFlag = false;
            });

            // Convert the updated object back to a JSON string
            const updatedData = JSON.stringify(questions, null, 2);

            // Write the updated data back to the JSON file
            fs.writeFile(filepath, updatedData, 'utf8', (err) => {
                if (err) {
                    console.error("Error writing the file:", err);
                } else {
                    console.log("AnsweredFlags have been reset to false.");
                }
            });
        } catch (parseError) {
            console.error("Error parsing JSON data:", parseError);
        }
    });
}


function updateAnsweredFlag(filePath, questionToUpdate) {
    // Read the JSON file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return;
        }

        try {
            // Parse the JSON data
            const jsonData = JSON.parse(data);

            // Find the object that matches the "Question" field
            const item = jsonData.find(item => item.Question === questionToUpdate);

            // If no matching question is found, return an error message
            if (!item) {
                console.error("Error: Question not found.");
                return;
            }

            // Update the "AnsweredFlag" to true for the found item
            item.AnsweredFlag = true;

            // Write the updated data back to the JSON file
            fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
                if (err) {
                    console.error("Error writing to the file:", err);
                    return;
                }
                console.log(`Successfully updated the AnsweredFlag for question: "${questionToUpdate}".`);
            });
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
        }
    });
}

// Example usage:
const filePath = './data.json';
unansweredQuestions = readUnanswered(filePath)

//wheel(unansweredQuestions)

// Wheel should call: updateAnsweredFlag(filePath, n), where n index of the question from 0,
// and Multiple Choice calls addToStoreJSON(p), where p is the number of points gained / lost

// Program start should call resetUnansweredFlags() and resetScore()

module.exports = { readUnanswered, resetUnansweredFlags,updateAnsweredFlag };
