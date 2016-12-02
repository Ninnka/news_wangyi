function upGet(item) {
	var eco_data = localStorage.getItem("spo_storage");
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
			if(!item.imgextra) {
				var li = document.createElement('li');
				var img = document.createElement('img');
				var h5 = document.createElement('h5');
				var p = document.createElement('p');
				var h6 = document.createElement('h6');
				//保存详情页网址
				if(item.boardid === "dy_wemedia_bbs") {
					li.url = 'http://dy.163.com/v2/article/detail/' + item.postid + '.html';
				} else {
					li.url = item.url_3w || item.url;
				}
				//保存详情页标题
				li.title = item.title;
				img.src = item.imgsrc;
				h5.innerHTML = item.title;
				p.innerHTML = item.digest;
				li.className = 'mui-table-view-cell mui-media skip';
				img.className = 'mui-media mui-pull-left';
				p.className = 'mui-ellipsis';
				h6.innerHTML = item.lmodify.slice(10) + "  跟帖 " + item.replyCount;
				li.appendChild(img);
				li.appendChild(h5);
				li.appendChild(p);
				li.appendChild(h6);
				ul.appendChild(li);
			} else {
				var li = document.createElement('li');
				var img1 = document.createElement('img');
				var img2 = document.createElement('img');
				var img3 = document.createElement('img');
				var h4 = document.createElement('h4');
				var imgs = document.createElement('h4');
				//保存详情页网址
				if(item.url_3w || item.skipID) {
					li.url = item.url_3w || ('http://sports.163.com/photoview/' + item.skipID.replace('|', "/") + '.html');
				} else {
					li.url = 'http://dy.163.com/v2/article/detail/' + item.postid + '.html';
				}
				//保存详情页标题
				li.title = item.title;
				img1.src = item.imgsrc;
				img2.src = item.imgextra[0]['imgsrc'];
				img3.src = item.imgextra[1]['imgsrc'];
				h4.innerHTML = item.title;
				li.className = 'mui-table-view-cell mui-media';
				img1.className = 'img3';
				img2.className = 'img3';
				img3.className = 'img3';
				li.appendChild(h4);
				imgs.appendChild(img1);
				imgs.appendChild(img2);
				imgs.appendChild(img3);
				li.appendChild(imgs);
				ul.appendChild(li);
			}
		}
	}
}