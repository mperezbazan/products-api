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
import { SearchProductDto } from './dto/search-product.dto';

@Controller('muett/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async search(@Body() searchProductDto: SearchProductDto) {
    const products = await this.productsService.search(searchProductDto);
    return products;
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get('brands')
  findBrands() {
    return this.productsService.findBrands();
  }

  @Get('categories')
  findCategories() {
    return this.productsService.findCategories();
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
