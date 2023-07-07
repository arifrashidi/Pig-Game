
/* -------------------------------------------------------------------------- */
"use strict"

/* -------------------------------------------------------------------------- */

// 🧡 General variable:

// 🔗 score selector variable:
const player_1 = document.querySelector(".player_0")
const player_2 = document.querySelector(".player_1")
const score_player_1 = document.querySelector("#score_0")
const score_player_2 = document.getElementById("score_1")
const current_score_player_1 = document.getElementById("current_0")
const current_score_player_2 = document.getElementById("current_1")

// 🔗 display dice selector variable:
const display_dice = document.querySelector(".dice");

// 🔗 button selector variable:
const new_game_button = document.querySelector(".btn_new");
const roll_dice_button = document.querySelector(".btn_roll");
const hold_button = document.querySelector(".btn_hold");

// 🔗 Standard variable:
let final_score_player = [0, 0]

score_player_1.textContent = 0;
score_player_2.textContent = 0;

let current_score_player = 0;
let active_player = 0;

let playing = true;

// 🔗 function variable:
const switch_player = function () {
    document.getElementById(`current_${active_player}`).textContent = 0;
    current_score_player = 0;
    active_player = active_player === 0 ? 1 : 0; // switch player
    // 5. background color change everytime player switched.
    player_1.classList.toggle("player_active");
    player_2.classList.toggle("player_active");
}

// -----------------

// ❕ getElementById() ✨(HTML DOM DOCUMENT)
// Returns an element with a specified value & returns null if the element does not exist.
// GetElementById() don't need to use (#) for selector
// Is More restrictive than querySelector() because you can only retrieve elements by its DOM ID.
// GetElementById() is more faster in browser than querySelector()
// TODO Syntax: document.getElementById("SELECTOR");

/* -------------------------------------------------------------------------- */

// 🧡 Hide the dice number before the game start:

display_dice.classList.add("hidden");

/* -------------------------------------------------------------------------- */

// 🧡 Rolling dice functionality:

roll_dice_button.addEventListener("click", function() {
    if (playing) {
            // 1. generating a random dice roll
    let random_dice_number = Math.trunc(Math.random() * 6) + 1;
    // 2. display dice
    display_dice.classList.remove("hidden");
    display_dice.src = `./ASSETS/dice-${random_dice_number}.png`;
    // 3. if dice is not number 1, add score to current
    if (random_dice_number !== 1) {
        current_score_player = current_score_player + random_dice_number;
        document.getElementById(`current_${active_player}`).textContent = current_score_player;
    }
    // 4. if dice is number 1, current score will become 0 and player will be switched
    else {
        switch_player();
    }
    }
})  

// -----------------

// ❕ classList.toggle() ✨(DOM TOKEN LIST - METHOD)
// Toggles between tokens in the list (like switch button)
// TODO Syntax:  ELEMENT.classlist.toggle("SELECTOR");

/* -------------------------------------------------------------------------- */

// 🧡 Holding current score: 

hold_button.addEventListener("click", function() {
    if (playing) {
        // 1. Add current score to final score
        final_score_player[active_player] = final_score_player[active_player] + current_score_player;
        document.getElementById(`score_${active_player}`).textContent = final_score_player[active_player];
        // 2. If player's score is >= 100, that player wins
        if (final_score_player[active_player] >= 100) {
            playing = false;
            document.querySelector(`.player_${active_player}`).classList.add("player_winner");
            document.querySelector(`.player_${active_player}`).classList.remove("player_active");
            display_dice.classList.add("hidden");
            document.querySelector(`#score_${active_player}`).textContent = "WIN🎉";
        }
        else {
        // 3. if player's score is <= 100, swith to another player  
            switch_player();
        }
    }
})

/* -------------------------------------------------------------------------- */

// 🧡 Reset the Game when clicked "new game button" 

new_game_button.addEventListener("click", function () {
    // button working again
    playing = true;
    // reset final score
    final_score_player = [0, 0]
    score_player_1.textContent = 0;
    score_player_2.textContent = 0;
    // reset current score
    current_score_player = 0;
    current_score_player_1.textContent = 0;
    current_score_player_2.textContent = 0;
    // switch back to player 1
    active_player = 0;
    // reset css propeties
    player_1.classList.remove("player_winner");
    player_2.classList.remove("player_winner");
    player_1.classList.add("player_active");
    player_2.classList.remove("player_active");
})
