const { IS_PULL_REQUEST, STRAPI_WEBSITE_TOKEN } = process.env;

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      if (STRAPI_WEBSITE_TOKEN) {
        // Create or update a token for the website
        const accessKey = strapi
          .service("admin::api-token")
          .hash(STRAPI_WEBSITE_TOKEN);
        const name = "Website API Token";
        const data = {
          name,
          description: "API Token for the website",
          type: "full-access",
          lifespan: null,
          accessKey,
        };
        const engine = strapi.query("admin::api-token");
        let apiToken = await engine.findOne({
          select: ["id", "name", "accessKey"],
          where: { name },
        });
        if (!apiToken) {
          await engine.create({ data });
        } else if (apiToken.accessKey !== accessKey) {
          await engine.update({
            where: { id: apiToken.id },
            data: { accessKey },
          });
        }
      }
      if (IS_PULL_REQUEST === "true") {
        // Execute code in PR Preview Environment
      }
    } catch (err) {
      strapi.log.error(err.message);
      // Inside PM2
      if (typeof process.send === "function") process.exit(3);
    }
  },
};
