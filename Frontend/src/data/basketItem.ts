import {ProductDto} from "../swagger";

export class BasketItem {
    amount: number;
    productDto: ProductDto;
    
    constructor(amount: number, productDto: ProductDto) {
        this.amount = amount;
        this.productDto = productDto;
    }
}