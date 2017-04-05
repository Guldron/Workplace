;
(function(){
        'use strict';

        getAllTags.$inject = ['dataservice'];

        function getAllTags(dataservice) {
                var countries_id = 0;
                var postTypes_id = 0;
                var url = '';

                var service = {
                        setCountries: setCountries,
                        setPostTypes: setPostTypes
                };

                return service;

                function setCountries(value) {
                        countries_id = value;
                        if(countries_id > 0 && postTypes_id > 0){
                                url = 'https://dev-api-cms.formulalubvi.com/tags/get-all-tags/' + countries_id + '/' + postTypes_id;
                        }
                }

                function setPostTypes(value, context) {
                        postTypes_id = value;
                        if(countries_id > 0 && postTypes_id > 0){
                                url = 'https://dev-api-cms.formulalubvi.com/tags/get-all-tags/' + countries_id + '/' + postTypes_id;
                                dataservice.getData(url)
                                        .then(function (data){
                                        context.verticalTableData = data;
                                })
                        }
                }
        }



        angular
                .module('app')
                .factory('getAllTags', getAllTags);

})();