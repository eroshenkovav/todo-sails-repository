define(function(require){
	var angular = require('angular'),
	Controllers = angular.module('controllers', []);
	Controllers.controler('TodoCtrl', require('controllers/TodoCtrl'));
	return Controllers;
})
