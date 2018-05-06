// YOUR CODE HERE:
let app = {};

app.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

app.init = function(value) {
  app.fetch().done(function(data) {
    var listOfRooms = {};
    for (let i = 0; i < data.results.length; i++) { //loads new messages from the main lobby (roomname property is undefined)
      if (data.results[i].roomname === undefined) {
        app.renderMessage(data.results[i]);
        
      } else if (listOfRooms[data.results[i].roomname] === undefined) { //list of rooms that appear in the recent messages
        listOfRooms[data.results[i].roomname] = true;
        app.renderRoom(data.results[i].roomname, listOfRooms[data.results[i].roomname]);
      }
    }
  });
  $('#roomSelect').on('change', function(event) {
    event.currentTarget.value
    // clear #chats
    app.clearMessages();
    // rendermessages
    app.fetch().done(function(data) {
      // check data.results.roomname === selected roomname
      for (var i = 0; i < data.results.length; i++) {
        if (event.currentTarget.value === 'lobby') {
          app.renderMessage(data.results[i]);
        } else if(data.results[i].roomname === event.currentTarget.value) {
          app.renderMessage(data.results[i]);
        }
      }
    });
  });
  
  $('#chats').on('click', '.username', function() {
    app.handleUsernameClick();
  });
  
  $('.submit').on('click', function() {
    event.preventDefault();
    let text = _.escape($('#message').val());
    let userName = _.escape(window.location.search.slice(10));
    let roomname = _.escape($('#roomSelect').val());
    let message = {username: userName, text: text, roomname: roomname};
    app.send(message);
    var getNewMessage = app.fetch().done(function(data) {
      app.renderMessage(data.results[0], true);
    });
    $('#message').val('')
  });

  $('#main').on('click', '.refresh', function() {
    app.clearMessages();
    app.fetch().done(function(data) {
      for (let i = 0; i < data.results.length; i++) {
        app.renderMessage(data.results[i]);
      }
    });
  });

  $('#chats').on('click', '.username', function(event) {
    if (app.friends[event.target.innerText] === undefined) {
      app.friends[event.target.innerText] = true;
    } else {
      delete app.friends[event.target.innerText];
    }
    console.log('You\'ve just clicked ', event.target.innerText);
  });
  
  $('#main').on('click', '#newRoom', function() {
    console.log('you clicked create room button')
    var createRoom = (prompt('What room would you like to create?') || 'lobby');
    createRoom = JSON.stringify(createRoom);
    $('#roomSelect').append('<option value=' + createRoom + '>' + createRoom + '</option>')
  });
};

app.friends = {};

app.send = function(input) {
  $.ajax({
    type: 'POST',
    url: app.server,
    data: JSON.stringify(input),
    contentType: 'application/json',
    success: function() {
      console.log('Message sent!');
    },
    error: function() {
      console.log('Message not sent! :(')
    }
  });
};

app.fetch = function() {
  return $.ajax({
    type: 'GET',
    url: app.server,
    data: {
      limit: 20,
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
    if (app.friends[message.username]) {
      $('#chats').prepend('<p style=\'font-weight: bold;\'>' + '<span class=\'username\'>' + _.escape(message.username) + '</span>: ' + _.escape(message.text) + '</p>');
    }else{
      $('#chats').prepend('<p>' + '<span class=\'username\'>' + _.escape(message.username) + '</span>: ' + _.escape(message.text) + '</p>');
    }
  }else{    
    $('#chats').append('<p>' + '<span class=\'username\'>' + _.escape(message.username) + '</span>: ' + _.escape(message.text) + '</p>');
  }
};

app.renderRoom = function(room, value) {
  $('#roomSelect').append('<option value=' + room + ' id=' + value + '>' + room + '</option>');
};

app.handleUsernameClick = function() {

};

app.handleSubmit = function() {
};

$(document).ready(function() {
  app.init();
  $('h2').append(window.location.search.slice(10));
});