/**
 * Created by ghost on 10/19/16.
 */

(function() {
    angular.module("WebAppMaker").factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        var userURL = "/api/user/";
        var websiteURL = "/api/website/";

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite:deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            return $http.post(userURL+userId+"/website", website);
        }

        function findWebsitesByUser(userId) {
            return $http.get(userURL+userId+"/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get(websiteURL+websiteId);
        }

        function updateWebsite(websiteId, website) {
            return $http.put(websiteURL+websiteId, website);
        }

        function deleteWebsite(websiteId) {
            return $http.delete(websiteURL+websiteId);
        }
    }
})();
