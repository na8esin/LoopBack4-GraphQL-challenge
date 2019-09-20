const application = require("./dist");

module.exports = application;

if (require.main === module) {
  const config = {
    rest: {
      port: +(process.env.PORT || 3001),
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true
      }
    }
  };

  // Run the application
  application.main(config).catch(err => {
    console.error("Cannot start the application.", err);
    process.exit(1);
  });
}
