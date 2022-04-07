
var turn = 0;

function playRound(objDest)
{
  if(objDest.innerHTML == "_" && turn == 0)
  {  
    objDest.innerHTML = "O";
    turn = 1;
  }
  else if(objDest.innerHTML == "_" && turn == 1)
  {
    objDest.innerHTML = "X";
    turn = 0;
  }
  else
  {
    confirm("方塊已經被佔用了!");
  }

  if(checkRow())
  {
    if(turn == 0)
    {
		document.getElementById("show").innerHTML = "玩家2贏了!";
      //if(confirm("玩家2贏了!\n\n要再玩一場嗎?"))
        //clearTable();
    }
    else if(turn == 1)
    {
		document.getElementById("show").innerHTML = "玩家1贏了!";
      //if(confirm("玩家1贏了!\n\n要再玩一場嗎?"))
        //clearTable();
    }
  }
  else if(tableIsFull())
  {
	document.getElementById("show").innerHTML = "平手";
    //if(confirm("平手\n\n要再玩一場嗎?"))
      //clearTable();
  }
}



function clearTable()
{
  for(i=0; i<=2; i++)  
  {
    eval("ttt" + i + "0" + ".innerHTML = '_';")
    eval("ttt" + i + "1" + ".innerHTML = '_';")
    eval("ttt" + i + "2" + ".innerHTML = '_';")
  }
	document.getElementById("show").innerHTML = " ";
}


function checkRow()
{

  for(i=0; i<=2; i++)
  {  

    // 列
    if(eval("compare("+"ttt"+i+"0"+","+"ttt"+i+"1"+","+"ttt"+i+"2"+")"))
      return true;
      
  
    // 對角線
    if(eval("compare("+"ttt"+"0"+i+","+"ttt"+"1"+"1"+","+"ttt"+"2"+(2-i)+")"))
      return true;

    // 欄
    if(eval("compare("+"ttt"+"0"+i+","+"ttt"+"1"+i+","+"ttt"+"2"+i+")"))
      return true;

  }
  return false;
}

function tableIsFull()
{
  for(i=0; i<=2; i++)
    for(j=0; j<=2; j++)
      if(eval("ttt" + i + j).innerHTML == "_")
        return false;
  return true;
}

function compare(obj0, obj1, obj2)
{
  if(obj0.innerHTML != "_" && obj1.innerHTML != "_" && obj2.innerHTML != "_")
    if(obj0.innerHTML == obj1.innerHTML && obj1.innerHTML == obj2.innerHTML)
      return true;

  return false;  
}
