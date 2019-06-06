var socket; 

// 检测websocket类型
if (!window.WebSocket) { 
    window.WebSocket = window.MozWebSocket; 
} 


/*检测json数据*/
function checkJson(str) {
        try {
            if (typeof JSON.parse(str) == "object") {
                return true;
            }
        } catch(e) {
        }
        return false;
    };



// 展示访问日志
function _show_visit_log(data){
    
}


// 展示异常日志
function _show_error_log(data){

}


// 展示黑名单
function _show_black_ip(data){

}

// 展示白名单
function _show_white_ip(data){

}


// 页面加载的时候运行websocket
$(function(){
    // Javascript Websocket Client 
    if (window.WebSocket) { 

        socket = new WebSocket("ws://10.25.78.146/wafwn"); 
        var show_message = 'on-line'
        socket.onopen = function(event) { 
            $("#websocket_status").removeClass('label label-danger');
            $("#websocket_status").addClass("label label-success");
            $("#websocket_status").text(show_message);
            
    }; 
        socket.onmessage = function(event) { 
            var websocket_sole_id = ""
            var ta = document.getElementById('responseText'); 
            var res = checkJson(event.data)
            if (res == true){
                    websocket_sole_id = JSON.parse(event.data)["websocket_sole_id"]
                    var sole = document.getElementById('sole_id');
                    sole.innerHTML = websocket_sole_id 
            }else{
                ta.innerHTML = ta.innerHTML + "<br>" + event.data ;
            };
        }; 

        socket.onclose = function(event) { 

            var ta = document.getElementById('responseText'); 
            ta.innerHTML = ""
            ta.innerHTML = ta.innerHTML + "<br>" + " Web Socket 关闭！"; 

        }; 

    } else { 
        alert("您的浏览器不支持 Web Socket."); 
    } 

});
