import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    create(createCartDto: CreateCartDto): {
        products: {
            name: string;
            description: string;
            originalValue: number;
            currentValue: number;
            category: string;
            brand: string;
            unitType: string;
            unitQuantity: number;
            extras: any;
            images: {
                imageUrl: string;
                order: number;
            }[];
            sku: string;
        }[];
    };
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateCartDto: UpdateCartDto): string;
    remove(id: string): string;
}
