const friends = {
    spring: ['巴陵大橋', '武陵農場', '合歡北峰'],
    summer: ['合歡山暗空公園', '飛鵝山', '萬宜水庫西壩', '台東三仙台'],
    autumn: ['廣西南寧', '日本沖繩'],
    winter: ['湖北', '日本長野']
};

const thisSVG = d3.select('svg');
d3.selectAll('button').on('click', click);

function click() {
    const thisFruitList = friends[this.dataset.name];
    if (this.dataset.name == 'spring') {
        update1(thisFruitList);

        //d3.append("img").attr("src","pic/spring1.jpg");
        // d3.selectAll("#pic").attr("src","pic/spring1.jpg");
    }
    else if (this.dataset.name == 'summer') {
        update2(thisFruitList);
    }
    else if (this.dataset.name == 'autumn') {
        update3(thisFruitList);
    }
    else {
        update4(thisFruitList);
    }
    /*update(thisFruitList);*/
}

function update1(data) {
    thisSVG.selectAll('text')
        .data(data, d => d)
        /*.enter.append('text').text(d => d)
        .attr('x', -100).attr('y', (d, i) => 50 + i * 30)
        .style('fill', 'green')
        .transition().attr('x', 30)*/
        .join(
            enter => {
                enter.append('text').text(d => d)
                    .attr('x', -100).attr('y', (d, i) => 50 + i * 30)
                    .style('fill', '#138D75')
                    .transition().attr('x', 30)
            },
            /*update => {
                update.transition()
                .style('fill', function (d) {
                    if (data == 'spring') {
                        return 'green';
                    }
                    else if (data == 'summer') {
                        return 'yellow';
                    }
                    else if (data == 'autumn') {
                        return 'red';
                    }
                    else {
                        return 'blue';
                    }
                })
                .style('fill', 'red').attr('y', (d, i) => 50 + i * 30)
            },
           exit => {
                exit.transition()
                    .attr('x', 150)
                    .style('fill', 'yellow').remove()
            }*/
        );
}

function update2(data) {
    thisSVG.selectAll('text')
        .data(data, d => d)
        .join(
            enter => {
                enter.append('text').text(d => d)
                    .attr('x', -100).attr('y', (d, i) => 50 + i * 30)
                    .style('fill', '#9B59B6')
                    .transition().attr('x', 30);
            },
        );
}
function update3(data) {
    thisSVG.selectAll('text')
        .data(data, d => d)
        .join(
            enter => {
                enter.append('text').text(d => d)
                    .attr('x', -100).attr('y', (d, i) => 50 + i * 30)
                    .style('fill', '#EC7063')
                    .transition().attr('x', 30)
            },
        );
}
function update4(data) {
    thisSVG.selectAll('text')
        .data(data, d => d)
        .join(
            enter => {
                enter.append('text').text(d => d)
                    .attr('x', -100).attr('y', (d, i) => 50 + i * 30)
                    .style('fill', '#5499C7')
                    .transition().attr('x', 30)
            },
        );
}

// function pic1() {
//     d3.image(
//         `https://pbs.twimg.com/profile_images/1138375574726955008/1fNUyEdv_400x400.png`,
//         { crossOrigin: "anonymous" }).then((img) => {
//             document.body.append(img);
//         });
// }

// $(".spring").click(function(){                                //click事件
//     $("#pic").attr("src","pic/spring1.jpg");//要更換的圖片位置
// });
function change() {
    window.location.replace("next/index.html")
}

function showtext1() {

    var one = document.getElementById("one");
    one.style.display = "block";   // 显示，不隐藏
    //document.getElementById("one").value="巴陵大橋";
    one.innerHTML='巴陵大橋';

    var two = document.getElementById("two");
    two.style.display = "block";   // 显示，不隐藏
    two.innerHTML='武陵農場';

    var three = document.getElementById("three");
    three.style.display = "block";   // 显示，不隐藏
    three.innerHTML='合歡北峰';

    // var mm = document.getElementById("mm");
    // mm.style.position='absolute';
    // mm.style.top='100px';
    // mm.style.left='65%';
    // mm.style.float='left';
    // mm.style.width= '80px';
    // mm.style.writingMode=' horizontal-tb';
}

function showtext2() {

    var one = document.getElementById("one");
    one.style.display = "block";   // 显示，不隐藏
    one.innerHTML='暗空公園';

    var two = document.getElementById("two");
    two.style.display = "block";   // 显示，不隐藏
    two.innerHTML='飛鵝山';

    var three = document.getElementById("three");
    three.style.display = "block";   // 显示，不隐藏
    three.innerHTML='萬宜水庫';

    var four = document.getElementById("four");
    four.style.display = "block";   // 显示，不隐藏
    four.innerHTML= '三仙台';
}

function showtext3() {

    var one = document.getElementById("one");
    one.style.display = "block";   // 显示，不隐藏
    one.innerHTML='廣西南寧';

    var two = document.getElementById("two");
    two.style.display = "block";   // 显示，不隐藏
    two.innerHTML= '日本沖繩';

    var three = document.getElementById("three");
    three.style.display = "none";   // 显示，不隐藏

    var four = document.getElementById("four");
    four.style.display = "none";   // 显示，不隐藏
}

function showtext4() {
    var one = document.getElementById("one");
    one.style.display = "block";   // 显示，不隐藏
    one.innerHTML='湖北';

    var two = document.getElementById("two");
    two.style.display = "block";   // 显示，不隐藏
    two.innerHTML= '日本長野';
}

$("#back").click(function () {
    window.location.replace("../#work");
});