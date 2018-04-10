const Router=require('koa-router');
const axios=require('axios');
//const router=new Router();
//router.get('/index/index',(ctx,next)=>{
//	ctx.body='哈哈哈哈🍎🍇🌰'
//});
const router=new Router({'prefix':'/index'});

router.get('/index/',async (ctx,next)=>{
	//ctx.body='哈哈哈哈🍎🍇🌰';
	//next();
	await ctx.render('user',{title:'mie咩咩咩'});  //必须用async await
});

router.get('/addNum/', async (ctx,next)=>{
	//console.log(ctx.url);
	//ctx.body='hhh'
	//请求PHP数据
	

	await axios({
	  method:'get',
	  url:'http://localhost:8001/Praise_KOA/dataInterface/data.php',
	  //responseType:'json',
	  //withCredentials:true
	}).then(function (r) {
	    console.log(r.data);//r.data才是返回的数据
	    ctx.body={code:200,data:r.data};
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
	/*await axios.get('http://localhost:8001/Praise_KOA/dataInterface/data.php')
	  .then(function (r) {
	    console.log(r.data);//r.data才是返回的数据
	    ctx.body={code:200,data:r.data};
	  })
	  .catch(function (error) {
	    console.log(error);
	  });*/
});

module.exports=router;