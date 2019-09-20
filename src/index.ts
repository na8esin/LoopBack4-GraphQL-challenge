import { OpenApiSpec } from "@loopback/rest";
import { GainaV2ApiApplication } from "./application";
import { ApplicationConfig } from "@loopback/core";
export { GainaV2ApiApplication, PackageInfo, PackageKey } from "./application";

export async function main(options?: ApplicationConfig) {
  const spec: OpenApiSpec = {
    openapi: "3.0.0",
    info: {
      description:
        "現在開発中です<br />まずはusers(post)でユーザを作成してください",
      title: "gaina v2 api",
      version: "1.0.0"
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    tags: [
      {
        name: "agent",
        description: "Everything about agent"
      },
      {
        name: "parent agent",
        description: "親エージェント"
      },
      {
        name: "user",
        description: "userを作成・参照できます"
      }
    ],
    paths: {}
  };

  console.log(options);

  const app = new GainaV2ApiApplication(options);
  app.api(spec);

  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
