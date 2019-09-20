import { getService, juggler } from "@loopback/service-proxy";
import { inject, Provider } from "@loopback/core";
import { ParentAgentDataSource } from "../datasources/parent-agent.datasource";
import { ParentAgent } from "../models";
import { Count, CountSchema, Filter, Where } from "@loopback/repository";

export interface ParentAgentService {
  create(parentAgent: ParentAgent): Promise<ParentAgent>;
  count(where?: Where<ParentAgent>): Promise<Count>;
  find(filter?: Filter<ParentAgent>): Promise<ParentAgent[]>;
  updateAll(
    parentAgent: ParentAgent,
    where?: Where<ParentAgent>
  ): Promise<Count>;
  findById(id: number): Promise<ParentAgent>;
  updateById(id: number, parentAgent: ParentAgent): Promise<ParentAgent>;
  replaceById(id: number, parentAgent: ParentAgent): Promise<ParentAgent>;
  deleteById(id: number): Promise<ParentAgent>;
}

export class ParentAgentServiceProvider
  implements Provider<ParentAgentService> {
  constructor(
    @inject("datasources.parent-agent")
    protected dataSource: juggler.DataSource
  ) {}

  value(): Promise<ParentAgentService> {
    return getService(this.dataSource);
  }
}
