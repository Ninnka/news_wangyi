//回到顶部
		document.querySelector('.float-btn').addEventListener('tap',function(){
			mui('#refreshContainer').pullRefresh().scrollTo(0,0,200);
		});