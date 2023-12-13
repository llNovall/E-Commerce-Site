import { CartProduct } from "./cart-product";
import { Product } from "./product";

export interface ValidationCartProduct {
    product : Product;
    cartProduct: CartProduct;
    isValidationSuccessful : boolean;
}
