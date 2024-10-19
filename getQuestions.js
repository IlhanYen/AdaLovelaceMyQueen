const fs = require('fs');

function readDataFromJson(filePath) {
    try {
        // Read and parse the JSON file
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(jsonData);

        // Extract the required columns
        const result = data.map(item => ({
            Question: item.Question || "",  // String value
            Answer: item.Answer || "",      // String value
            Type: item.Type || "",          // String value
            "AnsweredFlag": item.hasOwnProperty("AnsweredFlag") ? item["AnsweredFlag"] : true,  // Boolean value
            "PossibleAnswers": item["PossibleAnswers"] || []  // List of strings
        }));

        return result;
    } catch (err) {
        console.error("Error reading or parsing the file:", err);
        return [];
    }
}

// Example usage:
const filePath = './data.json'; // Path to your JSON file
const extractedData = readDataFromJson(filePath);

// Call wheel