angular.module('starter.services', [])

.factory('FriendsFactory', function($http, $q){
  var factory = {
    users: false,

    getUsers: function(){

      var deferred = $q.defer();

      if (factory.users != false) {
        deferred.resolve(factory.users);
      } 
      else {
        $http.get('http://www.carbillet.net/api-digitalGrenoble/users/')
          .success(function(data, status){

            factory.users = data;
            deferred.resolve(factory.users);

          })
          .error(function(data, status){ 
            deferred.reject('Impossible de récupérer les données');
          });
      }
      return deferred.promise;
    },
    getUser: function(id){

      var deferred = $q.defer();
      var user = {};

      var user = factory.getUsers().then(function(users){

        angular.forEach(factory.users.users, function(value, key){
          
          if (value.idUser == id) {
            user = value;
          }
        });
        deferred.resolve(user);
      },function(msg){
        deferred.reject(msg);
      })
      return deferred.promise;
    },
  }
  
  return factory;
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
