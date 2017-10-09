(function(){
    "use strict";
    angular.module("productManagement")
        .controller("ProductListCtrl",
                    ["productResource",
                        ProductListCtrl]);


    function ProductListCtrl(productResource){
        // we need to define the model for binding with the view
        // and define the methods for any actions in the view
        // when using the controller "As" syntax, the model is defined on "this" variable
        // so let we define var that reference "this"

        var vm = this;
        //we need to augment this variable with the model and any methods needed by the view, so lets start with the model

        /*vm.products = [
                {"productId": 1,
                    "productName": "Leaf Rake",
                    "productCode": "GDN-0011",
                    "releaseDate": "March 19, 2009",
                    "description": "Leaf rake with 48-inch handle.",
                    "cost": 9.00,
                    "price": 19.95,
                    "category": "garden",
                    "tags": [ "leaf", "tool" ],
                    "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
                },
            {
                "productId": 5,
                "productName": "Hammer",
                "productCode": "TBX-0048",
                "releaseDate": "May 21, 2013",
                "description": "Curved claw steel hammer",
                "cost": 1.00,
                "price": 8.99,
                "category": "toolbox",
                "tags": ["tool"],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png"

            }]*/
        // after commenting hard coded
        // we need to ask angular to pass a reference to productResource service to this
        // specific controller function we do this by adding productResource to function parameter

        productResource.query(function(data){
            vm.products = data;
        })

        vm.showImage = false;
        vm.toggleImage = function()
        {
            vm.showImage = !vm.showImage;
        }
    }

}())