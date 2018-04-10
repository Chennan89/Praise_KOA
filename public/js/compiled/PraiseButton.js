(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.PraiseButton = mod.exports;
	}
})(this, function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var PraiseButton = function () {
		function PraiseButton(param) {
			_classCallCheck(this, PraiseButton);

			this.number = 0;
			this.tpl = '<div class="palm"></div>\n\t\t\t<div class="thumb">\n\t\t\t\t<div class="rightFour">\n\t\t\t\t\t<span class="finger f1"></span>\n\t\t\t\t\t<span class="finger f2"></span>\n\t\t\t\t\t<span class="finger f3"></span>\n\t\t\t\t\t<span class="finger f4"></span>\n\t\t\t\t\t<span class="f1Right"></span>\n\t\t\t\t</div>\n\t\t\t</div>';
			this.addTpl(param);
		}

		//添加模板


		_createClass(PraiseButton, [{
			key: 'addTpl',
			value: function addTpl(ele) {
				var _this2 = this;

				var element = $(ele);
				element.append(this.tpl);
				element.on('click', function (e) {
					element.addClass("ani");
					var _this = _this2;
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
     */axios({
						method: 'get',
						url: '/index/addNum',
						responseType: 'json'
					}).then(function (response) {
						console.log(response);
						var res = response.data;
						if (res.code == 200) {
							//_this.updateNum(++this.number)
							_this.updateNum(res.data);
						} else {
							console.log('出错了'); //这个在服务端处理？？
						}
					}).catch(function (error) {
						console.log(error);
						console.log('出错了!!!!!!!!!!!!!');
					});
				});

				element.on("animationend webkitAnimationEnd oAnimationEnd", function () {
					$(this).removeClass("ani");
				});
			}
		}, {
			key: 'updateNum',
			value: function updateNum(number) {
				var numNode = document.getElementById("count").getElementsByTagName("span")[0];
				numNode.innerText = number;
				//this.number++;
			}
		}]);

		return PraiseButton;
	}();

	exports.default = PraiseButton;
});