import { Entity, model, property } from "@loopback/repository";

@model()
export class Agent extends Entity {
  @property()
  id?: number;

  @property()
  code?: string;

  @property()
  name?: string;

  @property()
  address?: string;

  @property()
  tel?: string;

  @property()
  parent_id?: string;

  @property()
  note?: string;

  constructor(data?: Partial<Agent>) {
    super(data);
  }
}

@model()
export class AgentExcludingId extends Entity {
  @property()
  code?: string;

  @property()
  name?: string;

  @property()
  address?: string;

  @property()
  tel?: string;

  @property()
  note?: string;

  constructor(data?: Partial<AgentExcludingId>) {
    super(data);
  }
}
