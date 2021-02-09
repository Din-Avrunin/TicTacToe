var numOfBoxesInRow=3;
var numOfBoxesToWin=3;
var boxArr = [];
var playerTurn=1;
var counter;
window.onload = function()
{
    initArray();
    createElementWin();
    createBoxes();
    createResetButton();
}

function createElementWin()
{
    var winText = document.createElement("h1");
    winText.className="winText";
    winText.id="winTextID";
    id_site.appendChild(winText);
    winText.innerHTML="you won";
    document.getElementById("winTextID").style.visibility = "hidden";
}
function initArray()
{
    for (let i = 0; i < numOfBoxesInRow; i++) {
        for (let j = 0; j < numOfBoxesInRow; j++)
            boxArr[i] = new Array(numOfBoxesInRow);
    }
}
function createBoxes()
{
    for (var i = 0; i < numOfBoxesInRow; i++)
        for (var j = 0; j<numOfBoxesInRow; j++)
            boxArr[i][j] = new Box(i*numOfBoxesInRow+j);
}

function createResetButton()
{
    var resetBtn = document.createElement("button");
    resetBtn.className = "resetBtn";
    id_site.appendChild(resetBtn);
    resetBtn.innerHTML = "reset";
    resetBtn.onclick = function()
    { 
        for(var i = 0; i < numOfBoxesInRow; i++)
        {
            for (var j = 0; j<numOfBoxesInRow; j++)
            {
                boxArr[i][j].box.className = "box";
                boxArr[i][j].beenClicked = false;
            }
        }
        document.getElementById("winTextID").style.visibility = "hidden";
    }
}

function Box(_id)
{
    this.id=_id;
    this.beenClicked = false;
    var box=document.createElement("div");
    box.className="box";
    id_blocks.appendChild(box);
    box.innerHTML=this.id;
    var allObj = this;
    box.onclick = function()
    {
        if (allObj.beenClicked==false)
        {
            allObj.beenClicked = true;
            if(playerTurn==1)   // 1 = X
            {
                box.classList.add("x");
                playerTurn=2;
            }
            else                // 2 = O
            {
                box.classList.add("o");
                playerTurn=1;
            }
        }
        checkForWin(allObj);
    }
    this.box=box;
    
}

function checkForWin(_box) 
{
    var counterXRow = 1;
    var counterORow = 1;
    var counterXCol = 1;
    var counterOCol = 1;
    var counterXMainDiagonal = 1;
    var counterOMainDiagonal = 1;
    var counterXSecondaryDiagonal = 1;
    var counterOSecondaryDiagonal = 1;
    var currId = _box.id;
    var currRow = Math.floor(currId/numOfBoxesInRow);
    var currCol = currId%numOfBoxesInRow;
    var i;
    var j;
       
      
        for (i = currRow; i+1 < numOfBoxesInRow; i++)
        {
            if (boxArr[i][currCol].box.classList.contains("x") && boxArr[i+1][currCol].box.classList.contains("x")) //checking 3 x's in a column
                counterXCol++;
            if (boxArr[i][currCol].box.classList.contains("o") && boxArr[i+1][currCol].box.classList.contains("o")) //checking 3 o's in a column
                counterOCol++;
        }
        for (i = currRow; i-1 >= 0; i--)
        {
            if (boxArr[i][currCol].box.classList.contains("x") && boxArr[i-1][currCol].box.classList.contains("x")) //checking 3 x's in a column
                counterXCol++;
            if (boxArr[i][currCol].box.classList.contains("o") && boxArr[i-1][currCol].box.classList.contains("o")) //checking 3 o's in a column
                counterOCol++;
        }
        for (j = currCol; j+1 < numOfBoxesInRow; j++)
        {
            if (boxArr[currRow][j].box.classList.contains("x") && boxArr[currRow][j+1].box.classList.contains("x")) //checking 3 x's in a row
                counterXRow++;
            if (boxArr[currRow][j].box.classList.contains("o") && boxArr[currRow][j+1].box.classList.contains("o")) //checking 3 o's in a row
                counterORow++;
        }
        for (j = currCol; j-1 >= 0; j--)
        {
            if (boxArr[currRow][j].box.classList.contains("x") && boxArr[currRow][j-1].box.classList.contains("x")) //checking 3 x's in a row
                counterXRow++;
            if (boxArr[currRow][j].box.classList.contains("o") && boxArr[currRow][j-1].box.classList.contains("o")) //checking 3 o's in a row
                counterORow++;
        }
        //checking both diagnoals
        diag("x");
        diag("o");
        function diag (val)
        {
            //main diagonal
        for (i = currRow,j = currCol; i-1>=0 && j-1>=0; i--,j--)
            if (boxArr[i][j].box.classList.contains(val) && boxArr[i - 1][j - 1].box.classList.contains(val))
            {
                if (val=="x")
                    counterXMainDiagonal++;
                else
                    counterOMainDiagonal++;
            }
        for(i = currRow,j = currCol; i+1<numOfBoxesInRow && j+1<numOfBoxesInRow; i++,j++)
            if (boxArr[i][j].box.classList.contains(val) && boxArr[i + 1][j + 1].box.classList.contains(val))
            {
                if (val=="x")
                    counterXMainDiagonal++;
                else
                    counterOMainDiagonal++;
            }
            //secondary diagonal
        for (i = currRow,j = currCol; i+1<numOfBoxesInRow && j-1>=0; i++,j--)
            if (boxArr[i][j].box.classList.contains(val) && boxArr[i + 1][j - 1].box.classList.contains(val))
            {
                if (val=="x")
                    counterXSecondaryDiagonal++;
                else
                    counterOSecondaryDiagonal++;
            }
        for(i = currRow,j = currCol; i-1>=0 && j+1<numOfBoxesInRow; i--,j++)
            if (boxArr[i][j].box.classList.contains(val) && boxArr[i - 1][j + 1].box.classList.contains(val))
            {
                if (val=="x")
                    counterXSecondaryDiagonal++;
                else
                    counterOSecondaryDiagonal++;
            }
        }   

    if (counterXRow==numOfBoxesToWin || counterORow==numOfBoxesToWin || counterXCol==numOfBoxesToWin || counterOCol==numOfBoxesToWin || counterXMainDiagonal==numOfBoxesToWin || counterOMainDiagonal==numOfBoxesToWin || counterXSecondaryDiagonal == numOfBoxesToWin || counterOSecondaryDiagonal == numOfBoxesToWin)
    {
        // console.log("counterXRow==numOfBoxesToWin || counterORow==numOfBoxesToWin || counterXCol==numOfBoxesToWin || counterOCol==numOfBoxesToWin || counterMainDiagonal==numOfBoxesToWin || counterOMainDiagonal==numOfBoxesToWin"+ counterXRow==numOfBoxesToWin || counterORow==numOfBoxesToWin || counterXCol==numOfBoxesToWin || counterOCol==numOfBoxesToWin || counterMainDiagonal==numOfBoxesToWin || counterOMainDiagonal==numOfBoxesToWin)
        // console.log("counterXRow is "+counterXRow+ " and counterORow "+counterORow+" and counterXCol = "+counterXCol+", counterOCol = "+counterOCol +" counterXMainDiag = "+counterMainDiagonal);
        document.getElementById("winTextID").style.visibility = "visible";
        // alert("you won");
        // for (var i = 0;)
    }
}
