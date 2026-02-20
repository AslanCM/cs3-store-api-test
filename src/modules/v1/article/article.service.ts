import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository.js';
import { Article } from './entities/article.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.articleRepository.findAndCount({
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }
}
