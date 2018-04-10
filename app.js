const Koa=require('koa');
const app=new Koa();
const views=require('koa-views');
//const swig=require('koa-swig');/需要安装swig，但是不需要引入

const serve=require('koa-static');//静态资源路径 static file serving middleware
app.use(serve(__dirname+'/public'));

// Must be used before any router is used
app.use(views(__dirname + '/views', {
  map: {
    html: 'swig'
  },extention:'html'
}));//map设置模板引擎，extention设置文件后缀，这里设置了render的时候文件名就无需设置了

const indexRouter=require('./routers/indexRouter');

app.use(indexRouter.routes(),indexRouter.allowedMethods({}));

app.listen(3000);