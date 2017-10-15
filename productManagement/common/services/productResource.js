(function(){
    "use strict";
    // this array is called also "min-safe Array", so we defined the $resource in the array to make sure
    // that the application will still work if this JS file is minified
    // the last element of the array is the factory service function, so we are going to set a reference to that function
    angular.module("common.services").factory("productResource",["$resource",productResource]);

    function productResource($resource)
    {
        return $resource("/api/products/:productId");
    }


    // now we need to tell our main module about the new created common services module using dependency.
    // go and check dependency in app.js
}())