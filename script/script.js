angular.module('toDoList', ['ngRoute'])
   
.config(function($routeProvider){
    $routeProvider.when('/', {
    templateUrl: '/view/home.html',           
  })
  .when('/add', {
    templateUrl: '/view/add.html',
    controller : 'addController'
  })
  .when('/view', {
    templateUrl: '/view/view.html',
    controller : 'viewController'
  });
}) 
.controller('addController', function($scope, $http, addViewFactory) {
  
  $scope.items = []; 

  $scope.submit = function(newItem){
    $scope.items.push(newItem); 
    addViewFactory.setItem(newItem); 
    console.log($scope.items);
  };
  
  $scope.testingAPI = function(){
    return $http.get("http://jsonplaceholder.typicode.com/posts/1")
    .then(function(response) {
      console.log('GET is working ', response);
    });
  }

  $http.post("http://jsonplaceholder.typicode.com/posts", {data: 'something'})
  .then(function(response) {
        console.log('Post is working ', response);
  });

  $scope.remove = function(index) {
    $scope.items.splice(index, 1);
    addViewFactory.removeItem(); 
  };
})

.controller('viewController', function($scope, $http, addViewFactory) {

  $scope.items = addViewFactory.getData(); 
     
})

.factory('addViewFactory', function(){
  
  var items=[]; 
  return {
    setItem: function(item){
      items.push(item); 
    }, 
    removeItem: function(){
      items.pop(); 
    },
    getData: function(){
      return items; 
    }
  };

})









