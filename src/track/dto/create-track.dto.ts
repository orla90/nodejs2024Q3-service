import { IsString, IsOptional, IsUUID, IsNumber, Min } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsUUID()
  albumId: string | null;

  @IsNumber()
  @Min(1)
  duration: number;
}
