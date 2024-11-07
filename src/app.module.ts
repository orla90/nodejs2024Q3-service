import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DbService } from './db/db.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, DbService],
})
export class AppModule {}
