import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios/dist';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { SearchProductDto } from './dto/search-product.dto';

const DATA = {
  products: [
    {
      name: 'TOPITOS JERUSALEN',
      description:
        'Topitos Plateados, divinos para usar en el día a día y para combinarlos con mas aretes. Es tendencia!</p> <p><em><strong>(Precio por par)</strong></em></p> <p><strong>Material:</strong> Acero</p> <p><strong>Color:</strong> Plateado</p> <p><strong>Cuidados:</strong> Recomendamos guardar por separado cada accesorio, almacenarlos en lugares secos y a temperatura ambiente; limpiarlos con un pañito o franela y sin ningún tipo de producto, evitar contacto con productos químicos como cremas y perfumes, no dormir ni bañarse con ellos. La durabilidad de los accesorios depende 100% del cuidado de cada persona.</p>',
      originalValue: 20000,
      currentValue: 20000,
      category: 'Aretes',
      brand: 'Topitos',
      unitType: '',
      unitQuantity: 150,
      extras: null,
      images: [
        {
          imageUrl: 'https://anele.com.co/wp-content/uploads/2023/08/9.jpg',
          order: 1,
        },
      ],
      sku: '9308',
    },
    {
      name: 'CADENITA LETRAS',
      description:
        '<p>Cadenita dorada, básica con dije de letra ideal para usar solita o con mas cadenitas.! Es DIVINA! Y lo mejor, es ajustable y puedes usarla de acuerdo a tu gusto, larga o corta!</p> <p><strong><em>(Precio por unidad)</em></strong></p> <p><strong>Material:</strong> Rodio</p> <p><strong>Medidas:</strong> 45 cms</p> <div class="woocommerce-product-details__short-description"> <p><b>Cuidados</b><strong>: </strong>Recomendamos guardar por separado cada accesorio, almacenarlos en lugares secos y a temperatura ambiente; limpiarlos con un pañito o franela y sin ningún tipo de producto, evitar contacto con productos químicos como cremas y perfumes, no dormir ni bañarse con ellos. La durabilidad de los accesorios depende 100% del cuidado de cada persona.</p> </div> ',
      originalValue: 28000,
      currentValue: 28000,
      category: 'Collares',
      brand: 'Nuevo',
      unitType: '',
      unitQuantity: 150,
      extras: null,
      images: [
        {
          imageUrl:
            'https://anele.com.co/wp-content/uploads/2023/08/LETRAS-C-1.jpg',
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

type Dimension = {
  length: string;
  width: string;
  height: string;
};
type Category = {
  id: number;
  name: string;
  slug: string;
};

type Tag = {
  id: number;
  name: string;
  slug: string;
};

type Image = {
  id: number;
  src: string;
  name: string;
  alt: string;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
};
type Attribute = {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
};

type MetaData = {
  id: number;
  key: string;
  value: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: Date;
  date_created_gmt: Date;
  date_modified: Date;
  date_modified_gmt: Date;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  date_on_sale_from: Date | null;
  date_on_sale_from_gmt: Date | null;
  date_on_sale_to: Date | null;
  date_on_sale_to_gmt: Date | null;
  on_sale: boolean;
  purchasable: boolean;
  total_sales: number;
  virtual: boolean;
  downloadable: boolean;
  downloads: number[];
  download_limit: number;
  download_expiry: number;
  external_url: string;
  button_text: string;
  tax_status: string;
  tax_class: string;
  manage_stock: boolean;
  stock_quantity: number | null;
  backorders: string;
  backorders_allowed: boolean;
  backordered: boolean;
  low_stock_amount: number | null;
  sold_individually: boolean;
  weight: string;
  dimensions: Dimension;
  shipping_required: boolean;
  shipping_taxable: boolean;
  shipping_class: string;
  shipping_class_id: number;
  reviews_allowed: boolean;
  average_rating: string;
  rating_count: number;
  upsell_ids: string[];
  cross_sell_ids: string[];
  parent_id: number;
  purchase_note: string;
  categories: Category[];
  tags: Tag[];
  images: Image[];
  attributes: Attribute[];
  default_attributes: Attribute[];
  variations: number[];
  grouped_products: number[];
  menu_order: number;
  price_html: string;
  related_ids: number[];
  meta_data: any[];
  stock_status: string;
  has_options: boolean;
  post_password: string;
  _links: any;
};

type BlipImage = {
  imageUrl: string;
  order: number;
};

type BlipProduct = {
  name: string;
  description: string;
  originalValue: number;
  currentValue: number;
  category: string;
  brand: string;
  unitType: string;
  unitQuantity: number;
  extras: any | null;
  images: BlipImage[];
  sku: string;
};
@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async search(searchProductDto: SearchProductDto) {
    let criterio = '';
    if (searchProductDto.Filter) {
      criterio = `&search=${searchProductDto.Filter}`;
    }
    if (searchProductDto.Categories.length > 0) {
      const category = await this.findCategories().then((categories: any) => {
        return categories.categories.find(
          (category) => category.name === searchProductDto.Categories[0],
        );
      });
      if (category) {
        criterio += `&category=${category.id}`;
      }
    }
    if (searchProductDto.Brands.length > 0) {
      const brand = await this.findBrands().then((brands: any) => {
        return brands.brands.find(
          (brand) => brand.name === searchProductDto.Brands[0],
        );
      });
      if (brand) {
        criterio += `&tag=${brand.id}`;
      }
    }
    console.log(criterio);
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}${criterio}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    );
    const products = data.map((product: Product) => {
      const images = product.images.map((image: Image) => {
        return { imageUrl: image.src, order: image.id };
      });
      const exportData = {
        name: product.name,
        description: product.short_description.replace(/<[^>]+>/g, ''),
        originalValue: +product.price,
        currentValue: product.sale_price ? +product.sale_price : +product.price,
        category: product.categories[0].name || 'Sin Categoria',
        brand: product.tags.length > 0 ? product.tags[0].name : '',
        unitType: 'Unidad', //product.attributes[0].name,
        unitQuantity: product.stock_quantity ? product.stock_quantity : 1,
        extras: null,
        images: images,
        sku: product.id,
      };

      return exportData;
    });

    return { products };
  }

  async findAll() {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    );
    const products = data.map((product: Product) => {
      const images = product.images.map((image: Image) => {
        return { imageUrl: image.src, order: image.id };
      });
      const exportData = {
        name: product.name,
        description: product.short_description.replace(/<[^>]+>/g, ''),
        originalValue: +product.price,
        currentValue: product.sale_price ? +product.sale_price : +product.price,
        category: product.categories[0].name || 'Sin Categoria',
        brand: product.tags.length > 0 ? product.tags[0].name : '',
        unitType: 'Unidad', //product.attributes[0].name,
        unitQuantity: product.stock_quantity ? product.stock_quantity : 1,
        extras: null,
        images: images,
        sku: product.id,
      };

      return exportData;
    });

    return { products };
  }

  async findCategories() {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.WC_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    );
    const categories = data.map((category: Tag) => {
      return { name: category.name };
    });

    return { categories };
  }

  async findBrands() {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.WC_URL}/wp-json/wc/v3/products/tags?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    );
    const brands = data.map((brand: Tag) => {
      return { name: brand.name };
    });

    return { brands };
  }

  async findOne(id: number) {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.WC_URL}/wp-json/wc/v3/products/${id}?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    );
    if (!data) return null;

    const images = data.images.map((image: Image) => {
      return { imageUrl: image.src, order: image.id };
    });

    const product = {
      name: data.name,
      description: data.short_description.replace(/<[^>]+>/g, ''),
      originalValue: +data.price,
      currentValue: data.sale_price ? +data.sale_price : +data.price,
      category: data.categories[0].name || 'Sin Categoria',
      brand: data.tags.length > 0 ? data.tags[0].name : '',
      unitType: 'Unidad', //product.attributes[0].name,
      unitQuantity: data.stock_quantity ? data.stock_quantity : 1,
      extras: null,
      images: images,
      sku: data.id,
    };

    return product;
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
