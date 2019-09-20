import { inject } from "@loopback/core";
import { Count, CountSchema, Filter, Where } from "@loopback/repository";
import {
  get,
  post,
  requestBody,
  getModelSchemaRef,
  getWhereSchemaFor,
  param
} from "@loopback/rest";
import { Agent, AgentExcludingId } from "../models";
import { AgentService } from "../services/agent.service";

export class AgentController {
  constructor(
    @inject("services.AgentService")
    protected agentService: AgentService
  ) {}

  @post("/agents", {
    tags: ["agent"],
    responses: {
      "200": {
        description: "Agent model instance",
        content: { "application/json": { schema: getModelSchemaRef(Agent) } }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(Agent)
        }
      }
    })
    agent: Omit<Agent, "id">
  ): Promise<Agent> {
    return this.agentService.create(agent);
  }

  @get("/agents/count", {
    tags: ["agent"],
    responses: {
      "200": {
        description: "Agent model count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object("where", getWhereSchemaFor(Agent)) where?: Where<Agent>
  ): Promise<Count> {
    return this.agentService.count(where);
  }

  @get("/agents", {
    tags: ["agent"],
    responses: {
      "200": {
        description: "Array of agent model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(Agent) }
          }
        }
      }
    }
  })
  async find(agent: Agent): Promise<Agent[]> {
    return await this.agentService.find(agent);
  }
}
