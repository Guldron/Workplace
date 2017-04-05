;
(function () {

        'use strict';

        getInitialData.$inject = ['dataservice', '$q'];

        function getInitialData(dataservice, $q) {
                var promises = [];

                var url = {
                        allCountries:  'https://dev-api-cms.formulalubvi.com/management/get-all-countries',
                        allPostTypes: 'https://dev-api-cms.formulalubvi.com/management/get-all-post-types'
                };

                promises.push(
                        dataservice.getData(url.allCountries)
                                .then(function(data) {
                                        return data;
                                })
                );

                promises.push(
                        dataservice.getData(url.allPostTypes)
                                .then(function(data) {
                                        return data;
                                })
                );

                return $q.all(promises);

        }

        angular
                .module('app')
                .service('getInitialData', getInitialData);
})();