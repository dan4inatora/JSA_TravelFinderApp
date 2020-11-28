import redis from 'redis';
import connectRedis from 'connect-redis';
import {envConfig} from '../config/envConfig';

export const RedisStoreWrapper = (session: any) => connectRedis(session);

export const client = redis.createClient({host: envConfig.redis.host, port: envConfig.redis.port});
