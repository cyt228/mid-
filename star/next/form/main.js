let pageData = {
    graduationIndex: 0,
    graduationList: [
        '男生',
        '女生',
        '不透露'
    ],
    name: '',
    number:'',
    club_experience: false,
    work_experience: '無',
    statusList: [
        '',
        '一 ~ 五次',
        '六 ~ 九次',
        '十次以上'],
    selectedIndex: 0,
    summary: "",
    result: 0,
    showResult: false
};

let pageMethods = {
    displaySummary() {
        this.summary = `${this.name} : 電話: ${this.number}, ${this.graduationList[this.graduationIndex]}
    , 露營用品:${this.club_experience}, 
    ${this.work_experience}露營經驗${this.statusList[this.selectedIndex]}`;
    },

    calculate() {
        this.showResult = true;
    },

    clearResult() {
        this.showResult = false;
    },

    reset_work_experience() {
        if (this.work_experience == '無') {
            this.selectedIndex = 0;
        }
    }
};

let pageComputed = {
    result_realtime() {
        this.result = eval(3200 + 300 * this.graduationIndex + 200 * this.selectedIndex);
        if (this.club_experience) this.result += 200;
        return this.result;
    }
};

Vue.createApp({
    data() {
        return pageData;
    },
    methods: pageMethods,
    computed: pageComputed
}).mount("#app");

$('#restart').on("click",function(){ //多加
    window.location.reload();
});

$("#back").click(function () {
    window.location.replace("../index.html");
});