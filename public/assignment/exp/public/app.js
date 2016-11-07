/**
 * Created by ghost on 11/2/16.
 */

(function () {
    angular
        .module('Courses', [])
        .controller('CourseController',courseController);

    function courseController($scope, CourseService) {
        CourseService.readCourses(renderCourses);

        function renderCourses(response) {
            $scope.courses = response;
        }
    }
})();
