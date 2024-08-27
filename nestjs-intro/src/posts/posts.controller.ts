import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  @ApiQuery({ name: 'userId', required: false })
  public getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
  }

  @ApiOperation({
    summary: 'Create a new post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get 201 status when your post created successfully.',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return 'you send a POST request to posts endpoint';
  }

  @ApiOperation({
    summary: 'Update a blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get 200 status when your post updated successfully.',
  })
  @Patch()
  public updatePost(@Body() PatchPostDto: PatchPostDto) {
    console.log(PatchPostDto);
    return 'you send a PATCH request to posts endpoint';
  }
}
