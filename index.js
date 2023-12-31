import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.1/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.5.1/firebase-database.js';
import { getToken } from "../token.js";

// const fs = require('fs').promises; 
//
// async function readFile(filePath) { //2 
//     try { 
//     const data = await fs.readFile(filePath); 
//     console.log(data.toString()); 
//     } catch (error) { 
//     console.error(`Got an error trying to read the file: ${error.message}`);
//     } 
// } 

const appSettings = {
    databaseURL: "https://playground-c8346-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);

const database = getDatabase(app);

const groceriesInDb = ref(database, "shopping");

const userInput = document.getElementById("user-input");
const button = document.getElementById("add-button");


button.addEventListener("click", function() {
    
    // Get the input value
    var inputString = document.getElementById("user-input").value;    
/*    
    //Read OpenAi access token from config.js file      
    readFile('config.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading configuration file:', err);
          return;
        }
      
        try {
          // Parse the JSON data to an object
          const config = JSON.parse(data);
      
          // Access the token key
          const apiToken = config.apiToken;
      
          console.log('API Token:', apiToken);
        } catch (err) {
          console.error('Error parsing JSON:', err);
        }
    });
*/

    //Getting token from token.js file 
    // export function getToken() {
    //     return "Your_token";
    // }
    const apiToken = getToken();


    if (inputString) {
        var requestData = {
            prompt: inputString,
            max_token: 50,
            n: 3
        };

        axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", requestData, { 
            headers : {
                // "Authorization": 'Bearer '+ apiToken,
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            },
        }).then(function(response){
            var generatedStrings = response.data.choices.map(choice=>choice.text);

            var buttonContainer = document.getElementById("buttonContainer");

            buttonContainer.innerHTML = "";
            
            generatedStrings.array.forEach(function (generatedString, index) {
                var newButton = document.createElement("button");
                newButton.innerHTML = generatedString;

                newButton.addEventListener("click", function() {
                    alert("Button " + (index + 1) + " was clicked!");
                });

                buttonContainer.appendChild(newButton);                
            });
        })
        .catch(function(error){

            console.log(error);

        });

        //Add shoping list on page
        var shopingListContainer = document.getElementById("shopingListContainer");
        var shopingText = document.createTextNode("Hello World");
        shopingListContainer.innerHTML = "";
        shopingListContainer.appendChild(shopingText);

        
        

    }
    
    //Pushing input firld value to Firebase.
    push(groceriesInDb, userInput.value);

    //Get element from Friebase database
    ref.once('value')
        .then(snapshot => {
            snapshot.forEach(childSnapshot => {
                const item = childSnapshot.val();
                data.push(item);
            });
            // Now, the 'data' array contains the data from the database
            console.log(data);
        })
            .catch(error => {
            console.error('Error retrieving data:', error);
        });
       
});


// // const buttonContainer   = document.getElementById("buttonContainer");

// button.addEventListener("click", function(){
    
//     // Get the input value
//     var buttonName = document.getElementById("user-input").value;    

//     if (buttonName) {
//         // Create new buttons with similar names
//         for (var i = 1; i <= 3; i++) {
//             var newButton = document.createElement("button");
//             newButton.innerHTML = buttonName + " " + i;
//             document.getElementById("buttonContainer").appendChild(newButton);
//             buttonContainer.appendChild(newButton);
//         }
//     }
//     push(groceriesInDb, userInput.value);
// });