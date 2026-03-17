import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { ProjectsModule } from './projects/projects.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ContactModule,
    ProjectsModule,
  ],
})
export class AppModule {}