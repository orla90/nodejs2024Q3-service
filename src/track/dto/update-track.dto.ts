import { IsString, IsOptional, IsUUID, IsNumber, Min } from 'class-validator';

export class UpdateTrackDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsOptional()
  @IsNumber()
  @Min(1)
  duration: number;
}
