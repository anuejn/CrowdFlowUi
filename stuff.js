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
                    var received_msg = evt.data;
                   packages += 1;
                    $("footer").text("(" + packages + " Packages recived)");
                   
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