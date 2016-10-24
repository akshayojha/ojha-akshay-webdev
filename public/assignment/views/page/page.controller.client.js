/**
 * Created by ghost on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController)
        .controller("EditPageController", EditPageController)
        .controller("NewPageController", NewPageController);

    function PageListController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];
        vm.profile = profile;
        vm.newPage = newPage;
        vm.openPage= openPage;
        vm.editPage = editPage;
        vm.back = back;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function newPage() {
            $location.url("/user/"+ vm.userId + "/website/"+vm.websiteId+"/page/new");
        }

        function openPage(page) {
            $location.url("/user/"+ vm.userId + "/website/"+vm.websiteId+"/page/"+page._id + "/widget");
        }
        function editPage(page) {
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+page._id);
        }

        function back() {
            $location.url("/user/"+vm.userId+"/website");
        }
    }

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams["wid"];
        vm.profile = profile;
        vm.newPage = newPage;
        vm.openPage= openPage;
        vm.editPage = editPage;
        vm.back = back;
        vm.createPage = createPage;

        function init() {
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function newPage() {
            $location.url("/user/"+ vm.userId + "/website/"+vm.websiteId+"/page/new");
        }

        function openPage(page) {
            $location.url("/user/"+ vm.userId + "/website/"+vm.websiteId+"/page/"+page._id + "/widget");
        }
        function editPage(page) {
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+page._id);
        }

        function back() {
            $location.url("/user/"+vm.userId+"/website");
        }

        function createPage(page) {
            if (page) {
                page =  PageService.createPage(vm.websiteId, page);
                if (page) {
                    vm.success = "Successfully created a new page";
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                } else {
                    vm.alert = "Error creating new page";
                }
            } else {
                vm.alert = "Error invalid page name entered"
            }
        }
    }

    function EditPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.profile = profile;
        vm.newPage = newPage;
        vm.openPage= openPage;
        vm.editPage = editPage;
        vm.back = back;
        vm.createPage = createPage;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            vm.pages = PageService.findPageById(vm.pageId);
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);

        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function newPage() {
            $location.url("/user/"+ vm.userId + "/website/"+vm.websiteId+"/page/new");
        }

        function openPage(page) {
            $location.url("/user/"+ vm.userId + "/website/"+vm.websiteId+"/page/"+page._id + "/widget");
        }
        function editPage(page) {
            $location.url("/user/"+ vm.userId +"/website/"+vm.websiteId+"/page/"+page._id);
        }

        function back() {
            $location.url("/user/"+vm.userId+"/website");
        }

        function createPage(page) {
            if (page) {
                page =  PageService.createPage(vm.websiteId, page);
                if (page) {
                    vm.success = "Successfully created a new page";
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                } else {
                    vm.alert = "Error creating new page";
                }
            } else {
                vm.alert = "Error invalid page name entered"
            }
        }

        function deletePage() {
            var response = PageService.deletePage(vm.pageId);
            if (response) {
                vm.success = "Successfully deleted page";
                $location.url("/user/" + vm.userId + "/website/"+vm.websiteId+"/page");
            } else {
                vm.alert = "Error cant delete the page";
            }
        }

        function updatePage(page) {
            page = PageService.updatePage(vm.pageId, page);
            if (page) {
                vm.success = "Successfully updated the page";
                $location.url("/user/" + vm.userId +"/website/"+vm.websiteId+ "/page");
            } else {
                vm.alert = "Error cant update the page";
            }
        }
    }
})();