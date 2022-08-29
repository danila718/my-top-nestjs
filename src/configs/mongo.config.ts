import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    // ...getMongoOptions(),
  };
};

export const getMongoString = (configService: ConfigService): string =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/' +
  configService.get('MONGO_AUTHDATABASE');

// export const getMongoOptions = (): MongooseModuleOptions => ({
// useNewUrlParser: true,
// useCreateIndex: true,
// useUnifiedTopology: true,
// });
