(function(Element, Time) {
	var dom = function (dom, obj) {
		var res = [];
		if(obj) {
			for(var i=0, l = obj.length; i<l; i++) {
				var query = obj[i].querySelectorAll(dom);
				for(var j=0, _l=query.length; j<_l; j++)
					res.push(query[j]);
			}
		} else {
			res = document.querySelectorAll(dom);
		}
		return res;
	};

	function each(obj, callback){
		for(var i=0, l=obj.length;i<l;i++) 
			callback(i, obj[i]);
	}

	function removeClass(ele,cls) {
		if (ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))) {
			var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
			ele.className=ele.className.replace(reg,' ');
		}
	}
	var Slides = dom('.'+Element);
	var InterId = new Array();
	each(Slides, function(i, Slide) {
		/*初始化*/
		var List = dom('li', [Slide]);	
		List[0].className += " display";
		each(List, function(i, item) {
			item.setAttribute('data', i+1);
		});

		/*根据第一张图片确定灯箱的高和宽*/
		var ImageFirst = dom('li img', [Slide])[0];
		var width = ImageFirst.width;
		var height = ImageFirst.height;

		/*强制设置灯箱和每张图片的高宽*/
		Slide.style.width = width + 'px';
		Slide.style.height = height + 'px';
		each(List, function(i, item){
			item.style.width = width + 'px';
			item.style.height = height + 'px';
		});	

		/*动态加载播放翻页按钮*/
		SlideControlHtml  = document.createElement('div');
		SlideControlHtml.className = 'slide-control';
		SlideControlHtml.style.width = width + 'px';
		for(i=1,l=List.length;i<=l;i++) {
			var child = document.createElement('span');
			child.setAttribute('id', 'slide-button-'+i);
			child.className = 'slide-button';
			child.setAttribute('data', i);
			child.onclick = function() {
				InterId[i] = ResetInterval(InterId[i]);
				removeClass(dom('.display', [Slide])[0], 'display');
				var number = parseInt(this.getAttribute('data')) - 1;
				dom('li', [Slide])[number].className += " display";				
			}
			SlideControlHtml.appendChild(child);
		}
		Slide.parentNode.insertBefore(SlideControlHtml, Slide.nextElementSibling);

		/*设置自动播放*/
		ResetInterval = function(Id) {
			return Id != null ? clearInterval(Id) : setInterval('Next()', Time);
		}
		InterId[i] = ResetInterval(InterId[i]);

		/*主要翻页函数*/
		Next = function() {
			var Now = dom('.display', [Slide])[0];
			removeClass(Now, 'display');
			var Next = Now.nextElementSibling;
			var res = Next != null ? Next : dom('li:first-child', [Slide])[0];
			res.className += " display";
		}
		Prev = function() {
			var Now = dom('.display', [Slide])[0];
			removeClass(Now, 'display');
			var Prev = Now.prevElementSibling;
			var res = prev !=  null ? Prev : dom('li:last-child', [Slide])[0];
			res.className += " display";
		}
	});
})('slide', 1500);
