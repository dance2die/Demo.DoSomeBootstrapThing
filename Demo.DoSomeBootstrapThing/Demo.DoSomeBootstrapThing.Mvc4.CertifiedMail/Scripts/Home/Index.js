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
				{ text: 'Name', datafield: 'name', width: 250 },
				{ text: 'Beverage Type', datafield: 'type', width: 250 },
				{ text: 'Calories', datafield: 'calories', width: 180 },
				{ text: 'Total Fat', datafield: 'totalfat', width: 120 },
				{ text: 'Protein', datafield: 'protein', minwidth: 120 }
			]
		};

		$scope.resultGridSettings =
		{
			width: "100%",
			height: 300,
			editable: true,
			selectionmode: 'checkbox',
			columnsresize: true,
			columns: [
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

	$scope.addToFinalResultClick = function () {
		$("#jqxGrid0").jqxGrid("beginupdate");
		$("#jqxGrid1").jqxGrid("beginupdate");

		//var selectedRowIndexes = getSelectedRowIndexes("jqxGrid0");
		//for (var i = 0; i < selectedRowIndexes.length; i++) {
		//	moveSelected("jqxGrid0", "jqxGrid1", selectedRowIndexes[i]);
		//}

		var selectedRows = getSelectedRows("jqxGrid0");
		addRowsToGrid("jqxGrid1", selectedRows);
		deleteRowsFromGrid("jqxGrid0", getSelectedRowIds("jqxGrid0"));

		$("#jqxGrid0").jqxGrid("resumeupdate");
		$("#jqxGrid1").jqxGrid("resumeupdate");
	}
});


//$(document).ready(function () {
//	$("#addToFinalResultButton").jqxButton();
//	$("#addToFinalResultButton").on("click", function () {
//		var selectedRows = getSelectedRowIndexes("jqxGrid0");
//		for (var i = 0; i < selectedRows.length - 1; i++) {
//			moveSelected("jqxGrid0", "jqxGrid1", selectedRows[i]);
//		}
//	});
//});



function addRowsToGrid(toGridId, rowsToAdd) {
	$("#" + toGridId).jqxGrid("addrow", null, rowsToAdd);
}

function deleteRowsFromGrid(fromGrid, rowIndexesToDelete) {
	$("#" + fromGrid).jqxGrid("deleterow", rowIndexesToDelete);
}

// get all selected records.
// http://www.jqwidgets.com/community/topic/select-multiple-rows-and-get-there-values-using-checkbox/
function getSelectedRowIndexes(gridId) {
	return $("#" + gridId).jqxGrid('selectedrowindexes');
}

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


function getSelectedRowIds(gridId) {
	var grid = $("#" + gridId);
	var rowIndexes = grid.jqxGrid('selectedrowindexes');
	var selectedRows = new Array();

	for (var i = 0; i < rowIndexes.length; i++) {
		var row = grid.jqxGrid('getrowdata', rowIndexes[i]);
		selectedRows[selectedRows.length] = row.uid;
	}

	return selectedRows;
}


// Copy
// http://stackoverflow.com/q/4946235
// http://www.jqwidgets.com/jquery-widgets-demo/demos/jqxgrid/#demos/jqxgrid/createremoveupdatedata.htm
function moveSelected(fromGridId, toGridId, fromGridRowIndex) {
	var fromGrid = $("#" + fromGridId);
	var rowId = fromGrid.jqxGrid("getrowid", fromGridRowIndex);

	if (rowId != null) {
		var toGrid = $("#" + toGridId);
		var rowData = fromGrid.jqxGrid('getrowdatabyid', rowId);
		toGrid.jqxGrid('addrow', null, rowData);

		fromGrid.jqxGrid('deleterow', rowId);
	}
}


















