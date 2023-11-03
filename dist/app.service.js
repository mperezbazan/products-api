"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
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
                    imageUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
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
let AppService = class AppService {
    getHello() {
        return DATA;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map