let keyNum = new Array(10)
keyNum.fill(0)

for(let i=0; i<8; i++) {
    let tr=document.createElement("tr")
    for(let j=0; j<9; j++)
        tr.append(document.createElement("td"))
    document.querySelector("tbody").append(tr)
}

document.addEventListener("keydown", function({key}) {
    let choice = Number(key);
    if (choice > 0 && choice < 10) {
        let theChosenOne = document.querySelector("tbody").children[7-keyNum[choice]].children[choice-1];
        theChosenOne.classList.add("red");
        keyNum[choice] = keyNum[choice] + 1;
    }
} );
    