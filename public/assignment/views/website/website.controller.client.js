/**
 * Created by ghost on 10/20/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("EditWebsiteController", EditWebsiteController)
        .controller("NewWebsiteController", NewWebsiteController);

    function WebsiteListController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.profile = profile;
        vm.newWebsite = newWebsite;
        vm.openWebsite= openWebsite;
        vm.editWebsite = editWebsite;
        vm.back = back;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function newWebsite() {
            $location.url("/user/"+ vm.userId + "/website/new");
        }

        function openWebsite(website) {
            $location.url("/user/"+ vm.userId + "/website/"+website._id + "/page");
        }
        function editWebsite(website) {
            $location.url("/user/"+ vm.userId +"/website/"+website._id);
        }

        function back() {
            $location.url("/user/"+vm.userId);
        }
    }

    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.profile = profile;
        vm.newWebsite = newWebsite;
        vm.openWebsite= openWebsite;
        vm.editWebsite = editWebsite;
        vm.back = back;
        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function newWebsite() {
            $location.url("/user/"+ vm.userId + "/website/new");
        }

        function openWebsite(website) {
            $location.url("/user/"+ vm.userId + "/website/"+website._id + "/page");
        }
        function editWebsite(website) {
            $location.url("/user/"+ vm.userId +"/website/"+website._id);
        }

        function back() {
            $location.url("/user/"+vm.userId);
        }

        function createWebsite(website) {
            if (website) {
                website =  WebsiteService.createWebsite(vm.userId, website);
                if (website) {
                    vm.success = "Successfully created a new website";
                    $location.url("/user/"+vm.userId+"/website");
                } else {
                    vm.alert = "Error creating new website";
                }
            } else {
                vm.alert = "Error invalid website name entered"
            }
        }
    }
    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.profile = profile;
        vm.newWebsite = newWebsite;
        vm.openWebsite= openWebsite;
        vm.editWebsite = editWebsite;
        vm.back = back;
        vm.createWebsite = createWebsite;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsiteById(vm.websiteId);
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
        }
        init();

        function profile() {
            $location.url("/user/"+vm.userId);
        }

        function newWebsite() {
            $location.url("/user/"+ vm.userId + "/website/new");
        }

        function openWebsite(website) {
            $location.url("/user/"+ vm.userId + "/website/"+website._id + "/page");
        }
        function editWebsite(website) {
            $location.url("/user/"+ vm.userId +"/website/"+website._id);
        }

        function back() {
            $location.url("/user/"+vm.userId);
        }

        function createWebsite(website) {
            if (website) {
                website =  WebsiteService.createWebsite(vm.userId, website);
                if (website) {
                    vm.success = "Successfully created a new website";
                    $location.url("/user/"+vm.userId+"/website");
                } else {
                    vm.alert = "Error creating new website";
                }
            } else {
                vm.alert = "Error invalid website name entered"
            }
        }

        function deleteWebsite() {
            var response = WebsiteService.deleteWebsite(vm.websiteId);
            if (response) {
                vm.success = "Successfully deleted website";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "Error cant delete the website";
            }
        }

        function updateWebsite(website) {
            website = WebsiteService.updateWebsite(vm.websiteId, website);
            if (website) {
                vm.success = "Successfully updated the website";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "Error cant update the website";
            }
        }
    }
})();