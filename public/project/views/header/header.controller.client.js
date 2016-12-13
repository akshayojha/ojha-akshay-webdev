/**
 * Created by ghost on 12/13/16.
 */
(function () {

    angular
        .module('PPTApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($location, UserService) {

        var vm = this;

        vm.toggleMenu = toggleMenu;
        vm.logout = logout;
        vm.home = home;
        vm.login = login;

        function init() {

        }

        init();

        function toggleMenu() {
            $("#wrapper").toggleClass("toggled");
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                });
        }

        function home() {
            $location.url("#/");
        }

    }

})();