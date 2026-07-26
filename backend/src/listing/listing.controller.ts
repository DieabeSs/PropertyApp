import { Controller, Post, Body, Patch, Query, Get, Delete, Req, Param, HttpCode, UseGuards, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ListingService } from './listing.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ListingQueryDto } from './dto/listing-query.dto';


@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtGuard)
  createListing(@Body() createListingDto: CreateListingDto, @Req() req: any) {
    return this.listingService.createListing(createListingDto, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  updateListing(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto, @Req() req: any) {
    return this.listingService.updateListing(id, updateListingDto, req.user.id);
  }

  @Get()
  findAll(
    @Query() query: ListingQueryDto,
  ) {
    return this.listingService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listingService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  remove(@Param('id') id: string, @Req() req: any) {
    return this.listingService.remove(id, req.user.id);
  }
}