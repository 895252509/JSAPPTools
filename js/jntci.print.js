/*
给页面添加打印方法

引入本js
使用 jntci_print.printPreView 调用打印预览
    jntci_print.print 调用印
	
param
	1. 选择器	
	2. （option）  按钮选择器//如果打印按钮在页面上，就要隐藏掉

by:zhouxiang 2017/10/17

*/

if (!jntci_print) var jntci_print = {};

jntci_print = (function(window) {
    //ie打印对象
    var objectHtml = "<OBJECT classid='CLSID:8856F961-340A-11D0-A96B-00C04FD705A2' height='0' id='WebBrowser' name='wb' width='0'></OBJECT>";
    if (typeof window._Wsh === "undefined") {
        try {
            window._Wsh = new ActiveXObject("WScript.Shell") || CreateObject("WScript.Shell");
        } catch (err) {
            alert("请您使用IE8及以上版本浏览器，否则不能正常使用打印功能。");
        }

    }
    //注册表值
    function RegValue() {
        this.footer = null;
        this.header = null;
        this.margin_bottom = null;
        this.margin_left = null;
        this.margin_right = null;
        this.margin_top = null;
        this.Shrink_To_Fit = null;
        this.Print_Background = null;
    }

    var defregvalue = new RegValue();
    defregvalue.footer = "";
    defregvalue.header = "&b&p/&P";
    defregvalue.margin_bottom = "0.3";
    defregvalue.margin_left = "0.3";
    defregvalue.margin_right = "0.3";
    defregvalue.margin_top = "0.3";
    defregvalue.Shrink_To_Fit = "yes";
    defregvalue.Print_Background = "yes";

    function _getIEPrintReg() {
        var regvalue = new RegValue();

        if (!_Wsh) throw Error("\tat jntci.print.js -> _getIEPrintReg -> 无法创建shell");
        var HKEY_Root, HKEY_Path, HKEY_Key;
        HKEY_Root = "HKEY_CURRENT_USER";
        HKEY_Path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
        for (var _key in regvalue) {
            try {
                regvalue[_key] = window._Wsh.RegRead(HKEY_Root + HKEY_Path + _key);
            } catch (error) {
                window._Wsh.RegWrite(HKEY_Root + HKEY_Path + _key, defregvalue[_key]);
            }
        }
        return regvalue;
    }

    function _setIEPrintReg(regvalue) {
        if (!regvalue instanceof RegValue) throw Error("\tat jntci.print.js -> _setIEPrintReg -> 参数错误");
        var HKEY_Root, HKEY_Path, HKEY_Key;
        HKEY_Root = "HKEY_CURRENT_USER";
        HKEY_Path = "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
        for (var _key in regvalue) {
            window._Wsh.RegWrite(HKEY_Root + HKEY_Path + _key, regvalue[_key]);
        }
    }

    function _preprint(dom, btn, arg, args, precall) {
        //参数检验
        if (typeof dom != "string") throw Error("\tat jntci.print.js -> _print -> 参数不正确");
        if (args != null)
            if (!args instanceof RegValue) throw Error("\tat jntci.print.js -> _print -> 参数不正确");
            //备份注册表值
        var oldReg = _getIEPrintReg();

        // newReg.footer = "&u&b&d"; //页脚隐藏
        // newReg.header = "&w&b &p/&P"; //页眉隐藏

        _setIEPrintReg(args || defregvalue);
        //隐藏点击的按钮
        if (typeof btn != "undefined" && btn != null) $(btn)[0].style.display = "none";
        var _printDom = $(dom);
        var _bodyDomHtml = window.document.body.innerHTML;
        var _printDomHtml = _printDom[0].outerHTML;
        window.document.body.innerHTML = _printDomHtml;
        window.document.body.innerHTML += objectHtml;
        if (typeof precall === "function") precall();
        WebBrowser.ExecWB(arg, 1);
        window.document.body.innerHTML = _bodyDomHtml;

        if (typeof btn != "undefined" && btn != null) $(btn)[0].style.display = "block";
        //恢复注册表
        setTimeout(function() {
            _setIEPrintReg(oldReg);
        }, 50);
    }

    function _print(dom, btn, args, precall) {
        if (typeof window._Wsh === "undefined") return;
        _preprint(dom, btn, 6, args, precall);
    }

    function _printPreView(dom, btn, args, precall) {
        if (typeof window._Wsh === "undefined") return;
        _preprint(dom, btn, 7, args, precall);
    }
    return {
        printPreView: _printPreView,
        print: _print,
        getIEPrintReg: _getIEPrintReg
    }
})(window);