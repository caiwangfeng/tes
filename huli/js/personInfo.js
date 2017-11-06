/* 自定义系统下拉菜单 */
$(function () {
    window.onload = function() {
        // 解决页面加载后跳跃的问题
        window.scrollTo(0,0);
    };
        /*点击切换页面，点击li切换DIV*/
        swichDiv();


        /* 自定义系统下拉菜单 */
        select_custom();

        // 订单传值
        order();

         //出售
        sale();

        /* 删除行数功能 */
        deleteTr();


       lookupSysMesg()

        
    });



function select_custom() {
    // 设置下拉箭头位置
    var select_c = $(".select_custom"),
        sc_len = select_c.length;

    for(var i = 0; i < sc_len; i++) {
        // 获取当前下拉菜单的宽度值
        var thisSC_w = parseInt(select_c.eq(i).width());
        // 设置该列表下的下拉箭头的位置
        select_c.eq(i).children("i").css("background-position", (thisSC_w - 36) + "px" + " 0");
    }
    //性别点击
    $(".sex").click(function () {
        $(this).addClass("sex_checked").parent().siblings().children().removeClass("sex_checked");

    });

    // 下拉菜单点击及鼠标悬浮控制)
    $(document).off("mouseenter", ".select_custom i").on({
        // 获取父级的宽度并进行设置并显示
        click: function() {
            var pa_w = $(this).parent().width();
            $(this).siblings("dl").css({"width": parseInt(pa_w) + 8 + "px", "margin-left": "-7px"}).slideDown(150);

        },
        // 鼠标悬浮下拉箭头变换
        mouseenter: function() {
            var this_p_w =  parseInt($(this).parent().width());
            $(this).css("background-position", (this_p_w - 36) + "px" + " -36px");
        }
    },".select_custom i");

    // 鼠标离开选择区域后隐藏选择菜单
    $(document).on("mouseleave", ".select_custom", function() {
        // 收起选择菜单，还原箭头样式
        $(this).children("dl").slideUp(150);
        var this_w =  parseInt($(this).width());
        $(this).children("i").css("background-position", (this_w - 36) + "px" + " 0");
    });

    // 选择并显示到选择框内
    $(document).on("click", ".select_custom dt", function() {
        // 获取选中项的值和文本
        var this_val = $(this).attr("data-value"),
            this_txt = $(this).text();
        // 设置选择框内的值、title及文本
        $(this).parent().siblings("i").attr({"data-value": this_val, "title": this_txt}).text(this_txt);
        $(this).parent("dl").slideUp(150);

    });
    // 鼠标悬浮显示文本设置内容
    // BASECSS.hoverText(".select_custom i, .select_custom dl dt");
}

function order() {
    var a = $(".pesnOrder tbody");

    $.getJSON("js/order.json",function (data) {
        data.order.forEach(function (t) {
            a.append(`
            <tr>
                          <td class="img_info">
                              <div class="img_thumbnail">
                                  <img src="` +t.img+ `">
                                  <p>订单号</p>
                              </div>
                          </td>
                          <td>` +t.price+ `</td>
                          <td>`+t.manufacDate+`</td>
                          <td>` +t.stockDete+ `</td>
                          <td>` +t.status+ `</td>
                          <td class="data_ctrlGroup">
                              <div class="top">
                                  ` +t.commandTop+ `
                              </div>
                              <div class="bottom">
                                  ` +t.commandBottom+ `
                              </div>
                          </td>
                      </tr>
            `)
        })
    })
}
function sale() {
    var b=$(".sell_info .order tbody");
    $.getJSON("js/order.json",function (data) {
        data.sale.forEach(function (t) {
            b.append(`
            <tr>
                          <td class="img_info">
                              <div class="img_thumbnail">
                                  <img src="` +t.img+ `">
                                  <p>订单号</p>
                              </div>
                          </td>
                          <td>` +t.price+ `</td>
                          <td>`+t.manufacDate+`</td>
                          <td>` +t.stockDete+ `</td>
                          <td>` +t.storage+ `</td>
                          <td>` +t.status+ `</td>
                          <td>` +t.isSame+ `</td>
                          <td class="data_ctrlGroup">
                              <div class="top">
                                  ` +t.commandTop+ `
                              </div>
                              <div class="bottom">
                                  ` +t.commandBottom+ `
                              </div>
                          </td>
                      </tr>
            `)
        })
    })
}
function swichDiv() {
        var $li = $(".pesnInfo-choose").find("li");
        var $showHidden = $(".mianPesn").children("div");

        $li.on("click",function () {
            var idx = $(this).index();
            $showHidden.eq(idx).css({"display":"block","position":"relative"}).siblings().css("display","none");
            $(this).addClass("pc_li").siblings().removeClass("pc_li");
        })
}
function deleteTr() {
    // 我的订单
//删除按钮点击弹出
    $(".bottom .link-gray dele").on("click",function () {
        var a = $(this).closest("tr");
        $(".ordShadeBox").css("display","block");
        var m = "<h2>" + "删除订单" + "</h2>" +
            "<span>" + "</span>" +
            "<p>" + "您是否要删除该订单信息？删除后不再显示该订单。" + "</p>"+
            "<div class=\"orderDiv\">" +
            "<span class='ordSure'>" + "确定" + "</span>" +
            "<span class='dialog-cancel'>" + "取消" + "</span>" +
            "</div>";
        $(".ordShadeBox").html(m);
        //确定键按钮
        $(".ordSure").on("click",function () {
            $(".ordShadeBox").fadeOut(300);
            a.remove()

        });
    });
//取消按钮事件代理
    $(".ordShadeBox").on("click", ".dialog-cancel", function () {
        $(".ordShadeBox").fadeOut(300);
    });
// 我的订单
//取消按钮点击弹出
    $(".orderOff").on("click",function () {
        $(".ordShadeBox").css("display","block");
        var n = "<h2>" + "取消订单" + "</h2>" +
            "<span>" + "</span>" +
            "<p>" + "您是否要取消该订单？成功取消之后货款将在3-7个\n" +
            "工作日内返还至你的支付账号。" + "</p>"+
            "<div class=\"orderDiv\">" +
            "<span class='dialog-cancel'>" + "确定" + "</span>" +
            "<span class='dialog-cancel'>" + "取消" + "</span>" +
            "</div>";
        $(".ordShadeBox").html(n);
        //确定键/取消键

    })

}

function lookupSysMesg() {
    /* 点击查看消息 */
    $(document).on("click", ".sysMesgBox .mesgItem .mesgContent", function() {
        $this = $(this);

        // 检查是否是全打开状态
        var isAllOpen = $this.hasClass("openState");
        // 标记选择
        var $selector = $this.next(".mesgSelect");
        // 如果为全打开状态则还原
        if(isAllOpen) {
            // 显示标记选择
            $selector.show(180);
            // 恢复原版宽度
            $this.animate({
                "width": "968px"
            },180);
            // 改变文本显示框的样式属性
            $this.children(".mesgTxt").css({
                "width": "654px",
                "height": "20px",
                "white-space": "nowrap",
                "text-indent": 0
            });
            // 改变日期显示框的样式属性
            $this.children(".mesgDatetime").css({
                "padding-top": "34px",
                "clear": "none",
                "float": "none"
            });

            // 移除打开状态标志
            $this.removeClass("openState");

            // 将文本设为已读状态
            $this.css("color", "#888");
        }
        // 否者设为全打开状态
        else {
            // 隐藏标记选择
            $selector.hide(180);
            // 宽度100%显示
            $this.animate({
                "width": "1200px"
            },180);
            // 改变文本显示框的样式属性
            $this.children(".mesgTxt").css({
                "width": "auto",
                "height": "auto",
                "white-space": "normal",
                "text-indent": "2em"
            });

            // 改变日期显示框的样式属性
            $this.children(".mesgDatetime").css({
                "padding-top": 0,
                "clear": "both",
                "float": "right"
            });

            // 添加打开状态标志
            $this.addClass("openState");
        }

    });}


