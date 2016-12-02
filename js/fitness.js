var loadingFlag = false;
var currentCountMount = 0;
var limit = 10;
var scroll_content_wrapper = document.getElementById("scroll-content-wrapper");
var api_prefix = "http://c.m.163.com/nc/article/list/T1474366945287/";
var api_after = ".html";
var detailUrlPrefix = "http://dy.163.com/v2/article/T1474366945287.html#";

var currentItemFirst;

var localFlag = true;

var repeatArr = [];

mui.init({
	pullRefresh: {
		container: '#refreshContainer',
		up: {
			height: 35,
			auto: false,
			contentrefresh: "死命加载中...",
			contentnomore: "没数据你还拉...",
			callback: getContactList
		},
		down: {
			height: 40,
			auto: false,
			contentrefresh: "死命刷新中...",
			contentdown: "要下拉就赶紧拉",
			contentover: "不松手你还想不想刷",
			contentnomore: "没数据你还刷...",
			callback: updateContactList
		}
	}
});

function createCardWrapper(item) {
	var card_wrapper = document.createElement("div");
	card_wrapper.className = "mui-card";
	card_wrapper.id = item.docid;

	var card_header = document.createElement("div");
	card_header.className = "mui-card-header";
	card_header.innerText = item.title

	var card_content = document.createElement("div");
	card_content.className = "mui-card-content";
	var img = document.createElement("img");
	img.src = item.imgsrc;
	var digest = document.createElement("p");
	digest.className = "content-digest";
	digest.innerText = item.digest;
	card_content.appendChild(img);
	card_content.appendChild(digest);

	var card_footer = document.createElement("div");
	card_footer.className = "mui-card-footer";
	var a_reply = document.createElement("a");
	a_reply.className = "mui-card-link";
	a_reply.innerText = "回复：" + item.replyCount;
	var a_vote = document.createElement("a");
	a_vote.className = "mui-card-link";
	a_vote.innerText = "点赞：" + item.votecount;
	var a_ptime = document.createElement("a");
	a_ptime.className = "mui-card-link";
	a_ptime.innerText = item.ptime.slice(0, 10);
	card_footer.appendChild(a_reply);
	card_footer.appendChild(a_vote);
	card_footer.appendChild(a_ptime);

	card_wrapper.appendChild(card_header);
	card_wrapper.appendChild(card_content);
	card_wrapper.appendChild(card_footer);

	return card_wrapper;
}

// 获取，上拉加载
function getContactList() {
	if(loadingFlag) return;
	loadingFlag = true;
	var moreFlag;

	var currApi = api_prefix + currentCountMount + "-" + limit + api_after;
	var that = this;

	mui.ajax(currApi, {
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		success: function(data) {
			var convertData = data["T1474366945287"];

			// 如果当前列表为空，将获取的数据保存在本地
			if(currentCountMount === 0) {
				// 调用存储函数
				storageToLocal(convertData);
			}

			// 装载视图
			for(var i = 0; i < convertData.length; i++) {
				if(i === 0 && currentCountMount === 0) {
					currentItemFirst = convertData[i];
				}
				if(repeatArr.length !== 0 && repeatArr.indexOf(convertData[i].docid) !== -1) {
					console.log("i: " + i);
					continue;
				} else {
					var card_wrapper = createCardWrapper(convertData[i]);

					scroll_content_wrapper.appendChild(card_wrapper);
				}
			}

			currentCountMount = currentCountMount + convertData.length;
			moreFlag = currentCountMount >= 66 ? true : false;

			// 强制结束，捕捉错误
			try {
				that.endPullupToRefresh(moreFlag);
			} catch(error) {}
			loadingFlag = false;
		},
		error: function() {
			that.endPullupToRefresh(moreFlag);
		}
	})
}

// 下拉刷新
function updateContactList() {
	var currApi = api_prefix + 0 + "-" + limit + api_after;
	var itemTop = scroll_content_wrapper.getElementsByClassName("mui-card")[0];

	mui.ajax(currApi, {
		dataType: 'json',
		type: 'get',
		success: function(data) {
			var convertData = data["T1474366945287"];

			// 调用存储函数
			storageToLocal(convertData);

			var newData = [];
			for(var i = 0; i < convertData.length; i++) {
				if(currentItemFirst.docid !== convertData[i].docid) {
					newData.push(convertData[i]);
					if(i === convertData.length - 1) {
						currentItemFirst = newData[0];
						break;
					}
				} else {
					if(i !== 0) currentItemFirst = newData[0];
					else mui.toast("已经是最新的啦");
					break;
				}
			}

			mui.each(newData, function(index, item) {
				var card_wrapper = createCardWrapper(item);
				scroll_content_wrapper.insertBefore(card_wrapper, itemTop);
			});

			var cards = scroll_content_wrapper.querySelectorAll(".mui-card");
			console.log("current cards.length: " + cards.length);
			repeatArr.length = 0;
			for(var j = cards.length - 1; j >= cards.length - newData.length; j--) {

				var lastcard = cards[j];
				repeatArr.push(j.id);
			}
			console.log("newData.length: " + newData.length);
			console.log("repeatArr.length: " + repeatArr.length);
			//			currentCountMount = currentCountMount + newData.length;
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		}
	});
}

// 将信息装载到视图，若无本地信息则发起网络请求
function mountStorage(data) {
	if(!data) {
		console.log("no local");
		getContactList();
	} else {
		console.log("local");
		var dataArr = data.split("+");
		var convertData = dataArr.map(function(item, index, arr) {
			return JSON.parse(item);
		});
		mui.each(convertData, function(index, item) {

			if(index === 0 && currentCountMount === 0) {
				currentItemFirst = item;
			}

			var card_wrapper = createCardWrapper(item);

			scroll_content_wrapper.appendChild(card_wrapper);

		});
		currentCountMount = currentCountMount + convertData.length;
		//		updateContactList();
	}
}

// 存储信息在本地
function storageToLocal(data) {
	var localinfo = data.map(function(item, index, arr) {
		return JSON.stringify(item);
	});

	localinfo = localinfo.join("+");
	window.localStorage.setItem("fitness", localinfo);
}

// 从本地读取信息
function getStorageFromLocal() {
	var localInfo = window.localStorage.getItem("fitness");
	return localInfo;
}

window.localStorage.setItem("a", 10);
// 准备完毕
mui.plusReady(function() {
	document.querySelector('.float-btn').addEventListener('tap', function() {
		mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 100);
	}, false);
	mui("#scroll-content-wrapper").on("tap", ".mui-card", function() {
		var du = detailUrlPrefix + this.id;
		mui.openWindow({
			id: this.id,
			url: "subpage.html",
			extras: {
				detailTitle: this.innerText,
				detailUrl: du
			}
		});
	});
	mountStorage(getStorageFromLocal());
});