/**
 * Created by ghost on 10/19/16.
 */

(function() {
    angular.module("WebAppMaker").factory("PageService", PageService);

    function PageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
            ];

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };

        return api;

        function createPage(websiteId, page) {
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: page.name,
                websiteId: websiteId,
                description: page.description
            };
            pages.push(newPage);
            return newPage;
        }

        function findPagesByWebsiteId(websiteId) {
            var matches = [];
            for (var w in pages) {
                if(pages[w].websiteId === websiteId) {
                    matches.push(pages[w]);
                }
            }
            return matches;
        }

        function findPageById(pageId) {
            for (var index in pages) {
                if(pages[index]._id === pageId) {
                    return pages[index];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var index in pages) {
                var oldPage = pages[index];
                if(oldPage._id === pageId) {
                    oldPage['name'] = page['name'];
                    oldPage['developerId'] = page['developerId'];
                    oldPage['description'] = page['description'];
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for (var index in pages) {
                if(pageId[index]._id === pageId) {
                    pages.splice(index, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
