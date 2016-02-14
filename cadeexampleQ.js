'use strict';

angular.module('apiTest', [])
.controller('mainCtrl', function($scope, Swapi) {

  Swapi.getAllPeople() // getAllPeople() returns the unified promise
  .then(function(allResults) { // allResults is an array of all of the individual responses
    console.log('allResults:', allResults);

    var people = allResults.reduce(function(acc, res){
      // iterating to collect all of the person objects
      return acc.concat(res.data.results);
    }, []);

    $scope.people = people;  // array of person objects, bound to scope
  });
})


.service('Swapi', function($http, $q) {
  this.getPerson = function(personId) {
    return $http.get(`http://swapi.co/api/people/${personId}`);
  };

  this.getAllPeople = function() {
    var promises = [];  // building an array of promises

    for(var i = 1; i <= 9; i++){
      promises.push($http.get(`http://swapi.co/api/people/?page=${i}`));
      // each $http invocation returns a promise.
      // we're gathering our promises syncronously
    }
    // we can get the promises synchronously (start the api calls), and then resolve them later

    return $q.all(promises);
    // give all the promises to $q.all, which will give us one unified promise.
    // that promise will resolve when all of the individual promises resolve

  }
});