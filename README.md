# strapi-svelte

> A template repository to set up a fullstack web environment

## Features

- [Strapi](https://docs.strapi.io) REST API + Admin Panel > `admin/` 
- [Svelte](https://kit.svelte.dev/docs/introduction) application with SSR > `website/`
- [Cypress](https://docs.cypress.io) end-to-end test runner > `cypress/`
- [Render](https://render.com/docs) Bluesprint specification > `render.yaml`

## Setup

- Create a new repository using this one as a template, or by forking it
- Sign up for an account in [Render](https://render.com) using your Github account and create a Blueprint linked to your new repository

## Code 

Once you cloned your repository on your local machine, you need to set up some environment variables

### `admin`

Create a file in the `admin` folder named `.env` and fill it with the same key/value pairs as in the `.env.example` file. You can find information about mandatory environment variables in the documentation from Strapi about [server configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/server.html#available-options) and [admin panel configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/admin-panel.html).

> If you need to make authenticated requests from the website's server to the Strapi API, fill up the `STRAPI_WEBSITE_TOKEN` with a random 128-bytes string

### `website`

Create a file in the `website` folder named `.env.local` and fill it with same key/value pairs as in the `.env` file. 

> If you need to make authenticated requests from the website's server to the Strapi API, fill up the `STRAPI_WEBSITE_TOKEN` with the same 128-bytes string from the `admin` step

### Installation

Run `npm install` in both `admin` and `website` folders

### Compilation

Run `npm run build` in the project root folder

### Local development

Run `npm run dev` in the project root folder

### Local test

Run `npm test` in the project root folder

## CI/CD

### Production

Commit your changes and push them to the `main` branch of your repository. Render will automatically detect them and create new deployments for both services.

### Preview Environment

1. Go to your [Render Dashboard](https://dashboard.render.com) and [enable Pull Request Previews](https://render.com/docs/pull-request-previews) in both services `admin` and `website`
2. Create a new branch in your repository and commit some changes on it
3. Open a Pull Request in your repository comparing your branch to the `main` branch

Render will try to deploy a copy of your production environment running the Pull Request code changes.

### Testing the Preview Environment

This template comes with a Github workflow that runs the Cypress E2E test suite against a Preview Environment from Render on any change to a matching Pull Request.

#### ***BONUS: report and inspect your tests inside an open-source Cypress Dashboard***

You can follow the steps in [this repository](https://github.com/pascalvaccaro/render-sorry-cypress) to set up your own [Sorry-Cypress](https://docs.sorry-cypress.dev/) environment (an open-source alternative to the costly Cypress Studio). 

Once all instances are up and running, copy the director service external URL in Render and paste it in the e2e workflow next to the `CYPRESS_API_URL` property.
Your next tests will be reported to your Sorry-Cypress dashboard.
