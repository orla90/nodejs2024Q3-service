import { IsUUID } from 'class-validator';

export class FavoriteTrackDto {
  @IsUUID()
  trackId: string;
}
