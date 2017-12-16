
let Loading = {};

Loading.install = function (Vue, options) {

    Vue.prototype.$loading = function (params) {
        let loadingtTpl = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
            template: '<div class="db-loading"></div>'
        });
        let tpl = new loadingtTpl().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
        document.body.appendChild(tpl);     // 3、把创建的实例添加到body中
        let speed = 600;
        let width = 0;
        var timer = setInterval(function() {
            var num = GetRandomNum(0,5);
            width += num;

            if (width >= 100) {
                clearInterval(timer);
                width = 100;

                setTimeout(function() {
                    document.body.removeChild(tpl);
                }, 1000);
            }

            tpl.style.width = `${width}%`;
        }, speed);
    }

    Vue.prototype.$close = function (params) {
        var loading = document.querySelector(".db-loading");
        if(loading) {
            
        }
    }
}

function GetRandomNum(Min, Max) {
    var Range = Max - Min;
    var Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

module.exports = Loading;