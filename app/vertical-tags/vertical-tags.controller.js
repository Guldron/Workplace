;
(function () {
        'use strict';

        verticalTagsController.$inject = ['$scope', 'getInitialData', 'dataservice', 'getAllTags'];

        function verticalTagsController($scope, getInitialData, dataservice, getAllTags) {
                var that = this;
                this.getAllTags = getAllTags;
                this.addTag = addTag;
                this.deleteTag = deleteTag;

                getInitialData
                        .then(function (data) {
                                that.countries = data[0];
                                that.postTypes = data[1];
                        });

                function addTag(newTag){
                        console.log(newTag);
                        var url = 'https://dev-api-cms.formulalubvi.com/tags/add-tag';
                        dataservice.sendData(url, newTag)
                                .then(function(data){
                                        console.log(data);
                                })
                }

                function deleteTag(vid, id){
                        console.log(vid, id);

                        var url = 'https://dev-api-cms.formulalubvi.com/tags/remove-tag/' + id;
                        console.log(url);
                        dataservice.sendData(url)
                                .then(function(data){
                                        console.log(data);
                                        that.verticalTableData.forEach(function(item){
                                                if (item.id === vid){
                                                        item.tags.forEach(function(item){
                                                                if(item.id === id){
                                                                        console.log(item);
                                                                }
                                                        })
                                                }
                                        });
                                })
                }
        }

        angular
                .module('app')
                .controller('verticalTagsController', verticalTagsController)
})();