import {Entity, model, property} from '@loopback/repository';

@model()
export class JWT extends Entity {
  @property({
    type: 'string',
    description: 'jwt',
  })
  jwt: string;

  constructor(data?: Partial<JWT>) {
    super(data);
  }
}
