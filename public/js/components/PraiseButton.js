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
		var throttle=_.throttle( async ()=>{
			element.addClass("ani");
			let result={};
			try{
				result=await axios({
					  method:'get',
					  url:'/index/addNum',
					  responseType:'json'
				})
			}catch(err){
				console.log(err);
			}
			let res=result.data;
		  	if(res.code==200){
				this.updateNum(res.data)
		  	}else{
		  		console.log(res.data);
		  	}
		},1000);
		element.on('click',throttle);
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