/**
 * Created by admin on 2017/11/2.
 */



$(document).on("click", ".goodsShowImg .thumbnail ul li", function () {
    showIndexMainImg(this, ".goodsShowImg .mainImg ul li");
});

clearFilterFirstStyle();

goodsBuyNumSet(".goodsBuyCtrl .countSet .plus", ".goodsBuyCtrl .countSet .minus", ".goodsBuyCtrl .countSet input[type='text']");

// goodsBuyNumSet(" .countSet .plus", " .countSet .minus", " .countSet input[type='text']");

clearFirstRecomMarginLeft();


function clearListMarginLeft() {
    $(".goodsShowImg .thumbnail ul li").first().css("margin-left", 0);
}


function showIndexMainImg(ident, mainImgList) {
    var $this = $(ident),
        theIndex = $this.index();
    $this.addClass("selected").siblings().removeClass("selected");
    $(mainImgList).eq(theIndex).fadeIn(600).siblings().fadeOut(600);
}


function clearFilterFirstStyle() {
    $(".goodsBuy .goodsName p span:first").css({
        "border-left": "none",
        "padding-left": 0
    });
}

function goodsBuyNumSet(plusBtn, minusBtn, inputIdent) {
    var inventoryTotal = parseInt($(".inventory").find("span").text());

    var origVal = parseInt($(inputIdent).val());
    if(origVal === 0) {
        $(minusBtn).addClass("disabled");
    }
    else if(origVal >= inventoryTotal) {
        $(plusBtn).addClass("disabled");
        $(inputIdent).val(inventoryTotal);
    }

    $(document).on("click", plusBtn, function() {
        var currentCount = parseInt($(inputIdent).val());

        if(currentCount < inventoryTotal && currentCount !== (inventoryTotal - 1)) {
            $(inputIdent).val(currentCount + 1);
            $(minusBtn).removeClass("disabled");
        }
        else if(currentCount === (inventoryTotal - 1)){
            $(inputIdent).val(currentCount + 1);
            $(plusBtn).addClass("disabled");
            $(minusBtn).removeClass("disabled");
        }
    });

    $(document).on("click", minusBtn, function() {
        var currentCount = parseInt($(inputIdent).val());

        if(currentCount > 1) {
            $(inputIdent).val(currentCount - 1);
            $(plusBtn).removeClass("disabled");
        }
        else if(currentCount === 1){
            $(inputIdent).val(currentCount - 1);
            $(minusBtn).addClass("disabled");
            $(plusBtn).removeClass("disabled");
        }
    });
}


function clearFirstRecomMarginLeft() {
    $(".goodsRecom .recomList a:first").css("margin-left", 0);
}




var a =$(" .goodsBuy");
$.getJSON("js/tsconfig.json",function (data) {
    data.forEach(function (t) {
        a.append(
            `
<div class="goodsName">
    <h1>`+t.title+ `</h1>
    <p>
        <span >`+t.size + `</span>
        <span>`+t.new+ `</span>
    </p>
</div>
<div class="goodsPrice">
    <!-- 原始价格 -->
    <div class="origPrice">
        <span class="rmbSign">￥</span>
        <span class="rmbNum">`+t.beforePrice+ `</span>
        <span class="rmbYuan">元</span>
        <span class="deleOldPrice"></span>
    </div>
    <div class="newPrice">
        <span class="rmbSign">￥</span>
        <span class="rmbNum">`+t.presentPrice+ `</span>
        <span class="rmbYuan">元</span>
        <span class="deleOldPrice"></span>
    </div>
    <div class="goodsDynamic">
        <div class="origBuyPrice">
            <label>原始购买价格：</label>
            <span class="rmbNum">`+t.originPrice+ `</span>
            元
        </div>
        <div class="score">
            <label>积分：</label>
            <span>`+t.point+ `</span>
            <a href="#">了解积分规则</a>
        </div>
        <div class="inventory">
            <label>库存数量：</label>
            <span>`+t.remain+ `</span>
        </div>
    </div>
</div>
   <div class="goodsBuyCtrl">
                    <!-- 数量设置 -->
                    <div class="countSet">
                        <input type="text" value="0">
                        <div class="countSetArea">
                            <a class="plus">+</a>
                            <a class="minus">-</a>
                        </div>
                    </div>
                    <button type="button" class="immedBuy">立即购买</button>
                    <button type="button" class="shoppingCar">加入购物车</button>
                </div>


 <div class="onlineServer">
                    <button type="button"></button>
                </div>
                <div class="huliServer">
                    <p>
                        <label>户里服务：</label>
                        <span>该商品在仓库，23点前完成下单可在后天（5月15日）送达/该商品在用户家中，23点前完成下单，可在（5天后）送达</span>
                    </p>
                </div>
            
            `
        )
    })
});




