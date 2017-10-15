(function(){
    "use strict";
    angular
        .module("productManagement")
        .controller(
        "ProductEditCtrl", ["product","$state", "productService", ProductEditCtrl]);
    // the second parameter of the controller is array, the first element of the array is the parametr for the function
    // the second element is a reference to the controller function itself
    function ProductEditCtrl(product, $state, productService)
    {
        var vm = this;
        vm.product = product;
        vm.priceOption = "percent";

        vm.marginPercent = function()
        {
            return productService.calculateMarginPercent(vm.product.price, vm.product.cost);
        }

        vm.calculatePrice = function(){
            var price = 0;

            if(vm.priceOption == 'amount')
            {
                price = productService.calculatePriceFromMarkupAmount(vm.product.cost, vm.markupAmount);
                console.log("hello")
            }

            if(vm.priceOption == 'percent')
            {
                price = productService.calculatePriceFromMarkupPercent(vm.product.cost, vm.markupPercent);
            }

            vm.product.price = price ;
        };

        if(vm.product && vm.product.productId)
        {
            vm.title = "Edit: " + vm.product.productName;
        }
        else
        {
            vm.title = "New Product";
        }

        vm.open = function($event)
        {
            $event.preventDefault();
            $event.stopPropagation();
            // to prevent event from propagating

            vm.opened = !vm.opened;
        }

        vm.submit = function(isValid)
        {
            // vm.product.$save();
            if(isValid) {
                vm.product.$save(function (data) {
                    toastr.success("Save Successful");
                });
            }
            else{
                alert("Please correct the validation error first.")
            }
        }

        vm.cancel = function()
        {
            // to navigate to different state
            // since we are using $ state, so we need to inject it in the controller
            $state.go("productList")
        }

        vm.addTags = function(tags)
        {
            if(tags)
            {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array):array;
                vm.newTags = "";
            }
            else
            {
                alert("Please enter one or more tags separated by commas");
            }
        }

        vm.removeTag = function(idx)
        {
            vm.product.tags.splice(idx, 1);
        }
    }

}());