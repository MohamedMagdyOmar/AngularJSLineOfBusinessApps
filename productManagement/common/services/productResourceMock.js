(function(){
    var app =angular.module("productResourceMock",["ngMockE2E"]);

    // we use app.run to run the initialization, it is executed when the model is loaded.
    // inside the function we need to do 2 things:
    // 1- default set of data (mock data)
    // 2- define the fake response to the web service calls
    app.run(function($httpBackend)
    {
        var products = [
            {
                "productId": 1,
                "productName": "Leaf Rake",
                "productCode": "GDN-0011",
                "releaseDate": "March 19, 2009",
                "description": "Leaf rake with 48-inch wooden handle.",
                "cost": 9.00,
                "price": 19.95,
                "category": "garden",
                "tags": ["leaf", "tool"],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png"
            },
            {
                "productId": 2,
                "productName": "Garden Cart",
                "productCode": "GDN-0023",
                "releaseDate": "March 18, 2010",
                "description": "15 gallon capacity rolling garden cart",
                "cost": 20.00,
                "price": 32.99,
                "category": "garden",
                "tags": ["barrow", "cart", "wheelbarrow"],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png"
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
            },
            {
                "productId": 8,
                "productName": "Saw",
                "productCode": "TBX-0022",
                "releaseDate": "May 15, 2009",
                "description": "15-inch steel blade hand saw",
                "cost": 6.95,
                "price": 11.55,
                "category": "garden",
                "tags": ["garden", "mower"],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png"
            },
            {
                "productId": 10,
                "productName": "Video Game Controller",
                "productCode": "GMG-0042",
                "releaseDate": "October 15, 2002",
                "description": "Standard two-button video game controller",
                "cost": 2.22,
                "price": 35.95,
                "category": "gaming",
                "tags": ["gaming", "controller", "video game"],
                "imageUrl": "http://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png"
            }
        ];

        var productUrl = "/api/products";
        // we need to return the full list of the product

        // when you have get request with the following url, respond with this data.
        // because we put this code in another module, so in order to use it in the rest of our app
        // we need to define it as dependency in the main module
        $httpBackend.whenGET(productUrl).respond(products);

        // some parts of the application such as "product details view" and "product edit view" retrieve only one product
        // now our application returns all products because the url is as follows /api/products, so we need to add another get
        // so we can use:
        //$httpBackend.whenGET(productUrl + "/1").respond(products);
        //$httpBackend.whenGET(productUrl + "/2").respond(products);

        // but this is not clean and not extensible
        var editingRegex = new RegExp(productUrl + "/[0-9][0-9]*",'')

        //$httpBackend.whenGET(editingRegex).respond(products)
        // but we do not need to respond with the whole products, we need to respond with only 1 product

        $httpBackend.whenGET(editingRegex).respond(function(method, url, data){
            var product = {"productId":0};
            var parameters = url.split('/'); // it will be splitted in an array
            var length = parameters.length;
            var id = parameters[length - 1];

            if(id > 0)
            {
                for (var i = 0; i < products.length; i++)
                {
                    if(products[i].productId == id)
                    {
                        product = products[i];
                        break;
                    }
                };
            }
            return [200, product,{}]
        })

        // so when we are implementing "save" it will update the variable products
        $httpBackend.whenPOST(productUrl).respond(function(method, url, data){
            // to de-serialize passed json string
            var product = angular.fromJson(data);

            if(!product.productId)
            {
                // new product Id
                // assign productId for the new product
                // update list of products
                console.log(products)
                product.productId = products[products.length - 1].productId + 1;
                products.push(product);
            }
            else
            {
                // updated product
                for(var i = 0; i < products.length; i++)
                {
                    if(products[i].productId = product.productId)
                    {
                        products[i] = product;
                        break;
                    }
                }
            }

            return [200, product, {}]
        })

        // Pass through any requests for application files
        // every requests to an html file or any file in the app folder will be ignored by the mocking
        $httpBackend.whenGET(/app/).passThrough();
    });

}())