var sIndex = 0;
var requestedIds = [];
var eid = localStorage.getItem('carId');
mui.init({
	pullRefresh: {
		container: "#refreshContainer",
		down: {
			height: 30,
			auto: false,
			contentdown: "下拉可以刷新",
			contentover: "释放立即刷新",
			contentrefresh: "正在刷新...",
			callback: downfresh
		},
		up: {
			height: 30,
			auto: false,
			contentrefresh: "正在加载...",
			contentnomore: '没有更多数据了',
			callback: upfresh
		}
	}
});
mui.plusReady(function() {
	//返回顶部
	document.querySelector('.float-btn').addEventListener('tap', function() {
		mui('#refreshContainer').pullRefresh().scrollTo(0, 0, 100);
	}, false);
	//汽车大全
	mui('.nav').on('tap', '.allcar', function() {
		mui.openWindow({
			id: 'allcar',
			url: 'subpage.html',
			extras: {
				detailTitle: this.innerText,
				detailUrl: 'http://auto.3g.163.com'
			}
		});
	});
	//购车指南
	mui('.nav').on('tap', '.buycar', function() {
		mui.openWindow({
			id: 'buycar',
			url: 'subpage.html',
			extras: {
				detailTitle: this.innerText,
				detailUrl: 'http://auto.3g.163.com/bestsales'
			}
		});
	});
	//违章曝光
	mui('.nav').on('tap', '.fine', function() {
		mui.openWindow({
			id: 'fine',
			url: 'subpage.html',
			extras: {
				detailTitle: this.innerText,
				detailUrl: 'http://gdriver.auto.163.com'
			}
		});
	});
	mui('.list').on('tap', 'li', function() {
		mui.openWindow({
			id: 'detailli',
			url: 'subpage.html',
			extras: {
				detailTitle: this.title,
				detailUrl: this.detailurl
			}
		});
	});
	var localData = localStorage.getItem('carData');
	console.log(localStorage.getItem('carData'));
	if(localData) {
		localData = localData.split('+');
		localData.reverse();
//		console.log(localData[0]);
		var ul = document.querySelector('.list');
		for(var i = 0; i < localData.length; i++) {
//			console.log(tempDataObj);
			var tempDataObj = JSON.parse(localData[i]);
			addItem(tempDataObj, ul,false);
		}
	}
	else{
		getData(0, false);
	}
});
//上拉加载
function upfresh() {
	var that = this;
	mui.ajax('http://c.m.163.com/nc/auto/list/5bm%2F5bee/' + sIndex + '-10.html', {
		dataType: 'json',
		type: 'get',
		success: function(data) {
			var ul = document.querySelector('.list');
			var arrobj = data.list;
//			if(eid) {
//				eid = localStorage.getItem('carId').split('+');
//			}
			for(var i = 0; i < arrobj.length; i++) {
				if(requestedIds.indexOf(arrobj[i].docid) === -1){
					requestedIds.push(arrobj[i].docid);
					if(eid) {
						console.log(eid.indexOf(arrobj[i].docid));
						if(eid.indexOf(arrobj[i].docid) === -1) {
							addItem(arrobj[i], ul,false);
						}
					} else {
						addItem(arrobj[i], ul,false);

					}
				}
			}
			that.endPullupToRefresh(false);
		},
		error: function() {
			that.endPullupToRefresh(true);
		}
	});
	sIndex += 10;
}
//下拉刷新
function downfresh() {
	getData(0, true);
//	sIndex += 10;
}
//获取网络数据
function getData(startIndex, isDownfresh) {
	mui.ajax('http://c.m.163.com/nc/auto/list/5bm%2F5bee/' + startIndex + '-10.html', {
		dataType: 'json',
		type: 'get',
		success: function(data) {
			var ul = document.querySelector('.list');
			var arrobj = data.list;
			var localStr = '';
			var exitId = '';
//			if(eid) {
//				eid = localStorage.getItem('carId').split('+');
//			}
			for(var i = 0; i < arrobj.length; i++) {
				var tempObj = new Object();
				tempObj.url_3w = arrobj[i].url_3w;
				tempObj.title = arrobj[i].title;
				tempObj.imgsrc = arrobj[i].imgsrc;
				tempObj.ptime = arrobj[i].ptime;
				tempObj.digest = arrobj[i].digest;
				if(requestedIds.indexOf(arrobj[i].docid) === -1){
					requestedIds.push(arrobj[i].docid);
					if(eid) {
						if(eid.indexOf(arrobj[i].docid) === -1) {
//							exitId += arrobj[i].docid;
//							localStr += JSON.stringify(tempObj);
//							if(i !== arrobj.length - 1) {
//								localStr += '+';
//								exitId += '+';
//							}
							addItem(arrobj[i], ul,true);
						}
					} else {
						exitId += arrobj[i].docid;
						localStr += JSON.stringify(tempObj);
						if(i !== arrobj.length - 1) {
							localStr += '+';
							exitId += '+';
						}
						addItem(arrobj[i], ul,true);
					}
				}
			}
			if(localStr !== '' && exitId !== ''){
				localStorage.setItem('carData', localStr);
				localStorage.setItem('carId', exitId);
			}else{
				mui.toast('这已经是最新的信息了！');
			}
			if(isDownfresh) {
				mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
			}
		}
	});
}
//添加li子节点
function addItem(obj, parentObj,isinsetbefore) {
	var li = document.createElement('li');
	li.detailurl = obj.url_3w;
	li.title = obj.title;
	li.className = 'list-item';
//	li.innerHTML = '<img src="' + obj.imgsrc + '" alt="" /><div><p>' + obj.title + '</p><p class="time">发表于' + obj.ptime + '</p></div><p>' + obj.digest + '</p>';
	li.innerHTML = '<img src="' + obj.imgsrc + '" alt="" /><div><p>' + obj.title + '</p><p class="time">发表于' + obj.ptime + '</p></div>';
	if(isinsetbefore) {
		parentObj.insertBefore(li, parentObj.firstChild);
	} else {
		parentObj.appendChild(li);
	}
}