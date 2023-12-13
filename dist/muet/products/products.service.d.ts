import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios/dist';
import { SearchProductDto } from './dto/search-product.dto';
export declare class ProductsService {
    private readonly httpService;
    constructor(httpService: HttpService);
    fetchProductVariations(productId: any): Promise<any>;
    processProduct(product: any): Promise<any>;
    search(searchProductDto: SearchProductDto): Promise<{
        products: any[];
    } | {
        status: string;
        message: any;
    }>;
    findAll(): Promise<{
        products: any[];
    }>;
    findCategories(): Promise<{
        categories: any;
    }>;
    findBrands(): Promise<{
        brands: any;
    }>;
    findOne(id: number): Promise<string | {
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
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: number): string;
}
