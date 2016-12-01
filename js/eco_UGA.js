function upGet(item) {
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