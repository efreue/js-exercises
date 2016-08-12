
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function modifyColor(obDiv, numRand){
    if(numRand>=100 && numRand<200)
        obDiv.style.backgroundColor="red";
    else
    {
        if(numRand>=200 && numRand<300)
            obDiv.style.backgroundColor="yellow";
        else
        {
            if(numRand>=300 && numRand<400)
                obDiv.style.backgroundColor="green";
            else
            {
                if(numRand>=400 && numRand<500)
                    obDiv.style.backgroundColor="blue";
                else
                    obDiv.style.backgroundColor="orange";
            }
        }
    }
}


function addElementDiv(){
    var num = getRandom(100, 500);
    var newDiv = document.createElement("div");

    modifyColor(newDiv, num-20);

    newDiv.style.width="50px";
    newDiv.style.height="50px";

    document.body.appendChild(newDiv);

}


function addElementBtn(){
    var newBtn = document.createElement("button");
    newBtn.onclick=addElementDiv;
    newBtn.innerText="Show Divs";
    //newBtn.setAttribute("id","btnShowDiv");

    document.body.appendChild(newBtn);
    //var currentBtn = document.getElementById("btnShowDiv");

}

document.body.onload = addElementBtn;

