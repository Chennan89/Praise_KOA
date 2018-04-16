(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', '../axio.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('../axio.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.axio);
		global.PraiseButton = mod.exports;
	}
})(this, function (exports, _axio) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _axio2 = _interopRequireDefault(_axio);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

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

		_createClass(PraiseButton, [{
			key: 'throttle',
			value: function throttle(method) {
				clearTimeout(method.tId);
				method.tId = setTimeout(function () {
					method();
				}, 200);
			}
		}, {
			key: 'addTpl',
			value: function addTpl(ele) {
				var _this2 = this;

				var element = $(ele);
				element.append(this.tpl);
				var timeI = null;
				var throttle_click = function throttle_click() {
					element.addClass("ani");
					clearTimeout(timeI);
					var _this = _this2;
					var result = {};
					timeI = setTimeout(async function () {
						try {
							result = await (0, _axio2.default)({
								method: 'get',
								url: '/index/addNum',
								responseType: 'json'
							});
						} catch (err) {
							console.log(err);
						}
						var res = result.data;
						if (res.code == 200) {
							_this.updateNum(res.data);
						} else {
							console.log(res.data);
						}
					}, 800);
				};
				element.on('click', throttle_click);
				/*var throttle=_.throttle( async ()=>{
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
    },2000);
    element.on('click',throttle);*/
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