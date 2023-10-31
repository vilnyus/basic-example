import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.1/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.5.1/firebase-database.js';

const appSettings = {
    databaseURL: "https://playground-c8346-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);

const database = getDatabase(app);

const groceriesInDb = ref(database, "shopping");

const userInput         = document.getElementById("user-input");
const button            = document.getElementById("add-button");


button.addEventListener("click", function() {
    
    // Get the input value
    var inputString = document.getElementById("user-input").value;    

    if (inputString) {
        var requestData = {
            prompt: inputString,
            max_token: 50,
            n: 3
        };

        axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", requestData, { 
            headers : {
                "Authorization": "Bearer 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",
                "Content-Type": "application/json"
            }
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
    }
    push(groceriesInDb, userInput.value);
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