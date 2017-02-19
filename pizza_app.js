var myModule = angular.module('pizza_app', []);

myModule.controller("MainController", ['$scope', 'LocalStorageService', 
                function($scope, LocalStorageService) {
    
    var mc = this;
	
	mc.pizzatoppings = "mc.pizzatoppingoption";
	mc.pizza = "";
	mc.background = "emphasis";
	mc.pizzatoppings = [];
	
    //run first time, then comment out
    mc.pizzatoppings =
    [
        {
            name: "Pepperoni",
            id: "Pep",
        },
        {
            name: "Hamburger",
            id: "Ham",
        },
        {
            name: "Cheese",
            id: "Ch",
        },
        {
            name: "Canadian Bacon",
            id: "CB",
        },
        {
            name:"Supreme",
            id: "Sup",
        }
        
    ];

	mc.emphasis = function (status, $event){
		
		var el = $event.target.id;
		
		if(status){
			console.log("enter: " + el);
			mc.background = "emphasis";
			console.log(mc.background);
		} else {
			console.log("exit: " + el);		
			mc.background = "deemphasis";
			console.log(mc.background);
		}
	};
	
	mc.remove = function($index){

		mc.pizza = mc.latestData();
		mc.pizza.splice($index, 1);
		return LocalStorageService.setData('my-storage', angular.toJson(mc.pizza));		
		
	};
    
    mc.latestData = function() {
        return LocalStorageService.getData('my-storage');
    };
	
    mc.update = function(pname, pid) {
		mc.pizza = mc.latestData();
		if(mc.pizza == null){
			mc.pizza = [];
		}
		var pizza = { name: pname, id: pid};
		console.log(angular.toJson(pizza));
		mc.pizza.push(pizza);
        return LocalStorageService.setData('my-storage', angular.toJson(mc.pizza));
    };

    //Check to see if null
	if(mc.pizza != null){
		mc.pizza = mc.latestData();
	}else{
		console.log("crikey");
	}}]);

myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});