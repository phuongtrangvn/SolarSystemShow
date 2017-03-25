$(document).ready(function() {
  callAjax(window.location.search);
  $("#btn_Logout").click(function(evt) {
    $.removeCookie('token', { path: '/'});
    window.location.pathname = '/login.html';
  })
})

function callAjax() {
  // chen thon tin vao bang
  $.ajax({
    url : "/api/contact/getContact",
    method : "get"
  }).always(function(res) {
    res.forEach(function(ele) {
      var tr = $('<tr id=' + ele._id + '>');
      var name = $('<td>');
      name.html(ele.name);
      tr.append(name);

      var email = $('<td>');
      email.html(ele.email);
      tr.append(email);

      var feedback = $('<td>');
      feedback.html(ele.feedback);
      tr.append(feedback);

      var time = $('<td>');
      time.html(ele.time);
      tr.append(time);

      var resolved = $('<td>');
      resolved.html(ele.resolved ? "Done": "Not yet");
      tr.append(resolved);

      var action = $('<td>');
      var btnEdit = $("<button class = 'btn btn-primary' data-toggle='modal' data-target='#myModal'> ");
      btnEdit.html('Edit');
      btnEdit.click(function(evt) {
        $.ajax({
          url : "/api/contact/edit",
          method : "put",
          data : {_id: ele._id, resolved: !ele.resolved},
          dataType: "application/JSON"
        }).always(function(res) {
          $('#table_body').empty();
          callAjax();
        })
      })
      var btnDel = $("<button class = 'btn btn-danger'>");
      btnDel.html('Delete');

      btnDel.click(function(evt) {
        $.ajax({
          url : "/api/contact/delete/" + ele._id,
          method : 'delete'
        }).always(function(res) {
          if (res.status) {
            $('#'+ ele._id).remove();
            alert("remove success");
          }
          else {
            alert("remove fail!");
          }
        })
      })

      action.append(btnEdit);
      action.append(btnDel);
      tr.append(action)
      $('#table_body').append(tr);

    })
  })
}
