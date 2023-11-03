import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    search(searchProductDto: SearchProductDto): Promise<{
        products: any[];
    }>;
    findAll(): Promise<{
        products: any[];
    }>;
    findBrands(): Promise<{
        brands: any;
    }>;
    findCategories(): Promise<{
        categories: any;
    }>;
    findOne(id: string): Promise<string | {
        name: any;
        description: any;
        originalValue: number;
        currentValue: number;
        category: any;
        brand: any;
        unitType: string;
        unitQuantity: any;
        extras: any;
        images: any;
        sku: any;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
