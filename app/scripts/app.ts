/// <reference path="../../typings/browser.d.ts" />
'use strict';

import angular = require('angular');

angular.module('App', [])
.controller('MainController', ['$scope', '$filter', function ($scope, $filter) {
  $scope.todos = [];

  $scope.newTitle = '';

  $scope.addTodo = function () {
    $scope.todos.push({
      title: $scope.newTitle,
      done: false
    });

    $scope.newTitle = '';
  };

  $scope.filter = {
    done: { done: true },
    remaining: { done: false }
  };
  $scope.currentFilter = undefined;

  $scope.changeFilter = function (filter) {
    $scope.currentFilter = filter;
  };

  var where = $filter('filter');
  $scope.$watch('todos', function (todos) {
    var length = todos.length;

    $scope.allCount = length;
    $scope.doneCount = where(todos, $scope.filter.done).length;
    $scope.remainingCount = length - $scope.doneCount;
  }, true);
}]);
