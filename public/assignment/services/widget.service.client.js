/**
 * Created by ghost on 10/19/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var pageURL = "/api/page/";
        var widgetURL = "/api/widget/";

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById:findWidgetById,
            updateWidget: updateWidget,
            deleteWidget:deleteWidget,
            sortWidgetsForPage:sortWidgetsForPage
        };

        return api;

        function createWidget(pageId, widget) {
            return $http.post(pageURL+pageId+"/widget", widget);
        }

        function findWidgetsByPageId(pageId) {
            return $http.get(pageURL+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get(widgetURL+widgetId);
        }

        function updateWidget(widgetId, widget) {
            return $http.put(widgetURL+widgetId, widget);
        }

        function deleteWidget(widgetId) {
            return $http.delete(widgetURL+widgetId);
        }
        
        function sortWidgetsForPage(pageId, initial, final) {
            return $http.put(pageURL + pageId + "/widget?initial=" + initial + "&final=" + final);
        }
    }
})();

