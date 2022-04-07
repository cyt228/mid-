$(function(){
    //$("#img").hide();
    $("input").on("click",function(){
        //$("h1").text("Hello");
        //alert("Hi");
        //$("h1").text($("li:first").text());
        //$("h1").text($("li").eq(1).text());
        //$("h1").text($("li:last").text());
        var numberOfList=$("li").length;
        var random=Math.floor(Math.random()*numberOfList);
        $("h1").text($("li").eq(random).text());

        if(random==0){
            $(".rice").fadeIn();
            $(".noodle").fadeOut();
            $(".dumpling").fadeOut();
        }
        else if(random==1){
            $(".noodle").fadeIn();
            $(".rice").fadeOut();
            $(".dumpling").fadeOut();
        }
        else if(random==2){
            $(".dumpling").fadeIn();
            $(".noodle").fadeOut();
            $(".rice").fadeOut();
        }
    });
});
//Math.floor() 函式會回傳小於等於所給數字的最大整數。
//Math.random() 回傳一個偽隨機小數，介於0到1之間(包含 0，不包含1) 