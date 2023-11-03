"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
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
let CartService = class CartService {
    create(createCartDto) {
        return DATA;
    }
    findAll() {
        return `This action returns all cart`;
    }
    findOne(id) {
        return `This action returns a #${id} cart`;
    }
    update(id, updateCartDto) {
        return `This action updates a #${id} cart`;
    }
    remove(id) {
        return `This action removes a #${id} cart`;
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)()
], CartService);
//# sourceMappingURL=cart.service.js.map