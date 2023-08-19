let keyNum = new Array(10);
keyNum.fill(0);

let turn;

function changeTurn(newTurn) {
    let elTurn = document.getElementById("turnTrack");
    elTurn.classList.remove(turn);
    elTurn.classList.add(newTurn);
    turn = newTurn;
    elTurn.innerHTML = "Turn: <span>" + turn + "</span>";
}

function buildTable() {
    for(let i=0; i<8; i++) {
        let tr=document.createElement("tr");
        for(let j=0; j<9; j++)
            tr.append(document.createElement("td"));
        document.querySelector("tbody").append(tr);
    }

    let tr=document.createElement("tr");
    for(let i=0; i<9; i++) {
        let nums = document.createElement("th");
        tr.append(nums);
        nums.innerText = i+1;
    }
    document.querySelector("tbody").append(tr);
}



// function seeWin(dirX, dirY) {
//         let el = document.querySelector("tbody").children[dirY].children[dirX];
//         if (el && el.classList.contains(turn))
//             matched++;
//         else
//             break;
//     }
//     console.log(matched >= 4);
//     matched = 0;
// }

function win() {
    document.removeEventListener("keydown", keydown);
    document.getElementById("turnTrack").innerHTML = "Congratulations <span>" + turn + "!</span> You win!"
}

function checkWin(x, y) {

    let matched;

    function seeWin(dY, dX) {
        for(let i=1; i<5; i++) {
            let el = document.querySelector("tbody").children[y+dY*i]?.children[x+dX*i];
            if (el && el.classList.contains(turn))
                matched++;
            else
                break;
        }
    }

    //anti-diagonal
    matched = 0;
    seeWin(1, -1);
    seeWin(-1, 1);
    console.log("AD", matched, matched >= 4);
    if (matched >= 4) return true;

    //main-diagonal
    matched = 0;
    seeWin(1, 1);
    seeWin(-1, -1);
    console.log("AD", matched, matched >= 4);
    if (matched >= 4) return true;
    
    //horizontal
    matched = 0;
    seeWin(0, -1);
    seeWin(0, 1);
    console.log("H", matched, matched >= 4);
    if (matched >= 4) return true;


    //down
    matched = 0;
    seeWin(1, 0);
    console.log("V", matched, matched >= 4);
    if (matched >= 4) return true;

    return false;
}






let keydown;
document.addEventListener("keydown", keydown = function({key}) {
    let choice = Number(key);
    if (choice > 0 && choice < 10) {
        let row = 7-keyNum[choice];
        let column = choice-1;
        let theChosenOne = document.querySelector("tbody").children[row]?.children[column];
        if (!theChosenOne)  // break on invalid row or column
            return;
        if (turn == "red") {
            theChosenOne.classList.add("red");
            
            if (checkWin(column, row))
                win();
            else
                changeTurn("yellow");
        }
        else if (turn == "yellow") {
            theChosenOne.classList.add("yellow");
            if (checkWin(column, row))
                win();
            else
                changeTurn("red");
        }
        keyNum[choice]++;
    }
} );


document.addEventListener("DOMContentLoaded", function() {
    changeTurn("red");
    buildTable();
});