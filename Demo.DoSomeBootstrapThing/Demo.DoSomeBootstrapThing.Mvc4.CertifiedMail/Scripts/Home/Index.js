var app = angular.module("app", ["ngRoute", "jqwidgets"]);
//app.controller("gridCtrl", function ($scope, $http, jsonData) {
app.controller("gridCtrl", function ($scope, $http) {
	$scope.createWidget = false;

	$http({
		method: 'POST',
		data: {
			fileNumber: "111",
			firstName: "Sung",
			lastName: "Kim"
		},
		url: '/home/searchbyclient'
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

	$scope.updatePartial = function () {
		$http({
			method: 'get',
			url: '/home/searchbyclient'
		}).success(function (data, status) {
			// prepare the data
			//var resultGrid = getResultGrid();
			//var datainformation = resultGrid.jqxGrid('getdatainformation');
			//var rowscount = datainformation.rowscount;

			//debugger;
			//if (rowscount == 0) {
			//	setGridSettings(data);
			//} else {
			//	resultGrid.jqxGrid('addrow', null, data);
			//}
			clearResultRows();
			addToResultRows(data);
			//setGridSettings(data);
			clearGridSelections("jqxGrid0");


			//	$scope.dataAdapter.dataBind();
			resultGrid.jqxGrid("refresh");
			//});

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
		addRowsToGrid("jqxGrid1", selectedRows);

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


function clearGridSelections(gridId) {
	var grid = $("#" + gridId);
	grid.jqxGrid("clearselection");
}

function addRowsToGrid(toGridId, rowsToAdd) {
	$("#" + toGridId).jqxGrid("addrow", null, rowsToAdd);
}

function deleteRowsFromGrid(fromGrid, rowIdsToDelete) {
	var rows = [];
	for (var i = 0; i < rowIdsToDelete.length; i++) {
		rows.push(rowIdsToDelete[i]);
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


















