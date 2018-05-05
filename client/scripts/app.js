// YOUR CODE HERE:
let app = {};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function() {
  $('#chats').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  $('#send .submit').submit(app.handleSubmit);
  $('#main').on('click', '.refresh', function() {
    app.clearMessages();
    let messages = app.fetch().results;
    for (var i = 0; i < messages.length; i++) { //currently not working (Cannot read property 'results')
      if (messages[i].username !== undefined) {
        app.renderMessage(messages[i]);
      }
    }
  });
};

app.send = function(input) {
  $.ajax({
    type: 'POST',
    url: app.server,
    data: JSON.stringify(input),
    success: console.log('yay!!'),
    contentType: 'application/json'
  });
};

app.fetch = function() {
  $.ajax({
    type: 'GET',
    url: app.server,
    data: {
      limit: 30,
      order: '-createdAt'
    },
    contentType: 'application/json',
    success: function(data) {
    }
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {
  $('#chats').prepend('<p>' + '<span class=\'username\'>' + message.username + '</span>: ' + message.text + '</p>');
};

app.renderRoom = function(room) {
  $('#roomSelect').append('<ul>' + room + '</ul>');
};

app.handleUsernameClick = function() {

};

app.handleSubmit = function() {
  
};

$(document).ready(function() {
  app.init();
  $('h2').append(window.location.search.slice(10));
});