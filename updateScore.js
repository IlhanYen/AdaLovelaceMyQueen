const fs = require('fs');
const path = require('path');

/**
 * Adds a given integer to the integer stored in the 'value' key of the JSON file named 'store.json'.
 * @param {number} numberToAdd - The integer to be added to the stored integer.
 */
function addToStoreJSON(numberToAdd) {
    const filePath = path.join(__dirname, 'score.json');

    // Read the current value from the file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // Parse the JSON data
        let jsonData;
        try {
            jsonData = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return;
        }

        // Get the stored number
        const storedNumber = jsonData.value;

        if (typeof storedNumber !== 'number') {
            console.error('The value in the JSON file is not a valid number.');
            return;
        }

        // Calculate the new total
        const newTotal = storedNumber + numberToAdd;

        // Write the new total back to the JSON file
        const updatedData = { value: newTotal };
        fs.writeFile(filePath, JSON.stringify(updatedData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return;
            }
            console.log(`Added ${numberToAdd} to ${storedNumber}. New total is ${newTotal}.`);
        });
    });
}

function resetScore() {
    const filePath = path.join(__dirname, 'score.json');

    // Create the new data object
    const resetData = { value: 0 };

    // Write the new data back to the score.json file
    fs.writeFile(filePath, JSON.stringify(resetData, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return;
        }
        console.log('Score has been reset to 0.');
    });
}
