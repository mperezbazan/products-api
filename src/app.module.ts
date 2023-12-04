import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { CartModule } from './cart/cart.module';
import { MuetProductsModule } from './muet/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    CartModule,
    MuetProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
