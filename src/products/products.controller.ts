import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

const BRANDS = {
  brands: [
    {
      name: 'Anthelios',
    },
    {
      name: 'Lavitan',
    },
    {
      name: 'Isdin',
    },
    {
      name: 'Mamypoko',
    },
    {
      name: 'Aretes',
    },
    {
      name: 'Nuevo',
    },
    {
      name: 'Topitos',
    },
  ],
};

const CATEGORIES = {
  categories: [
    {
      name: 'Aretes',
    },
    {
      name: 'Collares',
    },
  ],
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('brands')
  findBrands() {
    return BRANDS;
  }

  @Get('categories')
  findCategories() {
    return CATEGORIES;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
