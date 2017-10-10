(function(){
    "use strict"
    angular.module("productManagement")
        .controller("ProductDetailCtrl",
                    ProductDetailCtrl);

    function ProductDetailCtrl()
    {
        var vm = this;


        // we do not know where below product comes from
        // for now only, we will hard coded it.
        vm.product = product;
        vm.title = "Product Detail: " + vm.product.productName;

        if(vm.product.tags)
        {
            vm.product.tagList = vm.product.tags.toString();
        }
    }
}())