/**
 * Created by ghost on 10/20/16.
 */
(function(){

    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($location, $routeParams, WidgetService, $sce) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId= $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.profile = profile;
        vm.newWidget = newWidget;
        vm.editWidget = editWidget;
        vm.trustYoutubeURL = trustYoutubeURL;
        vm.getYoutubeURL = getYoutubeURL;
        vm.back = back;

        function init() {
            vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function newWidget() {
            $location.url("/user/"+ vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new");
        }

        function editWidget(widget) {
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/" + widget._id);
        }

        function back() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function getYoutubeURL(widget) {
            if (widget.url) {
                var videoID = widget.url.split("/");
                videoID = videoID.splice(-1)[0];
                return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + videoID);
            }
            return null;
        }

        function trustYoutubeURL(widget) {
            return $sce.trustAsHtml(widget.text);
        }
    }

    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId= $routeParams["pid"];
        vm.profile = profile;
        vm.newWidget = newWidget;
        vm.editWidget = editWidget;
        vm.back = back;
        vm.createWidget = createWidget;

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function newWidget() {
            $location.url("/user/"+ vm.userId + "/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new");
        }

        function editWidget(widget) {
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/" + widget._id);
        }

        function back() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function createWidget(widgetType) {
            var newWidget = {};
            newWidget.widgetType= widgetType;
            newWidget= WidgetService.createWidget(vm.pageId, newWidget);
            if(newWidget) {
                vm.success = "Successfully created a new widget";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
            } else {
                vm.alert = "Error unable to create a widget";
            }

        }
    }

    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.pageId= $routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.profile = profile;
        vm.back = back;
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function back() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function updateWidget(widget) {

            widget = WidgetService.updateWidget(vm.widgetId, widget);
            if (widget) {
                vm.success = "Successfully updated the widget";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.alert = "Error unable to update Widget";
            }
        }

        function deleteWidget() {
            var response = WidgetService.deleteWidget(vm.widgetId);
            if (response) {
                vm.success = "Successfully deleted widget";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.alert = "Error unable to delete widget";
            }
        }
    }
})();
