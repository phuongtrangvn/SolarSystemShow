$(document).ready(function() {
  var search = {};
  var urlParams = new URLSearchParams(window.location.search)
  $('#input_name').val(urlParams.get('name'));
  $('#input_account').val(urlParams.get('username'));
  $('.radio_role').each(function (i, ele) {
    if ($(ele).val() == urlParams.get('role')) {
      $(ele).attr('checked', true);
    }
  })
  // search.account = urlParams.get('account');
  // search.role = urlParams.get('role');
  callAjax(window.location.search);
})

function callAjax(querySearch) {
  // chen thon tin vao bang
  $.ajax({
    url : "/api/user/find" + querySearch,
    method : "get"
  }).always(function(res) {
    res.forEach(function(ele) {
      var tr = $('<tr id=' + ele._id + '>');
      var account = $('<td>');
      account.html(ele.username);
      tr.append(account);

      var name = $('<td>');
      name.html(ele.name);
      tr.append(name);

      var role = $('<td>');
      role.html(ele.role);
      tr.append(role);

      var action = $('<td>');
      var btnEdit = $("<button class = 'btn btn-primary' data-toggle='modal' data-target='#myModal'> ");
      btnEdit.html('Edit');
      btnEdit.click(function(evt) {
        $("#edit_name").val(ele.name);
        $("#edit_username").val(ele.username);
        $("#edit_age").val(ele.age)
        $('.edit_role').each(function (i, role) {
          if ($(role).val() == ele.role) {
            console.log(ele.role);
            $(role).attr('checked', true);
          }
        })
      })
      var btnDel = $("<button class = 'btn btn-danger'>");
      btnDel.html('Delete');

      btnDel.click(function(evt) {
        $.ajax({
          url : "/api/user/delete/" + ele.username,
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
