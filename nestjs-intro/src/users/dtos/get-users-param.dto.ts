import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersoParamDto {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
