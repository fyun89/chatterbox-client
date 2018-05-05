// YOUR CODE HERE:
let app = {};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function(value) {
  app.fetch().done(function(data) {
    var listOfRooms = {};
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].roomname === undefined) {
        app.renderMessage(data.results[i]);
        
      } else if (listOfRooms[data.results[i].roomname] === undefined) {
        listOfRooms[data.results[i].roomname] = i;
        app.renderRoom(data.results[i].roomname, listOfRooms[data.results[i].roomname]);
      }
    }
  });
  $('#roomSelect').on('click', '[value=1]', function(event) {
    //app.fetch().done(function(data) {
      console.log('hi')
    console.log(event)  
    //});
  });
  
  $('#chats').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  $('.submit').on('click', function() {
    event.preventDefault();
    let text = $('#message').val();
    let userName = window.location.search.slice(10);
    let message = {username: userName, text: text};
    app.send(message);
    var getNewMessage = app.fetch().done(function(data) {
      app.renderMessage(data.results[0], true);
    });
    $('#message').val('')
  });

  // $('#message').val()
  $('#main').on('click', '.refresh', function() {
    app.clearMessages();
    app.fetch().done(function(data) {
      //console.log(data)
      for (let i = 0; i < data.results.length; i++) {
        data.results[i];
        app.renderMessage(data.results[i]);
      }
    });
    //let messages = app.fetch().responseJSON;
    //console.log(value)
    // for (let i = 0; i < messages.length; i++) { //currently not working (Cannot read property 'results')
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
  return $.ajax({
    type: 'GET',
    url: app.server,
    data: {
      limit: 30,
      order: '-createdAt'
    },
    contentType: 'application/json',
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message, sending) {
  if (sending === undefined){
    $('#chats').prepend('<p>' + '<span class=\'username\'>' + message.username + '</span>: ' + message.text + '</p>');
  }else{
    $('#chats').append('<p>' + '<span class=\'username\'>' + message.username + '</span>: ' + message.text + '</p>');
  }
};

app.renderRoom = function(room, value) {
  
  $('#roomSelect').append('<option value=' + value + '>' + room + '</option>');
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