var subPages = [
	"template/home.html",
	"template/fitness.html",
	"template/economic.html",
	"template/car.html",
	"template/science.html",
	"template/sport.html",
	"template/furnishing.html",
	"template/military.html",
	"template/movie.html",
	"template/entertamain.html"
];
var subPagesStyle = {
	top: "36px",
	bottom: "0px"
};

var currPageIndex = 0;

// 添加子页面
function addSubPages() {

	var self = plus.webview.currentWebview();

	for(var i = 0; i < subPages.length; i++) {
		var tempPage = plus.webview.create(subPages[i], subPages[i], subPagesStyle);
		if(i > 0) {
			tempPage.hide();
		}
		self.append(tempPage);
	}
}

// 顶部选项卡点击事件
function addScrollTabItemClickListener() {
	var tab_active = subPages[0];
	mui(".mui-scroll").on("tap", "a", function(e) {
		var target_tab_href = this.getAttribute("href");
		if(target_tab_href === tab_active) {
			return;
		} else {
			plus.webview.hide(tab_active);
			tab_active = target_tab_href;
			plus.webview.show(tab_active);
		}
	});
}

// 准备完毕
mui.plusReady(function() {
	mui.init();
	addSubPages();
	addScrollTabItemClickListener();
	mui('.mui-scroll-wrapper').scroll({
		scrollY: false, //是否竖向滚动
		scrollX: true, //是否横向滚动
		startX: 0, //初始化时滚动至x
		startY: 0, //初始化时滚动至y
		indicators: false, //是否显示滚动条
		bounce: false, //是否启用回弹
	});

});