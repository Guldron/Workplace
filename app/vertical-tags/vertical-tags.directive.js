;
(function(){
        'use strict';

        function verticalTags () {
                function link(scope, element, attrs) {

                }

                return {
                        restrict: 'AE',
                        templateUrl: 'templates/vertical-tags.html',
                        link: link,
                        controller: 'verticalTagsController',
                        controllerAs: 'tags'
                }
        }

        angular
                .module('app')
                .directive('verticalTags', verticalTags)
})();