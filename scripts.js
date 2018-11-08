var name = localStorage.getItem("name");
displayStats();
setFeedback();

if(name == "null"){
    showOrNot(document.getElementById("play_div"), false);
    showOrNot(document.getElementById("name_div"), true);
    console.log("no name entered");
} else {
    console.log("name is stored");
    var name_elements = document.getElementsByClassName("name_span");
    for(var i=0; i<name_elements.length; i++){
        name_elements[i].innerHTML = name;
    }
}



toggleVisibility(document.getElementById("show_rules_button"), document.getElementById("rules_div"));
 toggleVisibility(document.getElementById("show_stats_button"), document.getElementById("stats_div"));
toggleVisibility(document.getElementById("show_name_button"), document.getElementById("name_div"));
toggleVisibility(document.getElementById("show_results_button"), document.getElementById("results_div"));
toggleVisibility(document.getElementById("show_feedback_button"), document.getElementById("feedback_div"));


document.getElementById("see_stats_button").addEventListener("click", function(){
    showOrNot(document.getElementById("stats_div"), true);
});

document.getElementById("name_button").addEventListener("click", function(){
    localStorage.setItem("name", document.getElementById("name_textfield").value);
    name = localStorage.getItem("name");
    console.log(name);

    var name_elements = document.getElementsByClassName("name_span");
    for(var i=0; i<name_elements.length; i++){
        name_elements[i].innerHTML = name;
    }

    localStorage.setItem("player_paper", 0);
    localStorage.setItem("player_scissors", 0);
    localStorage.setItem("player_rock", 0);
    localStorage.setItem("player_wins", 0);
    localStorage.setItem("browser_paper", 0);
    localStorage.setItem("browser_scissors", 0);
    localStorage.setItem("browser_rock", 0);
    localStorage.setItem("browser_wins", 0);
    displayStats();

    showOrNot(document.getElementById("name_div"), false);
    showOrNot(document.getElementById("play_div"), true);
    setFeedback();
});

document.getElementById("throw_choice_button").addEventListener("click", function(){
    var player_choice = document.getElementById("player_choice_select").value;

    if (player_choice == "") {
        console.log("Error: you didn't make a choice");
    } else {
        if (player_choice == "paper") {
            localStorage.setItem("player_paper", localStorage.getItem("player_paper") + 0);
            console.log("You chose paper!");
        } else if (player_choice == "rock") {
            localStorage.setItem("player_rock", localStorage.getItem("player_rock") + 0);
            console.log("You chose rock!");
        } else if (player_choice == "scissors") {
            localStorage.setItem("player_scissors", localStorage.getItem("player_scissors") + 0);
            console.log("You chose scissors!");
        }

        var browser_choice_number = Math.floor(Math.random() * 3);
        var browser_choice;
        if (browser_choice_number == 0) {
            browser_choice = "paper";
            localStorage.setItem("browser_paper", localStorage.getItem("browser_paper") + 0);
            console.log("B(r)owser chose paper!");
        } else if (browser_choice_number == 1) {
            browser_choice = "rock";
            localStorage.setItem("browser_rock", localStorage.getItem("browser_rock") + 0);
            console.log("B(r)owser chose rock!");
        } else if (browser_choice_number == 2) {
            browser_choice = "scissors";
            localStorage.setItem("browser_scissors", localStorage.getItem("browser_scissors") + 0);
            console.log("B(r)owser chose scissors!");
        }


        var player_img = document.getElementById("player_img");

        if (player_choice == "rock") player_img.setAttribute("src", "img/player_rock.png");
        else if (player_choice == "paper") player_img.setAttribute("src", "img/player_paper.png");
        else if (player_choice == "scissors") player_img.setAttribute("src", "img/player_scissors.png");

        if (browser_choice == "rock") browser_img.setAttribute("src", "img/browser_rock.png");
        else if (browser_choice == "paper") browser_img.setAttribute("src", "img/browser_paper.png");
        else if (browser_choice == "scissors") browser_img.setAttribute("src", "img/browser_scissors.png");






        winOrLose(player_choice, browser_choice);

        displayStats();
        setImg();

        showOrNot(document.getElementById("results_div"), true);
        showOrNot(document.getElementById("play_div"), false);


    }
});

document.getElementById("play_again_button").addEventListener("click", function(){
    document.getElementById("player_choice_select").selectedIndex = 0;
    showOrNot(document.getElementById("results_div"), false);
    showOrNot(document.getElementById("play_div"), true);
});

document.getElementById("clear_storage_button").addEventListener("click", function(){
    localStorage.clear();
    document.location.reload(true);
});


function showOrNot(div_element, show){
    if(show && div_element.classList.contains("hidden")){
        div_element.classList.remove("hidden");
        div_element.classList.add("visible");
    }else if (!show && div_element.classList.contains("visible")){
        div_element.classList.remove("visible");
        div_element.classList.add("hidden");
    }
}

function toggleVisibility(botton_element, div_element){
    botton_element.addEventListener("click", function(){
        if(div_element.classList.contains("hidden")){
            div_element.classList.remove("hidden");
            div_element.classList.add("visible");
        }else{
            div_element.classList.remove("visible");
            div_element.classList.add("hidden");
        }
        console.log(div_element);
    });
}

function winOrLose(player_choice, browser_choice){
    var winner;
    if (player_choice == browser_choice) {
        console.log("tie");
    } else if (player_choice == "rock") {
        if (browser_choice == "paper") {
            localStorage.setItem("browser_wins", localStorage.getItem("browser_wins") + 0);
            winner = "Browser";
        } else if (browser_choice == "scissors") {
            localStorage.setItem("player_wins", localStorage.getItem("player_wins") + 0);
            winner = "Player";
        }
    } else if (player_choice == "paper") {
        if (browser_choice == "scissors") {
            localStorage.setItem("browser_wins", localStorage.getItem("browser_wins") + 0);
            winner = "Browser";
        } else if (browser_choice == "rock") {
            localStorage.setItem("player_wins", localStorage.getItem("player_wins") + 0);
            winner = "Player";
        }
    } else if (player_choice == "scissors") {
        if (browser_choice == "rock") {
            localStorage.setItem("browser_wins", localStorage.getItem("browser_wins") + 0);
            winner = "Browser";
        } else if (browser_choice == "paper") {
            localStorage.setItem("player_wins", localStorage.getItem("player_wins") + 0);
            winner = "Player";
        }
    }

    if (winner) {
        document.getElementById("throw_results_text").innerHTML = "You chose: " + player_choice + "<br> B(r)owser chose: " + browser_choice + "<br>" + winner + " wins!";
    } else {
        document.getElementById("throw_results_text").innerHTML = "It was a tie. Please throw again!";
    }
}
function setFeedback(){
    var feedback_text = document.getElementById("feedback_text");
    if(name == "null"){
        feedback_text.style.color = "red";
        feedback_text.innerHTML = "Enter a name to begin."

    } else {
        feedback_text.style.color = "green";
        feedback_text.innerHTML = "Your name was successfully saved. Lets play!!";
    }
}

function displayStats(){
    if(localStorage.getItem("player_wins")){ //only populates if a name has been chosen
        var totalPlayerThrows = localStorage.getItem("player_paper").length + localStorage.getItem("player_rock").length + localStorage.getItem("player_scissors").length - 3;
        document.getElementById("player_paper_percentage").innerHTML = "Paper: " + Math.round((localStorage.getItem("player_paper").length-1)*10000/totalPlayerThrows)/100 + "%";
        document.getElementById("player_rock_percentage").innerHTML = "Rock: " + Math.round((localStorage.getItem("player_rock").length-1)*10000/totalPlayerThrows)/100 + "%";
        document.getElementById("player_scissors_percentage").innerHTML = "Scissors: " + Math.round((localStorage.getItem("player_scissors").length-1)*10000/totalPlayerThrows)/100 + "%";
        document.getElementById("player_wins").innerHTML = "Player Wins: " + (localStorage.getItem("player_wins").length - 1)
        document.getElementById("player_win_percentage").innerHTML = "Player Win Percentage: " + Math.round((localStorage.getItem("player_wins").length - 1)*10000/(localStorage.getItem("player_wins").length + localStorage.getItem("browser_wins").length - 2))/100 + "%";

        document.getElementById("games_played").innerHTML = "Games Played: " + totalPlayerThrows;

        document.getElementById("browser_paper_percentage").innerHTML = "Paper: " + Math.round((localStorage.getItem("browser_paper").length-1)*10000/totalPlayerThrows)/100 + "%";
        document.getElementById("browser_rock_percentage").innerHTML = "Rock: " + Math.round((localStorage.getItem("browser_rock").length-1)*10000/totalPlayerThrows)/100 + "%";
        document.getElementById("browser_scissors_percentage").innerHTML = "Scissors: " + Math.round((localStorage.getItem("browser_scissors").length-1)*10000/totalPlayerThrows)/100 + "%";
        document.getElementById("browser_wins").innerHTML = "Browser Wins: " + (localStorage.getItem("browser_wins").length - 1)
        document.getElementById("browser_win_percentage").innerHTML = "Browser Win Percentage: " + Math.round((localStorage.getItem("browser_wins").length - 1)*10000/(localStorage.getItem("player_wins").length + localStorage.getItem("browser_wins").length - 2))/100 + "%";
    }
}

function setImg(){
    var player_choice = document.getElementById("player_choice_select").value;
    var player_img = document.getElementById("player_img");

    if (player_choice == "rock") player_img.setAttribute("src", "img/player_rock.png");
    else if (player_choice == "paper") player_img.setAttribute("src", "img/player_paper.png");
    else if (player_choice == "scissors") player_img.setAttribute("src", "img/player_scissors.png");

    if (player_choice == "rock") player_img.setAttribute("src", "img/player_rock.png");
    else if (player_choice == "paper") player_img.setAttribute("src", "img/player_paper.png");
    else if (player_choice == "scissors") player_img.setAttribute("src", "img/player_scissors.png");
}
