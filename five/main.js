
var board = document.getElementById("gomoku");
var turn,       //白棋下过turn为0，黑棋为1
    isOver;     //isOver为true时游戏结束
var record = [];    //棋谱记录
var boardWidth = 485,   //棋盘宽度
    boardHeight = 485,  //棋盘高度
    marginInit = 25,    //与边界的空隙
    gridLength = 50,    //每一格宽度
    row = 10,           //行数
    column = 10,        //列数
    radius = 20;        //棋子半径
var chess = {
    //绘制棋盘
    init: function () {
        if (board.getContext) {
            record = [];
            //黑棋先下
            turn = 0;
            isOver = false;
            var context = board.getContext("2d");
            context.clearRect(0, 0, boardWidth, boardHeight)
            //绘制竖线
            context.beginPath();
            for (var i = 0; i < column; i++) {
                context.moveTo(marginInit + gridLength * i, 25);
                context.lineTo(marginInit + gridLength * i, 725);
            }
            //绘制横线
            for (var j = 0; j < row; j++) {
                context.moveTo(25, marginInit + gridLength * j);
                context.lineTo(725, marginInit + gridLength * j);
            }
            context.stroke();
        }
    },
    //绘制白棋
    white: function (clickX, clickY) {
        console.log("clientX: " + clickX + ", clientY: " + clickY);
        var center = this.getCenterXY(clickX, clickY);
        if (this.preventOverride(center.x, center.y)) {
            return false;
        }
        var context = board.getContext("2d");
        context.beginPath();
        context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
        context.fillStyle = "#FFF";
        context.fill();
        //白棋下过为0，黑棋为1
        turn = 0;
        var step = {
            "x": center.x,
            "y": center.y,
            "turn": turn
        };
        record.push(step);
        if (this.isWin(center.x, center.y, turn)) {
            isOver = true;
            //alert("The White Win!");
            document.getElementById("show").innerHTML="The White Win!"
        }
        console.log(record);
    },
    //绘制黑棋
    black: function (clickX, clickY) {
        console.log("clientX: " + clickX + ", clientY: " + clickY);
        var center = this.getCenterXY(clickX, clickY);
        if (this.preventOverride(center.x, center.y)) {
            return false;
        }
        var context = board.getContext("2d");
        context.beginPath();
        context.arc(center.x, center.y, radius, 0, 2 * Math.PI, false);
        context.stroke();
        context.closePath();
        context.fillStyle = "#000";
        context.fill();
        //白棋下过为0，黑棋为1
        turn = 1;
        var step = {
            "x": center.x,
            "y": center.y,
            "turn": turn
        };
        record.push(step);
        if (this.isWin(center.x, center.y, turn)) {
            isOver = true;
            //alert("The Black Win!");
            document.getElementById("show").innerHTML="The White Win!"
        }
        console.log(record);
    },
    //获取圆心坐标
    getCenterXY: function (clickX, clickY) {
        var center = {};
        //-25原因是margin为25
        var modX = (clickX - marginInit) % gridLength, modY = (clickY - marginInit) % gridLength;
        if (modX < 25) {
            center.x = clickX - modX;
        } else {
            center.x = clickX - modX + 50;
        }
        if (modY < 25) {
            center.y = clickY - modY;
        } else {
            center.y = clickY - modY + 50;
        }
        return center;
    },
    //避免被已绘制的棋子被覆盖
    preventOverride: function (centerX, centerY) {
        var test = {
            "x": centerX,
            "y": centerY
        };
        var length = record.length;
        for (var i = 0; i < length; i++) {
            if (test.x == record[i].x && test.y == record[i].y) {
                alert("不可下著!");
                return true;
            }
        }
        return false;
    },
    //判断是否获胜
    isWin: function (centerX, centerY, turn) {
        return (this.isWinHorizon(centerX, centerY, turn) || this.isWinVertical(centerX, centerY, turn) ||
        this.isLeftOblique(centerX, centerY, turn) || this.isRightOblique(centerX, centerY, turn));
    },
    //判断左右方向
    isWinHorizon: function (centerX, centerY, turn) {
        var length = record.length;
        var judge = [];
        var judgeHorizon = {
            y: centerY,
            turn: turn
        };
        for (var i = 0; i < length; i++) {
            if (judgeHorizon.y == record[i].y && judgeHorizon.turn == record[i].turn) {
                //得到横坐标点的index，将坐标像素转为格式为1,2，...
                judge.push((record[i].x - marginInit) / gridLength);
            }
        }
        return (this.isFive(judge));
    },
    //判断上下方向
    isWinVertical: function (centerX, centerY, turn) {
        var length = record.length;
        var judge = [];
        var judgeVertical = {
            x: centerX,
            turn: turn
        };
        for (var i = 0; i < length; i++) {
            if (judgeVertical.x == record[i].x && judgeVertical.turn == record[i].turn) {
                //得到纵坐标点的index，将坐标像素转为格式为1,2，...
                judge.push((record[i].y - marginInit) / gridLength);
            }
        }
        return (this.isFive(judge));
    },

    //判断45度角方向
    isLeftOblique: function (centerX, centerY, turn) {
        var length = record.length;
        var judge = [];
        var judgeLeftOblique = {
            x: centerX,
            y: centerY,
            turn: turn
        };
        for (var i = 0; i < length; i++) {
            //45度角方向横纵坐标相加为常数,x+y=c(c为常数).
            if ((judgeLeftOblique.x + judgeLeftOblique.y) == (record[i].x + record[i].y) &&
                judgeLeftOblique.turn == record[i].turn) {
                //得到横（纵也可）坐标点的index，将坐标像素转为格式为1,2，...
                judge.push((record[i].x - marginInit) / gridLength);
            }
        }
        return (this.isFive(judge));
    },

    //判断135度角方向
    isRightOblique: function (centerX, centerY, turn) {
        var length = record.length;
        var judge = [];
        var judgeRightOblique = {
            x: centerX,
            y: centerY,
            turn: turn
        };
        for (var i = 0; i < length; i++) {
            //135度角方向纵坐标减横坐标为常数，y-x=c(c为常数).
            if ((judgeRightOblique.y - judgeRightOblique.x) == (record[i].y - record[i].x) &&
                judgeRightOblique.turn == record[i].turn) {
                //得到横(纵也可)坐标点的index，将坐标像素转为格式为1,2，...
                judge.push((record[i].x - marginInit) / gridLength);
            }
        }
        return (this.isFive(judge));
    },
    //判断是否五子相连，DRY原则
    isFive: function (judge) {
        var count = judge.length;
        if (count < 5) {
            return false;
        }
        judge.sort(function (a, b) {
            return a - b;
        });
        //相减为4说明五子连续
        for (var j = 0; j < count; j++) {
            if ((judge[j + 4] - judge[j]) == 4) {
                return true;
            }
        }
        return false;
    }
};
document.addEventListener("click", function (e) {
    //避免滚动轴变化引起定位不准
    var clickX = e.clientX + document.body.scrollLeft;
    var clickY = e.clientY + document.body.scrollTop;
    if (clickX > boardWidth || clickY > boardHeight) {
        //点击位置超过棋盘边界
        return false;
    }
    if (isOver) {
        alert("遊戲結束！");
        return false;
    }
    (turn == 1) ? chess.white(clickX, clickY) : chess.black(clickX, clickY);
}, false);

chess.init();


