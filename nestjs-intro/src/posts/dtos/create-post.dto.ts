import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/PostType.enum';
import { postStatus } from '../enums/PostStatus.enum';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'this is the title for blog post',
    example: 'My Post title',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  title: string;

  @ApiProperty({
    enum: postType,
    description: "Possible values: 'post', 'page', 'story', 'series'",
  })
  @IsNotEmpty()
  @IsEnum(postType)
  postType: postType;

  @ApiProperty({
    description: 'this is the slug for blog post For example: my-post',
    example: 'my-post',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'slug can only contain lowercase letters, numbers and uses only "-" without spaces. For example: "my-post"',
  })
  slug: string;

  @ApiProperty({
    enum: postStatus,
    description: "Possible values: 'draft', 'scheduled', 'review', 'published'",
  })
  @IsNotEmpty()
  @IsEnum(postStatus)
  status: postStatus;

  @ApiPropertyOptional({
    description: 'this is the content for blog post',
    example: 'My Post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialized JSON object else a validation error will be thrown',
    example: '{"type":"article","properties":{"author":"John Doe"}}',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'this is the image url for blog post',
    example: 'https://example.com/image.png',
  })
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'this is the publish date for blog post',
    example: '2020-01-01T00:00:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'this is the tags for blog post',
    example: ['tag1', 'tag2', 'tag3'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'the key can be any string identifier for the meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value that you want to save to the meta key',
          example: true,
        },
      },
    },
    description: 'this is the meta options for blog post',
    example: [
      {
        key: 'key1',
        value: 'value1',
      },
      {
        key: 'key2',
        value: 'value2',
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
