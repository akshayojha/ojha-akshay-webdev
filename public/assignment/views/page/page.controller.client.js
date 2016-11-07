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
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function(error) {
                    console.log("Error: Cant get pages for the website");
                })
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
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function(error) {
                    console.log("Error: Cant get pages for the website");
                })
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
                PageService.createPage(vm.websiteId, page)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }, function (error) {
                        console.log("Error: Unable to create the page");
                    });
            } else {
                console.log("Error invalid page name entered");
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
            PageService
                .findPageById(vm.websiteId)
                .success(function (page) {
                    vm.page = page.data;
                })
                .error(function(error) {
                    console.log("Error: Cant get page for the website");
                });

            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages.data;
                })
                .error(function(error) {
                    console.log("Error: Cant get pages for the website");
                });
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
                PageService.createPage(vm.websiteId, page)
                    .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }, function (error) {
                        console.log("Error: Unable to create the page");
                    });
            } else {
                console.log("Error invalid page name entered");
            }
        }

        function deletePage() {
            PageService.deletePage(vm.pageId)
                .then(function (response) {
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    }, function (error) {
                        console.log("Error: Unable to delete page");
                    });
        }

        function updatePage(page) {
            PageService.updatePage(vm.pageId, page)
                .then(function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }, function (error) {
                    console.log("Error: Unable to update the page");
                });
        }
    }
})();