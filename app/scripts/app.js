// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
'use strict';

angular.module('tiwun', [
    'ionic',
    'tiwun.basement',
    'tiwun.controllers',
    'tiwun.account',
    'tiwun.item',
    'tiwun.search',
    'angular.filter',
    'markdown'
])
        'tiwun.konfig',
        'tiwun.basement',

    .run(function($ionicPlatform, $http) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            $http.defaults.xsrfHeaderName = 'X-CSRFToken';
            $http.defaults.xsrfCookieName = 'csrftoken';

        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: 'AppCtrl'
            })

            .state('app.explore', {
                url: "/explore",
                views: {
                    'menuContent': {
                        controller: 'IndexController',
                        templateUrl: "templates/explore.html"
                    }
                }
            })

            .state('app.search', {
                url: "/search",
                views: {
                    'menuContent': {
                        controller: 'SearchController',
                        templateUrl: "../templates/search/search.html"
                    }
                }
            })

            .state('app.playlists', {
                url: "/playlists",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlists.html",
                        controller: 'PlaylistsCtrl'
                    }
                }
            })

            .state('app.single', {
                url: "/playlists/:playlistId",
                views: {
                    'menuContent': {
                        templateUrl: "templates/playlist.html",
                        controller: 'PlaylistCtrl'
                    }
                }
            })
            .state('app.register', {
                url: '/account/register',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/account/register.html',
                        controller: 'RegisterController'
                    }
                }
            })

            .state('app.singleItem', {
                url: "/items/:itemId/",
                views: {
                    'menuContent': {
                        templateUrl: "templates/item/single_item.html",
                        controller: 'SingleItemController'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/explore');
    });
