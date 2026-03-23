# Frontend

Frontend written in Nuxt 4 using the `nuxt-auth-utils` module.

## Setup

First, install dependencies:

```bash
npm i
```

Then, create a `.env` file in the root of the project with the following content:

- `NUXT_SESSION_PASSWORD` - a random string used to encrypt the session cookie. You can generate one using `openssl rand -hex 32`.
- `NUXT_OAUTH_KEYCLOAK_CLIENT_ID` - The client ID of the Keycloak client you created earlier (e.g. `nuxt-server`).
- `NUXT_OAUTH_KEYCLOAK_CLIENT_SECRET` - The client secret of the Keycloak client you created earlier. You can find this in the Keycloak admin panel under the clients section, by clicking on your client and then going to the "Credentials" tab.
- `NUXT_OAUTH_KEYCLOAK_SERVER_URL` - The URL of your Keycloak server (e.g. `http://localhost:8080`).
- `NUXT_OAUTH_KEYCLOAK_REALM` - The name of the realm you created earlier (e.g. `nuxt-ssr-keycloak`).

Then, start the development server:

```bash
npm run dev
```
