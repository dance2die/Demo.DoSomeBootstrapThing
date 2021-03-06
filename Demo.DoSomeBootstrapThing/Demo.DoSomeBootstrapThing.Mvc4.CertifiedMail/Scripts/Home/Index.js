﻿$(document).ready(function() {
	handleEvents();
});

function handleEvents() {
	var fileNumberTextBox = $("#FileNumber");
	var nameTextBoxs = $("#FirstName, #LastName");

	var ENTER_KEYCODE = 13;	// ascii value for "enter" key

	// When File # is modified, clear First/Last name fields
	fileNumberTextBox.keypress(function (e) {
		if (e.keyCode === ENTER_KEYCODE) {
			nameTextBoxs.scope().$apply("addSearchResultToGrid()");
		} else {
			nameTextBoxs.val("");
			nameTextBoxs.scope().$apply("clearNames()");
		}
	});

	// When F/l names are modified, clear File #
	nameTextBoxs.keypress(function (e) {
		if (e.keyCode === ENTER_KEYCODE) {
			fileNumberTextBox.scope().$apply("addSearchResultToGrid()");
		} else {
			fileNumberTextBox.val("");
			fileNumberTextBox.scope().$apply("clearFileNumber()");
		}
	});
}

var app = angular.module("app", ["ngRoute", "jqwidgets"]);
app.controller("gridCtrl", function ($scope, $http, pageContext) {
	$scope.createWidget = false;

	console.log(pageContext);

	$scope.addSearchResultToGrid = function() {
		alert("Searching...");
	}

	$scope.clearNames = function () {
		$scope.firstName = "";
		$scope.lastName = "";
	}

	$scope.clearFileNumber = function () {
		$scope.fileNumber = "";
	}

	$http({
		method: 'POST',
		data: {
			fileNumber: "111",
			firstName: "Sung",
			lastName: "Kim"
		},
		//url: '/home/searchbyclient'
		url: pageContext.searchByClientURL
		//url: '/sampledata/beverages.txt'
	}).success(function (data, status) {
		setGridSettings(data);

		$scope.createWidget = true;
	}).error(function (data, status) {
		// Some error occurred
	});

	function setGridSettings(data) {
		$scope.createWidget = false;

		var source =
		{
			datatype: "array",
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
		//var dataAdapter = new $.jqx.dataAdapter(source);
		$scope.dataAdapter = new $.jqx.dataAdapter(source);

		$scope.grid = {};

		$scope.gridSettings =
		{
			width: "100%",
			height: "100%",
			ready: function () {
				//$scope.grid.selectrow(1);
			},
			source: $scope.dataAdapter,
			editable: false,
			selectionmode: 'checkbox',
			columnsresize: true,
			columns: [
				{ text: 'Name', datafield: 'name', width: 250 },
				{ text: 'Beverage Type', datafield: 'type', width: 250 }
				//{ text: 'Calories', datafield: 'calories', width: 180 },
				//{ text: 'Total Fat', datafield: 'totalfat', width: 120 },
				//{ text: 'Protein', datafield: 'protein', minwidth: 120 }
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
				// http://www.jqwidgets.com/community/topic/how-can-i-add-a-delete-column-to-a-jqxgrid/
				{
					text: 'Delete',
					width: 70,
					datafield: 'Delete',
					columntype: 'button',
					cellsrenderer: function() {
						return "Delete";
					},
					buttonclick: function(row) {
						// open the popup window when the user clicks a button.
						var rowId = getFinalGrid().jqxGrid('getrowid', row);
						deleteRowsFromGrid("jqxGrid1", rowId);
						//var offset = $("#jqxgrid").offset();
						//	$("#popupWindow").jqxWindow({ position: { x: parseInt(offset.left) + 60, y: parseInt(offset.top) + 60 } });
						//	// show the popup window.
						//	$("#popupWindow").jqxWindow('show');
						//}
					}
				},
				{
					text: 'Name', datafield: 'name', width: 250,
					columntype: 'combobox',
					createeditor: function (row, value, editor) {
						editor.jqxComboBox({ source: statesAdapter, displayMember: 'state_ID', valueMember: 'state_ID' });
					}
				},
				{ text: 'Beverage Type', datafield: 'type', width: 250 },
				{ text: 'Calories', datafield: 'calories', width: 180 },
				{ text: 'Total Fat', datafield: 'totalfat', width: 120 },
				{ text: 'Protein', datafield: 'protein', minwidth: 120 }
			]
		};

		$scope.createWidget = true;
	}

	$scope.searchByClient = function () {
		$http({
			method: 'get',
			//url: '/home/searchbyclient'
			url: pageContext.searchByClientURL
		}).success(function (data, status) {
			clearResultRows();
			addToResultRows(data);
			clearGridSelections("jqxGrid0");


			var resultGrid = getResultGrid();
			resultGrid.jqxGrid("refresh");
		}).error(function (data, status) {
			// Some error occurred
		});
	}

	function addToResultRows(data) {
		var resultGrid = getResultGrid();
		resultGrid.jqxGrid('addrow', null, data);
	}

	function clearResultRows() {
		var resultGrid = getResultGrid();
		resultGrid.jqxGrid('selectallrows');

		var selectedRowIds = getSelectedRowIds("jqxGrid0");
		deleteRowsFromGrid("jqxGrid0", selectedRowIds);
	}

	function getResultGrid() {
		return $("#jqxGrid0");
	}

	function getFinalGrid() {
		return $("#jqxGrid1");
	}

	var usStates = [
		{ state_ID: "AE" }, { state_ID: "AL" }, { state_ID: "AK" }, { state_ID: "AZ" }, { state_ID: "AR" },
		{ state_ID: "CA" }, { state_ID: "CO" }, { state_ID: "CT" }, { state_ID: "DE" }, { state_ID: "DC" },
		{ state_ID: "FL" }, { state_ID: "GA" }, { state_ID: "HI" }, { state_ID: "ID" }, { state_ID: "IL" },
		{ state_ID: "IN" }, { state_ID: "IA" }, { state_ID: "KS" }, { state_ID: "KY" }, { state_ID: "LA" },
		{ state_ID: "ME" }, { state_ID: "MD" }, { state_ID: "MA" }, { state_ID: "MI" }, { state_ID: "MN" },
		{ state_ID: "MS" }, { state_ID: "MO" }, { state_ID: "MT" }, { state_ID: "NE" }, { state_ID: "NV" },
		{ state_ID: "NH" }, { state_ID: "NJ" }, { state_ID: "NM" }, { state_ID: "NY" }, { state_ID: "NC" },
		{ state_ID: "ND" }, { state_ID: "NK" }, { state_ID: "OH" }, { state_ID: "OK" }, { state_ID: "OR" },
		{ state_ID: "PA" }, { state_ID: "PR" }, { state_ID: "RI" }, { state_ID: "SC" }, { state_ID: "SD" },
		{ state_ID: "TN" }, { state_ID: "TX" }, { state_ID: "VI" }, { state_ID: "UT" }, { state_ID: "VT" },
		{ state_ID: "VA" }, { state_ID: "WA" }, { state_ID: "WV" }, { state_ID: "WI" }, { state_ID: "WY" }
	];

	// http://www.jqwidgets.com/jquery-widgets-demo/demos/jqxgrid/#demos/jqxgrid/customcomboboxcolumn.htm
	var statesSource =
		{
			datatype: "array",
			datafields: [
				{ name: 'state_ID', type: 'string' }
			],
			localdata: usStates
		};
	var statesAdapter = new $.jqx.dataAdapter(statesSource, { autoBind: true });





	$scope.bindingComplete = function (event) {
		//alert("binding is completed");
	}

	$scope.addToFinalResultClick = function () {
		var resultGrid = getResultGrid();
		var finalGrid = getFinalGrid();

		// http://www.jqwidgets.com/create-remove-or-update-many-grid-rows/
		resultGrid.jqxGrid("beginupdate");
		finalGrid.jqxGrid("beginupdate");

		//var selectedRowIndexes = getSelectedRowIndexes("jqxGrid0");
		//for (var i = 0; i < selectedRowIndexes.length; i++) {
		//	moveSelected("jqxGrid0", "jqxGrid1", selectedRowIndexes[i]);
		//}

		var selectedRows = getSelectedRows("jqxGrid0");
		var rowsAdded = addRowsToGrid("jqxGrid1", selectedRows);
		selectRows("jqxGrid1", rowsAdded);

		var selectedRowIds = getSelectedRowIds("jqxGrid0");
		deleteRowsFromGrid("jqxGrid0", selectedRowIds);

		clearGridSelections("jqxGrid0");


		resultGrid.jqxGrid("resumeupdate");
		finalGrid.jqxGrid("resumeupdate");

		resultGrid.jqxGrid("refresh");
	}

	$scope.generateBatchIDClick = function (url) {
		var finalGridRows = getSelectedRows("jqxGrid1");
		var data = JSON.stringify(getSelectedRows("jqxGrid1"));
		console.log(finalGridRows);


		// http://stackoverflow.com/a/21597418/4035
		jQuery.ajax({
			type: 'POST',
			url: url,
			contentType: "application/json; charset=utf-8",
			datatype: 'json',
			data: data,
			success: function (data) {
				alert(data);
			},
			failure: function (errMsg) {
				alert(errMsg);
			}
		});
	}
});

function selectRows(gridID, rowsToSelect) {
	$.each(rowsToSelect, function (index, value) {
		$('#' + gridID).jqxGrid('selectrow', value.uid);
	});

	//$('#' + gridID).jqxGrid('selectrow', rowsToSelect);
};

function clearGridSelections(gridId) {
	var grid = $("#" + gridId);
	grid.jqxGrid("clearselection");
}

// Returns rows added to the grid.
function addRowsToGrid(toGridId, rowsToAdd) {
	$("#" + toGridId).jqxGrid("addrow", null, rowsToAdd);
	return rowsToAdd;
}

function deleteRowsFromGrid(fromGrid, rowIdsToDelete) {
	var rows = [];

	// If array is passed, then add each item to the rows collection
	// else "rowIdsToDelete" contains just one element, so add it to the rows collection
	if (rowIdsToDelete.length) {
		for (var i = 0; i < rowIdsToDelete.length; i++) {
			rows.push(rowIdsToDelete[i]);
		}
	} else {
		rows.push(rowIdsToDelete);
	}

	$("#" + fromGrid).jqxGrid("deleterow", rows);
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

function getRowIds(gridId) {
	var grid = $("#" + gridId);
	var rowIndexes = grid.jqxGrid('selectedrowindexes');
	var selectedRows = new Array();

	for (var i = 0; i < rowIndexes.length; i++) {
		//var row = grid.jqxGrid('getrowdata', rowIndexes[i]);
		var rowId = grid.jqxGrid('getrowid', rowIndexes[i]);
		selectedRows[selectedRows.length] = rowId;
	}

	return selectedRows;
}

function getSelectedRowIds(gridId) {
	var grid = $("#" + gridId);
	var rowIndexes = grid.jqxGrid('selectedrowindexes');
	var selectedRows = new Array();

	for (var i = 0; i < rowIndexes.length; i++) {
		//var row = grid.jqxGrid('getrowdata', rowIndexes[i]);
		var rowId = grid.jqxGrid('getrowid', rowIndexes[i]);
		selectedRows[selectedRows.length] = rowId;
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


















