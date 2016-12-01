var loadingFlag = false;
var currentCountMount = 0;
var limit = 10;
var scroll_content_wrapper = document.getElementById("scroll-content-wrapper");
var api_prefix = "http://c.m.163.com/recommend/getChanListNews?size=";

var currentItemFirst;

mui.init({
	pullRefresh: {
		container: '#refreshContainer',
		up: {
			height: 35,
			auto: true,
			contentrefresh: "死命加载中...",
			contentnomore: "没数据你还拉...",
			callback: getContactList
		},
		down: {
			height: 40,
			auto: false,
			contentrefresh: "死命刷新中...",
			contentdown: "要下拉就赶紧拉",
			contentover: "别拉那么多，赶紧收手",
			contentnomore: "没数据你还刷...",
			callback: updateContactList
		}
	}
});

function getContactList() {
	if(loadingFlag) return;
	loadingFlag = true;
	var currApi = api_prefix + (currentCountMount + limit);
	var that = this;
	var flag;

	mui.ajax(currApi, {
		dataType: 'json',
		type: 'get',
		timeout: 10000,
		success: function(data) {
			var convertData = data.段子;
			//			console.log(convertData.length);
			mui.each(convertData, function(index, item) {

				if(index === 0 && currentCountMount === 0) {
					currentItemFirst = item;
				}

				var card_wrapper = document.createElement("div");
				var card_content = document.createElement("div");
				var card_footer = document.createElement("div");
				card_wrapper.className = "mui-card";
				card_content.className = "mui-card-content card-item-wrapper";
				card_footer.className = "mui-card-footer";

				var p_title = document.createElement("p");
				p_title.className = "content-title";
				p_title.innerText = item.title;
				card_content.appendChild(p_title);

				var p_digest = document.createElement("p");
				p_digest.className = "content-digest";
				p_digest.innerText = item.digest;
				card_content.appendChild(p_digest);

				var a_reply = document.createElement("a");
				a_reply.className = "mui-card-link";
				a_reply.innerText = "回复：" + item.replyCount;
				card_footer.appendChild(a_reply);

				var a_retrive = document.createElement("a");
				a_retrive.className = "mui-card-link";
				a_retrive.innerText = "出自：" + item.source;
				card_footer.appendChild(a_retrive);

				card_wrapper.appendChild(card_content);
				card_wrapper.appendChild(card_footer);

				scroll_content_wrapper.appendChild(card_wrapper);
			});
			currentCountMount = currentCountMount + convertData.length;
			flag = currentCountMount >= 40 ? true : false;
			that.endPullupToRefresh(flag);
			loadingFlag = false;
		}
	})
}

function updateContactList() {
	var currApi = api_prefix + (0 + limit);
	var itemTop = scroll_content_wrapper.getElementsByClassName("mui-card")[0];

	mui.ajax(currApi, {
		dataType: 'json',
		type: 'get',
		success: function(data) {
			var convertData = data.段子;
			//			console.log(convertData.length);
			var newData = [];
//			console.log("currentItemFirst.docid: " + currentItemFirst.docid)
			mui.each(convertData, function(index, item) {
//				console.log("item.docid: " + item.docid);
				if(currentItemFirst.docid !== item.docid) {
					newData.push(item);
					if(index === convertData.length - 1) {
						currentItemFirst = newData[0];
					}
				} else {
					currentItemFirst = newData[0];
				}
//				console.log(newData.length);

			});

			mui.each(newData, function(index, item) {
				var card_wrapper = document.createElement("div");
				var card_content = document.createElement("div");
				var card_footer = document.createElement("div");
				card_wrapper.className = "mui-card";
				card_content.className = "mui-card-content card-item-wrapper";
				card_footer.className = "mui-card-footer";

				var p_title = document.createElement("p");
				p_title.className = "content-title";
				p_title.innerText = item.title;
				card_content.appendChild(p_title);

				var p_digest = document.createElement("p");
				p_digest.className = "content-digest";
				p_digest.innerText = item.digest;
				card_content.appendChild(p_digest);

				var a_reply = document.createElement("a");
				a_reply.className = "mui-card-link";
				a_reply.innerText = "回复：" + item.replyCount;
				card_footer.appendChild(a_reply);

				var a_retrive = document.createElement("a");
				a_retrive.className = "mui-card-link";
				a_retrive.innerText = "出自：" + item.source;
				card_footer.appendChild(a_retrive);

				card_wrapper.appendChild(card_content);
				card_wrapper.appendChild(card_footer);
				scroll_content_wrapper.insertBefore(card_wrapper, itemTop);
			});
			currentCountMount = currentCountMount + newData.length;
			mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
		}
	});
}

mui.plusReady(function() {
	document.querySelector('.float-btn').addEventListener('tap', function() {
		mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 100);
	}, false);
});