import {Entity, model, property} from '@loopback/repository';

@model()
export class User extends Entity {
  @property({
    id: true,
    description: 'The unique identifier for a product',
  })
  id: number;

  @property({
    type: 'string',
    description: 'api key',
  })
  apiKey: string;

  constructor(data?: Partial<User>) {
    super(data);
  }
}
