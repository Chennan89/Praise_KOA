const Router=require('koa-router');
const axios=require('axios');
//const router=new Router();
//router.get('/index/index',(ctx,next)=>{
//	ctx.body='哈哈哈哈🍎🍇🌰'
//});
const router=new Router({'prefix':'/index'});

router.get('/index/',async (ctx,next)=>{
	let result={};
	try {
		result=await axios({
			method:'get',
			url:'http://localhost:8001/Praise_KOA/dataInterface/data.php?type=getData'
		})
	}catch(err){
		console.log(err);
	}
	await ctx.render('user',{title:'大拇指点赞功能', num:result.data});  //必须用async await
});

router.get('/addNum/', async (ctx,next)=>{
	try{
		let result=await axios({
		  method:'get',
		  url:'http://localhost:8001/Praise_KOA/dataInterface/data.php'
		})
		ctx.body={code:200,data:result.data};
	}catch(err){
		ctx.body={code:400,data:'出错啦'};
		console.log(err);
	}
});

module.exports=router;