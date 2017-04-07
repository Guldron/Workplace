;
(function () {
  'use strict';

  function dailyRate() {
    function link(scope, element, attrs) {

    }

    return {
      restrict: 'AE',
      templateUrl: 'templates/daily-rate.html',
      link: link,
      controller: 'dailyRateController',
      controllerAs: 'rate'
    }
  }

  angular
    .module('app')
    .directive('dailyRate', dailyRate)
})();