// YOUR CODE HERE:
let app = {};

app.init = function() {
  $('#chats').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  $('#send .submit').submit(app.handleSubmit);
};

app.send = function(input) {
  $.ajax({
    type: 'POST',
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    data: JSON.stringify(input),
    success: console.log('yay!!'),
    contentType: 'application/json'
  });
};

app.fetch = function() {
  $.ajax({
    type: 'GET',
    success: function(data) {
      JSON.stringify(data.message);
    }
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {
  $('#chats').append('<p>' + '<span class=\'username\'>' + message.username + '</span>: ' + message.text + '</p>');
};

app.renderRoom = function(room) {
  $('#roomSelect').append('<ul>' + room + '</ul>');
};

app.handleUsernameClick = function() {

};

app.handleSubmit = function() {
  
};