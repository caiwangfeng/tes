/**
 * Created by punkLee on 17/10/30.
 */

$(function () {
    var huli = new Main();
    huli.classifyFunctions();

});

function Main() {

    /**
     * 一：classify页面内容部分函数功能
     */
    this.classifyFunctions = function () {

        /**
         ** classifyFilter部分
         */
        //获取DOM元素
        var $list = $(".classifyFilter-list"),
            $firMenu = $list.children("p"),
            $secMenu = $list.find("li");

        //1.$list的hover事件
        $list.hover(function () {
            $(this).css({
                "border" : "1px solid #b6b7b8",
                "background" : "white"
            });
            $(this).children("p").css("border-bottom","1px solid red");
            $(this).children("ul").css("display","block");
        },function () {
            $(this).css({
                "border" : "1px solid transparent",
                "background" : "transparent"
            });
            $(this).children("p").css("border-bottom","none");
            $(this).children("ul").css("display","none");
        });

        //2.$firMenu的点击事件
        $firMenu.on("click",function () {
            $(this).addClass("active").closest("div").siblings().children("p").removeClass("active");
        });

        //3.$secMenu的点击事件
        $secMenu.on("click",function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(this).closest("ul").siblings("p").text($(this).text()).addClass("active");
            $(this).parents(".classifyFilter-list").siblings().children("p").removeClass("active");
        });


        /**
         * classify-banner和classify-goods部分
         */


        //2.点击页面点击导航栏，根据其自定义属性ajaxData来判断AJAX路径，切换banner和内容
        //获取DOM元素
        var classifyMenu = $(".classify-Menu");

        //设置点击事件
        classifyMenu.on("click",function () {
            var ajaxRoute     = $(this).attr("ajaxData");
            var $goodsChoose  = $(".goods-choose");
            var $goodsName    = $(".goods-name");
            var $goodSorts    = $(".good-sorts");
            var getHash       = location.hash;

            window.onhashchange = function () {
                var thisHash = location.hash;

                if(thisHash !== getHash){
                    $goodSorts.children().remove();
                    //加载banner
                    loadClassifyBanner(ajaxRoute,$goodsName,$goodSorts);

                    //加载ajax数据
                    loadClassifyGoods(ajaxRoute,$goodsChoose);
                }
            };
        })
    };
}