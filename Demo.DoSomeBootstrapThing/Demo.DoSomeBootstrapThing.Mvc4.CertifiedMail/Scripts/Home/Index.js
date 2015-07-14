var app = angular.module("app", ["ngRoute", "jqwidgets"]);
app.controller("gridCtrl", function ($scope, $http) {
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
			width: "100%",
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

// get all selected records.
// http://www.jqwidgets.com/community/topic/select-multiple-rows-and-get-there-values-using-checkbox/
function getSelectedRows(gridId) {
	var grid = $("#" + gridId);
	var rowIndexes = grid.jqxGrid('selectedrowindexes');
	var selectedRows = new Array();

	for (var i = 0; i < rowIndexes.length; i++) {
		var row = grid.jqxGrid('getrowdata', rowIndexes[i]);
		selectedRows[selectedRows.length] = row;
	}

	return selectedRows;
}


// Copy
// http://stackoverflow.com/q/4946235
// http://www.jqwidgets.com/jquery-widgets-demo/demos/jqxgrid/#demos/jqxgrid/createremoveupdatedata.htm
function copySelected(fromGridId, toGridId, fromGridRowIndex) {
	var fromGrid = $("#" + fromGridId);
	var rowId = fromGrid.jqxGrid("getrowid", fromGridRowIndex);

	if (rowId != null) {
		fromGrid.jqxGrid('deleterow', rowId);

		var toGrid = $("#" + toGridId);
		var rowData = fromGrid.jqGrid('getrowdatabyid', rowId);
		toGrid.jqxGrid('addrow', null, rowData);
	}
}


















