import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
export declare class CartService {
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
    findOne(id: number): string;
    update(id: number, updateCartDto: UpdateCartDto): string;
    remove(id: number): string;
}
