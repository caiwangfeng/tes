/**
 * Created by punkLee on 17/10/31.
 */
window.name = "login";

$(function () {
    var logRegPage = new Main();
    logRegPage.changeLogOrReg();
    logRegPage.clickRegister();
    logRegPage.clickLogin();
});
function Main() {

    //点击切换注册或者登录事件
    this.changeLogOrReg = function () {

        //获取注册和登录按钮
        var $regLog = $(".reg-log");

        //点击切换
        $regLog.on("click",function () {
            $(this).parents(".content-wrap").toggleClass("to-hidden").siblings().toggleClass("to-hidden");
        })
    };

    //点击注册事件
    this.clickRegister = function () {

        //实例化表单验证函数
        var regFormValid = new Form("regForm");

        //三个输入框失去焦点验证
        regFormValid.blurVerify("[name='reg-user']");
        regFormValid.blurVerify("[name='reg-psw']");
        regFormValid.blurVerify("[name='psw-confirm']");

        //三个输入框获得焦点验证
        regFormValid.focusVerify("[name='reg-user']");
        regFormValid.focusVerify("[name='reg-psw']");
        regFormValid.focusVerify("[name='psw-confirm']");

        //点击注册验证
        regFormValid.clickRegOrLogin(".reg-btn");
    };

    //点击登录事件
    this.clickLogin = function () {

        //实例化表单验证函数
        var logFormValid = new Form("loginForm");

        //两个输入框失去焦点验证
        logFormValid.blurVerify("[name='log-user']");
        logFormValid.blurVerify("[name='log-psw']");

        //两个输入框获得焦点验证
        logFormValid.focusVerify("[name='log-user']");
        logFormValid.focusVerify("[name='log-psw']");

        //点击登录验证
        logFormValid.clickRegOrLogin(".log-btn");
    }

}