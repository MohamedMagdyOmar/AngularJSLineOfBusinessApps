(function(){
    "use strict"
    angular.module("productManagement")
        .controller("ProductDetailCtrl",
                    ["product",
                     "productService",
                     ProductDetailCtrl]);
    // 5.3 we injected product
    function ProductDetailCtrl(product, productService)
    {
        var vm = this;

        // we do not know where below product comes from
        // for now only, we will hard coded it.
        vm.product = product;
        vm.title = "Product Detail: " + vm.product.productName;
        vm.marginPercent = productService.calculateMarginPercent
        (vm.product.price, vm.product.cost)

        if(vm.product.tags)
        {
            vm.product.tagList = vm.product.tags.toString();
        }
    }
}())