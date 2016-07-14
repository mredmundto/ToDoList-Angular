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

  $scope.items = addViewFactory.getData(); 

  $scope.currentPic = addViewFactory.getData()[0].link; 

  $scope.submit = function(title, link){
    addViewFactory.setItem({title, link}); 
  };
  
  $scope.changePic = function(index){
    $scope.currentPic = addViewFactory.getData()[index].link; 
  }

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
    addViewFactory.removeItem(index); 
  };
})

.controller('viewController', function($scope, $http, addViewFactory) {

  $scope.items = addViewFactory.getData(); 
     
})

.factory('addViewFactory', function(){
  
  var items=[{ 
      title: 'Dog',
      link: 'http://pets.petsmart.com/services/_images/grooming/dog/m_t/dog-aromatherapy.jpg'
    }, 
    {
      title: 'Cat', 
      link: 'http://img.enkivillage.com/s/upload/images/2016/06/28a5aa44fe459c839bcb519341625fcd.jpg'
    }
  ]; 
  return {
    setItem: function(obj){
      items.push(obj); 
    }, 
    removeItem: function(index){
      items.splice(index, 1); 
    },
    getData: function(){
      return items; 
    }
  };

})









