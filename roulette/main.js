var startAngle = 0;
var arc = Math.PI / 18.5;
var spinTimeout = null;
var spinsize = 250;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;
var ctx;
var check = true;

var total_money = 1000;
var put_money = 0;
var now_put = 10;
var left_img = 25;
var right_img = 50;
var win_number;

function draw()
{
    drawRouletteWheel();
    drawTable();
    var text = document.getElementById("money");
    text.innerHTML += total_money;
    
    text = document.getElementById("putmoney");
    text.innerHTML += put_money;
}

function isEven(n) 
{
    return (n % 2 == 0);
}

function isOdd(n) 
{
    return (Math.abs(n) % 2 == 1);
}

function getText(i)
{
    var text;
    if (i === 36)
    {
        text = "0";
    }
    else if (isEven(i))
    {
        text = (i+1).toString();
    }
    else if (isOdd(i))
    {
        text = (i+1).toString();
    }
    return text;
}

function drawRouletteWheel() 
{
    var canvas = document.getElementById("wheelcanvas");
    if (canvas.getContext) 
    {
        var outsideRadius = 240;
        var textRadius = 200;
        var insideRadius = 165;
    
        ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,1000,1000);
    
        ctx.strokeStyle = "#f9f900";
        ctx.lineWidth = 5;
    
        ctx.font = 'bold 28px Avenir Next, sans-serif';
    
        for(var i = 0; i < 37; i++) 
        {
            var angle = startAngle + i * arc;
            if (i === 36)
            {
                ctx.fillStyle = "green";
            }
            else if (isEven(i+1))
            {
                ctx.fillStyle = "red";
            }
            else if (isOdd(i+1))
            {
                ctx.fillStyle = "black";
            }
    
            ctx.beginPath();
            ctx.arc(spinsize, spinsize, outsideRadius, angle, angle + arc, false);
            ctx.arc(spinsize, spinsize, insideRadius, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
    
            ctx.beginPath();
            ctx.arc(spinsize, spinsize, insideRadius, angle, angle + arc, false);
            ctx.arc(spinsize, spinsize, 0, angle + arc, angle, true);
            ctx.stroke();
            ctx.fill();
    
            ctx.save();

            if (i === 36)
            {
                ctx.fillStyle = "black";
            }
            else if (isEven(i+1))
            {
                ctx.fillStyle = "black";
            }
            else if (isOdd(i+1))
            {
                ctx.fillStyle = "white";
            }
            ctx.translate(spinsize + Math.cos(angle + arc / 2) * textRadius, spinsize + Math.sin(angle + arc / 2) * textRadius);
            ctx.rotate(angle + arc / 2 + Math.PI / 2);
            var text = getText(i);
            ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
            ctx.restore();
        } 
    
        ctx.beginPath();
        ctx.arc(spinsize, spinsize, 130, 0, 2*Math.PI, false);
        ctx.fillStyle = "#ffffce";
        ctx.stroke();
        ctx.fill();
    
        //Arrow
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.moveTo(spinsize - 8, spinsize - (outsideRadius + 10));
        ctx.lineTo(spinsize + 8, spinsize - (outsideRadius + 10));
        ctx.lineTo(spinsize + 8, spinsize - (outsideRadius - 10));
        ctx.lineTo(spinsize + 18, spinsize - (outsideRadius - 10));
        ctx.lineTo(spinsize + 0, spinsize - (outsideRadius - 26));
        ctx.lineTo(spinsize - 18, spinsize - (outsideRadius - 10));
        ctx.lineTo(spinsize - 8, spinsize - (outsideRadius - 10));
        ctx.lineTo(spinsize - 8, spinsize - (outsideRadius + 10));
        ctx.fill();

    }
}

function spin() 
{
    if(check == true)
    {
        if(check_money() == true)
        {
            var text = document.getElementById("money");
            total_money -= put_money;
            text.innerHTML = "you have $ "+total_money;
            
            check = false;
            spinAngleStart = Math.random() * 10 + 10;
            spinTime = 0;
            spinTimeTotal = Math.random() * 3 + 4 * 1618;
            rotateWheel();
        }
        else
        {
            alert("籌碼不夠!!");
        }
    }
}

function rotateWheel() 
{
    spinTime += 30;
    if(spinTime >= spinTimeTotal) 
    {
        stopRotateWheel();
        return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();

    spinTimeout = setTimeout('rotateWheel()', 30);

}

function stopRotateWheel() 
{
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    if (index === 36) 
    {
        ctx.fillStyle = "white";
        ctx.shadowColor   = "black";
    }
    else if (isEven(index+1)) 
    {
        ctx.fillStyle = "red";
        ctx.shadowColor   = "white";
    }
    else if (isOdd(index+1)) 
    {
        ctx.fillStyle = "black";
        ctx.shadowColor   = "white";
    }
    ctx.font = 'bold 150px sans-serif';
    ctx.shadowOffsetX = -2;
    ctx.shadowOffsetY = -2;
    ctx.shadowBlur    = 1;

    var text = getText(index);
    win_number = text;
    ctx.fillText(text, spinsize - ctx.measureText(text).width / 2, spinsize + 52);
    ctx.restore();
    check = true;
    checkwin();

}

function easeOut(t, b, c, d) 
{
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
}

function drawTable()
{
    var numf = 1;
    var nums = 0;
    var numt = 0;
    var color = "black";
    var table;
    var newcell;
    var temp;
    for(var i=1;i<37;i++)
    {
        if(i%3 == 0)
        {
            table = document.getElementById("third_row");	
            newcell = table.insertCell(numt);				
            numt++;
        }				
        else if(i%3 == 1)
        {
            table = document.getElementById("first_row");
            newcell = table.insertCell(numf);
            numf++;
        }
        else
        {
            table = document.getElementById("second_row");
            newcell = table.insertCell(nums);
            nums++;
        }
        
        if(i%2 == 0)
        {
            color = "red";
        }
        else
        {
            color = "black";
        }
        
        temp = ""+i;
        newcell.style.backgroundColor = color;
        newcell.id = temp;
        newcell.onclick = function (){	//newcell.onclick = putmoney 不能取得this的資訊
            putmoney(this);
        }		 
        newcell.innerHTML = temp; 
    }
    
    table = document.getElementById("third_row");		
    newcell = table.insertCell(numt);
    newcell.style.backgroundColor = 'green';
    newcell.innerHTML = "3RD";
    newcell.id = "2_to_1_3";
    newcell.onclick = function ()
    {
        putmoney_other(this);
    }
    
    table = document.getElementById("second_row");
    newcell = table.insertCell(nums);
    newcell.style.backgroundColor = 'green';
    newcell.innerHTML = "2ND";
    newcell.id = "2_to_1_2";
    newcell.onclick = function ()
    {
        putmoney_other(this);
    }
    
    table = document.getElementById("first_row");
    newcell = table.insertCell(numf);
    newcell.style.backgroundColor = 'green';
    newcell.innerHTML = "1ST";
    newcell.id = "2_to_1_1";
    newcell.onclick = function ()
    {
        putmoney_other(this);
    }
}

function putmoney(obj)
{	
    if(check == true)
    {
        var num = new Number(obj.id);
        var temp,checkcoin;
        if(obj.style.backgroundColor != 'red' && obj.style.backgroundColor != 'black' && obj.style.backgroundColor != 'green')
        {
            if(obj.style.backgroundColor == 'lightskyblue')
            {
                temp = 10;
            }
            else if (obj.style.backgroundColor == 'lightgreen')
            {
                temp = 25;
            }
            else
            {
                temp = 50;
            }
            if(num == 0)
            {
                obj.style.backgroundColor = 'green';
            }
            else if(num%2 == 0)
            {
                obj.style.backgroundColor = 'red';
            }
            else
            {
                obj.style.backgroundColor = 'black';
            }		
            put_money -= temp;
        }
        else
        {
            if(now_put == 10)
            {
                obj.style.backgroundColor = 'lightskyblue';
            }
            else if (now_put == 25)
            {
                obj.style.backgroundColor = 'lightgreen';
            }
            else
            {
                obj.style.backgroundColor = 'orange';
            }
        
            checkcoin = put_money;
            put_money += now_put;
            if(put_money > 1000)
            {
                alert("籌碼不夠!!");
                put_money = checkcoin;
                if(num%2 == 0)
                {
                    obj.style.backgroundColor = 'red';
                }
                else
                {
                    obj.style.backgroundColor = 'black';
                }
            }
        }
    
        var text = document.getElementById("putmoney");
            text.innerHTML = "$: " + put_money;
    }
}

function checkwin()
{
    var check_table = document.getElementById(win_number);
    var text = document.getElementById("money");
    var delta_money = total_money;
    
    if(check_table.style.backgroundColor == 'red' || check_table.style.backgroundColor == 'black')
        ;
    else
    {
        if(check_table.style.backgroundColor == 'lightskyblue'){
            total_money = total_money + 10*36;	
                        
        }
        else if(check_table.style.backgroundColor == "lightgreen"){
            total_money = total_money + 25*36;	
                        
        }
        else if(check_table.style.backgroundColor == "orange"){
            total_money = total_money + 50*36;	
                
        }
    }
    
    checkOtherWin(document.getElementById("1st"));
    checkOtherWin(document.getElementById("2nd"));
    checkOtherWin(document.getElementById("3rd"));
    checkOtherWin(document.getElementById("1_to_18"));
    checkOtherWin(document.getElementById("19_to_36"));
    checkOtherWin(document.getElementById("put_even"));
    checkOtherWin(document.getElementById("put_odd"));
    checkOtherWin(document.getElementById("color_black"));
    checkOtherWin(document.getElementById("color_red"));
    checkOtherWin(document.getElementById("2_to_1_1"));
    checkOtherWin(document.getElementById("2_to_1_2"));
    checkOtherWin(document.getElementById("2_to_1_3"));
    text = document.getElementById("money");
    text.innerHTML = "you have $ " + total_money;
    var a = total_money-delta_money;
    if(a>0)
    {
        alert("You win $"+ a + "!");
    }
    else if(put_money==0)
    {
        alert("You haven't placed a bet!");
    }
    else
    {
        alert("Dealer Wins!");
    }
        
    clean();
}
        
function switchcoin(obj)
{
    now_put = 10;
    temp=10;
}
function switchcoin2(obj)
{
    
    now_put = left_img;
}
function switchcoin3(obj)
{
    now_put = 50;
}

function check_money()
{
    if(total_money < put_money)
    {
        return false;
    }
    else
    {
        return true;
    }
}

function clean()
{
    if(check == true)
    {
        var text;
        for(var i=1;i<37;i++)
        {
                text = document.getElementById(""+i);
                if(i%2==0)
                {
                    text.style.backgroundColor = 'red';
                }
                else
                {
                    text.style.backgroundColor = 'black';
                }
        }
        text = document.getElementById("0");
        text.style.backgroundColor = 'green';
        text = document.getElementById("1st");
        text.style.backgroundColor = 'green';
        text = document.getElementById("2nd");
        text.style.backgroundColor = 'green';
        text = document.getElementById("3rd");
        text.style.backgroundColor = 'green';
        text = document.getElementById("1_to_18");
        text.style.backgroundColor = 'green';
        text = document.getElementById("put_even");
        text.style.backgroundColor = 'green';
        text = document.getElementById("put_odd");
        text.style.backgroundColor = 'green';
        text = document.getElementById("19_to_36");
        text.style.backgroundColor = 'green';
        text = document.getElementById("color_black");
        text.style.backgroundColor = 'black';
        text = document.getElementById("color_red");
        text.style.backgroundColor = 'red';
        text = document.getElementById("2_to_1_1");
        text.style.backgroundColor = 'green';
        text = document.getElementById("2_to_1_2");
        text.style.backgroundColor = 'green';
        text = document.getElementById("2_to_1_3");
        text.style.backgroundColor = 'green';
        put_money = 0;
        text = document.getElementById("putmoney");
        text.innerHTML = "$: " + put_money;
    }
}

function putmoney_other(obj)
{
    if(check == true)
    {
        var temp,checkcoin;
        
        if(obj.style.backgroundColor != 'green' && obj.style.backgroundColor != 'black' && obj.style.backgroundColor != 'red')
        {
            if(obj.style.backgroundColor == 'lightskyblue')
            {
                temp = 10;
            }
            else if (obj.style.backgroundColor == 'lightgreen')
            {
                temp = 25;
            }
            else
            {
                temp = 50;
            }
            if(obj.id == 'color_red')
            {
                obj.style.backgroundColor = 'red';
            }
            else if(obj.id == 'color_black')
            {
                obj.style.backgroundColor = 'black';
            }
            else
            {
                obj.style.backgroundColor = 'green';	
            }		
            put_money -= temp;
        }
        else
        {
            if(now_put == 10)
            {
                obj.style.backgroundColor = 'lightskyblue';
            }
            else if (now_put == 25)
            {
                obj.style.backgroundColor = 'lightgreen';
            }
            else
            {
                obj.style.backgroundColor = 'orange';
            }
        
            checkcoin = put_money;
            put_money += now_put;
            if(put_money >1000)
            {
                alert("籌碼不夠!!");
                put_money = checkcoin;
                obj.style.backgroundColor = 'green';
            }
        }
    
        var text = document.getElementById("putmoney");
            text.innerHTML = "$: " + put_money;
    }
}

function checkOtherWin(obj)   //倍率
{
    var win = 0;
    if(obj.id == "1st" && obj.style.backgroundColor != 'green')
    {
        if(win_number < 13)
        {
            win = 3;	
        }
    }
    else if(obj.id == "2nd" && obj.style.backgroundColor != 'green')
    {
        if(win_number < 25 && win_number > 12)
        {
            win = 3;
        }
    }
    else if(obj.id == "3rd" && obj.style.backgroundColor != 'green')
    {
        if(win_number < 37 && win_number > 24)
        {
            win = 3;
        }
    }
    else if(obj.id == "1_to_18" && obj.style.backgroundColor != 'green')
    {
        if(win_number < 19 )
        {
            win = 2;
        }
    }
    else if(obj.id == "19_to_36" && obj.style.backgroundColor != 'green')
    {
        if(win_number < 37 && win_number > 18)
        {
            win = 2;
        }
    }
    else if(obj.id == "put_even" && obj.style.backgroundColor != 'green')
    {
        if(win_number % 2 == 0)
        {
            win = 2;
        }
    }
    else if(obj.id == "put_odd" && obj.style.backgroundColor != 'green')
    {
        if(win_number % 2 == 1)
        {
            win = 2;
        }
    }
    else if(obj.id == "color_red" && obj.style.backgroundColor != 'green')
    {
        if(win_number % 2 == 0)
        {
            win = 2;
        }
    }
    else if(obj.id == "color_black" && obj.style.backgroundColor != 'green')
    {
        if(win_number % 2 == 1)
        {
            win = 2;
        }
    }
    else if(obj.id == "2_to_1_1" && obj.style.backgroundColor != 'green')
    {
        if(win_number % 3 == 1)
        {
            win = 3;
        }
    }
    else if(obj.id == "2_to_1_2" && obj.style.backgroundColor != 'green')
    {
        if(win_number % 3 == 2)
        {
            win = 3;
        }
    }
    else if(obj.id == "2_to_1_3" && obj.style.backgroundColor != 'green')
    {
        if(win_number % 3 == 0)
        {
            win = 3;
        }
    }

    else
    {
        win = 0;
    }

    if(obj.style.backgroundColor == 'lightskyblue')
    {
        total_money = total_money + 10*win;	
    }			
    else if(obj.style.backgroundColor == "lightgreen")
    {
        total_money = total_money + 25*win;		
    }	
    else if(obj.style.backgroundColor == "orange")
    {
        total_money = total_money + 50*win;
    }
}

draw();