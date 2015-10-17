var Liste = [];

function WebSocketStart() {
    var heatmapInstance = h337.create({
        container: document.querySelector('#map')
    });
    var domObject = $("#map");

    if ("WebSocket" in window) {
        var ws = new WebSocket("ws://echo.websocket.org");
        var packages = 0;
        ws.onopen = function () {
            $("header").css("background", "#0FFF0F")
            $("header").text("Connected!");
            ws.send('{"device": "foo", "y": 22, "x": 90}');
        };

        ws.onmessage = function (evt) {
            var msgContent = JSON.parse(evt.data); // x, y, device, time
            msgContent.time = new Date().getTime();
            var newUser = true;
            for (var i = 0; i < Liste.length; i++) {
                if (Liste[i].device = msgContent.device) {
                    newUser = false;
                }
            }
            if (newUser = true) {
                Liste.push(msgContent);
            } else {
                for (var knwnUser = 0; knwnUser < Liste.length;) {
                    if (Liste[knownUser].device = msgContent.device) {
                        Liste[knwnUser] = msgContent;
                    }
                }
            }
            packages++;
            $("#pkg").text(packages + " Packages recived");
            paintHeatMap(Liste, heatmapInstance, domObject);
        };

        ws.onclose = function () {
            // websocket is closed.
            //$("messages").html += "Websocket closed!"
            $("header").css("background", "#FF0F0F")
            $("header").text("not running (try to reload)");
        };
    } else {
        // The browser doesn't support WebSocket
        alert("WebSocket NOT supported by your Browser!");
        window.close();
    }
    setInterval(function () {
        collectOldElements(Liste, 15000, heatmapInstance, domObject);
    }, 1000);
}

function collectOldElements(list, lifetimeInMs, heatMap, domObject) {
    var hasChanged = false;
    var oldLength = list.length;
    for (var i = 0; i < list.length; i++) {
        if (list[i].time + lifetimeInMs > new Date.getTime()) {
            list.splice(i, 1);
            i--;
            hasChanged = true;
        }
    }
    if (hasChanged) {
        paintHeatMap(list, heatMap, domObject);
        console.log("cleaned " + (oldLength - list.length) + " elements up");
    }
}

function paintHeatMap(points, heatMap, domElement) {
    var newPoints = [];
    var max = 0;
    var width = domElement.width();
    var height = domElement.height();

    for (var i = 0; i < points.length; i++) {
        var val = 1;
        max = Math.max(max, val);
        var point = {
            x: points[i].x / 1.0 + 0, //cahnge me to an sensfull value!
            y: points[i].y / 1.0 + 0, //cahnge me to an sensfull value!
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