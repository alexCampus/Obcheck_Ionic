angular.module('starter.controllers', [])

.controller('FriendsCtrl', function($scope, $cordovaGeolocation, $cordovaVibration, NgMap, FriendsFactory, $interval) {
 

  $scope.vibrate = function(){
    $cordovaVibration.vibrateWithPattern([0, 1000, 1000, 2000, 100, 4000, 100, 8000]);

  }

    var vm = this;
    vm.positions = [];
    var generateMarkers = function(users, maPosition) {
      vm.positions = [];
      
        //var numMarkers = Math.floor(Math.random() * 4) + 4; //between 4 to 8 markers
        for (i = 0; i < users.length; i++) {
           if (users[i].position != null) {
              var coordA = new google.maps.LatLng(users[i].position);
              var coordB = new google.maps.LatLng(maPosition[0], maPosition[1]);
              var distance = google.maps.geometry.spherical.computeDistanceBetween(coordA,coordB);
              var result = Math.round(distance/1000); 

              var lat = users[i].position.lat;
              var lng = users[i].position.lng;
              var title = users[i].name;
              var result = users[i].distance;
                      
        }
        vm.positions.push({lat:lat, lng:lng, title:title, distance:result});
        // console.log("vm.positions", vm.positions);
        $scope.positions = vm.positions;
      }
    };

    
  

  // NgMap.getMap().then(function(map) {
  //   console.log(map.getCenter());
  //   console.log('markers', map.markers);
  //   console.log('shapes', map.shapes);
  // });
  
  $scope.users = FriendsFactory.getUsers().then(function(users){
   $scope.users = users.users;
   

   var posOptions = {timeout: 10000, enableHighAccuracy: false};
   $cordovaGeolocation
   .getCurrentPosition(posOptions)
  
   .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.maPosition = [lat, long];      
      //console.log($scope.positions);
      generateMarkers(users.users, $scope.maPosition);
      
   }, function(err) {
      console.log(err)
   });

    var watchOptions = {timeout : 3000, enableHighAccuracy: false};
    var watch = $cordovaGeolocation.watchPosition(watchOptions);
  
   watch.then(
      null,
    
      function(err) {
         console.log(err)
      },
    
      function(position) {
         var lat  = position.coords.latitude
         var long = position.coords.longitude
         console.log(lat + '' + long)
      }
   );

   watch.clearWatch();

    
  
  }, function(msg){
        alert(msg);
    })


  
})

.controller('OneUserCtrl', function($scope, FriendsFactory, $stateParams, $cordovaGeolocation){
  //Affichage user
    var user = FriendsFactory.getUser($stateParams.id).then(function(user){
      $scope.title = user.name + " " + user.lastname;
      $scope.user = user;

      var posOptions = {timeout: 10000, enableHighAccuracy: false};
   $cordovaGeolocation
   .getCurrentPosition(posOptions)
  
   .then(function (position) {
      var lat  = position.coords.latitude
      var long = position.coords.longitude
      $scope.maPosition = [lat, long];      
      //console.log(lat + '   ' + long)

   }, function(err) {
      console.log(err)
   });

    var watchOptions = {timeout : 3000, enableHighAccuracy: false};
    var watch = $cordovaGeolocation.watchPosition(watchOptions);
  
   watch.then(
      null,
    
      function(err) {
         console.log(err)
         $scope.error = err;
      },
    
      function(position) {
         var lat  = position.coords.latitude
         var long = position.coords.longitude
         console.log(lat + '' + long)
      }
   );

   watch.clearWatch();
      
      
     
    }, function(msg){
        alert(msg);
    })

    //affichage user
  
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
