import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.1/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/10.5.1/firebase-database.js';

const appSettings = {
    databaseURL: "https://playground-c8346-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);

const database = getDatabase(app);
const groceriesInDb = ref(database, "shopping");

const userInput = document.getElementById("user-input");
const button = document.getElementById("add-button");
const buttonContainer = document.getElementById("buttonContainer");

button.addEventListener("click", function(){
    
    // Get the input value
    var buttonName = document.getElementById("user-input").value;    

    if (buttonName) {
        // Create new buttons with similar names
        for (var i = 1; i <= 3; i++) {
            var newButton = document.createElement("button");
            newButton.innerHTML = buttonName + " " + i;
            document.getElementById("buttonContainer").appendChild(newButton);
            buttonContainer.appendChild(newButton);
        }
    }
    push(groceriesInDb, userInput.value);
});

