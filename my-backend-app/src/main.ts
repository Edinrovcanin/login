import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Dodajte CORS podršku
  app.enableCors({
    origin: 'http://localhost:3001', // Promijenite na odgovarajuću adresu vašeg frontend-a
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Postavite dodatne header-e za CORS podršku
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Promijenite na odgovarajuću adresu vašeg frontend-a
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS',
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });

  // Slušajte na portu 3000
  await app.listen(3000);
}

bootstrap();
