angular.module('exercisesApp', ["ngRoute", "directives", "ngRoute", "exercisesData"])
.config(['$routeProvider', '$locationProvider', function ($routeProvider,$locationProvider) {
	$routeProvider
		//each exercise has own template. There is one shared template for all introductions screens
		.when('/intro/:id', {templateUrl: 'templates/intro.html', controller: 'exercise'})
		.when('/exercise/:id', {
				controller:'exercise',
				templateUrl: function(params){ return 'templates/ex-' + params.id + '.html'; }
			})
		.otherwise({redirectTo: '/intro/1.0'});
}])
.controller('exercise', ['$scope', '$routeParams', 'exercises', function ($scope, $routeParams, exercises) {
	$scope.clear = false;

	/*normally such data are retrieved from AJAX request. In such case promise have to be used.
	Assuming that exercises is promise returned from 'exercises' service, code below would look like this:
	exercises.then(function(data) { ... do something with data ...})
	*/
	$scope.allExercises = exercises;

	$scope.paramId = $routeParams.id;

	//find object with current exercise data and add some properties to the scope
	var exercisesNumber  = $scope.allExercises.length;
	for(var i = 0; i < exercisesNumber; i++) {
		var val = $scope.allExercises[i];
		if(val.id == $scope.paramId) {
			$scope.exercises = val.exercises;
			$scope.instructions = val.text;
			$scope.currentExercise = i;
			$scope.subject = val.subject;
			if(val.intro) {
				$scope.block = val.block;
			}
			break;
		}
	}

	//route params are not accessible in parent controller so add them to parent scope.
	//Thanks to this pagination can be included only once (in index.html) and shared across exercises templates
	$scope.exercisesData.allExercises = exercises;
	$scope.exercisesData.currentExercise = $scope.currentExercise;

	//screen title
	$scope.title = "Exercise  " + $scope.paramId.split('.')[0] + '. ' + $scope.subject;

	//check and clear handler
	$scope.check = function() {
		$scope.checked = true;
		if($scope.clear) {
			$scope.checked = false;
			angular.forEach($scope.exercises, function(val) {
				val.answer = "";
			});
		}
		$scope.clear = !$scope.clear;
	};
	$scope.reset = function() {
		$scope.checked = false;
		$scope.clear = false;
	};
}])
.controller('main', ['$scope', function ($scope) {
	$scope.exercisesData = {};
}]);
