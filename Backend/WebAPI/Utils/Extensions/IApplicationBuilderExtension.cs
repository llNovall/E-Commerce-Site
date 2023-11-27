using Domain.Entities.Shop;
using Domain.Repositories.Shop;

namespace WebAPI.Utils.Extensions
{
    public static class IApplicationBuilderExtension
    {
        public static async Task SeedDatabase(this IApplicationBuilder app)
        {
            using (var service = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateAsyncScope())
            {
                IProductRepository productRepository = service.ServiceProvider.GetRequiredService<IProductRepository>();

                List<Product> products = new List<Product>
                {
                    new Product()
                    {
                        ProductName = "Latte",
                        ProductDescription = "A classic espresso-based drink with steamed milk and a layer of foam.",
                        ProductType = "Hot Beverage",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/latte.jpg",
                        Quantity = 20
                    },
                    new Product()
                    {
                        ProductName = "Cappuccino",
                        ProductDescription = "Equal parts of espresso, steamed milk, and foam create a rich and frothy drink.",
                        ProductType = "Hot Beverage",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/cappuccino.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Mocha",
                        ProductDescription = "A delightful blend of espresso, chocolate, and steamed milk, topped with whipped cream.",
                        ProductType = "Hot Beverage",
                        Price = 5.49,
                        ProductImgUrl = "assets/images/shop/mocha.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Americano",
                        ProductDescription = "A shot of espresso diluted with hot water, delivering a strong and bold taste.",
                        ProductType = "Hot Beverage",
                        Price = 3.99,
                        ProductImgUrl = "assets/images/shop/americano.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Cold Brew",
                        ProductDescription = "Smooth and refreshing, this cold coffee is slowly steeped overnight for a low-acidity result.",
                        ProductType = "Cold Beverage",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/coldbrew.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Iced Latte",
                        ProductDescription = "Chilled espresso poured over milk and ice, a perfect summer treat.",
                        ProductType = "Cold Beverage",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/icedlatte.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Frappuccino",
                        ProductDescription = "A blended mix of ice, milk, and coffee, infused with various flavors and topped with whipped cream.",
                        ProductType = "Cold Beverage",
                        Price = 5.99,
                        ProductImgUrl = "assets/images/shop/frappuccino.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Espresso Shot",
                        ProductDescription = "A strong and concentrated dose of caffeine in a small cup.",
                        ProductType = "Hot Beverage",
                        Price = 1.99,
                        ProductImgUrl = "assets/images/shop/espressoshot.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Macchiato",
                        ProductDescription = "A shot of espresso with a dollop of foam on top, creating a bittersweet taste.",
                        ProductType = "Hot Beverage",
                        Price = 3.99,
                        ProductImgUrl = "assets/images/shop/macchiato.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Tea",
                        ProductDescription = "A selection of herbal, green, and black teas available for those looking for a caffeine-free option.",
                        ProductType = "Hot Beverage",
                        Price = 3.49,
                        ProductImgUrl = "assets/images/shop/tea.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Matcha Latte",
                        ProductDescription = "A Japanese-inspired drink made with powdered green tea, steamed milk, and a hint of sweetness.",
                        ProductType = "Hot Beverage",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/matchalatte.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Hot Chocolate",
                        ProductDescription = "Rich and creamy, this warm beverage combines melted chocolate and steamed milk, topped with whipped cream.",
                        ProductType = "Hot Beverage",
                        Price = 4.49,
                        ProductImgUrl = "assets/images/shop/hotchocolate.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Chai Tea Latte",
                        ProductDescription = "A spiced black tea mixed with steamed milk, offering a warming and flavorful experience.",
                        ProductType = "Hot Beverage",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/chaitealatte.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Iced Tea",
                        ProductDescription = "A refreshing blend of brewed tea, served chilled with the option to add various fruit flavors.",
                        ProductType = "Cold Beverage",
                        Price = 3.49,
                        ProductImgUrl = "assets/images/shop/icedtea.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Tea",
                        ProductDescription = "A selection of herbal, green, and black teas available for those looking for a caffeine-free option.",
                        ProductType = "Hot Beverage",
                        Price = 3.49,
                        ProductImgUrl = "assets/images/shop/tea.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Smoothie",
                        ProductDescription = "A fruity blend of fresh fruits, yogurt, and ice, perfect for a healthy snack or breakfast option.",
                        ProductType = "Cold Beverage",
                        Price = 5.99,
                        ProductImgUrl = "assets/images/shop/smoothie.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Hot Milk",
                        ProductDescription = "Steamed milk without coffee, ideal for those seeking a warm and comforting beverage.",
                        ProductType = "Hot Beverage",
                        Price = 3.49,
                        ProductImgUrl = "assets/images/shop/hotmilk.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Tea",
                        ProductDescription = "A selection of herbal, green, and black teas available for those looking for a caffeine-free option.",
                        ProductType = "Hot Beverage",
                        Price = 3.49,
                        ProductImgUrl = "assets/images/shop/tea.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Affogato",
                        ProductDescription = "A scoop of gelato submerged in a shot of hot espresso, creating a delightful dessert-like treat.",
                        ProductType = "Hot Beverage",
                        Price = 6.69,
                        ProductImgUrl = "assets/images/shop/affogato.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Biscotti",
                        ProductDescription = "Crunchy almond or chocolate-flavored cookies, perfect for dipping into coffee or enjoying on their own.",
                        ProductType = "Bakery",
                        Price = 3.49,
                        ProductImgUrl = "assets/images/shop/biscotti.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Scone",
                        ProductDescription = "Sweet or savory baked goods with a crumbly texture, available in flavors like blueberry or cheddar cheese.",
                        ProductType = "Bakery",
                        Price = 3.49,
                        ProductImgUrl = "assets/images/shop/scone.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Quiche",
                        ProductDescription = "A savory pie-like dish made with eggs and various fillings, perfect for a light breakfast or lunch.",
                        ProductType = "Food",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/quiche.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Sandwich",
                        ProductDescription = "A selection of freshly made sandwiches featuring ingredients like turkey, ham, or vegetarian options.",
                        ProductType = "Food",
                        Price = 6.99,
                        ProductImgUrl = "assets/images/shop/sandwich.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Salad",
                        ProductDescription = "A variety of salads with options like Caesar, Greek, or mixed greens, ideal for a lighter meal. ",
                        ProductType = "Food",
                        Price = 7.99,
                        ProductImgUrl = "assets/images/shop/salad.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Smoothie Bowl",
                        ProductDescription = "A thick blend of fruits and yogurt, served in a bowl and topped with granola, nuts, or fresh fruits.",
                        ProductType = "Food",
                        Price = 7.99,
                        ProductImgUrl = "assets/images/shop/smoothiebowl.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Yogurt Parfait",
                        ProductDescription = "Layers of yogurt, granola, and fresh fruits, creating a wholesome and nutritious snack.",
                        ProductType = "Food",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/yogurtparfait.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Cake Slice",
                        ProductDescription = "Indulge in a slice of rich, moist cake in flavors like chocolate, vanilla, or red velvet.",
                        ProductType = "Dessert",
                        Price = 4.99,
                        ProductImgUrl = "assets/images/shop/cakeslice.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Cookies",
                        ProductDescription = "An assortment of freshly baked cookies, including chocolate chip, oatmeal raisin, and sugar cookies.",
                        ProductType = "Bakery",
                        Price = 1.99,
                        ProductImgUrl = "assets/images/shop/cookies.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Gelato",
                        ProductDescription = "Creamy and flavorful Italian ice cream available in various flavors and served in a cone or cup.",
                        ProductType = "Dessert",
                        Price = 3.99,
                        ProductImgUrl = "assets/images/shop/gelato.jpg",
                        Quantity = 20
                    },

                    new Product()
                    {
                        ProductName = "Fruit Bowl",
                        ProductDescription = "A refreshing mix of seasonal fresh fruits, providing a healthy and light snacking option.",
                        ProductType = "Food",
                        Price = 5.99,
                        ProductImgUrl = "assets/images/shop/fruitbowl.jpg",
                        Quantity = 20
                    }
                };

                bool result = await productRepository.CreateRange(products);

                if (!result)
                    throw new InvalidOperationException();
            }
        }
    }
}