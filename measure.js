function registerClick() {
    $("#map").mousedown(function () {
        $("#drag").css("left", window.event.clientX);
        $("#drag").css("top", window.event.clientY - 50);
    });
}