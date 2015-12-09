<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Demo.DoSomeBootstrapThing.CheckboxTest.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>

	<link href="Content/bootstrap.min.css" rel="stylesheet" />
	<link href="Content/bootstrap-theme.min.css" rel="stylesheet" />

	<script src="Scripts/jquery-2.1.4.min.js"></script>
	<script src="Scripts/bootstrap.min.js"></script>
</head>
<body>
	<form id="form1" runat="server">
		<div>

			<%--			<div class="container">
				<div class="container">
					<div class="col-lg-6">
						<label for="unReimbExpOnly" class="checkbox-inline" ng-click="handleUnReimbExpOnly()">
							<input id="unReimbExpOnly" ng-model="unReimbExpOnly" type="checkbox" style="position: relative" class="checkbox pull-right" />
							Un-Reimb.Exp. Only
												<input type="hidden" id="unReimbExpOnlyTag" ng-model="unReimbExpOnlyTag" />
						</label>
					</div>
					<div class="col-lg-6">
						<label for="toggleOnReport">
							<input id="toggleOnReport" type="checkbox" style="position: relative" class="checkbox pull-right" />
							Select All
						</label>
					</div>
				</div>

				<div class="btn-group" data-toggle="buttons">
					<label for="unReimbExpOnly" class="btn btn-primary">
						<input id="unReimbExpOnly" ng-model="unReimbExpOnly" type="checkbox" />
						Un-Reimb.Exp. Only
						<input type="hidden" id="unReimbExpOnlyTag" />
					</label>
					<label for="toggleOnReport" class="btn btn-primary">
						<input id="toggleOnReport" type="checkbox" />
						Select All
					</label>
				</div>--%>

			<div class="container">
				<div class="col-sm-6 form-inline">
					<div class="input-group">
						<label class="input-group-addon" for="expensesDue">Expenses Due</label>
						<input id="expensesDue" ng-model="expensesDue" class="form-control pull-right input-sm" type="text" readonly="readonly" />
						<input type="hidden" id="expensesDueTag" ng-model="expensesDueTag" />
					</div>
				</div>
				<div class="col-sm-6 form-inline">
					<div class="input-group">
						<label for="cpsPerc" class="input-group-addon">CPS %</label>
						<input id="cpsPerc" ng-model="cpsPerc" class="form-control pull-right input-sm" type="text" />
					</div>
				</div>
			</div>

			<%--				<div class="container">
					<button ng-click="viewReport()" class="btn btn-default" id="viewButton">View</button>
					<input ng-click="submitList()" class="btn btn-primary" id="submitButton" type="submit" value="Submit" />
				</div>--%>
			</div>
		</div>
	</form>
</body>
</html>
