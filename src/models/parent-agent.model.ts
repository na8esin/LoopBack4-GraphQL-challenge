import { Entity, model, property } from "@loopback/repository";
import { Agent } from "./agent.model";

@model()
export class ParentAgent extends Entity {
  @property()
  id?: number;

  @property()
  name?: string;

  @property()
  note?: string;

  //  @hasMany(() => Todo) @property.array()
  //  agents?: Agent[];

  constructor(data?: Partial<ParentAgent>) {
    super(data);
  }
}

@model()
export class ParentAgentExcludingId extends Entity {
  @property()
  name?: string;

  @property()
  note?: string;

  @property.array(Agent)
  agents?: Agent[];

  constructor(data?: Partial<ParentAgentExcludingId>) {
    super(data);
  }
}
