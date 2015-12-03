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

			<div class="container">
				<div class="col-md-6">
					<div class="checkbox">
						<label for="unReimbExpOnly"><span>Un-Reimb.Exp. Only</span></label>
						<input id="unReimbExpOnly" ng-model="unReimbExpOnly" type="checkbox" style="position: relative" class="checkbox pull-right" />
						<input type="hidden" id="unReimbExpOnlyTag" ng-model="unReimbExpOnlyTag" />
					</div>
				</div>
				<div class="col-md-6">
					<div class="checkbox">
						<label for="toggleOnReport">Select All</label>
						<input id="toggleOnReport" type="checkbox" style="position: relative" class="checkbox pull-right" />
					</div>
				</div>
			</div>

		</div>
	</form>
</body>
</html>
