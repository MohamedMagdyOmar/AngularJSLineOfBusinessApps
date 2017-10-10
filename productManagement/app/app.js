// setter method for module
//var app = angular.module("productManagement", []);

// we add the variable "app" to the "global namespace"
// using global variable is bad
// so we fix it with something called "IIFE" [Immediately Invoked Function Expression]
    // it is JS pattern that helps prevent global declaration
    // it is also called "Self executing anonymous function"

// in JS the functions and variables are defined using the Var key word, are added to the "global namespace scope"
// giving them a global scope, global variables makes it to easy to accidentaly to reuse the same var name
// but if you define your variable and function inside another function, so those variables and function are local within this function
// so the idea with "IIFE pattern" is to put all the variables and functions declaration within another function
// it looks like (function(){
//                          //Define the main module
//                          var app = angular.module("product Management",[])
//                          }());

// step 1
//function ()
//{
    // now var app is local to this function, and not added to the global namespace
    // but this function is not executed, to make it executed, by adding "parantheses" after function declaration as in step 2
//    var app = angular.module("productManagement", []);
//}

//step 2
//function ()
//{
    // but we still have syntax error here
    // this because the "parser" treat this function as "function declaration" instead of "function expression"
    // because "function declaration" requires a name
    // so to make the parser to expect "function expression" is to wrap it in another "parantheses" as in step 3
//    var app = angular.module("productManagement", []);
//}();

//step 3

(function ()
{
    // but we still have syntax error here
    // this because the "parser" treat this function as "function declaration" instead of "function expression"
    // because "function declaration" requires a name
    // so to make the parser to expect "function expression" is to wrap it in another "parantheses" as in step 3

    "use strict";
    var app = angular.module("productManagement",
        ["common.services",
            "ui.router",
            "productResourceMock"]);

    //using strict inside IIFE, puts the entire content of the IIFE in strict mode
    // in script mode Java script will catch common coding mistakes and throw exceptions
    // for example using un assigned variable will cause an exception as an example:
    // app = angular.module("productManagement", []);

    // by adding "common.services" it is now accessible to any place in our application

    // 4.5
    // we will call the config method, the config method takes 1 parameter, is the function that defines
    // the configuration code, we want to pass "$stateProvider" service into that function, and since we want to make the code
    // safe for minification we will pass an array into this config method.
    // angular will inject "$stateProvider" into this function for us
    app.config(["$stateProvider", "$urlRouterProvider",
                function($stateProvider, $urlRouterProvider){
                    $urlRouterProvider.otherwise("/");

                    $stateProvider
                        .state("home",{
                            url: "/",
                            templateUrl: "app/welcomeView.html",
                        })
                        .state("productList",{
                            url: "/products",
                            templateUrl: "app/products/productListView.html",
                            controller: "ProductListCtrl as vm"
                        })
                        .state("productEdit",{
                            url: "/products/edit/:productId",
                            templateUrl: "app/products/productEditView.html",
                            controller: "ProductEditCtrl as vm"
                        })
                        .state("productDetail",{
                            url: "/products/:productId",
                            templateUrl: "app/products/productDetailView.html",
                            controller: "ProductDetailCtrl as vm",
                            resolve: {
                                productResource: "productResource", //it define dependency on "productResource" (string name of the service) service that you have created
                                product: function(productResource, $stateParams) // it define a dependecy on the result of the defined function
                                            {
                                                var productId = $stateParams.productId;
                                                return productResource.get({productId: productId}).$promise;
                                            }
                                     }
                                                })
                }]);
}());