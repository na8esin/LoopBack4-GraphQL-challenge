import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './agent.datasource.json';

export class AgentDataSource extends juggler.DataSource {
  static dataSourceName = 'agent';

  constructor(
    @inject('datasources.config.agent', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
