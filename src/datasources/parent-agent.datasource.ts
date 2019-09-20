import { inject } from "@loopback/core";
import { juggler } from "@loopback/repository";
import * as config from "./parent-agent.datasource.json";

export class ParentAgentDataSource extends juggler.DataSource {
  static dataSourceName = "parent-agent";

  constructor(
    @inject("datasources.config.parent-agent", { optional: true })
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}
