// YOUR CODE HERE:
let app = {};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function(value) {
  $('#chats').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  $('#send .submit').submit(app.send());
  $('#main').on('click', '.refresh', function() {
    app.fetch();
    //app.clearMessages();
    //let messages = app.fetch().responseJSON;
    //console.log(value)
    // for (var i = 0; i < messages.length; i++) { //currently not working (Cannot read property 'results')
    //   if (messages[i].username !== undefined) {
    //     app.renderMessage(messages[i]);
    //   }
    // }
  });
};

app.send = function(input) {
  $.ajax({
    type: 'POST',
    url: app.server,
    data: JSON.stringify(input),
    success: function() {
      
    },
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
      //console.log(data)
      for (var i = 0; i < data.results.length; i++) {
        data.results[i];
        app.renderMessage(data.results[i]);
      }
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
  // $.ajax({
  //   type: 'PUT'
  //   url: app.server
  //   contentType: 'application/json'
  //   success: function(data) {
  //     'add message!'
  //   };
  // })
};

$(document).ready(function() {
  app.init();
  $('h2').append(window.location.search.slice(10));
});