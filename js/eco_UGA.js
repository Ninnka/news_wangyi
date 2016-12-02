function upGet(item) {
	var eco_data = localStorage.getItem("eco_storage");
	eco_data = eco_data.split('+++');
	for(var i = 0; i < eco_data.length; i++) {
		dataArr.push(JSON.parse(eco_data[i]));
	}
	for(var i = 0; i < dataArr.length; i++) {
		if(item.docid === dataArr[i]["docid"]) {
			item.i = false;
			break;
		} else {
			item.i = true;
		}
	}
	if(item.i) {
		if(!item.live_info) {
			var li = document.createElement('li');
			var img = document.createElement('img');
			var h5 = document.createElement('h5');
			var p = document.createElement('p');
			var h6 = document.createElement('h6');
			//保存详情页网址
			li.url = item.url_3w;
			//保存详情页标题
			li.title = item.title;
			img.src = item.imgsrc;
			h5.innerHTML = item.title;
			p.innerHTML = item.digest;
			li.className = 'mui-table-view-cell mui-media';
			img.className = 'mui-media mui-pull-left';
			p.className = 'mui-ellipsis';
			h6.innerHTML = item.lmodify.slice(10) + "  跟帖 " + item.replyCount;
			li.appendChild(img);
			li.appendChild(h5);
			li.appendChild(p);
			li.appendChild(h6);
			ul.appendChild(li);
		}
	}
}

function upGet1(item) {
	if(!item.live_info) {
		var li = document.createElement('li');
		var img = document.createElement('img');
		var h5 = document.createElement('h5');
		var p = document.createElement('p');
		var h6 = document.createElement('h6');
		//保存详情页网址
		li.url = item.url_3w;
		//保存详情页标题
		li.title = item.title;
		img.src = item.imgsrc;
		h5.innerHTML = item.title;
		p.innerHTML = item.digest;
		li.className = 'mui-table-view-cell mui-media';
		img.className = 'mui-media mui-pull-left';
		p.className = 'mui-ellipsis';
		h6.innerHTML = item.lmodify.slice(10) + "  跟帖 " + item.replyCount;
		li.appendChild(img);
		li.appendChild(h5);
		li.appendChild(p);
		li.appendChild(h6);
		ul.appendChild(li);
	}
}