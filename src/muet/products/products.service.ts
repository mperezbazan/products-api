import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios/dist';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { SearchProductDto } from './dto/search-product.dto';

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
// const dictionary = {
//   Tamaños: 'Tamaño',
//   Colores: 'Color',
//   Topitos: 'Topito',
//   Letras: 'Letra',
// };
@Injectable()
export class ProductsService {
  constructor(private readonly httpService: HttpService) {}
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }
  async fetchProductVariations(productId) {
    try {
      const response = await firstValueFrom(
        this.httpService
          .get(
            `${process.env.MUET_WC_URL}/wp-json/wc/v3/products/${productId}/variations?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}`,
          )
          .pipe(map((response) => response.data)),
      );
      return response;
    } catch (error) {
      console.error('Error fetching product variations:', error);
      return null;
    }
  }

  async processProduct(product, parentProduct) {
    let name = product.name;
    let description = product.short_description?.replace(/<[^>]+>/g, '');
    let havePrice = false;
    let category =
      product.categories?.length > 0
        ? product.categories[0]?.name
        : 'Sin Categoria';
    try {
      let currentValue = +product.price;
      if (product.sale_price) {
        currentValue = +product.sale_price;
        havePrice = true;
      } else {
        const htmlPrice = product.price_html;
        if (htmlPrice) {
          const htmlPriceArray = htmlPrice.split('<del>');
          if (htmlPriceArray.length > 1) {
            const price = htmlPriceArray[1].split('</span>');
            currentValue = +price[price.length - 2]?.replace(/[^0-9.-]+/g, '');
            currentValue *= 1000;
            havePrice = true;
          }
        }
      }

      if (parentProduct) {
        const attributes = product.attributes.map((attribute: any) => {
          return `${attribute.name}: ${attribute.option}`;
        });
        name = `${parentProduct.name} | ${attributes.join(' | ')}`;
        description = `${parentProduct.short_description.replace(
          /<[^>]+>/g,
          '',
        )}\n${attributes.join('\n')} `;
        category = parentProduct.categories[0]?.name || 'Sin Categoria';
        if (!havePrice) {
          if (parentProduct.sale_price) {
            currentValue = +parentProduct.sale_price;
            havePrice = true;
          } else {
            const htmlPrice = parentProduct.price_html;
            if (htmlPrice) {
              const htmlPriceArray = htmlPrice.split('<del>');
              if (htmlPriceArray.length > 1) {
                const price = htmlPriceArray[1].split('</span>');
                currentValue = +price[price.length - 2]?.replace(
                  /[^0-9.-]+/g,
                  '',
                );
                currentValue *= 1000;
                havePrice = true;
              }
            }
          }
        }
      }

      const exportData = {
        name: name,
        description: description,
        originalValue: +product.price,
        currentValue,
        category: category,
        brand: product.tags?.length > 0 ? product.tags[0].name : '',
        unitType: 'Unidad',
        unitQuantity: product.stock_quantity || 1,
        extras: null,
        images: product.images?.map((image) => ({
          imageUrl: image.src,
          order: image.id,
        })),
        sku: product.id,
      };

      if (product.stock_status === 'instock') {
        return exportData;
      }
    } catch (error) {
      console.error('Error processing product:', error);
      return null;
    }
  }

  async search(searchProductDto: SearchProductDto) {
    let criterio = '&stock_status=instock';
    if (searchProductDto.Filter) {
      criterio += `&search=${searchProductDto.Filter}`;
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
    try {
      const data = await firstValueFrom(
        this.httpService
          .get(
            `${process.env.MUET_WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}${criterio}`,
            {
              headers: {
                Accept: 'application/json',
              },
            },
          )
          .pipe(map((response) => response.data)),
      );

      // const finalProducts = [];
      // const products = await Promise.all(
      //   data.map(async (product: Product) => {
      //     const images = product.images.map((image: Image) => {
      //       return { imageUrl: image.src, order: image.id };
      //     });
      //     if (product.variations.length > 0) {
      //       const data = await firstValueFrom(
      //         this.httpService
      //           .get(
      //             `${process.env.MUET_WC_URL}/wp-json/wc/v3/products/${product.id}/variations?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}`,
      //             {
      //               headers: {
      //                 Accept: 'application/json',
      //               },
      //             },
      //           )
      //           .pipe(map((response) => response.data)),
      //       );
      //       Promise.all(
      //         await data.map(async (variation: any) => {
      //           const attributes = variation.attributes.map(
      //             (attribute: any) => {
      //               return `${attribute.name}: ${attribute.option}`;
      //             },
      //           );
      //           const variationLink = variation._links.self[0].href;
      //           const variationFromAPI = await firstValueFrom(
      //             this.httpService
      //               .get(
      //                 `${process.env.MUET_WC_URL}/wp-json/wc/v3/products/${variation.id}?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}`,
      //                 {
      //                   headers: {
      //                     Accept: 'application/json',
      //                   },
      //                 },
      //               )
      //               .pipe(map((response) => response.data)),
      //           );
      //           let currentValue = +variation.price;

      //           if (variationFromAPI?.sale_price) {
      //             currentValue = +variationFromAPI.sale_price;
      //           } else {
      //             const htmlPrice = variationFromAPI.price_html;
      //             console.log(htmlPrice);
      //             if (htmlPrice) {
      //               const htmlPriceArray = htmlPrice.split('<del>');

      //               if (htmlPriceArray.length > 1) {
      //                 const price = htmlPriceArray[1].split('</span>');
      //                 currentValue = +price[price.length - 2].replace(
      //                   /[^0-9.-]+/g,
      //                   '',
      //                 );
      //                 currentValue = currentValue * 1000;
      //               }
      //             }
      //           }
      //           const exportData = {
      //             name: `${product.name} | ${attributes.join(' | ')}`,
      //             description: `${product.short_description.replace(
      //               /<[^>]+>/g,
      //               '',
      //             )}\n${attributes.join('\n')}`,
      //             originalValue: +variation.price,
      //             currentValue: currentValue,
      //             //category: product.categories[0].name || 'Sin Categoria',
      //             // brand: product.tags?.length > 0 ? variation.tags[0].name : '',
      //             unitType: 'Unidad', //product.attributes[0].name,
      //             unitQuantity: variation.stock_quantity,
      //             extras: null,
      //             images: [
      //               {
      //                 imageUrl: variation.image.src,
      //                 order: variation.image.id,
      //               },
      //             ],
      //             sku: variation.id,
      //           };
      //           console.log(variation.stock_status);
      //           if (variation.stock_status === 'instock') {
      //             finalProducts.push(exportData);
      //           }
      //         }),
      //       );
      //     } else {
      //       let currentValue = +product.price;

      //       if (product.sale_price) {
      //         currentValue = +product.sale_price;
      //       } else {
      //         const htmlPrice = product.price_html;
      //         if (htmlPrice) {
      //           const htmlPriceArray = htmlPrice.split('<del>');

      //           if (htmlPriceArray.length > 1) {
      //             const price = htmlPriceArray[1].split('</span>');
      //             currentValue = +price[price.length - 2].replace(
      //               /[^0-9.-]+/g,
      //               '',
      //             );
      //             currentValue = currentValue * 1000;
      //           }
      //         }
      //       }
      //       const exportData = {
      //         name: product.name,
      //         description: product.short_description.replace(/<[^>]+>/g, ''),
      //         originalValue: +product.price,
      //         currentValue: currentValue,
      //         category: product.categories[0].name || 'Sin Categoria',
      //         brand: product.tags.length > 0 ? product.tags[0].name : '',
      //         unitType: 'Unidad', //product.attributes[0].name,
      //         unitQuantity: product.stock_quantity ? product.stock_quantity : 1,
      //         extras: null,
      //         images: images,
      //         sku: product.id,
      //       };
      //       if (product.stock_status === 'instock') {
      //         finalProducts.push(exportData);
      //         return exportData;
      //       }
      //     }
      //     return null;
      //   }),
      // );

      // if ((await products).length > 0) {
      //   return {
      //     products: finalProducts.sort((a, b) => a.name.localeCompare(b.name)),
      //   };
      // }

      const finalProducts = [];
      for (const product of data) {
        if (product.variations.length > 0) {
          const variations = await this.fetchProductVariations(product.id);
          for (const variation of variations) {
            const processedVariation = await this.processProduct(
              variation,
              product,
            );
            if (processedVariation) {
              finalProducts.push(processedVariation);
            }
          }
        } else {
          const processedProduct = await this.processProduct(product, null);
          if (processedProduct) {
            finalProducts.push(processedProduct);
          }
        }
      }

      return {
        products: finalProducts.sort((a, b) => a.name.localeCompare(b.name)),
      };
    } catch (error) {
      // console.log(error);
      Logger.error(error.message, 'ProductsService.search');
      return { status: 'error', message: error.message };
    }
  }

  async findAll() {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.MUET_WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}&stock_status=instock`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    );
    // const finalProducts = [];
    // const products = Promise.all(
    //   data.map(async (product: Product) => {
    //     const images = product.images.map((image: Image) => {
    //       return { imageUrl: image.src, order: image.id };
    //     });
    //     if (product.variations.length > 0) {
    //       const data = await firstValueFrom(
    //         this.httpService
    //           .get(
    //             `${process.env.MUET_WC_URL}/wp-json/wc/v3/products/${product.id}/variations?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}`,
    //             {
    //               headers: {
    //                 Accept: 'application/json',
    //               },
    //             },
    //           )
    //           .pipe(map((response) => response.data)),
    //       );
    //       Promise.all(
    //         data.map((variation: any) => {
    //           const attributes = variation.attributes.map((attribute: any) => {
    //             return `${attribute.name}: ${attribute.option}`;
    //           });

    //           let currentValue = +variation.price;

    //           if (variation.sale_price) {
    //             currentValue = +variation.sale_price;
    //           } else {
    //             const htmlPrice = variation.price_html;
    //             if (htmlPrice) {
    //               const htmlPriceArray = htmlPrice.split('<del>');
    //               if (htmlPriceArray.length > 1) {
    //                 const price = htmlPriceArray[1].split('</span>');
    //                 currentValue = +price[price.length - 2].replace(
    //                   /[^0-9.-]+/g,
    //                   '',
    //                 );
    //                 currentValue = currentValue * 1000;
    //               }
    //             }
    //           }
    //           const exportData = {
    //             name: `${product.name} | ${attributes.join(' | ')}`,
    //             description: `${product.short_description.replace(
    //               /<[^>]+>/g,
    //               '',
    //             )}\n${attributes.join('\n')}`,
    //             // originalValue: +variation.price,
    //             // currentValue: variation.sale_price
    //             //   ? +variation.sale_price
    //             //   : +variation.price,
    //             originalValue: +variation.price,
    //             currentValue: currentValue,
    //             //category: product.categories[0].name || 'Sin Categoria',
    //             // brand: product.tags?.length > 0 ? variation.tags[0].name : '',
    //             unitType: 'Unidad', //product.attributes[0].name,
    //             unitQuantity: variation.stock_quantity,
    //             extras: null,
    //             images: [
    //               {
    //                 imageUrl: variation.image.src,
    //                 order: variation.image.id,
    //               },
    //             ],
    //             sku: variation.id,
    //           };
    //           if (variation.stock_status === 'instock') {
    //             finalProducts.push(exportData);
    //           }
    //         }),
    //       );
    //     } else {
    //       let currentValue = +product.price;

    //       if (product.sale_price) {
    //         currentValue = +product.sale_price;
    //       } else {
    //         const htmlPrice = product.price_html;
    //         if (htmlPrice) {
    //           const htmlPriceArray = htmlPrice.split('<del>');

    //           if (htmlPriceArray.length > 1) {
    //             const price = htmlPriceArray[1].split('</span>');
    //             currentValue = +price[price.length - 2].replace(
    //               /[^0-9.-]+/g,
    //               '',
    //             );
    //             currentValue = currentValue * 1000;
    //           }
    //         }
    //       }
    //       const exportData = {
    //         name: product.name,
    //         description: product.short_description.replace(/<[^>]+>/g, ''),
    //         originalValue: +product.price,
    //         // currentValue: product.sale_price
    //         //   ? +product.sale_price
    //         //   : +product.price,
    //         currentValue: currentValue,
    //         category: product.categories[0].name || 'Sin Categoria',
    //         brand: product.tags.length > 0 ? product.tags[0].name : '',
    //         unitType: 'Unidad', //product.attributes[0].name,
    //         unitQuantity: product.stock_quantity,
    //         extras: null,
    //         images: images,
    //         sku: product.id,
    //       };
    //       if (product.stock_status === 'instock') {
    //         finalProducts.push(exportData);
    //       }
    //     }
    //     return finalProducts;
    //   }),
    // );
    // if ((await products).length > 0) {
    //   return {
    //     products: finalProducts.sort((a, b) => a.name.localeCompare(b.name)),
    //   };
    // }
    // return products;
    const finalProducts = [];
    for (const product of data) {
      if (product.variations.length > 0) {
        const variations = await this.fetchProductVariations(product.id);
        for (const variation of variations) {
          const processedVariation = await this.processProduct(
            variation,
            product,
          );
          if (processedVariation) {
            finalProducts.push(processedVariation);
          }
        }
      } else {
        const processedProduct = await this.processProduct(product, null);
        if (processedProduct) {
          finalProducts.push(processedProduct);
        }
      }
    }

    return {
      products: finalProducts.sort((a, b) => a.name.localeCompare(b.name)),
    };
  }

  async findCategories() {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.MUET_WC_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    );
    const categories = data.map((category: Tag) => {
      return { name: category.name, id: category.id };
    });

    return { categories };
  }

  async findBrands() {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.MUET_WC_URL}/wp-json/wc/v3/products/tags?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .pipe(map((response) => response.data)),
    );
    const brands = data.map((brand: Tag) => {
      return { name: brand.name, id: brand.id };
    });

    return { brands };
  }

  async findOne(id: number) {
    const data = await firstValueFrom(
      this.httpService
        .get(
          `${process.env.MUET_WC_URL}/wp-json/wc/v3/products/${id}?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`,
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
    let description = data.short_description.replace(/<[^>]+>/g, '');
    let category = data.categories[0]?.name || 'Sin Categoria';

    if (data.type === 'variation') {
      const attributes = data.attributes.map((attribute: any) => {
        return `${attribute.name}: ${attribute.option}`;
      });
      const res = await firstValueFrom(
        this.httpService
          .get(
            `${process.env.MUET_WC_URL}/wp-json/wc/v3/products/${data.parent_id}?consumer_key=${process.env.MUET_WC_CONSUMER_KEY}&consumer_secret=${process.env.MUET_WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`,
            {
              headers: {
                Accept: 'application/json',
              },
            },
          )
          .pipe(map((response) => response.data)),
      );

      description = `${res.short_description.replace(
        /<[^>]+>/g,
        '',
      )}\n${attributes.join('\n')} `;
      category = res.categories[0]?.name || 'Sin Categoria';
    }

    let currentValue = +data.price;

    if (data.sale_price) {
      currentValue = +data.sale_price;
    } else {
      const htmlPrice = data.price_html;
      if (htmlPrice) {
        const htmlPriceArray = htmlPrice.split('<del>');
        if (htmlPriceArray.length > 1) {
          const price = htmlPriceArray[1].split('</span>');
          currentValue = +price[price.length - 2].replace(/[^0-9.-]+/g, '');
          currentValue = currentValue * 1000;
        }
      }
    }

    const product = {
      name: data.name,
      description: description,
      originalValue: +data.price,
      currentValue: currentValue,
      category: category,
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
