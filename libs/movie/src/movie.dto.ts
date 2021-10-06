import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MovieDto {
  @ApiProperty()
  movieId: string;
  @ApiProperty()
  contractId?: string;
  @ApiPropertyOptional()
  status?: string;
  @ApiProperty()
  title?: string;
  @ApiProperty()
  thumbnail?: string;
  @ApiProperty()
  rated?: string;
  @ApiProperty()
  scheduleStart?: string;
  @ApiProperty()
  scheduleEnd?: string;
  @ApiProperty()
  previewCdn?: string;
  @ApiProperty()
  category?: string;
  // statistics
  @ApiProperty()
  click?: number;
  @ApiProperty()
  view?: number;
  @ApiProperty()
  like?: number;
}

export class MovieDetailDto {
  @ApiProperty()
  movieId: string;
  @ApiPropertyOptional()
  contractId?: string;
  @ApiPropertyOptional()
  status?: string;
  @ApiProperty()
  movieCdn?: string;
  @ApiProperty()
  summary?: string;
}

export class CreateMovieDto {
  @ApiProperty({ type: MovieDto })
  'MOVIE': MovieDto;
  @ApiProperty({ type: MovieDetailDto })
  'MOVIE#DETAIL': MovieDetailDto;
}

export class UpdateMovieDto {
  @ApiPropertyOptional({ type: MovieDto })
  'MOVIE': MovieDto;
  @ApiPropertyOptional({ type: MovieDetailDto })
  'MOVIE#DETAIL': MovieDetailDto;
}
