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
				var _this = this;

				var element = $(ele);
				element.append(this.tpl);
				var throttle = _.throttle(async function () {
					element.addClass("ani");
					var result = {};
					try {
						result = await axios({
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
						console.log(res.data); //这个在服务端处理？？
					}
				}, 1000);
				element.on('click', throttle);
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