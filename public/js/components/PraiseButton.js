//import {axios} from 'axios';//引入路径不对。。
class PraiseButton{
	constructor(param){
		this.number=0;
		this.tpl=`<div class="palm"></div>
			<div class="thumb">
				<div class="rightFour">
					<span class="finger f1"></span>
					<span class="finger f2"></span>
					<span class="finger f3"></span>
					<span class="finger f4"></span>
					<span class="f1Right"></span>
				</div>
			</div>`;
		this.addTpl(param);
	}

	//添加模板
	addTpl(ele){
		const element=$(ele);
		element.append(this.tpl);
		element.on('click',(e)=>{
			element.addClass("ani");
			var _this=this;
			/*$.ajax({
				method:'get',
				  url:'/index/addNum',
				  responseType:'json',
				  success:function(data){
				  	if(data.code==200){
				  		//_this.updateNum(++this.number)
				  		_this.updateNum(data.data)
				  	}else{
				  		console.log('出错了');//这个在服务端处理？？
				  	}
				  },
				  error:function(err){
				  	console.log(err)
				  	console.log('出错了!!!!!!!!!!!!!');
				  }
			});
*/			axios({
			  method:'get',
			  url:'/index/addNum',
			  responseType:'json'
			}).then(function (response) {console.log(response)
				let res=response.data;
			  	if(res.code==200){
			  		//_this.updateNum(++this.number)
			  		_this.updateNum(res.data)
			  	}else{
			  		console.log('出错了');//这个在服务端处理？？
			  	}
			  })
			  .catch(function (error) {
			    console.log(error);
			    console.log('出错了!!!!!!!!!!!!!');
			  });
			
		});

		element.on("animationend webkitAnimationEnd oAnimationEnd", function () {
			$(this).removeClass("ani");
		});
	}
	//更改页面上显示的个数
	updateNum(number){
		const numNode=document.getElementById("count").getElementsByTagName("span")[0];
		numNode.innerText=number;
		//this.number++;
	}
}

export default PraiseButton;