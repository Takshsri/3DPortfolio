import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://localhost:5173',
    
  });
  await app.listen(3000)
  console.log("Server is running");
}
bootstrap()