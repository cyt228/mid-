$(function(){

    $(".NumText").keyup(function(){ 
        $(this).val($(this).val().replace(/\D|^0/g,'')); 
        }).bind("paste",function(){
        $(this).val($(this).val().replace(/\D|^0/g,'')); 
    });

    $(".click").on("click",function(){

        $("#courseTable").empty();

        var a=parseInt($(".NumText").val()/100);
        var b=parseInt ($(".NumText").val())%100;

        setMonthAndDate(a,b);

        var topicCount=topic.length;
        let millisecsPerDay=24*60*60*1000;

        $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>"+`<br>`);

        for(var x=0;x<topicCount;x++){

            $("#courseTable").append("<tr>"+`<td>${x+1}</td>`+`<td>${(new Date(startDate.getTime()+7*x*millisecsPerDay)).toLocaleDateString().slice(5)}</td>`+`<td>${topic[x]}</td>`+"<tr>");
            
            if(topic[x]=="國定假日"){
                $("tr:gt(1) td:eq(1)").css({"background-color":"rgb(255, 102, 102)"});
            }

            //if((x+1)%2==0){     //每列都是gt(1) 幣一列是eq(1)
            //    $("tr:gt(1)").css({"color":"rgb(0, 102, 153)"});
            //}
            //else{
             //   $("tr:eq(1)").css({"color":"black"});
            //}

        }
        //$("#courseTable tr:odd").css({"color":"rgb(0, 102, 153)"});
        //$("#courseTable tr:even").css({"color":"black"});
        
       // $("#courseTable").append("<tr>"+"<tr>"+"<tr>");
    });

    
});
