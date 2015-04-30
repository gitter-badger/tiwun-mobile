/**
 * CommentService
 * @namespace tiwun.sushial.services
 */
(function () {
    'use strict';

    angular.module('tiwun.sushial.services.CommentService', [])
        .factory('CommentService', CommentService);

    CommentService.$inject = ['$http'];

    /**
     * @namespace CommentService
     * @returns {Factory}
     */
    function CommentService($http) {
        var CommentService = {
            create: create,
            remove: remove,
            filterByObject: filterByObject
        };

        var ObjectTypes = {
            'item': 1,
            'comment': 2,
            'tag': 3
        };

        return CommentService;

        /**
         * @name create: Creating a comment for an object.
         * @param {number} objectType: Object type that is being commented on.
         * @param {string} objectPk:  Object PK!
         * @param {string} userId: User Id that commenting on the the object.
         * @param {string} commentText: Comment text that is being posted on the object.
         * @memberOf tiwun.sushial.services.CommentService
         */
        function create(objectType, objectPk, userId, commentText) {
            return $http.post(
                'https://127.0.0.1:8000/api/sushial/comment/add/',
                {
                    object_type: objectType,
                    object_pk: objectPk,
                    user_id: userId,
                    comment: commentText
                }
            );
        }

        /**
         * @name remove: Remove a comment from an object.
         * @param {number} objectType: Object type that is being commented on.
         * @param {string} objectId:  Object PK!
         * @param {string} userId: User Id that commenting on the the object.
         * @memberOf tiwun.sushial.services.CommentService
         */
        function remove(objectType, objectId, userId) {
            return $http.post(
                'https://127.0.0.1:8000/api/sushial/comment/remove',
                {
                    object_type: objectType,
                    object_id: objectId,
                    user_id: userId
                }
            );
        }

        /**
         * @name filterByObject: Filter comments by given object.
         * @param {number} objectType: Object type that is being commented on.
         * @param {string} ObjectPk:  Object PK!
         * @memberOf tiwun.sushial.services.CommentService
         */
        function filterByObject(objectType, ObjectPk) {
            return $http.get(
                'https://127.0.0.1:8000/api/sushial/comment/',
                {params:{object_type: objectType, object_pk: ObjectPk}}
            );
        }
    }
})();
