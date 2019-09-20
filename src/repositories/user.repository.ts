import {
  DefaultKeyValueRepository,
  juggler,
  repository,
} from '@loopback/repository';
import {RedisDataSource} from '../datasources/redis.datasource';
import {User} from '../models';
import {inject} from '@loopback/core';

export type Credentials = {
  apiKey: string;
};

export class UserRepository extends DefaultKeyValueRepository<
  User
> {
  constructor(
    @inject('datasources.redis') datasource: RedisDataSource) {
    super(User, datasource);
  }
}
