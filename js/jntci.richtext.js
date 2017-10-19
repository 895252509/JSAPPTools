if (!jntci_richtext) var jntci_richtext = {};

jntci_richtext = (function(window) {

    var _divDom;
    var _ieVersion = "";

    function _getIEVersion() {
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
            _ieVersion = "IE 6.0";
        } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
            _ieVersion = "IE 7.0";
        } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
            _ieVersion = "IE 8.0";
        } else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0") {
            _ieVersion = "IE 9.0";
        }
    }

    function _doSamething() {
        _divDom.oncontextmenu = function(e) {
            var ifrom = document.createElement("form");
            ifrom.style.display = "none";
            ifrom.setAttribute("action", "#");
            ifrom.setAttribute("method", "post");
            ifrom.onsubmit = function() {
                //alert("提交");
            }
            var fileinput = document.createElement("input");
            fileinput.type = "file";
            fileinput.id = "jntci_richtext_fileupoad";
            fileinput.setAttribute("accept", ".png,.bmp,.jpg");
            fileinput.oninput = function() {
                ifrom.submit();
                document.body.removeChild(btnfileinput);
                document.body.removeChild(ifrom);
            }
            ifrom.appendChild(fileinput);
            var btnfileinput = document.createElement("lable");
            btnfileinput.style.position = "absolute";
            btnfileinput.style.display = "block";
            btnfileinput.style.border = "1px solid red";
            btnfileinput.style.top = e.clientY.toString() + "px";
            btnfileinput.style.left = e.clientX.toString() + "px";
            btnfileinput.innerHTML = "上传图片";
            btnfileinput.addEventListener("click", function() {
                document.getElementById("jntci_richtext_fileupoad").click();
            });

            document.body.appendChild(btnfileinput);
            document.body.appendChild(ifrom);
            return false;
        }
    }

    function refresh(id) {
        _getIEVersion();
        _divDom = document.querySelector(id);
        _divDom.contentEditable = "true";
        _doSamething();
    }

    return {
        refresh: refresh
    }
})(window);