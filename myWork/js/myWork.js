all(7,3);//参数改变的话，对应的Css也要改；
//当前页面封装的函数；
	function all(xliSum,yLiSum){
		var demo_1=document.querySelector("#demo_1");
		var demo_2=document.querySelector("#demo_2");
		var demo_3=document.querySelector("#demo_3");
		
		var bgList=demo_1.querySelector(".list");//
		var bgLis=bgList.getElementsByTagName("li");
		var onoff=true;
		var demoNum=0;//全屏滚动的参考变量；
		var xLi=xliSum;
		var yLi=yLiSum;
		var liLength=xLi*yLi;
		var perX=bgList.offsetWidth/xLi;
		var perY=bgList.offsetHeight/yLi;
		var bgNum=1;
		var bgTabSwitch=true;
		var snowSwitch=true;
		var demo_1_timer=null;
		var demo_3_timer=null;
		
		//window;
		window.onresize=function(){
			perX=bgList.getBoundingClientRect().width/xLi;
			perY=bgList.getBoundingClientRect().height/yLi;
			setBackgroundPosition();
			pianoLiPosition();
		};
		
		//demo1;
		setTime();
		var timeTimer=setInterval(setTime,1000);
		createRandomArr();
		appendBackgroundLi();
		setBackgroundPosition();
		backgroundStartTab();
	
		function setTime(){
			var time=demo_1.querySelector(".time");
			var timeStr=time.querySelector(".timeStr");
			var dateStr=time.querySelector(".dateStr");
			function oT(n){
				return n=n<10 ?"0"+n :n;
			};
			var dayArr=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
			var oDate=new Date();
			var y=oT(oDate.getFullYear());
			var mon=oT(oDate.getMonth()+1);
			var d=oT(oDate.getDate());
			var day=dayArr[oDate.getDay()];
			var h=oT(oDate.getHours());
			var min=oT(oDate.getMinutes());
			var s=oT(oDate.getSeconds());
			timeStr.innerHTML=h+":"+min+":"+s;
			dateStr.innerHTML=y+"/"+mon+"/"+d+"，"+day;
		};//demo1 时间；
		
		function createRandomArr(){
			var indexArr=[];
			for(var i=0;i<liLength;i++){
				indexArr.push(i);
			};
			return indexArr;
		};
		
		function appendBackgroundLi(){
			for(var i=0;i<liLength;i++){
				var li=document.createElement("li");
				bgList.appendChild(li);
			};
		};
		
		function setBackgroundPosition(){
			for(var i=0;i<bgLis.length;i++){
				var x=i%xLi;
				var y=Math.floor(i/xLi);
				bgLis[i].style.backgroundPosition=(x*-perX)+"px "+(y*-perY)+"px";
			};
		};
		
		function backgroundStartTab(){
			demo_1_timer=setInterval(function(){
				bgNum++;
				if(bgNum>10){
					bgNum=1;
				};
				backgroundTab(bgNum)
				wordTab(bgNum);
			},8000);
			
			function backgroundTab(bgNum){
				var newArr=createRandomArr();
				var index=0;
				newArr.sort(function(){
					return Math.random()-0.5;
				});
				var timer=setInterval(function(){
					bgLis[newArr[index]].style.backgroundImage="url(img/demo1/"+bgNum+".jpg)";
					if(index>liLength-2){
						clearInterval(timer);
					};
					index++;
				},30);
			};
			
			function wordTab(bgNum){
				var word=$(demo_1).find(".word");
				var wordHeight=word.height();
				var wordArr=
					["“岁月不待人，青春不留白。”",
					"“真理惟一可靠的标准就是永远自相符合。”",
					"“时间是一切财富中最宝贵的财富。”",
					"“见贤思齐焉，见不贤而内自省也。”",
					"“正着看是现实，反着看是实现。”",
					"“乘风破浪会有时，直挂云帆济沧海。”",
					"“纸上得来终觉浅，绝知此事要躬行。”",
					"“学而不厌，诲人不倦。”",
					"“业精于勤荒于嬉，行成于思毁于随。”",
					"“勿以恶小而为之，勿以善小而不为。”"
					];
				if(wordHeight){
					word.animate({"height":"0px"},400,function(){
						$(this).text(wordArr[bgNum-1]).animate({"height":wordHeight+"px"},400);
					});
				};
			};
		};
		
		
		//document;
		addWheelEvent(document,down,up);
		addEvent(document,"keydown",keyDown);
		addEvent(document,"mousemove",prevent);
		function prevent(ev){
			preventDefault(ev);
		};
	
		function down(){
			if(onoff){
				demoNum++;
				if(demoNum>3){
					demoNum=3;
				};
				common();
			};
		};//滚轮向后（向下）事件；
	
		function up(){
			if(onoff){
				demoNum--;
				if(demoNum<0){
					demoNum=0;
				};
				common();
			};
		};//滚轮向前（向上）事件；
	
		function keyDown(ev){
			if(onoff){
				if(ev.keyCode&&ev.keyCode==40){
					demoNum++;
					if(demoNum>3){
						demoNum=3;
					};
					common();
				};
				if(ev.keyCode&&ev.keyCode==38){
					demoNum--;
					if(demoNum<0){
						demoNum=0;
					};
					common();
				};
				onoff=false;
			};
			setTimeout(function(){
				onoff=!onoff;
			},1000);
		};//键盘按下事件；
		
		function pointsClick(){
			var demoPointsLi=document.querySelectorAll("#demoPoints li");
			for(var i=0;i<demoPointsLi.length;i++){
				(function(i){
					addEvent(demoPointsLi[i],"click",function(){
						demoNum=i;
						common();
					})
				})(i);
			};
		};//右侧栏点的点击事件；


		function common(){
			demoWrapMove();//移动一屏；	
			headerText(demoNum);//头部显示第几屏；
			resetActive(demoNum);//重置右侧栏点的样式；
			backgroundTabJudge();//1:启动demo1背景图片计时器；
			demo_2_Show();//2:启动demo2动画；
			snowJudge();//3:启动demo3降雪动画。
			demo_4_show();//4:启动日历；
		};//键盘、右侧栏点击和滚轮搜执行的共同函数；
		
		function demoWrapMove(){
			var demoWrap=$("#demoWrap");
			setTimeout(function(){
				demoWrap.stop().animate({"top":-demoNum*100+"vh"},800);
			},100);
			onoff=false;
			setTimeout(function(){
				onoff=true;
			},2000);
		};
		
		function headerText(demoNum){
			var demoChangeBox=document.querySelector("#header>.demoNum");
			setTimeout(function(){
				demoChangeBox.innerHTML=demoNum+1;
			},1000);
		};
		
		function resetActive(demoNum){
			var demoPointsLi=document.querySelectorAll("#demoPoints li");
			for(var i=0;i<demoPointsLi.length;i++){
				demoPointsLi[i].className="";
			};
			demoPointsLi[demoNum].className="active";
		};
		
		function backgroundTabJudge(){
			if(demoNum==0&&bgTabSwitch){
				bgTabSwitch=false;
				backgroundStartTab();
				setTime();
				timeTimer=setInterval(setTime,1000);
			}else{
				bgTabSwitch=true;
				clearInterval(demo_1_timer);
				clearInterval(timeTimer);
			};
		};
		
		function demo_2_Show(){
			if(demoNum==1){
				setTimeout(function(){
					$(form).fadeIn(3000);
					titleMove();
				},500);
			}else{
				titleOut();
			};
		};
		
		function snowJudge(){
			if(demoNum==2&&snowSwitch){
				demo_3_timer=setInterval(snowing,1200);
				snowSwitch=false;
			}else{
				clearInterval(demo_3_timer);
				demo_3_timer=null;
				snowSwitch=true;
			};
		};
		
		function demo_4_show(){
			if(demoNum==3){
				setTimeout(function(){
					$("#calendar")
					.css({"transform":"scale(1)","transform":"translate(-50%,-50%)"});
				},400);
			}else{
				$("#calendar").css({"transform":"scale(.1)"});
			};
		};
		
		
	 	pointsClick();
	 	pianoLiPosition();
	 	pianoBoxHover();
	 	pianoHover();
		
		function titleMove(){
			var photos=demo_2.querySelectorAll(".photo");
			var title=demo_2.querySelector(".title");
			var arr=[
				function(){$(photos).eq(0).animate({"top":"20%"},1000);},
				function(){$(photos).eq(1).animate({"left":"15%"},600);},
				function(){$(photos).eq(2).animate({"left":"35%"},600);},
				function(){$(photos).eq(3).animate({"top":"65%"},600);}
			];
			$(title).find("li").eq(0).stop().animate({"left":"200%"},500,function show(){
				$(this).next("li").stop().animate({"left":"200%"},500,show);
			});
			for(var i=0;i<arr.length;i++){
				(function(i){
					setTimeout(function(){
						arr[i]();				
					},i*500);
				})(i);
			};
		};//demo2 进场动画；
		
		function titleOut(){
			var photos=demo_2.querySelectorAll(".photo");
			var title=demo_2.querySelector(".title");
			var titleLi=title.querySelectorAll("li");
			var arr=[
				function(){$(photos).eq(0).animate({"top":"-40%"},100);},
				function(){$(photos).eq(1).animate({"left":"-25%"},100);},
				function(){$(photos).eq(2).animate({"left":"125%"},100);},
				function(){$(photos).eq(3).animate({"top":"140%"},100);}
			];
			$(titleLi).stop().animate({"left":"-100%"});
			for(var i=0;i<arr.length;i++){
				arr[i]();
			};
		};//demo2 出场动画；
		
		function snowing(){
			var o=document.createElement("span");
			o.className="drop";
			dropNum=8;
			o.innerHTML="❄";
			o.style.left=Math.random()*window.innerWidth+"px";
			demo_3.appendChild(o);
			setInterval(function(){
				drop();
			},100);
		};//demo3 create span elment and push into demo3;
	
		function drop(){
			var  spans=demo_3.querySelectorAll("span");
			for(var i=0;i<spans.length;i++){
				spans[i].style.top=parseInt(css(spans[i],"top"))+dropNum+"px";
				if(parseInt(css(spans[i],"top"))>window.innerHeight){
					spans[i].className="";
					demo_3.removeChild(spans[i]);
				};
			};
		};//demo3 雪花控制；
		
		function pianoLiPosition(){
			var piano=demo_3.querySelector(".piano");
			var blackKey=demo_3.querySelector(".blackKeyBoard");
			var pianoW=piano.getBoundingClientRect().width/8;
			var pianoLi=piano.querySelectorAll(".box>.piano>li");
			var blackLi=blackKey.querySelectorAll(".blackKeyBoard>li");
			for(var i=0;i<pianoLi.length;i++){
				pianoLi[i].style.left=i*pianoW+"px";
			};
			for(var i=0;i<blackLi.length;i++){
				if(i<=1){
					blackLi[i].style.left=pianoW/2+i*pianoW+"px";
				}else{
					blackLi[i].style.left=pianoW*(i+1.5)+"px";
				};
			};
		};
		
		function pianoBoxHover(){
			var box=demo_3.querySelector(".box");
			$(".demo_3>.box").hover(function(){
				$(this).stop().animate({"bottom":"100px"},100);
			},function(){
				$(this).stop().animate({"bottom":"0px"},600);
			});
		};
		
		function pianoHover(){
			var piano=demo_3.querySelector(".piano");
			var pianoLi=piano.querySelectorAll(".box>.piano>li");
			var initial=[0,-40,20,-45,-100,-35,-25,0];
			for(var i=0;i<pianoLi.length;i++){
				(function(index){
					addEvent(pianoLi[index],"mouseover",function(){
						this.style.transform="translateY(-100px)";
						for(var i=0;i<pianoLi.length;i++){
							if(i<index){
								pianoLi[i].style.transform="translateY("+(-100+(index-i)*30)+"px)";
							};
							if(index<i){
								pianoLi[i].style.transform="translateY("+(-100+(i-index)*30)+"px)";
							};
						};
					});
				})(i);
			};
			for(var i=0;i<pianoLi.length;i++){
				(function(index){
					addEvent(pianoLi[index],"mouseout",function(){
						this.style.background="#fff";
						for(var i=0;i<pianoLi.length;i++){
							pianoLi[i].style.transform="translateY("+initial[i]+"px)";
						};
					});
				})(i);
			};
			for(var i=0;i<pianoLi.length;i++){
				addEvent(pianoLi[i],"mousedown",function(){
					this.style.background="#ccc";
				});
				addEvent(pianoLi[i],"mouseup",function(){
					this.style.background="#fff";
				});
			};
		};
	};//all;
	
	

	demo2();
	function demo2(){
		var demo_2=document.querySelector("#demo_2");
		var form=demo_2.querySelector("#form");
		var ipt=form.querySelectorAll("input");
		var title=demo_2.querySelector(".title");
		var titleLi=title.querySelectorAll("li");
		var photos=demo_2.querySelectorAll(".photo");
		
		drafting(form);
		cancalInputBubble();
		setTitleLiPosition();
		
		function cancalInputBubble(){
			for(var i=0;i<ipt.length;i++){
				(function(i){
					addEvent(ipt[i],"mousedown",function(ev){
						cancelBubble(ev);
					},true);
				})(i);
			};
		};//demo2 cancel the inputs' bubble to the form;
		
		function setTitleLiPosition(){
			var h=$(titleLi).height();
			for(var i=0;i<titleLi.length;i++){
				titleLi[i].style.top=10+i*h+"px";
				titleLi[i].style.left="-100%";
			};
		};//demo2;
	};//demo2;
	

	demo4();
	function demo4(){
		var odate=new Date();
		var y=odate.getFullYear();
		var m=odate.getMonth()+1;
		
		CalendarTitle();
		setDayActive();
		createDayLi(y,m);
		calendarBtnClick();
		
		function CalendarTitle(m,y){
			var span=demo_4.querySelector("#calendarTime");
			var o=new Date();
			m=month(m)||month(o.getMonth());
			y=y||o.getFullYear();
			span.innerHTML=m+" "+y;
		};//demo4 April 2017;
		
		function setDayActive(oDay){
			var li=demo_4.querySelectorAll(".day li");
			if(oDay==0){
				var index=0;
			}else{
				var index=oDay || new Date().getDay();
			};
			function iDay(index){
				var arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
				for(var i=0;i<li.length;i++){
					if(li[i].innerHTML===arr[index]){
						return i;
					};
				};
			};//demo4 返回对应当天星期几的下标；
			for(var i=0;i<li.length;i++){
				li[i].className="";
			};
			li[iDay(index)].className="active";
		};//重置对应的星期几；
		
		function createDayLi(nowY,nowM){
			var demo_4=document.querySelector("#demo_4");
			var dayList=demo_4.querySelector("#dayList");
			dayList.innerHTML="";
			var iH=dayList.offsetHeight;
			var o=getLastDate(nowY,nowM-1);//上个月最后一天
			var t=getDay(nowM-1,getLastDate(nowY,nowM-1));//上个月最后一天星期几；
			var l=o-t;
			var p=getLastDate(nowY,nowM);//当前月最后一天（第二个循环）；
			var num=0;
			
			appendLi(l,o,"effectiveless",false);
			appendLi(1,p,null,true);
			appendLi(1,42-p-(t+1),"effectiveless",false);
			
			function appendLi(start,length,name,bool){
				name=name||null;
				for(var i=start;i<=length;i++){
					var li=document.createElement("li");
					li.innerHTML=i;
					li.style.lineHeight=iH/6+"px";
					li.className=name;
					if(bool){
						if(i==new Date().getDate()){
							li.className="active";
						};
					};
					dayList.appendChild(li);
				};
			};
		};//日历主体创建日期li；
		
		function calendarBtnClick(){
			var oPrev=demo_4.querySelector(".prev");
			var oNext=demo_4.querySelector(".next");
			var o=new Date();
			var mNum=o.getMonth()+1;
			var yNum=o.getFullYear();
			var arr=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
			addEvent(oPrev,"click",prev);
			addEvent(oNext,"click",next);
			function prev(){
				mNum--;
				if(mNum<1){
					mNum=12;
					yNum--;
				};
				fn();
			};
			function next(){
				mNum++;
				if(mNum>12){
					mNum=1;
					yNum++;
				};
				fn();
			};
			function fn(){
				o.setYear(yNum);
				o.setMonth(mNum-1);
				var a=o.getDay();
				setDayActive(a);
				createDayLi(yNum,mNum);
				CalendarTitle(mNum-1,yNum);
			};
		};//日历左右按钮点击；
		
		function getDay(month,oDate){
			var newDate=new Date();
			newDate.setMonth(month-1);
			newDate.setDate(oDate);
			return newDate.getDay();
		};//demo4 判断属于星期几；
	
		function getLastDate(year,month){
			var newDate=new Date(year,month,0);
			return newDate.getDate();
		};//demo4 获取一个月的天数，作为数组长度；
		
		function month(index){
			var arr=[
				"January","February","Match","April","May","June",
				"July","August","September","October","November","December"
			];
			if(typeof index=="number"){
				return arr[index];
			}else{
				for(var i=0;i<arr.length;i++){
					if(arr[i]==index){
						return i;
					};
				};
			};
		};//demo4 返回月份英文；
		
	};//demo4;
	
//引进的函数：
	function addWheelEvent(obj,down,up){
		var browser=window.navigator.userAgent.toLowerCase();
		//firefox;
		if(browser.indexOf("firefox")!=-1){
			obj.addEventListener("DOMMouseScroll",fn);
		}else if(browser.indexOf("chrome")!=-1){
			//chrome;
			obj.addEventListener("mousewheel",fn);
		}else{
			//ie;
			obj.attachEvent("mousewheel",fn);
		};
		function fn(ev){
			var bool=true;
			if(ev.wheelDelta){
				//ie和chrome鼠标往前是正值；
				bool=ev.wheelDelta>0?true:false;
			}else{
				//firefox鼠标往前是负值；
				bool=ev.wheelDelta>0?false:true;
			};
			if(bool){
				up&&up();
			}else{
				down&&down();
			};
			/*
			 	阻止浏览器默认行为；
			 	当在绑定的元素上使用滚轮时，会作用到浏览器的滚动条，如果有的话；
			 */
			ev.preventDefault();
		};
	};
	
	//添加事件；
	function addEvent(obj,event,fn,bool){
		if(obj.addEventListener){
			obj.addEventListener(event,fn,bool);
		}else{
			obj.attachEvent("on"+event,fn);
		};
	};
	
	//阻止冒泡；
	function cancelBubble(ev){
		var ev=ev||event;
		if(ev.stopPropagation){
			ev.stopPropagation();
		}else{
			window.event.cancelBubble = true;
		};
	};
	
	//拖拽；
	function drafting(obj){
		obj.onmousedown=function(ev){
			var disX=ev.pageX-this.offsetLeft;
			var disY=ev.pageY-this.offsetTop;
			document.onmousemove=function(ev){
				obj.style.left=ev.pageX-disX+"px";
				obj.style.top=ev.pageY-disY+"px";
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
			};
		};
		return obj;
	};
	
	//阻止浏览器默认事件；
	function preventDefault(ev){
		var ev=ev||event;
		if(ev.preventDefault){
			ev.preventDefault();
		}else{
			ev.returnValue=false;//ie8以下；
		};
	};
	
	//获取元素表现出来的样式；
	function css(obj,attr){
		if(obj.currentStyle){
			return obj.currentStyle(attr);
		}else{
			return getComputedStyle(obj)[attr];
		};
	};//demo3 get the element's style it behaves;