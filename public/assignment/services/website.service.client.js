/**
 * Created by ghost on 10/19/16.
 */

(function() {
    angular.module("WebAppMaker").factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById:findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite:deleteWebsite
        };

        return api;

        function createWebsite(userId, website) {
            var newWebsite = {
                _id: (new Date()).getTime(),
                name: website.name,
                developerId: website.developerId,
                description: website.description
            };
            websites.push(newWebsite);
            return newWebsite;
        }

        function findWebsitesByUser(userId) {
            for (var w in websites) {
                if(websites[w]._id === userId) {
                    return websites[w];
                }
            }
            return null;
        }

        function findWebsiteById(websiteId) {
            for (var index in websites) {
                if(websites[index]._id === websiteId) {
                    return websites[index];
                }
            }
            return null;
        }

        function updateWebsite(websiteId, website) {
            for (var index in websites) {
                var oldWebsite = websites[index];
                if(oldWebsite._id === websiteId) {
                    oldWebsite['name'] = website['name'];
                    oldWebsite['developerId'] = website['developerId'];
                    oldWebsite['description'] = website['description'];
                    return true;
                }
            }
            return false;
        }

        function deleteWebsite(websiteId) {
            for (var index in websites) {
                if(websiteId[index]._id === websiteId) {
                    websites.splice(index, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
