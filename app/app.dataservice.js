;
(function () {

        'use strict';

        dataservice.$inject = ['$http'];

        function dataservice($http) {

                return {
                        getData: getData,
                        sendData: sendData,
                        deleteData: deleteData
                };

                function getData(url) {
                        return $http.get(url)
                                .then(function(data){
                                        return data.data;
                                });
                }

                function sendData(url, data) {
                        return $http.post(url, data)
                                .then(function(data){
                                        return data.data;
                                });
                }

                function deleteData(url, data) {
                        return $http.delete(url)
                                .then(function(data){
                                        return data.data;
                                });
                }

        }

        angular
                .module('app')
                .factory('dataservice', dataservice);
})();