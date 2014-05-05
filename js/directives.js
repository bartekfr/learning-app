angular.module("directives", [])
.directive('pagination', function ($location) {
	return {
		restrict: 'E',
		scope: {
			currentExercise: '=',
			all: '=',
			offset: '@'
		},
		template:
		'<nav class="pagination">' +
			'<ul class="pagination-list">' +
				'<li ng-class="{disabled: noPrevious(), prev: true, nav: true}"><a href ng-click="selectPrevious()">Previous</a></li>' +
				'<li ng-class="{disabled: noNext(), next: true, nav: true}"><a href ng-click="selectNext()">Next</a></li>' +
				'<li ng-repeat="ex in all" ng-show="show($index)" ng-class="{active: isActive($index), block: ex.intro}"><a href ng-click="setPage($index)">{{ex.block}}</a></li>' +
			'</ul>' +
		'</nav>',
		replace: true,
		link: function($scope) {
			$scope.$watch('all', function(value) {
				if(value) {
					$scope.exercisesNumber = $scope.all.length;
				}
			});

			$scope.isActive = function(page) {
				var currentItem = $scope.all[page];
				var intro = currentItem.intro;
				var blockNumber = currentItem.block;
				var currentBlockNumber = $scope.all[$scope.currentExercise].block;
				return $scope.currentExercise == page || (blockNumber == currentBlockNumber && intro) ;
			};

			$scope.setPage = function(page) {
				if(page >= 0 && page < $scope.exercisesNumber) {
					var currentItem = $scope.all[page];
					var id = currentItem.id;
					var intro = currentItem.intro;
					if(intro) {
						$location.path('intro/' + id);
					} else {
						$location.path('exercise/' + id);
					}

				}
			};

			$scope.selectPrevious = function() {
				$scope.setPage($scope.currentExercise - 1);
			};
			$scope.selectNext = function() {
				$scope.setPage($scope.currentExercise + 1);
			};

			$scope.noPrevious = function() {
				return $scope.currentExercise === 0;
			};

			$scope.noNext = function() {
				return $scope.currentExercise === $scope.exercisesNumber - 1;
			};

			//hide items to simulate moving exercises progress line.
			$scope.show = function(i) {
				return i > $scope.currentExercise - $scope.offset;
			};
		}
	};
})

//custom validation directive: lowercase and trim input
.directive('customValidation', function(){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs, modelCtrl) {
			//add parser to tranform input before saving it in model
			modelCtrl.$parsers.push(function (inputValue) {
				var newValue = inputValue.toLowerCase().replace(/ /g, '');
				if (newValue != inputValue) {
					//set view value so that the value in the view reflects actual value in the model
					modelCtrl.$setViewValue(newValue);
					modelCtrl.$render();
				}
				return newValue;
			});
		}
	};
});