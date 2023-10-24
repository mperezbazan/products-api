import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
const DATA = {
  products: [
    {
      sku: 10277,
      name: 'Product test',
      description: 'Product test description',
      category: 'Category test',
      brand: 'Brand test',
      originalValue: 100,
      currentValue: 10,
      unitType: 'unidad',
      unitQuantity: 10,
      images: [
        {
          imageUrl:
            'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
          order: 1,
        },
      ],
      option1: 'Option 1',
      values1: 'Value 1',
      valueAddition1: 'Value addition 1',
      option2: 'Option 2',
      values2: 'Value 2',
      valueAddition2: 'Value addition 2',
    },
  ],
};
@Injectable()
export class ProductsService {
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return DATA;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
