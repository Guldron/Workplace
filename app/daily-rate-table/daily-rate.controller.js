;
(function () {
  'use strict';

  dailyRateController.$inject = ['$scope', 'dataservice'];

  function dailyRateController($scope, dataservice) {
    var that = this;

    this.ifCalculate = [];

    this.calculate = calculate;
    this.totalVerticals = totalVerticals;

    dataservice.getData('https://api.dals.media/get-edition-users')
      .then(function (data) {

        that.dailyRatesTableData = [];
        for (var k in data) {
          for (var q in data[k]) {
            var totalUsers = data[k][q].users.length;
            var totalVerticalsValue = 0;

            for (var i = 0, l = data[k][q].users.length; i < l; i += 1) {
              data[k][q].users[i].verticalPerDay = {};
              data[k][q].verticals.forEach(function (item) {
                data[k][q].users[i].verticalPerDay[item.name] = 0;
              });
            }

            for (var i = 0, l = data[k][q].verticals.length; i < l; i += 1) {
              totalVerticalsValue += data[k][q].verticals[i].value;
            }

            that.ifCalculate.push(false);
            that.dailyRatesTableData.push({
              content: k,
              leng: q,
              totalUsers: totalUsers,
              totalVerticals: totalVerticalsValue,
              verticals: data[k][q].verticals,
              users: data[k][q].users
            });
          }
        }


      });

    function randomIntFromInterval(max) {
      var min = 0;
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function calculate(index) {
      if (that.ifCalculate[index] === false) {
        that.ifCalculate[index] = true;

        var verticals = that.dailyRatesTableData[index].verticals;
        var users = that.dailyRatesTableData[index].users;
        var userMaximumValue = Math.round(that.dailyRatesTableData[index].totalVerticals / users.length);


        for (var i = 0, l = verticals.length; i < l; i += 1) {
          var value = verticals[i].value;
          var valuePerUserCoef = Math.ceil(verticals[i].value / users.length);

          while (value > 0) {
            console.log(value);

            var unique = [];
            var randomUser = randomIntFromInterval(users.length - 1, unique);
            var beforeAdd = totalVerticals(users[randomUser]);


            if (users[randomUser].verticalPerDay[verticals[i].name] <= valuePerUserCoef && beforeAdd <= userMaximumValue) {
              if(users[randomUser].verticalPerDay[verticals[i].name] === valuePerUserCoef) {
                unique.push(randomUser);
                console.log(unique);

                // console.log('User ID:',users[randomUser].id);
                // console.log('User vertical value:',users[randomUser].verticalPerDay[verticals[i].name]);
                // console.log('userMaximumValue:',userMaximumValue);
                // console.log('bigger that userMaximumValue:', users[randomUser].id)


              }
              users[randomUser].verticalPerDay[verticals[i].name] += 1;

              value--;

            }

          }
        }


      } else {
        console.log('that table is calculate');
      }
    }


    function totalVerticals(user) {
      var value = 0;
      for (var key in user.verticalPerDay) {
        value += user.verticalPerDay[key];
      }
      return value;
    }

  }

  angular
    .module('app')
    .controller('dailyRateController', dailyRateController)
})();
