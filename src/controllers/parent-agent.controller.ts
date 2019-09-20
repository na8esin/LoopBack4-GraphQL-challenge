import { inject } from "@loopback/core";
import { Count, CountSchema, Filter, Where } from "@loopback/repository";
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody
} from "@loopback/rest";
import { ParentAgentService } from "../services/parent-agent.service";
import { ParentAgent, ParentAgentExcludingId } from "../models";

export class ParentAgentController {
  constructor(
    @inject("services.ParentAgentService")
    public parentAgentService: ParentAgentService
  ) {}

  @post("/parent-agents", {
    tags: ["parent agent"],
    responses: {
      "200": {
        description: "ParentAgent model instance",
        content: {
          "application/json": { schema: getModelSchemaRef(ParentAgent) }
        }
      }
    }
  })
  async create(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ParentAgent)
        }
      }
    })
    parentAgent: Omit<ParentAgent, "id">
  ): Promise<ParentAgent> {
    return this.parentAgentService.create(parentAgent);
  }

  @get("/parent-agents/count", {
    tags: ["parent agent"],
    responses: {
      "200": {
        description: "ParentAgent model count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async count(
    @param.query.object("where", getWhereSchemaFor(ParentAgent))
    where?: Where<ParentAgent>
  ): Promise<Count> {
    return this.parentAgentService.count(where);
  }

  @get("/parent-agents", {
    tags: ["parent agent"],
    responses: {
      "200": {
        description: "Array of ParentAgent model instances",
        content: {
          "application/json": {
            schema: { type: "array", items: getModelSchemaRef(ParentAgent) }
          }
        }
      }
    }
  })
  async find(
    @param.query.object("filter", getFilterSchemaFor(ParentAgent))
    filter?: Filter<ParentAgent>
  ): Promise<ParentAgent[]> {
    return this.parentAgentService.find(filter);
  }

  @patch("/parent-agents", {
    tags: ["parent agent"],
    responses: {
      "200": {
        description: "ParentAgent PATCH success count",
        content: { "application/json": { schema: CountSchema } }
      }
    }
  })
  async updateAll(
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ParentAgent, { partial: true })
        }
      }
    })
    parentAgent: ParentAgent,
    @param.query.object("where", getWhereSchemaFor(ParentAgent))
    where?: Where<ParentAgent>
  ): Promise<Count> {
    return this.parentAgentService.updateAll(parentAgent, where);
  }

  @get("/parent-agents/{id}", {
    tags: ["parent agent"],
    responses: {
      "200": {
        description: "ParentAgent model instance",
        content: {
          "application/json": { schema: getModelSchemaRef(ParentAgent) }
        }
      }
    }
  })
  async findById(@param.path.number("id") id: number): Promise<ParentAgent> {
    return this.parentAgentService.findById(id);
  }

  @patch("/parent-agents/{id}", {
    tags: ["parent agent"],
    responses: {
      "204": {
        description: "ParentAgent PATCH success"
      }
    }
  })
  async updateById(
    @param.path.number("id") id: number,
    @requestBody({
      content: {
        "application/json": {
          schema: getModelSchemaRef(ParentAgent, { partial: true })
        }
      }
    })
    parentAgent: ParentAgent
  ): Promise<void> {
    await this.parentAgentService.updateById(id, parentAgent);
  }

  @put("/parent-agents/{id}", {
    tags: ["parent agent"],
    responses: {
      "204": {
        description: "ParentAgent PUT success"
      }
    }
  })
  async replaceById(
    @param.path.number("id") id: number,
    @requestBody() parentAgent: ParentAgent
  ): Promise<void> {
    await this.parentAgentService.replaceById(id, parentAgent);
  }

  @del("/parent-agents/{id}", {
    tags: ["parent agent"],
    responses: {
      "204": {
        description: "ParentAgent DELETE success"
      }
    }
  })
  async deleteById(@param.path.number("id") id: number): Promise<void> {
    await this.parentAgentService.deleteById(id);
  }
}
