var myApp = angular.module('myApp', []); // still need to memorize this line of code
myApp.controller("TaskController", ['$scope', '$http', function($scope, $http){
    $scope.note = {};
    $scope.notes = [];
    $scope.heading = "Tasks: ";

    $scope.getTasks = function(){
        //Updates tasks, soft refresh
        $http.get('/todo').then(function(response){
            console.log(response);
            $scope.notes = response.data;
            return response.data;
        });
    };

    $scope.getData = function(){
        //GET
        $http.get('/todo').then(function(response){
            console.log(response);
            $scope.note = {};
            $scope.notes = response.data;
            return response.data;
        });
    };

    $scope.updateTasks = function(note){
        //POST
        console.log(note);
        $http.post('/todo', note).then($scope.getData());
    };

    $scope.deleteData = function(note) {    //changed to allow it to send a body object with the call
        console.log(note);                  //containing the ID in a body object
        //DELETE
        $http({ url: '/todo/' + note,
            method: 'DELETE',
            data: {id: note},
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function(res) {
            console.log(res.data);
            $scope.getTasks();
        }, function(error) {
            console.log(error);
        });
    };

    $scope.taskComplete = function(note) {
        //PUT

        $http({ url: '/todo/' + note,
            method: 'PUT',
            data: {id: note},
            headers: {"Content-Type": "application/json;charset=utf-8"}
        }).then(function(res) {
            console.log(res.data);
            $scope.getTasks();
        }, function(error) {
            console.log(error);
        });
    };

}]);