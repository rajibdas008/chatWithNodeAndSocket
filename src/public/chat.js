$(function () {
    var socket = io(); // io.connect("http://localhost:3000");
    $("form").submit(function(e){
      e.preventDefault();
      var data = {username:$("#username").val(),msg:$("#m").val()};
      socket.emit('message',data);
      $("#m").val('');
      return false;
    })
    socket.on('message', function(data){
        $('#messages').append($('<li>').text(data.username+': '+data.msg));
    });
}) 