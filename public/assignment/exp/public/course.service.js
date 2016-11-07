/**
 * Created by ghost on 11/2/16.
 */
(function () {
    angular
        .module('Courses')
        .factory('CourseService', courseService);
    function courseService($http) {
        var api = {
            readCourses: readCourses,
        };
        return api;
        function readCourses(callback) {
            $http.get('/rest/course')
                .success(callback);
        }
    }
})();