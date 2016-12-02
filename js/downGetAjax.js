function downGet(item) {
//	console.log(ul.children.length);
	for(var j = 0; j < ul.children.length; j++) {
//		console.log(item.imgsrc , ul.children[j].querySelector('img').src);
		if(item.imgsrc === ul.children[j].querySelector('img').src) {
			item.j = false;
			break;
		}else{
			item.j = true;
		}
	}
//	console.log(item.j);
	if(item.j) {
//		console.log(1);
		if(!item.live_info) {
			if(!item.imgextra) {
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
				h6.innerHTML = item.lmodify.slice(10) + "  跟帖 " + item.replyCount;
				li.className = 'mui-table-view-cell mui-media skip';
				img.className = 'mui-media mui-pull-left';
				p.className = 'mui-ellipsis';
				li.appendChild(img);
				li.appendChild(h5);
				li.appendChild(p);
				li.appendChild(h6);
				ul.insertBefore(li, ul.firstElementChild);
			} else {
				var li = document.createElement('li');
				var img1 = document.createElement('img');
				var img2 = document.createElement('img');
				var img3 = document.createElement('img');
				var h4 = document.createElement('h4');
				var h6 = document.createElement('h6');
				//保存详情页网址
				li.url = item.url_3w;
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
				h6.innerHTML = item.lmodify.slice(10) + "  跟帖 " + item.replyCount;
				h6.style.marginTop = 0;
				li.appendChild(h4);
				h4.appendChild(img1);
				h4.appendChild(img2);
				h4.appendChild(img3);
				li.appendChild(h6);
				ul.appendChild(li);
			}
		}
	}else{
//		console.log(0);
		mui.toast("已经是最新的信息！");
	}

}

function downGet1(item) {
	for(var j = 0; j < ul.children.length; j++) {
		if(item.imgsrc === ul.children[j].querySelector('img').src) {
			item.j = false;
			break;
		}else{
			item.j = true;
		}
	}
	if(item.j) {
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
				h6.innerHTML = item.lmodify.slice(10) + "  跟帖 " + item.replyCount;
				li.className = 'mui-table-view-cell mui-media skip';
				img.className = 'mui-media mui-pull-left';
				p.className = 'mui-ellipsis';
				li.appendChild(img);
				li.appendChild(h5);
				li.appendChild(p);
				li.appendChild(h6);
				ul.insertBefore(li, ul.firstElementChild);
		}
	}else{
//		console.log(0);
		mui.toast("已经是最新的信息！");
	}

}