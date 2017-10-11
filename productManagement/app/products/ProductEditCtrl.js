(function(){
    "use strict";
    angular
        .module("productManagement")
        .controller(
        "ProductEditCtrl", ["product", ProductEditCtrl]);
    // the second parameter of the controller is array, the first element of the array is the parametr for the function
    // the second element is a reference to the controller function itself
    function ProductEditCtrl(product)
    {
        var vm = this;
        vm.product = product;
        if(vm.product && vm.product.productId)
        {
            vm.title = "Edit: " + vm.product.productName;
        }
        else
        {
            vm.title = "New Product";
        }
    }

}());