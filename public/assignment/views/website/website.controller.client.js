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
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    console.log("Error: Unable to find websites for user");
                });
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
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    console.log("Error: Unable to find websites for user");
                });
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
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website");
                    }, function (error) {
                        console.log("Error: Unable to create website");
                    });
            } else {
                console.log("Error invalid website name entered");
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
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                }, function (error) {
                    console.log("Error: Unable to find websites for user");
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                }, function (error) {
                    console.log("Error: Unable to find website for user");
                });
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
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website");
                    }, function (error) {
                        console.log("Error: Unable to create website");
                    });
            } else {
                console.log("Error invalid website name entered");
            }
        }

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .then(function (response) {
                    $location.url("/user/" + vm.userId + "/website");
                }, function (error) {
                    console.log("Error:Unable to delete website");
                });
        }

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .then(function (response) {
                    $location.url("/user/" + vm.userId + "/website");
                }, function (error) {
                    console.log("Error: Unable to update website");
                });
        }
    }
})();