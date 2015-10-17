  
        function WebSocketStart()
         {
            //alert("running");
             
            var heatmapInstance = h337.create({
                container: document.querySelector('#map')
            });

            if ("WebSocket" in window)
            {
               var ws = new WebSocket("ws://echo.websocket.org");
                var packages = 0;
               ws.onopen = function()
               {
                   $("header").css("background", "#0FFF0F")
                   $("header").text("Connected!");
                   
                   // now generate some random data
var points = [];
var max = 0;
var width = 840;
var height = 400;
var len = 200;

while (len--) {
  var val = Math.floor(Math.random()*100);
  max = Math.max(max, val);
  var point = {
    x: Math.floor(Math.random()*width),
    y: Math.floor(Math.random()*height),
    value: val
  };
  points.push(point);
}
// heatmap data format
var data = { 
  max: max, 
  data: points 
};
// if you have a set of datapoints always use setData instead of addData
// for data initialization
heatmapInstance.setData(data);
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