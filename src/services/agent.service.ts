import { getService, juggler } from "@loopback/service-proxy";
import { inject, Provider } from "@loopback/core";
import { AgentDataSource } from "../datasources/agent.datasource";
import { Agent } from "../models";
import { Count, CountSchema, Filter, Where } from "@loopback/repository";

export interface AgentService {
  find(agent: Agent): Promise<Agent[]>;
  create(agent: Agent): Promise<Agent>;
  count(where?: Where<Agent>): Promise<Count>;
}

export class AgentServiceProvider implements Provider<AgentService> {
  constructor(
    @inject("datasources.agent")
    protected dataSource: juggler.DataSource
  ) {}

  value(): Promise<AgentService> {
    return getService(this.dataSource);
  }
}
