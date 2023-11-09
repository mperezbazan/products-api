"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/axios/dist");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const DATA = {
    products: [
        {
            name: 'TOPITOS JERUSALEN',
            description: 'Topitos Plateados, divinos para usar en el día a día y para combinarlos con mas aretes. Es tendencia!</p> <p><em><strong>(Precio por par)</strong></em></p> <p><strong>Material:</strong> Acero</p> <p><strong>Color:</strong> Plateado</p> <p><strong>Cuidados:</strong> Recomendamos guardar por separado cada accesorio, almacenarlos en lugares secos y a temperatura ambiente; limpiarlos con un pañito o franela y sin ningún tipo de producto, evitar contacto con productos químicos como cremas y perfumes, no dormir ni bañarse con ellos. La durabilidad de los accesorios depende 100% del cuidado de cada persona.</p>',
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
            description: '<p>Cadenita dorada, básica con dije de letra ideal para usar solita o con mas cadenitas.! Es DIVINA! Y lo mejor, es ajustable y puedes usarla de acuerdo a tu gusto, larga o corta!</p> <p><strong><em>(Precio por unidad)</em></strong></p> <p><strong>Material:</strong> Rodio</p> <p><strong>Medidas:</strong> 45 cms</p> <div class="woocommerce-product-details__short-description"> <p><b>Cuidados</b><strong>: </strong>Recomendamos guardar por separado cada accesorio, almacenarlos en lugares secos y a temperatura ambiente; limpiarlos con un pañito o franela y sin ningún tipo de producto, evitar contacto con productos químicos como cremas y perfumes, no dormir ni bañarse con ellos. La durabilidad de los accesorios depende 100% del cuidado de cada persona.</p> </div> ',
            originalValue: 28000,
            currentValue: 28000,
            category: 'Collares',
            brand: 'Nuevo',
            unitType: '',
            unitQuantity: 150,
            extras: null,
            images: [
                {
                    imageUrl: 'https://anele.com.co/wp-content/uploads/2023/08/LETRAS-C-1.jpg',
                    order: 1,
                },
            ],
            sku: 'cde',
        },
        {
            name: 'Protetor Solar Facial Isdin Fusion Water Oil Control FPS 60 com 30ml',
            description: 'Fusion Water 5 Stars é um protetor solar facial especialmente criado para o uso diário. Com FPS 60 garante muito alta proteção.',
            originalValue: 69.99,
            currentValue: 69.99,
            category: 'Protetor Solar',
            brand: 'Isdin',
            unitType: '',
            unitQuantity: 150,
            extras: null,
            images: [
                {
                    imageUrl: 'https://s3-sa-east-1.amazonaws.com/i.imgtake.takenet.com.br/ii0mntjaiq/ii0mntjaiq.png',
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
                    imageUrl: 'https://s3-sa-east-1.amazonaws.com/i.imgtake.takenet.com.br/isldfab19m/isldfab19m.png',
                    order: 1,
                },
            ],
            sku: 'eghv',
        },
    ],
};
const dictionary = {
    Tamaños: 'Tamaño',
    Colores: 'Color',
    Topitos: 'Topito',
    Letras: 'Letra',
};
let ProductsService = class ProductsService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async search(searchProductDto) {
        let criterio = '';
        if (searchProductDto.Filter) {
            criterio = `&search=${searchProductDto.Filter}`;
        }
        if (searchProductDto.Categories.length > 0) {
            const category = await this.findCategories().then((categories) => {
                return categories.categories.find((category) => category.name === searchProductDto.Categories[0]);
            });
            if (category) {
                criterio += `&category=${category.id}`;
            }
        }
        if (searchProductDto.Brands.length > 0) {
            const brand = await this.findBrands().then((brands) => {
                return brands.brands.find((brand) => brand.name === searchProductDto.Brands[0]);
            });
            if (brand) {
                criterio += `&tag=${brand.id}`;
            }
        }
        console.log(criterio);
        const data = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`${process.env.WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}${criterio}`, {
            headers: {
                Accept: 'application/json',
            },
        })
            .pipe((0, operators_1.map)((response) => response.data)));
        const finalProducts = [];
        const products = Promise.all(data.map(async (product) => {
            const images = product.images.map((image) => {
                return { imageUrl: image.src, order: image.id };
            });
            if (product.variations.length > 0) {
                const data = await (0, rxjs_1.firstValueFrom)(this.httpService
                    .get(`${process.env.WC_URL}/wp-json/wc/v3/products/${product.id}/variations?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}`, {
                    headers: {
                        Accept: 'application/json',
                    },
                })
                    .pipe((0, operators_1.map)((response) => response.data)));
                Promise.all(data.map((variation) => {
                    const attributes = variation.attributes.map((attribute) => {
                        return `${dictionary[attribute.name]}: ${attribute.option}`;
                    });
                    const exportData = {
                        name: `${product.name} | ${attributes.join(' | ')}`,
                        description: `${product.short_description.replace(/<[^>]+>/g, '')}\n${attributes.join('\n')}`,
                        originalValue: +variation.price,
                        currentValue: variation.sale_price
                            ? +variation.sale_price
                            : +variation.price,
                        unitType: 'Unidad',
                        unitQuantity: variation.stock_quantity,
                        extras: null,
                        images: [
                            {
                                imageUrl: variation.image.src,
                                order: variation.image.id,
                            },
                        ],
                        sku: variation.id,
                    };
                    if (variation.stock_status === 'instock') {
                        finalProducts.push(exportData);
                    }
                }));
            }
            else {
                const exportData = {
                    name: product.name,
                    description: product.short_description.replace(/<[^>]+>/g, ''),
                    originalValue: +product.price,
                    currentValue: product.sale_price
                        ? +product.sale_price
                        : +product.price,
                    category: product.categories[0].name || 'Sin Categoria',
                    brand: product.tags.length > 0 ? product.tags[0].name : '',
                    unitType: 'Unidad',
                    unitQuantity: product.stock_quantity ? product.stock_quantity : 1,
                    extras: null,
                    images: images,
                    sku: product.id,
                };
                if (product.stock_status === 'instock') {
                    finalProducts.push(exportData);
                    return exportData;
                }
            }
            return null;
        }));
        if ((await products).length > 0) {
            return {
                products: finalProducts.sort((a, b) => a.name.localeCompare(b.name)),
            };
        }
    }
    async findAll() {
        const data = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`${process.env.WC_URL}/wp-json/wc/v3/products?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}`, {
            headers: {
                Accept: 'application/json',
            },
        })
            .pipe((0, operators_1.map)((response) => response.data)));
        const finalProducts = [];
        const products = Promise.all(data.map(async (product) => {
            const images = product.images.map((image) => {
                return { imageUrl: image.src, order: image.id };
            });
            if (product.variations.length > 0) {
                const data = await (0, rxjs_1.firstValueFrom)(this.httpService
                    .get(`${process.env.WC_URL}/wp-json/wc/v3/products/${product.id}/variations?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&status=publish&per_page=${process.env.WC_PER_PAGE}`, {
                    headers: {
                        Accept: 'application/json',
                    },
                })
                    .pipe((0, operators_1.map)((response) => response.data)));
                Promise.all(data.map((variation) => {
                    const attributes = variation.attributes.map((attribute) => {
                        return `${dictionary[attribute.name]}: ${attribute.option}`;
                    });
                    const exportData = {
                        name: `${product.name} | ${attributes.join(' | ')}`,
                        description: `${product.short_description.replace(/<[^>]+>/g, '')}\n${attributes.join('\n')}`,
                        originalValue: +variation.price,
                        currentValue: variation.sale_price
                            ? +variation.sale_price
                            : +variation.price,
                        unitType: 'Unidad',
                        unitQuantity: variation.stock_quantity,
                        extras: null,
                        images: [
                            {
                                imageUrl: variation.image.src,
                                order: variation.image.id,
                            },
                        ],
                        sku: variation.id,
                    };
                    if (variation.stock_status === 'instock') {
                        finalProducts.push(exportData);
                    }
                }));
            }
            else {
                const exportData = {
                    name: product.name,
                    description: product.short_description.replace(/<[^>]+>/g, ''),
                    originalValue: +product.price,
                    currentValue: product.sale_price
                        ? +product.sale_price
                        : +product.price,
                    category: product.categories[0].name || 'Sin Categoria',
                    brand: product.tags.length > 0 ? product.tags[0].name : '',
                    unitType: 'Unidad',
                    unitQuantity: product.stock_quantity,
                    extras: null,
                    images: images,
                    sku: product.id,
                };
                if (product.stock_status === 'instock') {
                    finalProducts.push(exportData);
                }
            }
            return finalProducts;
        }));
        if ((await products).length > 0) {
            return {
                products: finalProducts.sort((a, b) => a.name.localeCompare(b.name)),
            };
        }
    }
    async findCategories() {
        const data = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`${process.env.WC_URL}/wp-json/wc/v3/products/categories?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`, {
            headers: {
                Accept: 'application/json',
            },
        })
            .pipe((0, operators_1.map)((response) => response.data)));
        const categories = data.map((category) => {
            return { name: category.name, id: category.id };
        });
        return { categories };
    }
    async findBrands() {
        const data = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`${process.env.WC_URL}/wp-json/wc/v3/products/tags?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`, {
            headers: {
                Accept: 'application/json',
            },
        })
            .pipe((0, operators_1.map)((response) => response.data)));
        const brands = data.map((brand) => {
            return { name: brand.name, id: brand.id };
        });
        return { brands };
    }
    async findOne(id) {
        var _a, _b;
        const data = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(`${process.env.WC_URL}/wp-json/wc/v3/products/${id}?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`, {
            headers: {
                Accept: 'application/json',
            },
        })
            .pipe((0, operators_1.map)((response) => response.data)));
        if (!data)
            return null;
        const images = data.images.map((image) => {
            return { imageUrl: image.src, order: image.id };
        });
        let description = data.short_description.replace(/<[^>]+>/g, '');
        let category = ((_a = data.categories[0]) === null || _a === void 0 ? void 0 : _a.name) || 'Sin Categoria';
        if (data.type === 'variation') {
            const attributes = data.attributes.map((attribute) => {
                return `${dictionary[attribute.name]}: ${attribute.option}`;
            });
            const res = await (0, rxjs_1.firstValueFrom)(this.httpService
                .get(`${process.env.WC_URL}/wp-json/wc/v3/products/${data.parent_id}?consumer_key=${process.env.WC_CONSUMER_KEY}&consumer_secret=${process.env.WC_CONSUMER_SECRET}&per_page=${process.env.WC_PER_PAGE}`, {
                headers: {
                    Accept: 'application/json',
                },
            })
                .pipe((0, operators_1.map)((response) => response.data)));
            description = `${res.short_description.replace(/<[^>]+>/g, '')}\n${attributes.join('\n')} `;
            category = ((_b = res.categories[0]) === null || _b === void 0 ? void 0 : _b.name) || 'Sin Categoria';
        }
        const product = {
            name: data.name,
            description: description,
            originalValue: +data.price,
            currentValue: data.sale_price ? +data.sale_price : +data.price,
            category: category,
            brand: data.tags.length > 0 ? data.tags[0].name : '',
            unitType: 'Unidad',
            unitQuantity: data.stock_quantity ? data.stock_quantity : 1,
            extras: null,
            images: images,
            sku: data.id,
        };
        return product;
        return `This action returns a #${id} product`;
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dist_1.HttpService])
], ProductsService);
//# sourceMappingURL=products.service.js.map