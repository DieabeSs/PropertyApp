import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ListingModule } from './listing/listing.module';

@Module({
  imports: [PrismaModule, AuthModule, ListingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}