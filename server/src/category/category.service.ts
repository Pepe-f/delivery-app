import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { returnCategoryObject } from './return-category.object';
import { PrismaService } from 'src/prisma.service';
import { generateSlug } from 'src/utils/generate-slug';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.category.findMany({
      select: returnCategoryObject,
    });
  }

  async getById(id: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
      select: returnCategoryObject,
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    return category;
  }

  async getBySlug(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
      select: returnCategoryObject,
    });

    if (!category) {
      throw new BadRequestException('Category not found');
    }

    return category;
  }

  async create() {
    return this.prisma.category.create({
      data: {
        name: '',
        slug: '',
        image: '',
      },
    });
  }

  async update(id: string, dto: CategoryDto) {
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name),
        image: dto.image,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.category.delete({ where: { id } });
  }
}
