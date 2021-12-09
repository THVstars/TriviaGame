let url = "https://api.trivia.willfry.co.uk/questions?categories=" // URL with the object full of questions and answers.

let litTrivia = [] // HAD to declare litTrivia here as a global variable for the response function to have access to it. The .open and .onload would not work if I made it an empty string, so I tried making it an array and... that worked for some reason.

function rise() {
    if (document.getElementById("chosen").value == 1) {
        url += "literature&limit=5"
    } else if (document.getElementById("chosen").value == 2) {
        url += "music&limit=5"
    } else if (document.getElementById("chosen").value == 3) {
        url += "science&limit=5"
    } // Replaces the correct URL. Needs to be within a function. This function is called when the user clicks the first submit button after choosing a trivia category. onload can only access the new URL if it's ALSO WITHIN THE SAME FUNCTION!!!

    litTrivia = new XMLHttpRequest()
    console.log(litTrivia) // new MUST be used to call XMLHttpRequest()

    litTrivia.open('GET', url)

    litTrivia.onload = function() {
 
        let answers = [] // For push to work these need to be arrays.
        let answers2 = []
        let answers3 = []
        let answers4 = []
        let answers5 = []

        let defaultValue = "" // The default value for the select menus.

        document.getElementById("question").innerText = `1. ${JSON.parse(litTrivia.responseText)[0].question}` // Assigns a question to the innerText of the element with the id "question"
        document.getElementById("question2").innerText = `2. ${JSON.parse(litTrivia.responseText)[1].question}`
        document.getElementById("question3").innerText = `3. ${JSON.parse(litTrivia.responseText)[2].question}`
        document.getElementById("question4").innerText = `4. ${JSON.parse(litTrivia.responseText)[3].question}`
        document.getElementById("question5").innerText = `5. ${JSON.parse(litTrivia.responseText)[4].question}`

        defaultValue = "<option style= 'text-align: center;' disabled selected value>"+ "-- select an option --" +"</option>" // Assigns this as the value of the variable "defaultValue". The text is centered based on the width of the longest option to each question! You MUST use '' inside the "" for the option tag for this to work properly!

        answers.push("<option>"+ JSON.parse(litTrivia.responseText)[0].correctAnswer +"</option>") // Assigns the correct answer for question one to the array "answers". Option tags and plus signs will later allow me to add this as an option to the dropdown menu.
        answers2.push("<option>"+ JSON.parse(litTrivia.responseText)[1].correctAnswer +"</option>")
        answers3.push("<option>"+ JSON.parse(litTrivia.responseText)[2].correctAnswer +"</option>")
        answers4.push("<option>"+ JSON.parse(litTrivia.responseText)[3].correctAnswer +"</option>")
        answers5.push("<option>"+ JSON.parse(litTrivia.responseText)[4].correctAnswer +"</option>")

        for (let i = 0; i < JSON.parse(litTrivia.responseText)[0].incorrectAnswers.length; i++) {
            answers.push("<option>"+ JSON.parse(litTrivia.responseText)[0].incorrectAnswers[i] +"</option>")
        } // for loop that iterates through the incorrect answers and assigns them all to the array "answers", along with the <options> tags necessary to make them options in the dropdown menu later on.
        for (let i = 0; i < JSON.parse(litTrivia.responseText)[1].incorrectAnswers.length; i++) {
            answers2.push("<option>"+ JSON.parse(litTrivia.responseText)[1].incorrectAnswers[i] +"</option>")
        }
        for (let i = 0; i < JSON.parse(litTrivia.responseText)[2].incorrectAnswers.length; i++) {
            answers3.push("<option>"+ JSON.parse(litTrivia.responseText)[2].incorrectAnswers[i] +"</option>")
        }
        for (let i = 0; i < JSON.parse(litTrivia.responseText)[3].incorrectAnswers.length; i++) {
            answers4.push("<option>"+ JSON.parse(litTrivia.responseText)[3].incorrectAnswers[i] +"</option>")
        }
        for (let i = 0; i < JSON.parse(litTrivia.responseText)[4].incorrectAnswers.length; i++) {
            answers5.push("<option>"+ JSON.parse(litTrivia.responseText)[4].incorrectAnswers[i] +"</option>")
        }

    // console.log(answers) // TEST. By this point all of the possible responses for question one are in the answers array.

        let randomSelection = ""
        let randomSelection2 = ""
        let randomSelection3 = ""
        let randomSelection4 = ""
        let randomSelection5 = ""

        /* for (let i = 0; i < answers.length; i++) {
            randomSelection += answers[Math.floor(Math.random() * answers.length)]
        } // TEST. The index of answers that gets used is randomly selected by [Math.floor(Math.random() * answers.length)] However, this only chooses ONE answer to display, so I had to do the below instead. */

        while (answers.length > 0) {
            let i = Math.floor(Math.random() * answers.length)
            randomSelection += answers.splice(i, 1)
        } // As long as the length of answers is greater than 0, this while loop will randomly select an answer over and over again. += is REQUIRED for it to select more than once. To prevent repetition of the answers, splice is used to delete the index that was randomly selected from the answers array. splice begins at i and ends at i since I chose 1 as the delete count. In other words, splice only deletes 1 entry at a time. By the end, all answers are stored in randomSelection in a completely random order and the answers array is empty. Did not need [0] at the end (i.e. answers.splice(i, 1)[0]) because there are no sub-arrays.
        while (answers2.length > 0) {
            let i = Math.floor(Math.random() * answers2.length)
            randomSelection2 += answers2.splice(i, 1)
        }
        while (answers3.length > 0) {
            let i = Math.floor(Math.random() * answers3.length)
            randomSelection3 += answers3.splice(i, 1)
        }
        while (answers4.length > 0) {
            let i = Math.floor(Math.random() * answers4.length)
            randomSelection4 += answers4.splice(i, 1)
        }
        while (answers5.length > 0) {
            let i = Math.floor(Math.random() * answers5.length)
            randomSelection5 += answers5.splice(i, 1)
        }

        document.getElementById("responses").innerHTML = defaultValue + randomSelection // Assigns all of the select options for question one to the select tag with the id "responses". innerHTML MUST be used here.
        document.getElementById("responses2").innerHTML = defaultValue + randomSelection2
        document.getElementById("responses3").innerHTML = defaultValue + randomSelection3
        document.getElementById("responses4").innerHTML = defaultValue + randomSelection4
        document.getElementById("responses5").innerHTML = defaultValue + randomSelection5

        // console.log(JSON.parse(litTrivia.responseText)[0].correctAnswer) // TEST
        // console.log(randomSelection) // TEST
        // console.log(answers) // TEST. By this point all of the possible responses for question one have been stored in randomSelection and spliced off of the answers array.
    }

    litTrivia.send()
}

let seeQuestions = function() {

    if (document.getElementById("chosen").value == 0) {
        let showAsk = document.getElementById("ask")
        showAsk.style.display = "block" // This makes the paragraph with the id "ask" appear if the first button is clicked without making a selection.
        document.getElementById("ask").innerHTML = `<strong> Please make a selection. </strong>`
    } else if (document.getElementById("chosen").value == 1) { // The value you input here must equal the value you assigned to the option you want to check against, which appears next to each option next to the word value. So here you MUST input the number 1 instead of "Arts & Literature".
        document.getElementById("title").innerText = "Arts & Literature Trivia!"
    } else if (document.getElementById("chosen").value == 2) {
        document.getElementById("title").innerText = "Music Trivia!"
    } else if (document.getElementById("chosen").value == 3) {
        document.getElementById("title").innerText = "Science Trivia!"
    }

    let surpriseTitle = document.getElementById("title")
    if (document.getElementById("chosen").value > 0) {
        surpriseTitle.style.display = "block" // This makes the Trivia Title in the HTML file that's based on the category chosen by the user show up when the first button is clicked!
    }

    let surpriseTrivia = document.getElementById("trivia")
    if (document.getElementById("chosen").value > 0) {
        surpriseTrivia.style.display = "block" // This makes the Questions in the HTML file that're based on the category chosen by the user show up when the first button is clicked!
    }

    let hideOriginal = document.getElementById("original")
    if (document.getElementById("chosen").value > 0) { 
        hideOriginal.style.display = "none" // This makes the original, overarching title of the trivia application disappear / invisible once the first button is clicked!
    }

    let hideFirst = document.getElementById("first")
    if (document.getElementById("chosen").value > 0) {
        hideFirst.style.display = "none" // This makes the category selection area disappear / invisible once the first button is clicked.
    }
}

let response = function() {

    let points = 0 // points has to be here for this function to be able to access it. Its initial value HAS to be 0, a number and NOT a string, for the additions to work properly.

    let surpriseResults = document.getElementById("surprise")
    surpriseResults.style.display = "block" // This makes the Results in the HTML file show up when the button is clicked!

    if (document.getElementById("responses").value == JSON.parse(litTrivia.responseText)[0].correctAnswer) {
        points = points + 1
        document.getElementById("result").innerText = `1. Correct!` // if the value of the element with the id "responses" is equal to the value of the correct answer for question one, then a point is added to the variable "points" and the element with the id "result" is assigned the value of "Correct!", OTHERWISE, no point is added and the string in the else statement is assigned to "result".
    } else {
        document.getElementById("result").innerText = `1. Incorrect! The answer to question one is ${JSON.parse(litTrivia.responseText)[0].correctAnswer}!` // NOTE: if the first if statement is correct, it won't execute the following one unless each { from the if/else statement before is closed with a }.
    }
    if (document.getElementById("responses2").value == JSON.parse(litTrivia.responseText)[1].correctAnswer) {
        points = points + 1
        document.getElementById("result2").innerText = `2. Correct!`
    } else {
        document.getElementById("result2").innerText = `2. Incorrect! The answer to question two is ${JSON.parse(litTrivia.responseText)[1].correctAnswer}!`
    }
    if (document.getElementById("responses3").value == JSON.parse(litTrivia.responseText)[2].correctAnswer) {
        points = points + 1
        document.getElementById("result3").innerText = `3. Correct!`
    } else {
        document.getElementById("result3").innerText = `3. Incorrect! The answer to question three is ${JSON.parse(litTrivia.responseText)[2].correctAnswer}!`
    }
    if (document.getElementById("responses4").value == JSON.parse(litTrivia.responseText)[3].correctAnswer) {
        points = points + 1
        document.getElementById("result4").innerText = `4. Correct!`
    } else {
        document.getElementById("result4").innerText = `4. Incorrect! The answer to question four is ${JSON.parse(litTrivia.responseText)[3].correctAnswer}!`
    }
    if (document.getElementById("responses5").value == JSON.parse(litTrivia.responseText)[4].correctAnswer) {
        points = points + 1
        document.getElementById("result5").innerText = `5. Correct!`
    } else {
        document.getElementById("result5").innerText = `5. Incorrect! The answer to question five is ${JSON.parse(litTrivia.responseText)[4].correctAnswer}!`
    }

    if (points == 0) {
        document.getElementById("totalPoints").innerHTML = `Bummer! You scored a total of ${points} points. <br><br><button onClick="window.location.reload();">Play Again?</button>` // if statement that assigns a value to the element with the id "totalPoints" depending on how many points were scored by getting the answers to questions correct. The "Play Again?" button refreshes the page and takes you back to the very beginning, where you can choose a trivia category again.
    } else if (points == 1) {
        document.getElementById("totalPoints").innerHTML = `Congratulations! You scored a total of ${points} point!<br><img id="img" style="margin: auto; height: 100px; width: 100px;" src="https://f.hubspotusercontent10.net/hub/2152860/hubfs/animat-star.gif?width=174&name=animat-star.gif"><br><button onClick="window.location.reload();">Play Again?</button>`
    } else if (points > 1 && points < 5) {
        document.getElementById("totalPoints").innerHTML = `Congratulations! You scored a total of ${points} points!<br><img id="img" style="margin: auto; height: 200px; width: 200px;" src="https://64.media.tumblr.com/74ff2f212d141d18bcf3b50eae4c4e73/tumblr_p49l97WcQG1qzm8dwo1_400.gifv"><br><br><button onClick="window.location.reload();">Play Again?</button>`
    } else if (points == 5) {
        document.getElementById("totalPoints").innerHTML = `CONGRATULATIONS! You scored a PERFECT total of ${points} points!<br><img id="img" style="margin: auto; height: 300px; width: 300px;" src="https://64.media.tumblr.com/7204639a1101e07c4c7e44bf0a7e92c4/tumblr_mpfa8r3tzF1s5jjtzo1_500.gifv"><br><br><button onClick="window.location.reload();">Play Again?</button>`
    } // You HAVE to change the innerHTML, NOT innerText, with a string literal in order to be able to 1. Include the image in a specific if statement only and 2. Be able to access the variable "points". The <br> are breaks between the images and text.

} // This HAS to be a separate function, because the other function is onclick and will always process the same answer: the one that was there when the page first loaded (AKA the default answer). Plus, it's nice to just be able to call the if statements, results and points with a button click.