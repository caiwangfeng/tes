/**
 * Created by punkLee on 17/10/30.
 */


/**
 * 一.点击加载classify-banner
 */

function loadClassifyBanner(ajaxRoute,goodsName,goodSorts){

    $.getJSON("js/" + ajaxRoute + ".json",function (jsonObj) {

        //1.获取goodsName
        goodsName.text(jsonObj.name);

        //2.获取goodSorts
        var sorts_len = jsonObj.sorts.length;

        for(var i = 0;i < sorts_len;i++){
            goodSorts.append("<li>" + jsonObj.sorts[i] + "</li>");

        }
    });
}


/**
 * 二.点击加载classify-goods
 */

function loadClassifyGoods(ajaxRoute,$goodsChoose) {

    //加载ajax数据
    $.getJSON("js/" + ajaxRoute + ".json",function (jsonObj) {

        var jsonObj_len  = jsonObj.info.length;

        for(var i= 0;i < jsonObj_len;i++){
            if(jsonObj_len === 0){
                alert("老板很懒，这类产品还未上架>.<");
            }else if(jsonObj_len < 9){
                $goodsChoose[jsonObj_len].css("display","none");
            }else{
                $goodsChoose.eq(i).children(".goods-show").css({
                    "background":"url(" + jsonObj.info[i].url[0] + ") no-repeat center center",
                    "backgroundSize" : "cover"
                });

                $goodsChoose.eq(i).find(".goods-title").text(jsonObj.info[i].title);
                $goodsChoose.eq(i).find(".before-price").text(jsonObj.info[i].beforePrice);
                $goodsChoose.eq(i).find(".present-price").text(jsonObj.info[i].presentPrice);
            }
        }
    })
}




/**
 * 三...登录注册页面验证
 * @param       formName         表格名称
 * @function1   blurVerify       失去焦点验证,确认密码验证      input        需要验证的输入框
 * @function2   focusVerify      获得焦点验证                 input        需要验证的输入框
 * @function3   clickRegOrLogin  点击登录、注册按钮舔砖验证     button       登录、注册按钮
 */
function Form(formName) {
    var $form = $("form[name=" + formName + "]");

    /**
     * 1.失去焦点验证
     * @param input  input对象   输入框
     */
    this.blurVerify = function (input) {
        $form.find(input).on("blur",function () {

            //1.定义变量
            var thisInputVal = $(this).val();
            var errorMsg     = $(this).prev("label").text();

            //2.当没有输入的时候
            if(!thisInputVal){
                if($(this).nextAll().is(".error")){
                    return;
                }else{
                    //清空输入有效
                    $(this).nextAll("span.regChecked").remove();
                    $(this).nextAll("span.logChecked").remove();
                    //添加输入格式有误信息
                    $(this).closest("div").append("<p class='error'>" + "请输入" + errorMsg + "</p>");
                }
            }
            //3.当输入有值的时候
            else{

                //验证所有input是否已经全部通过验证
                var $regInput    = $form.find("input[required]"),
                    $regInput_len = $regInput.length;
                var regCheckedLength   = $(".regChecked").length;
                var logCheckedLength   = $(".logChecked").length;
                //如果还未全部验证通过
                if(regCheckedLength < $regInput_len || logCheckedLength < $regInput_len){

                    //a.如果是注册时邮箱或者手机号输入框，验证格式是否正确
                    if($(this).is("[type='text']") && $(this).is("[name='reg-user']")){
                        if((!(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(thisInputVal))) &&
                            (!(/^1[34578]\d{9}$/.test(thisInputVal)))
                        ){
                            if($(this).nextAll().is(".error")){
                                return;
                            }else{
                                //清空输入有效
                                $(this).nextAll("span.regChecked").remove();

                                //添加输入格式有误信息
                                $(this).closest("div").append("<p class='error'>" + errorMsg + "格式有误" + "</p>");
                            }
                        }else{
                            //判断本地是否存在有账号信息，并做验证
                            getLocalData(function (info) {
                                var $regUsername = $("[name='reg-user']");
                                if(info.length === 0){

                                    //a.移除输入错误信息
                                    $regUsername.nextAll(".error").remove();

                                    //b.若已经存在"验证正确"，则不再提示
                                    if($regUsername.nextAll().is("span.regChecked")){
                                        return;
                                    }else{
                                        $regUsername.after("<span class='regChecked'>" + errorMsg + "有效</span>");
                                    }

                                }
                                else{

                                    for(var i = 0;i < info.length;i++){
                                        if($("[name='reg-user']").val() === info[i].username){
                                            //清空输入有效
                                            $regUsername.nextAll("span.regChecked").remove();

                                            //添加输入格式有误信息
                                            $regUsername.closest("div").append("<p class = 'error'>" + errorMsg + "已经存在，请重新输入！" + "</p>");
                                            return;
                                        }else{
                                            //移除输入错误信息
                                            $regUsername.nextAll(".error").remove();

                                            //若已经存在"验证正确"，则不再提示
                                            if($regUsername.nextAll().is("span.regChecked")){
                                                return;
                                            }else{
                                                $regUsername.after("<span class='regChecked'>" + errorMsg + "有效</span>");
                                            }
                                        }
                                    }
                                }
                            });

                        }
                    }
                    //b.如果输入的是注册时候的密码框
                    else if($(this).is("[type='password']") && $(this).is("[name='reg-psw']")){
                        if(!(/^.{6,16}$/g.test(thisInputVal))){

                            if($(this).nextAll().is(".error")){
                                return;
                            }else{
                                //清空输入有效
                                $(this).nextAll("span.regChecked").remove();

                                //添加输入格式有误信息
                                $(this).closest("div").append("<p class = 'error'>" + errorMsg + "格式有误" + "</p>");
                            }
                        }else{

                            //移除输入错误信息
                            $(this).nextAll(".error").remove();

                            //若已经存在"验证正确"，则不再提示
                            if($(this).nextAll().is("span.regChecked")){
                                return;
                            }else{
                                $(this).after("<span class='regChecked'>" + errorMsg + "有效</span>");
                            }
                        }
                    }
                    //c.如果输入的是注册时确认密码验证框
                    else if($(this).is("[type='password']") && $(this).is("[name='psw-confirm']")){

                        //实时验证确认密码和首次输入的密码是否一致
                        var firPswVal     = $("[name='reg-psw']").val();
                        var confirmPswVal = $("[name='psw-confirm']").val();

                        if (confirmPswVal !== firPswVal){
                            if($(this).nextAll().is(".error")){
                                return;
                            }else{
                                //清空输入有效
                                $(this).nextAll("span.regChecked").remove();

                                $(this).closest("div").append("<p class = 'error'>密码两次输入不一致，请重新输入！</p>");
                            }
                        }else{
                            //a.移除输入错误信息
                            $(this).nextAll(".error").remove();

                            //b.若已经存在"验证正确"，则不再提示
                            if($(this).nextAll().is("span.regChecked")){
                                return;
                            }else{
                                $(this).after("<span class='regChecked'>密码有效，请点击提交!</span>");
                            }
                        }
                    }
                    //d.如果输入的是登录时账号验证框
                    if($(this).is("[type='text']") && $(this).is("[name='log-user']")){

                        //从本地服务器取出已经注册过的账号信息
                        getLocalData(function (info) {
                            var $logUsername    = $("[name='log-user']"),
                                $logUsernameVal = $logUsername.val();

                            //如果本地没有注册信息
                            if(info.length === 0){
                                //清空输入有效
                                $logUsername.nextAll("span.logChecked").remove();

                                $logUsername.closest("div").append("<p class = 'error'>账号不存在！</p>");
                            }else{
                                //遍历info数组，验证是否有存在的账号
                                for(var i = 0;i < info.length;i++){
                                    if($logUsernameVal === info[i].username){
                                        //a.移除输入错误信息
                                        $logUsername.nextAll(".error").remove();

                                        //b.若已经存在"验证正确"，则不再提示
                                        if($logUsername.nextAll().is("span.logChecked")){
                                            return;
                                        }else{
                                            $logUsername.after("<span class='logChecked'>有效的账号</span>");
                                        }
                                        return;
                                    }else{
                                        if($logUsername.nextAll().is(".error")){
                                            return;
                                        }else{
                                            //清空输入有效
                                            $logUsername.nextAll("span.logChecked").remove();

                                            $logUsername.closest("div").append("<p class = 'error'>账号不存在！</p>");
                                        }
                                    }
                                }
                            }
                        })
                    }

                    //e.如果输入的是登录时密码验证框
                    if($(this).is("[type='password']") && $(this).is("[name='log-psw']")){


                        //从本地服务器取出已经注册过的密码信息
                        getLocalData(function (info) {
                            var $logPassword    = $("[name='log-psw']"),
                                $logPasswordVal = $logPassword.val();

                            //遍历info数组，验证是否有存在的账号
                            for(var i = 0;i < info.length;i++){
                                if($logPasswordVal === info[i].password){
                                    //a.移除输入错误信息
                                    $logPassword.nextAll(".error").remove();

                                    //b.若已经存在"验证正确"，则不再提示
                                    if($logPassword.nextAll().is("span.logChecked")){
                                        return;
                                    }else{
                                        $logPassword.after("<span class='logChecked'>密码正确！</span>");
                                    }
                                    return;
                                }else{
                                    if($logPassword.nextAll().is(".error")){
                                        return;
                                    }else{
                                        //清空输入有效
                                        $logPassword.nextAll("span.logChecked").remove();

                                        $logPassword.closest("div").append("<p class = 'error'>密码错误！</p>");
                                    }
                                }
                            }
                        })
                    }


                }
                //如果点击注册前触发失去焦点事件验证全部通过，注意这个时候已经被通过的每一条信息的长度需要重新实时获取
                if($(".regChecked").length === $regInput_len){
                    $(".reg-btn").css({
                        "cursor" : "pointer",
                        "background" : "#82c353"
                    });
                }else{
                    $(".log-btn").css({
                        "cursor" : "not-allowed",
                        "background" : "#838281"
                    });
                }

                //如果点击登录前触发失去焦点事件验证全部通过，注意这个时候已经被通过的每一条信息的长度需要重新实时获取
                if($(".logChecked").length === $regInput_len){
                    $(".log-btn").css({
                        "cursor" : "pointer",
                        "background" : "#82c353"
                    });
                }else{
                    $(".log-btn").css({
                        "cursor" : "not-allowed",
                        "background" : "#838281"
                    });
                }
            }
        })
    };

    /**
     * 2.获得焦点验证函数
     * @param input input对象
     */
    this.focusVerify = function (input) {
        $form.find(input).on("focus",function () {
            $(this).nextAll(".error").remove();
        })
    };

    /**
     * 3.点击登录、注册按钮跳转到主页事件
     * @param button  注册按钮
     */
    this.clickRegOrLogin = function (button) {

        $(button).on("click",function () {

            if($(this).css("cursor") === "pointer"){
                //跳转到主页
                location.href = "index.html";

                //获取到账号名，并将其会话存储到本地服务器
                var sessionUsername = $(this).siblings(".user-name").children("input[type='text']").val();
                sessionStorage.sessionUsername = JSON.stringify(sessionUsername);

                //如果本次点击的是注册按钮，将本次注册的账号密码保存到本地
                if($(this).hasClass("reg-btn")){

                    var userInfo = {
                        "username" : $("[name='reg-user']").val(),
                        "password" : $("[name='reg-psw']").val()
                    };

                    //从本地服务器取出数据
                    getLocalData(function (arrInfo) {

                        arrInfo.push(userInfo);

                        //再将其存入本地服务器
                        localStorage.info = JSON.stringify(arrInfo)
                    })
                }
            }
        })
    };

    /**
     *4.从本地服务器取出数据
     */
    function getLocalData(callback) {

        var arrInfo = null;
        if (!localStorage.info) {
            arrInfo = [];
        } else {
            arrInfo = JSON.parse(localStorage.info);
        }

        if (callback){
            callback(arrInfo);
        }
    }
}


/**
 * 四.实时显示登录状态函数
 * @param usernameTag   a标签
 * @param managerUser   显示和隐藏的个人中心和退出登录框
 */

var $showUsername = $(".login");
var $managerUser  = $(".manager-user");
loginUsername($showUsername,$managerUser);

function loginUsername(usernameTag,managerUser) {
    //1.判断会话存储中是否已有登录信息
    //取出会话存储中sessionUsername的值，并将账户名显示在页面中登录a标签处
    if(!sessionStorage.sessionUsername){
        usernameTag.addClass("no-log").attr("href","login.html");
    }else{
        var username = JSON.parse(sessionStorage.sessionUsername);
        usernameTag.addClass("loged").attr("href","#").text(username).css({
            "background" : "none",
            "transform"  : "translateY(-11px)",
            "width"      : "auto"
        });
        
        //为其设置点击事件

        usernameTag.on("click",function () {
            managerUser.slideToggle();
        });
        usernameTag.on("blur",function () {
            managerUser.slideUp();
        });

        //点击退出当前账号操作
        managerUser.children(".checkout-user").on("click",function () {

            sessionStorage.sessionUsername = "";
        })

    }
}

/**
 * 五：载入从任何页面点击导航栏获取到的classify页面内容
 */
loadClassify();
function loadClassify() {

    /**
     *  1:点击导航栏跳转到classify页面，向本地会话存储一个当前li的下标
     */
        //获取DOM元素
    var $menuList = $(".menu-list");
    $menuList.on("click",function () {
        sessionStorage.sessionRoute = JSON.stringify($(this).attr("ajaxData"));
    });

    //2.根据会话存储判断加载的内容
    //获取变量
    var $classifyMenu   = $(".classify-Menu");
    var $goodsName      = $(".goods-name");
    var $goodSorts      = $(".good-sorts");
    var $goodsChoose    = $(".goods-choose");

    //判断是否开始跳转页面
    if(sessionStorage.getItem("sessionRoute") === null){

        //如果这个时候用户在主页，则不加载classify页面,以防控制台找不到资源报错
        if($classifyMenu.length !== 0){

            //加载banner
            loadClassifyBanner($classifyMenu.eq(0).attr("ajaxData"),$goodsName,$goodSorts);

            //加载ajax数据
            loadClassifyGoods($classifyMenu.eq(0).attr("ajaxData"),$goodsChoose);
        }

    }else{

        var sessionRoute = JSON.parse(sessionStorage.sessionRoute);

        //加载banner
        loadClassifyBanner(sessionRoute,$goodsName,$goodSorts);
        //加载商品
        loadClassifyGoods(sessionRoute,$goodsChoose);
    }
}

/**
 * 六：购物栏点击
 */
$(".shopping").click(function () {
    $(".treas_brief").toggle("3000");
});


/**
 * 七：地区选择
 */
$(function() {
    select_custom();
});

function select_custom() {

    $(document).off("mouseenter", ".select_custom i").on({
        click: function() {
            var pa_w = $(this).parent().width();
            $(this).siblings("dl").css({"width": parseInt(pa_w) + 6 + "px", "margin-left": "-7px"}).slideDown(150);

        },
        mouseenter: function() {
            var this_p_w =  parseInt($(this).parent().width());
            $(this).css("background-position", (this_p_w - 34) + "px" + " -34px");
        }
    },".select_custom i");

    $(document).on("mouseleave", ".select_custom", function() {
        $(this).children("dl").slideUp(150);
        var this_w =  parseInt($(this).width());
        $(this).children("i").css("background-position", (this_w - 34) + "px" + " 0");
    });

    $(document).on("click", ".select_custom dt", function() {
        var this_val = $(this).attr("data-value"),
            this_txt = $(this).text();
        $(this).parent().siblings("i").attr({"data-value": this_val, "title": this_txt}).text(this_txt);
        $(this).parent("dl").slideUp(150);

    });
}



/**
 * 八...全选框的全选和子选框的自选操作
 * @param allCkB   全选框对象
 * @param childCkB 子选框对象集合
 */

function allSingleCheck(allCkB,childCkB) {

    //1.获取子选框的长度
    var childCkB_len = childCkB.length;//获取childCkB的长度

    //2.全选框点击事件
    allCkB.on("click",function () {

        //a.定义变量
        var allCkBSta    = $(this).prop("checked");//选中或者没选中
        var childCkd     = childCkB.filter(":checked"),//筛选出选中的childCkB
            childCkdNum  = childCkd.length;           //定义其选中的个数

        //b.根据allCkBSta的bull值来调整childCkB的选中状态
        if(allCkBSta){
            allCkB.prop("checked",true);
            childCkB.prop("checked",true);
        }else if(childCkdNum !== 0 && childCkdNum !== childCkB_len){
            $(this).prop("checked",true);
            childCkB.prop("checked",true);
        }
        else{
            allCkB.prop("checked",false);
            childCkB.prop("checked",false);
        }
    });


    //3.子选框单选点击事件
    childCkB.on("click",function () {

        //a.定义变量
        var childCkd     = childCkB.filter(":checked"),//筛选出选中的childCkB
            childCkdNum  = childCkd.length;           //定义其选中的个数


        //b.根据被选中childCkB的长度来判断allCkB的选中状态
        if(childCkdNum === childCkB_len){
            allCkB.prop("indeterminate",false);
            allCkB.prop("checked",true);
        }else if(childCkdNum === 0){
            allCkB.prop("indeterminate",false);
            allCkB.prop("checked",false);
        }else{
            allCkB.prop("indeterminate",true);
        }
    })


}