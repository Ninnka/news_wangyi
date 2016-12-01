var subPages = [
	"template/fitness.html",
	"template/economic.html",
	"template/car.html",
	"template/science.html",
	"template/sport.html",
	"template/furnishing.html",
	"template/military.html",
	"template/movie.html",
	"template/entertamain.html",
	"template/home.html"
];
var subPagesStyle = {
	top: "36px",
	bottom: "0px"
};

var currPageIndex = 0;

// 添加子页面
function addSubPages() {

	var self = plus.webview.currentWebview();

	for(var i = 0; i < 1; i++) {
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
		console.log("a length: "+this.offsetWidth);
		var target_tab_href = this.getAttribute("href");
		if(target_tab_href === tab_active) {
			return;
		} else {
			if(plus.webview.getWebviewById(target_tab_href) === null) {
				var tempPage = plus.webview.create(target_tab_href, target_tab_href, subPagesStyle);
				plus.webview.currentWebview().append(tempPage);
			}
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

//		mui(".mui-scroll-wrapper").scroll({
//			scrollY: false,
//			scrollX: false,
//			startX: 300,
//			startY: 0,
//			indicators: false,
//			bounce: true
//		});

	// test
	// 窗口宽度
//	console.log("window width: "+document.body.clientWidth);

	var msw = mui("#nav_scroll_wrapper");
	var mswDom = msw[0];

	var ms = mui(".mui-scroll");
	var msDom = ms[0];
	// 滚动条宽度
//	console.log("msDom length: "+msDom.offsetWidth);

//	msw.scroll().scrollTo(-300, 0, 1000);

	var ssm = msDom.style.transform.match(/translate3d\((.+),/);

	var ssma = ssm[1].split(", ");
	// x偏移距离
//	console.log(parseInt(ssma[0], 10));



});