(function () {
  "use strict";

  angular.module('app')
    .controller('UserController', function(UserService, $scope, $location, $routeParams, $rootScope) {
      var userCtrl = this;

      UserService.getUsers().success(function (data) {
        userCtrl.users = data;
      });

      UserService.getSingleUser($routeParams.userid).success(function(data) {
        userCtrl.singleUser = data;
        console.log(data.id);

      });

      userCtrl.currentIndex = $routeParams.userid;




  // userCtrl.routeBack = function () {
  //     UserService.getSingleUser($routeParams.userid).success(function(data) {
  //       userCtrl.singleUser = data;
  //       $location.path('/profile/' + data.id);
  //     });
  // };

      console.log('single profile index is: ', userCtrl.singleItem);


    });
  })();






// mainCtrl.superheros = SuperHerosService.getHeros();
//
//      mainCtrl.singleItem = SuperHerosService.getHero($routeParams.heroIndex);
//      mainCtrl.go = function (index) {
//        $location.path('/detail/' + index);
//      }
//     console.log("single item index is: ", mainCtrl.singleItem);
//
//      mainCtrl.alertMe = function () {
//        alert("Hi from mainCtrl");
//      };
//
//      mainCtrl.addSuperHero = function (addHero) {
//        var newHero = angular.copy(addHero);
//        SuperHerosService.addHero(newHero);
//        mainCtrl.newHero = {};
//      };
//
//      mainCtrl.deleteItem = function (index) {
//        SuperHerosService.deleteHero(index);
//      };
//
//      mainCtrl.editItem = function (hero) {
//        SuperHerosService.editHero(hero, $routeParams.heroIndex);
//        $location.path('/detail/' + $routeParams.heroIndex);
//      };
//
//      mainCtrl.login = function (username) {
//        if(username === "calvin") {
//          $location.path('/tiy');
//        }
//      };
//
//  });
//
// })();
