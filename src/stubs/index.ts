export class StubSetting {
  constructor() {
    const nock = require("nock");
    const scope = nock("http://localhost:8082", { allowUnmocked: true })
      .post("/privateApi/division-api/get")
      .reply(200, {
        data: {
          agentLists: { agentSrcTable: [{ node_id: "MDc6TGljZW5zZTE" }] }
        }
      });
    return scope;
  }
}
