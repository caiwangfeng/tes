/**
 * Created by punkLee on 17/11/2.
 */


$(function () {
    var shopping = new MyShopping();
    shopping.shoppingSelect();
    shopping.minOrPlusShopping();
});

function MyShopping() {





    /**
     * 1.加载我的购物车信息
     */




    /**
     * 2.设置全选和单选操作
     */
    this.shoppingSelect = function () {
        var allCkB   = $("[name='shopping-allCkb']");
        var childCkB = $("[name='shopping-childCkb']");
        allSingleCheck(allCkB,childCkB);
    };


    /**
     * 3.设置加减商品操作
     */
    this.minOrPlusShopping = function () {
        var $minShopping   = $(".shopping-min");
        var $plusShopping  = $(".shopping-plus");
        var $shoppingCount = $("[name='shopping-num']");

        //判断值已经为0了，则将按钮设置为禁用状态，且不能再执行减操作
        for(var i = 0;i < $minShopping.length;i++){
            if($shoppingCount.eq(i).val() === "0"){
                $minShopping.eq(i).addClass("activity");
            }else{
                $minShopping.eq(i).removeClass("activity");
            }
        }

        //减操作
        $minShopping.on("click",function () {
            var $minIpt = $(this).siblings("[name='shopping-num']");
            var count   = $minIpt.attr("value");

            //判断值已经为0了，则将按钮设置为禁用状态，且不能再执行减操作
            if(count === "0"){
                $(this).addClass("activity");
                return;
            }else{
                $minIpt.attr("value",--count);
                if(count === 0){
                    $(this).addClass("activity");
                    return;
                }
            }
        });

        //加操作
        $plusShopping.on("click",function () {
            var $plusIpt = $(this).siblings("[name='shopping-num']");
            var count    = $plusIpt.attr("value");

            $(this).siblings(".shopping-min").removeClass("activity");
            $plusIpt.attr("value",++count);
        })


    }


}