import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 60000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class MuetProductsModule {}
