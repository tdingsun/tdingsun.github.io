var n = 30;
$(document).ready(function() {
  setInterval(function(){
    $("#meeting-time").attr("value", n + "min");
    n -= 1;
    if(n <= 0){
      n = 30;
    };
  }, 3000);
});
