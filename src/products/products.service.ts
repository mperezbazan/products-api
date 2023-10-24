import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
const DATA = {
  products: [
    {
      name: 'Protetor Solar Facial Anthelios XL-Protect Cor Morena FPS 60 Gel Creme 40g',
      description:
        'PROTETOR SOLAR FACIAL ANTHELIOS XL-PROTECT COR MORENA FPS 60 GEL CREME Pele extremamente sensível a queimadura solar.',
      originalValue: 69.29,
      currentValue: 45.29,
      category: 'Protetor Solar',
      brand: 'Anthelios',
      unitType: '',
      unitQuantity: 150,
      extras: null,
      images: [
        {
          imageUrl:
            'https://s3-sa-east-1.amazonaws.com/i.imgtake.takenet.com.br/ieq09onpj2/ieq09onpj2.png',
          order: 1,
        },
      ],
      sku: 'abc',
    },
    {
      name: 'Lavitan Cabelos e Unhas 60 Cápsulas',
      description:
        'Suplemento vitamínico-mineral. Auxilia no crescimento e fortalecimento de cabelos e unhas. Lavitan Cabelos e Unhas é um suplemento que possui ação antioxidante, além de ajudar a evitar a queda e na manutenção da saúde dos cabelos, além de deixar suas unhas muito mais fortes e saudáveis.',
      originalValue: 41.29,
      currentValue: 34.99,
      category: 'Nutricosméticos',
      brand: 'Lavitan',
      unitType: '',
      unitQuantity: 150,
      extras: null,
      images: [
        {
          imageUrl:
            'https://s3-sa-east-1.amazonaws.com/i.imgtake.takenet.com.br/indh43e088/indh43e088.png',
          order: 1,
        },
      ],
      sku: 'cde',
    },
    {
      name: 'Protetor Solar Facial Isdin Fusion Water Oil Control FPS 60 com 30ml',
      description:
        'Fusion Water 5 Stars é um protetor solar facial especialmente criado para o uso diário. Com FPS 60 garante muito alta proteção.',
      originalValue: 69.99,
      currentValue: 69.99,
      category: 'Protetor Solar',
      brand: 'Isdin',
      unitType: '',
      unitQuantity: 150,
      extras: null,
      images: [
        {
          imageUrl:
            'https://s3-sa-east-1.amazonaws.com/i.imgtake.takenet.com.br/ii0mntjaiq/ii0mntjaiq.png',
          order: 1,
        },
      ],
      sku: 'egv',
    },
    {
      name: 'Toalhas Umedecidas MamyPoko Dia e Noite 200 Unidades',
      description: '',
      originalValue: 25.49,
      currentValue: 24.49,
      category: 'Lenços Umedecidos',
      brand: 'Mamypoko',
      unitType: '',
      unitQuantity: 150,
      extras: null,
      images: [
        {
          imageUrl:
            'https://s3-sa-east-1.amazonaws.com/i.imgtake.takenet.com.br/isldfab19m/isldfab19m.png',
          order: 1,
        },
      ],
      sku: 'eghv',
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
