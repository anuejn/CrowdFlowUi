
function WebSocketStart()
 {
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

function paintHeatMap(var points, var heatMap, var domElement) {
    
            var newPoints = [];
            var max = 0;
            var width = domElement.width();
            var height = domElement.height();
            
            for(var i = 0; i < points.length; i++) {
              var val = 1;
              max = Math.max(max, val);
              var point = {
                x: points[i].x / 1.0 + 0, //cahnge me to an sensfull value!
                y: points[i].y / 1.0 + 0,//cahnge me to an sensfull value!
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
}