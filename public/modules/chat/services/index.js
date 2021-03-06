(function() {
  'use strict';
var messages = {
	join : 'has joined the chat',
	leave: 'has left the chat'
};
function chatSocket(socketFactory, UserTokenStorage) {
	var ioSocket = io.connect('?token=' + UserTokenStorage.get());
	var socket = socketFactory({
    		ioSocket: ioSocket
  	});
	return socket;
}
function chatData() {
	var data = {
		users: [],
		rooms:[],
		room:'',
		messages:{}
	};	
 	return {
    		getUsers: function() {
      			return data.users;
    		},
    		setUsers: function(users) {
      			data.users = users;
    		},
    		getRooms: function() {
      			return data.rooms;
    		},
    		setRooms: function(rooms) {
      			data.rooms = rooms;
    		},
    		getRoom: function() {
      			return data.room;
    		},
    		setRoom: function(room) {
      			data.room = room;
    		},
    		getMessages: function(room) {
    			if(!data.messages[room]){
    				data.messages[room] = [];
    			}
      		return data.messages[room];
    		},
    		addMessage: function(room,msg) {
    			if(!data.messages[room]){
    				data.messages[room] = [];
    			}
      		return data.messages[room].unshift(msg);
    		},
    	};
}

angular.module('chat.services', [])
	.constant('chatMsg', messages)
	.factory('chatSocket', chatSocket)
	.factory('chatData', chatData);
})();