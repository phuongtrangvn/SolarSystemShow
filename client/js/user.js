$(document).ready(function() {
  console.log($.removeCookie);
  $("#form_signup").submit(function(evt) {
    evt.preventDefault(); //Dừng mặc đi
    var infor = $(this).serialize();
    infor = infor.split('&');
    var infor_convert = {};
    infor.forEach(function(ele, index) {
      // ele.replace('=', ':');
      console.log(ele);
      ele = ele.split("=");
      console.log(ele);
      infor_convert[ele[0]] = unescape(ele[1]);
    })
    console.log(infor_convert);
    $.ajax({
      url : "api/user/create",
      method : "post",
      data : infor_convert,
      dataType: "application/JSON"
    }).always(function(res) {
      console.log(res);
      if ((res = JSON.parse(res.responseText)).status){
        alert("success");
        window.location = "/";
      }
      else {
        alert('Fail, ' + res.message);
      }
    })
    console.log(username, name);
  });

  $('#form_login').submit(function(evt) {
    evt.preventDefault();
    var infor = $(this).serialize();
    console.log(infor);
    infor = infor.split("&");
    console.log(infor);
    var infor_convert = {};
    infor.forEach(function(ele, index) {
      ele = ele.split('=');
      infor_convert[ele[0]] = unescape(ele[1]); // unescape convert string mã hóa trên URL( Có kí hiệu %) thành string bình thường
    })
    $.ajax({
      url : "/api/user/login",
      method: 'post',
      data : infor_convert,
      dataType: 'application/json'
    }).always(function(res) {
      if (res.responseText){
        res = JSON.parse(res.responseText);
      }
      if (res.status){
        $.cookie('token', res.token);
        alert(res.message);
        window.location = "/";
      }
      else {
        alert(res.message);
      }
    })
  })
})
