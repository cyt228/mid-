let pageData = {
    productName: 'Book a Cruise to the Moon',
    productDescription: 'Cruise to the moon in our luxurious shuttle. Watch the astronauts working outside the International Space Station.',
    imageSrc: [
        "../pic/spring1.jpg",
        "../pic/spring2.jpg",
        "../pic/spring3.jpg",
        "../pic/summer1.jpg",
        "../pic/summer2.jpg",
        "../pic/summer3.jpg",
        "../pic/summer4.jpg",
        "../pic/autumn1.jpg",
        "../pic/summer2.jpg",
        "../pic/winter1.jpg",
        "../pic/winter2.jpg"
    ],
    place: [
        '巴陵大橋', '武陵農場', '合歡北峰',
        '合歡山暗空公園', '飛鵝山', '萬宜水庫西壩', '台東三仙台',
        '廣西南寧', '日本沖繩',
        '湖北', '日本長野'
    ],
    h2ClassController: {
        centered: true,
        colorFont: false
    },
    pStyleController: {
        'margin-left': '50px',
        color: 'blue',
        'font-size': '20px',
        'font-style': 'italic'
    },
    imageStyleController: {
        margin: 'auto',
        display: 'block',
        width: '50%'
    },
    imageAlt: "Photo from space",
    productClasses: [
        {
            name: 'Coach',
            price: 125000,
            seatsAvailable: 20,
            earlyBird: true
        },
        {
            name: 'Business',
            price: 275000,
            seatsAvailable: 6,
            earlyBird: true
        },
        {
            name: 'First',
            price: 430000,
            seatsAvailable: 2,
            earlyBird: false
        }
    ]

};

const app = Vue.createApp({
    data() {
        return pageData;
    }
});

app.mount("#app");

// window.onload = function () {
//     var name = document.getElementById("name");
//     name.innerHTML=pageData.place[(Math.floor(Math.random()*place.length))];
// }

// function click(){
//     window.location.replace("form/index.html");
// }
$(".move").click(function () {
    window.location.replace("form/index.html");
});

$("#back").click(function () {
    window.location.replace("../index.html");
});
