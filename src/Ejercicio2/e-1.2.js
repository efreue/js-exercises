
function changeStatus(nodDivClick, nodeDivLastSelected) {
    nodeDivLastSelected.style.backgroundColor = "blue";
    nodeDivLastSelected.className = "nodeDivs";

    nodDivClick.style.backgroundColor = "red";
    nodDivClick.className = "nodeDivs selected";

}


function addElementDiv() {
    var newDiv = document.createElement("div");
    newDiv.style.width = "50px";
    newDiv.style.height = "50px";
    newDiv.style.cursor = "pointer";
    newDiv.className = "nodeDivs";

    if (document.body.getElementsByClassName("nodeDivs").length === 0) {
        newDiv.style.backgroundColor = "red";
        newDiv.className = "nodeDivs selected";
    }
    else {
        newDiv.style.backgroundColor = "blue";
    }
    document.body.appendChild(newDiv);

    newDiv.onclick=function() {
        var nodeLastSelected = document.body.getElementsByClassName("nodeDivs selected")[0];
        changeStatus(newDiv, nodeLastSelected);
    };

}

function addElementBtn() {
    var newBtn = document.createElement("button");

    newBtn.onclick = addElementDiv;
    newBtn.innerText = "Show Divs";

    document.body.appendChild(newBtn);
}

document.body.onload = addElementBtn;
