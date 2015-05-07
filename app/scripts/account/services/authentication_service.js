/**
 * Authentication Service
 *
 * @class AuthenticationService
 * @namespace tiwun.account.services
 */
(function () {
    'use strict';

    angular.module('tiwun.account.services.AuthenticationService')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$rootScope', '$cookies', '$http'];

    /**
     * @namespace AuthenticationService
     * @returns [Factory]
     */
    function AuthenticationService($rootScope, $cookies, $http) {
        /**
         * @name AuthenticationService
         * @desc The Factory to be returned
         */
        var AuthenticationService = {
            getAuthenticatedUser: getAuthenticatedUser,
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout,
            register: register,
            setAuthenticatedUser: setAuthenticatedUser,
            unAuthenticate: unAuthenticate
        };

        return AuthenticationService;

        /**
         * Return the currently authenticated user
         *
         * @method getAuthenticatedUser
         * @returns {object|undefined} Account if authenticated, else `undefined`
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function getAuthenticatedUser() {
            if (!$cookies.authenticatedUser) {
                return;
            }

            return JSON.parse($cookies.authenticatedUser);
        }

        /**
         * Check if the current user is authenticated
         *
         * @method isAuthenticated
         * @returns {boolean} True is user is authenticated, else false.
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function isAuthenticated() {
            return !!$cookies.authenticatedUser;
        }

        /**
         * Try to log in with email `email` and password `password`
         *
         * @method login
         * @param {String} email The email entered by the user
         * @param {String} password The password entered by the user
         * @returns {Promise}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function login(email, password) {
            return $http.post('https://127.0.0.1:8000/api/users/login/', {
                email: email,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            /**
             * Set the authenticated account and redirect to index
             *
             * @method loginSuccessFn
             */
            function loginSuccessFn(data, status, headers, config) {
                AuthenticationService.setAuthenticatedUser(data.data);

                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Authenticated');
            }

            /**
             * Log "Epic failure!" to the console
             *
             * @method loginErrorFn
             */
            function loginErrorFn(data, status, headers, config) {
                console.log(data.error);
            }
        }

        /**
         * Try to log the user out
         *
         * @method logout
         * @returns {Promise}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function logout() {
            return $http.post('https://127.0.0.1:8000/api/users/logout/')
                .then(logoutSuccessFn, logoutErrorFn);

            /**
             * UnAuthenticate and redirect to index with page reload
             *
             * @method logoutSuccessFn
             */
            function logoutSuccessFn(data, status, headers, config) {
                AuthenticationService.unAuthenticate();

                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:SignedOut');
            }

            /**
             * Log "Epic failure!" to the console.
             *
             * @method logoutErrorFn
             */
            function logoutErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }

        /**
         * Try to register a new user
         *
         * @method register
         * @param {String} email The email entered by the user
         * @param {String} password The password entered by the user
         * @returns {Promise}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function register(email, password) {
            return $http.post('https://127.0.0.1:8000/api/users/', {
                email: email,
                password: password
            }).then(registerSuccessFn, registerErrorFn);

            /**
             * Log the new user in.
             *
             * @method registerSuccessFn
             */
            function registerSuccessFn(data, status, headers, config) {
                $rootScope.$broadcast('tiwun.account.service.AuthenticationService:Registered');

                AuthenticationService.login(email, password);
            }

            /**
             * Log "Epic failure!" to the console
             *
             * @method registerErrorFn
             */
            function registerErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }

        /**
         * Stringify the account object and store it in a cookie
         *
         * @method setAuthenticatedUser
         * @param {Object} account The account object to be stored
         * @returns {undefined}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function setAuthenticatedUser(account) {
            $cookies.authenticatedUser = JSON.stringify(account);
        }

        /**
         * Delete the cookie where the account object is stored
         *
         * @method unAuthenticate
         * @returns {undefined}
         * @memberOf tiwun.account.services.AuthenticationService
         */
        function unAuthenticate() {
            delete $cookies.authenticatedUser;
        }
    }
})();
