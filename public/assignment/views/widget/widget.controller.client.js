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
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .then(function (response) {
                    vm.widgets = response.data;
                }, function (error) {
                    console.log("Error: Unable to find widgets for page");
                });
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
            WidgetService
                .createWidget(vm.pageId, newWidget)
                .then(function (response) {
                    var widget = response.data;
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                }, function (error) {
                    console.log("Error: Unable to create Widget");
                });
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
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                }, function (error) {
                    console.log("Error: Unable to find widget for page");
                });
        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function back() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        }

        function updateWidget(widget) {
            WidgetService
                .updateWidget(vm.widgetId, widget)
                .then(function (response) {
                    vm.success = "Widget updated";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (error) {
                    console.log("Error: Unable to update widget");
                });
        }

        function deleteWidget() {
            WidgetService
                .deleteWidget(vm.widgetId)
                .then(function (response) {
                    vm.success = "Widget deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                }, function (error) {
                    console.log("Error: Unable to delete widget");
                });
        }
    }
})();
