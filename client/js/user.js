$(document).ready(function() {
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
      }
      else {
        alert('Fail, ' + res.message);
      }
    })



    // console.log(JSON.stringify(object));
    // var username = $("#username").val();
    // var name = $(".name").val();
    // // var pwd = $(["name='password'"]).val();

    console.log(username, name)
  })
})
