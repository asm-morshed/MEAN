var myApp=angular.module('myApp',[]);


myApp.controller('myController',['$scope','$http',function ($scope,$http) {
	console.log("Salam");
	$scope.btnName="Save";

	var reLoad=function () {
		
	
	$http.get('/employeeList').success(function (response) {
		
		$scope.employeeList=response;
		console.log(response);
		$scope.anEmployee="";

	});
}

reLoad();

	$scope.addEmployeeInfo=function () {
		
		console.log("After the clicking the button");

		console.log($scope.anEmployee);

		$http.post('employeeList',$scope.anEmployee).success(function (response) {
			console.log(response);
		});
		reLoad();
	}

	$scope.edit=function (id) {
		
		console.log(id);
		$http.get('/employeeList/'+id).success(function(response){
			console.log(response.name);
			$scope.anEmployee=response;

		});
	}
	$scope.delete=function (id) {
		console.log(id);
		$http.delete('/employeeList/'+id).success(function(response){

			reLoad();
		});
	}

	$scope.editEmployeeInfo=function(id){
		console.log(id);
		$http.put('/employeeList/'+$scope.anEmployee._id,$scope.anEmployee).success(function (response) {
			reLoad();
		})
	}


}]);
