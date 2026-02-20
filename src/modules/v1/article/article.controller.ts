import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ArticleService } from './article.service';
import { GetArticleDto } from './dto/get-article.dto';

@ApiTags('article')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('v1/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener lista paginada' })
  findAll(
    @Query() getArticleDto: GetArticleDto,
  ) {
    return this.articleService.findAll(getArticleDto.page, getArticleDto.limit);
  }
}
