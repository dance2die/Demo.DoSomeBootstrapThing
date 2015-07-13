var app = angular.module("app", ["ngRoute", "jqwidgets"]);

app.controller("demoController", function ($scope, $http) {
	$scope.createWidget = false;

	$http({
		method: 'get',
		//url: '../sampledata/beverages-simple.txt'
		url: '../sampledata/beverages.txt'
	}).success(function (data, status) {
		// prepare the data
		var source =
		{
			datatype: "json",
			datafields: [
				//{ name: 'process', type: 'bool' },
				{ name: 'name', type: 'string' },
				{ name: 'type', type: 'string' },
				{ name: 'calories', type: 'int' },
				{ name: 'totalfat', type: 'string' },
				{ name: 'protein', type: 'string' }
			],
			id: 'id',
			localdata: data
		};
		var dataAdapter = new $.jqx.dataAdapter(source);

		$scope.grid = {};

		$scope.gridSettings =
		{
			width: 850,
			height: 300,
			ready: function () {
				//$scope.grid.selectrow(1);
			},
			source: dataAdapter,
			editable: true,
			selectionmode: 'checkbox',
			columnsresize: true,
			columns: [
				//{ text: 'Process', datafield: 'process', columntype: 'checkbox', width: 67 },
				//{ text: 'Process', columntype: 'checkbox', width: 67 },
				{ text: 'Name', datafield: 'name', width: 250 },
				{ text: 'Beverage Type', datafield: 'type', width: 250 },
				{ text: 'Calories', datafield: 'calories', width: 180 },
				{ text: 'Total Fat', datafield: 'totalfat', width: 120 },
				{ text: 'Protein', datafield: 'protein', minwidth: 120 }
			]
		};
		$scope.createWidget = true;
	}).error(function (data, status) {
		// Some error occurred
	});

	$scope.bindingComplete = function (event) {
		//alert("binding is completed");
	}
});
