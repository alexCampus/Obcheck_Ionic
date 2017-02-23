angular.module('starter.controllers', [])

.controller('FriendsCtrl', function($scope, FriendsFactory) {
  
  
  $scope.users = FriendsFactory.getUsers().then(function(users){
   
    google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise(0, 0, users.users));
  
  }, function(msg){
        alert(msg);
    })


  //Maps google    
    $scope.initialise = function(a,b ,users) {
    
    var myLatlng = new google.maps.LatLng(a, b);
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    

    var markers = [];
    var myPosition = [];

    for (var i = 0; i < users.length; i++) {
      if (users[i].position != null) {
        
        var marker = new google.maps.Marker({
          icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
          position: {lat: users[i].position.lat, lng: users[i].position.lng},
          map: map,
          title: users[i].name + " " + users[i].lastname + " Position"
        });
        
        markers.push(marker);

      }
    
    }
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
     for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map); 

     }

    navigator.geolocation.getCurrentPosition(function(pos) {
      myPosition.push({lat:pos.coords.latitude, lng:pos.coords.longitude});
      
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        var myLocation = new google.maps.Marker({
            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
            map: map,
            title: "My Location"
        });
   
  
    var coordB = new google.maps.LatLng(myPosition[0].lat, myPosition[0].lng);
   for (var i = 0; i < users.length; i++) {
   
    var coordA = new google.maps.LatLng(users[i].position);
    var distance = google.maps.geometry.spherical.computeDistanceBetween(coordA,coordB);
    var result = Math.round(distance/1000); 
    users[i].distance = result;
    
      
   }
      
    });
    $scope.users = users;
  
  };  
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
