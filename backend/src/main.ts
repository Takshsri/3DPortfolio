import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as dotenv from 'dotenv'

async function bootstrap() {
  dotenv.config()

  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: '*', // change this for deployment
  });

  const port = process.env.PORT || 3000; 

  await app.listen(port, '0.0.0.0'); 

  console.log(`Server is running on port ${port}`);
}
bootstrap();