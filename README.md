# simple-oauth-kit

Lightweight OAuth2 / OpenID Connect helper for Node.js.

## Installation

```bash
npm install 0AUTH2.0_KIT
```

## Usage

```js
import { createOAuth } from "OAUTH2.0_KIT";

const oauth = createOAuth({
  clientId: "...",
  clientSecret: "...",
  redirectUri: "...",
  discoveryUrl: "https://accounts.google.com/.well-known/openid-configuration"
});
```

### Redirect user

```js
const state = oauth.generateState();
const url = await oauth.generateAuthUrl(state);
```

### Handle callback

```js
const { tokens, user } = await oauth.handleCallback(code);
```

## Notes

* No DB included
* No session handling
* No JWT included
* Designed to be plugged into any backend
* ERROR 1: Missing required config - ${key}
* ERROR 2:tokenExchange failure
* hehehehehe commit is minor commit
