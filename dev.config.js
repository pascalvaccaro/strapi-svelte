module.exports = {
  apps: [{
    name: "dev:admin",
    cwd: "./admin",
    script: "./node_modules/.bin/strapi",
    args: "develop",
  }, {
    name: "dev:website",
    cwd: "./website",
    script: "npm",
    args: "run dev",
  }]
};
