angular.module('exercisesData', [])
.factory('exercises', [ function () {
	/*
		service returns object with exercises data. 
		Normally it would be retrieved from server by AJAX calls and service would return promise object
	*/
	return [
		//each array item corresponds to one exercise or exercises set intro view (template)
		{
			id: "1.0", // exercise unique id
			block: 1, //number of exercises set. TODO: application should extract this param from id property
			intro: true, // helper property to check if item have any exercies. If intro equals true there is no exercises
			text: "Hello. In this section we focus on vocabluary", //some additional text
		},
		{
			id: "1.1",
			block: 1,
			exercises: [ // exercise answers
				{correctAnswer: "sunny", example: true},
				{correctAnswer: "cloudy"},
				{correctAnswer: "raining"},
				{correctAnswer: "windy"},
				{correctAnswer: "snowing"},
				{correctAnswer: "foggy"}
				],
			text: "fill in the gaps",
			subject: "Vocabluary"
		},
		{
			id: "1.2",
			block: 1,
			exercises: [
					{correctAnswer: 2, label: "enyoing a field trip", example: true},
					{correctAnswer: 4, label: "taking a test"}, 
					{correctAnswer: 1, label: "doing a project"}, 
					{correctAnswer: 6, label: "yoga"},
					{correctAnswer: 5, label: "giving a presentation"},
					{correctAnswer: 3, label: "working on computers"}
			],
			text: "match the image to text",
			subject: "Vocabluary advanced"
		},
		{
			id: "2.0",
			block: 2,
			intro: true,
			text: "In this section we focus on grammar"
		},
		{
			id: "2.1",
			block: 2,
			exercises: [{correctAnswer: "sunny"}, {correctAnswer: "cloudy"}],
			text: "Sample empty screen 1",
			subject: "Grammar"
		},
		{
			id: "2.2",
			block: 2,
			exercises: [{correctAnswer: "sunny"}, {correctAnswer: "cloudy"}],
			text: "Sample empty screen 2",
			subject: "Grammar"
		}
	];
}]);
