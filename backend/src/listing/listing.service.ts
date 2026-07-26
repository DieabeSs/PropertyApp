import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ListingQueryDto } from './dto/listing-query.dto';

@Injectable()
export class ListingService {
  constructor(private readonly prisma: PrismaService) {}

  async createListing(createListingDto: CreateListingDto, userId: string) {
    const listing = await this.prisma.listing.create({
      data: {...createListingDto, ownerId: userId},
    });
    return listing;
  }
  
  async updateListing(id: string, updateListingDto: UpdateListingDto, userId: string) {
    const listing = await this.prisma.listing.findUnique({
        where: { id },
      });

   if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.ownerId !== userId) {
      throw new ForbiddenException('You can only edit your own listings');
    }

    
    return this.prisma.listing.update({
      where: { id },
      data: updateListingDto,
    });
  }

  async findAll(query: ListingQueryDto) {
    const { limit, offset, city, listingType } = query;
    
    return this.prisma.listing.findMany({
      where: {
        isActive: true,
        ...(city && { city }),
        ...(listingType && { listingType }),
      },
      skip: offset,
      take: Math.min(limit, 100),
      orderBy: { createdAt: 'desc' },
    });
  }
  async findOne(id: string) {
    const listing = await this.prisma.listing.findUnique({
    where: { id },
    });

    if (!listing || !listing.isActive) {
    throw new NotFoundException('Listing not found');
    }

    return listing;
  }

  async remove(id: string, userId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id},
    });

    if (!listing) {
      throw new NotFoundException('Listing not found');
    }

    if (listing.ownerId !== userId) {
      throw new ForbiddenException('You can only delete your own listings');
    }

    await this.prisma.listing.delete({
      where: { id },
    });
    return;
  }
}