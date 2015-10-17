
var usersAndPositions;
           
        function WebSocketStart()
         {
            //alert("running");
            if ("WebSocket" in window)
            {
               var ws = new WebSocket("ws://echo.websocket.org");
                var packages = 0;
               ws.onopen = function()
               {
                   $("header").css("background", "#0FFF0F")
                   $("header").text("Connected!");
               };
				
               ws.onmessage = function (evt) 
               {    
                   var msgContent = JSON.parse(evt.data); // x, y, device, time
                   var Liste = [];
                   var newUser = true;
                   for( var i = 0; i < Liste.length;){
                        if(Liste[i].device = msgContent.device){
                            newUser = false;       
                        }
                   }
                   if(newUser = true){
                      Liste.push(msgContent);
                   }else{
                    for( var knwnUser = 0; knwnUser < Liste.length;){
                        if(Liste[knownUser].device = msgContent.device){
                            Liste[knwnUser] = msgContent;
                        }
                   }
               };
				
               ws.onclose = function()
               {
                  // websocket is closed.
                  //$("messages").html += "Websocket closed!"
                   $("header").css("background", "#FF0F0F")
                   $("header").text("not running (try to reload)");
               };
            }
             
            else
            {
               // The browser doesn't support WebSocket
               alert("WebSocket NOT supported by your Browser!");
                window.close();
            }
         }