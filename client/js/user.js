$(document).ready(function() {
  $("#form_signup").submit(function(evt) {
    evt.preventDefault(); //Dừng mặc đi
    var infor = $(this).serialize();
    infor = infor.split('&');
    var infor_convert = {};
    infor.forEach(function(ele, index) {
      ele = ele.split("=");
      infor_convert[ele[0]] = unescape(ele[1]);
    })
    $.ajax({
      url : "api/user/create",
      method : "post",
      data : infor_convert,
      dataType: "application/JSON"
    }).always(function(res) {
      if ((res = JSON.parse(res.responseText)).status){
        alert("success");
        window.location = "/";
      }
      else {
        alert('Fail, ' + res.message);
      }
    })
  });

  $('#form_login').submit(function(evt) {
    evt.preventDefault();
    var infor = $(this).serialize();
    infor = infor.split("&");
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
  });

  $("#form_contact").submit(function(evt) {
    evt.preventDefault(); //Dừng mặc đi
    var infor = $(this).serialize();
    infor = infor.split('&');
    var infor_convert = {};
    infor.forEach(function(ele, index) {
      ele = ele.split("=");
      infor_convert[ele[0]] = unescape(ele[1]);
    })
    fetch("api/contact/createContact", {
      method: "post",
      headers: new Headers({"Content-Type": "application/json"}),
      body: JSON.stringify(infor_convert)
    }).then(function(res) {
      if(res.status){
        alert("Submit feedback success!")
      } else {
        alert("Submit feedback failed!")
      }
    })
  });
})
