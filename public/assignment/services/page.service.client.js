/**
 * Created by ghost on 10/19/16.
 */

(function() {
    angular.module("WebAppMaker").factory("PageService", PageService);

    function PageService($http) {

        var websiteURL = "/api/website/";
        var pageURL = "/api/page/";

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage(websiteId, page) {
            return $http.post(websiteURL+websiteId+"/page", page);
        }

        function findPagesByWebsiteId(websiteId) {
            return $http.get(websiteURL+websiteId+"/page");
        }

        function findPageById(pageId) {
            return $http.get(pageURL+pageId);
        }

        function updatePage(pageId, page) {
            return $http.put(pageURL+pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete(pageURL+pageId);
        }
    }
})();
