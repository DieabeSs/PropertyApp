import { IsString, IsInt, IsEnum, IsNotEmpty, Min, IsOptional } from 'class-validator';
import { ListingType } from '@prisma/client';

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @Min(0)
  price: number;
  
  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsEnum(ListingType)
  listingType: ListingType;

  @IsInt()
  @Min(0)
  bedrooms: number;

  @IsInt()
  @Min(0)
  bathrooms: number;

  @IsInt()
  @Min(0)
  areaSqFt: number;
}