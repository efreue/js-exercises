
function getClickPosition(e){
    var divSel = document.body.getElementsByClassName("nodeDivs selected")[0];
    var parentPosition = getPosition(e,divSel);
    divSel.style.position = "absolute";
    divSel.style.left = parentPosition.x;
    divSel.style.top = parentPosition.y;
}


function getPosition(e,d){
    //si es internet explorer obtiene datos de event de window.Event, para el resto de los navegadores lo obtiene del argumento que crea //dinamicamente llamado "event"
    var evento = e ? e:window.Event;
    var xPos = 0;
    var yPos = 0;
    /*
    alert (e.type.toUpperCase() + ' mouse event:'
      +'\n clientX = ' + evento.clientX
      +'\n clientY = '  + evento.clientY
      +'\n screenX = ' + evento.screenX
      +'\n screenY = ' + evento.screenY
     )

    alert (' mouse event:'
      +'\n clientX = ' + d.offsetTop
      +'\n clientY = '  + d.offsetLeft
     )
    */
    xPos =  evento.clientX;
    yPos = evento.clientY;

    return {
        x: xPos,
        y: yPos
    };
}

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

document.body.onclick = function(){
    //verifico que el metodo solo se utlice cuando el click solo se haga en el body
    if (event.target.tagName == "BODY"){
         getClickPosition(event);
    }
}

document.body.onload = addElementBtn;
