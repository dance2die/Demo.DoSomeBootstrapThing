/// <reference path="knockout-1.3.0beta.debug.js" />
/// <reference path="jquery-ui-1.8.16.js" />
/// <reference path="jquery-1.6.4.js" />
/// <reference path="ajax-util.js" />
/// <reference path="ko-protected-observable.js" />

$(function () {
    $("#tagDialog").hide();

    $.getJSON("/api/tags", function (data) {
        var viewModel = {
            // data
            tags: ko.observableArray(ko.toProtectedObservableItemArray(data)),
            tagToAdd: ko.observable(""),
            selectedTag: ko.observable(new ko.protectedObservableItem(data[0])),

            // behaviors
            addTag: function () {
                var newTag = { Name: this.tagToAdd() };
                this.tagToAdd("");

                ajaxAdd("/api/tags", ko.toJSON(newTag), function (data) {
                    viewModel.tags.push(new ko.protectedObservableItem(data));
                });
            },

            selectTag: function () {
                viewModel.selectedTag(this);
            },

            // Data (Drills)
            currentTagDrills: ko.observableArray([]),
            drillToAdd: ko.observable(""),
            useDrillEditTemplate: ko.observable(null),
            hoverDrill: ko.observable(),
            clickedDrill: ko.observable(null),

            // Behaviors (Drills)
            editDrill: function () {
                viewModel.useDrillEditTemplate(true);
            },

            tagNameFor: function (id) {
                var tagItem = ko.utils.arrayFirst(viewModel.tags(), function (item) {
                    return item.Id() === parseInt(id);
                });
                return tagItem.Name;
            },

            saveDrill: function () {
                viewModel.selectedDrill().commit();
                var drill = viewModel.selectedDrill();
                viewModel.useDrillEditTemplate(null);
                ajaxUpdate("/api/drills/" + drill.Id(), ko.toJSON(drill));
            },

            cancelDrillEdit: function () {
                viewModel.useDrillEditTemplate(null);
            },

            addDrill: function () {
                var newDrill = { Name: this.drillToAdd(), TagId: this.selectedTag().Id };
                this.drillToAdd("");

                ajaxAdd("/api/drills", ko.toJSON(newDrill), function (data) {
                    viewModel.currentTagDrills.push(new ko.protectedObservableItem(data));
                });
            },

            drillMouseOver: function () {
                viewModel.hoverDrill(this);
            },

            drillMouseOut: function () {
                viewModel.hoverDrill(null);
            },

            drillClick: function () {
                viewModel.clickedDrill(this);
            },

            isClicked: function () {
                return this === viewModel.clickedDrill();
            }
        }; // end viewModel

        $(".tag-delete").live("click", function () {
            var itemToRemove = ko.dataFor(this);
            viewModel.tags.remove(itemToRemove);
            ajaxDelete("/api/tags/" + itemToRemove.Id());
        });

        $(".tag-edit").live("click", function () {
            viewModel.selectedTag(ko.dataFor(this));
            $("#tagDialog").dialog({
                buttons: {
                    Save: function () {
                        $(this).dialog("close");
                        viewModel.selectedTag().Name.commit();
                        ajaxUpdate("/api/tags/" + viewModel.selectedTag().Id(), ko.toJSON(viewModel.selectedTag()));
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                }
            });
        });

        $(".drill-delete").live("click", function () {
            var itemToRemove = ko.dataFor(this);
            viewModel.currentTagDrills.remove(itemToRemove);
            ajaxDelete("/api/drills/" + itemToRemove.Id());
            viewModel.clickedDrill(null);
            viewModel.hoverDrill(null);
        });

        viewModel.selectedDrill = ko.dependentObservable(function () {
            var hoverDrill = this.hoverDrill();
            var clickedDrill = this.clickedDrill();
            return hoverDrill ? hoverDrill : (clickedDrill ? clickedDrill : this.currentTagDrills()[0]);
        }, viewModel);

        ko.computed(function () {
            $.getJSON("/api/drills?tagId=" + this.selectedTag().Id(), function (data) {
                viewModel.currentTagDrills(ko.toProtectedObservableItemArray(data));
            });
        }, viewModel);

        ko.applyBindings(viewModel);
    });
});
