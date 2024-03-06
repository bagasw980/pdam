// server.js
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.port || 8080;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
var options = {
  key: `
  -----BEGIN PRIVATE KEY-----
  MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDk9gAOkyD2r83x
  uqlN/kBFoqVnGfxnWKkgMtPOn1qtPib3dh8pO5wtLseHVejd47dBnHVGEotlydNQ
  2EbF2IgjPxoDFiF5fgxU9cfAkxwhtVDkZ8RxvISphuTduPN623uKskvragjyap99
  x8qeJQspQ1y6iNUqxxToFv/vn0noj6PHJa//gLOa8TWHbCX0hKBVoweKlc1SWZLx
  SpOYnor1llfpoJrEpPyYC8ePpg6ELNNXTCPPzMzcqr5SqJZiRN6NxyWM5TSLEsJd
  k9gW+jnyR8VhqI1YlHO8jUFlhd55cVol86lEkgv9mB3AqkRI5sOpcn8/fpMWayHg
  KqNMNvZxAgMBAAECggEBAOOjCS90bEOXSsRY91cJv9D8AkLdfSsq5QuUPS2jFb5E
  mu1RzW1rTL1HUy1k5p8ldd+PtLE0Ys+St7wbK1ItFD0m0a/b4vAtuAkIS89U85U3
  9fMAkDkcWzFJYmZnKfwuF0gwOHcX90k9ZNDjQLm2zr/5r0nuHTHouQp/Q3pz/kFu
  HIUzMdLq0PHbNJdi48t3fLGM2uaUGFBL/td7eUGTLJx+OeRs0RistkP2X+h6Ub/4
  8pg+sOsvAPu7pHyoyxX9cFaDZfQHJ+sW8Pei98pQPW7oIWO2QajFDPzsjnKQXW2Y
  1yDuu7HWkaEYukERxukSFTdzHS5vVz+cAwOKLm7oeaECgYEA+xo2QWWZtY7jUVq4
  eBIyrGr2pLwr0CPFvB/8PLe3itmqd8j0yj+S+wSM+Z6rzHauo3OZcvxCPVhY9u+J
  ueXyVkodNGjeRntyVpv6BkNXGxTLfpMJMt2mr6g23Yfdzag5WXJRs6nwf16het02
  hn3TU1GUbyyhlIgliSgi7tqDy50CgYEA6W07qCC7b99z4lNhTxP5/eBXlSNMVH8c
  cWINwMY3KkqJ3whnRcq9ETfq8b7+Oa7Xu4q2ApBbb8S0OIXe5EkOTzN0RW0NpgkH
  0mCMlNpS9sMfyfJqjyeuIl2U/u+BnArUzYBCPaRtwKwnwhGx/bqiKs2npxpRet7h
  XBb0rF6wL+UCgYBxi5nLGqlV+yX5jL9rtDbr1nZvaZOaTALHHeOOhTje9axq/BkN
  N5A8KAOjgMeI7oXr7YMPBtjhKokYKJsrz7o0oNDx+RXB42KBnYiCuoKyAUY/lzeK
  o8YTGkqtBBodPBuqwdIGHytcPStiBpP4Xv9nZrVrTFBIfQQUMG0TewYr1QKBgQCA
  potyplen2OftnTbMdp4ZpkOfFs1C5KuwcfJShOxyipJiMid497wseT0r76/96rdL
  za9yyk0a1LbfUCkAeKNCU4GJogkbsW52LHBOueVvyysCCnFgZOY8Wod72lT8w5t1
  h3L6tl0nC7r94vLOfMZUAPSdzIuLxLtAHgbL2YQRYQKBgAMT8AhB0KCddAYe47eB
  3VJ/cB4qCS41E7322cS6fRc90Q62zGqQfi2j6ZCL4I1mdl6gT0HwBCmVejWjEvvu
  AH30lksJn78njry7J2vRqmNMkiv3KGVv/7Vza6y0YvE75hk8m/cI5MeYlPRVF7Ox
  6Z8l7B0vTJGAWbuzh9GXsqai
  -----END PRIVATE KEY-----

  `.trim(),
  cert: `
  -----BEGIN CERTIFICATE-----
  MIIDOzCCAiMCFEIQPtHvDFm1VIQb0BKFRyvJfNs8MA0GCSqGSIb3DQEBCwUAMFox
  CzAJBgNVBAYTAklEMRUwEwYDVQQIDAxDZW50cmFsLUphdmExETAPBgNVBAcMCFdv
  bm9naXJpMSEwHwYDVQQKDBhJbnRlcm5ldCBXaWRnaXRzIFB0eSBMdGQwHhcNMjMw
  ODE2MTk0NzMyWhcNMjMwOTE1MTk0NzMyWjBaMQswCQYDVQQGEwJJRDEVMBMGA1UE
  CAwMQ2VudHJhbC1KYXZhMREwDwYDVQQHDAhXb25vZ2lyaTEhMB8GA1UECgwYSW50
  ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIB
  CgKCAQEA5PYADpMg9q/N8bqpTf5ARaKlZxn8Z1ipIDLTzp9arT4m93YfKTucLS7H
  h1Xo3eO3QZx1RhKLZcnTUNhGxdiIIz8aAxYheX4MVPXHwJMcIbVQ5GfEcbyEqYbk
  3bjzett7irJL62oI8mqffcfKniULKUNcuojVKscU6Bb/759J6I+jxyWv/4CzmvE1
  h2wl9ISgVaMHipXNUlmS8UqTmJ6K9ZZX6aCaxKT8mAvHj6YOhCzTV0wjz8zM3Kq+
  UqiWYkTejccljOU0ixLCXZPYFvo58kfFYaiNWJRzvI1BZYXeeXFaJfOpRJIL/Zgd
  wKpESObDqXJ/P36TFmsh4CqjTDb2cQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQCu
  n/eKSQgwP9jxuO24fCcm8EkzNzJh7NX4xJbE83sfScry7yVwSm9xkwE6naI97XC0
  2G2Hhyw2nBpS9QfLLEYIjCQIuO5ZHJAnG82wkaaheeAlqwo4pd89G4Fo9GcBjOII
  /V9u/vj9aAGyb3o+qyrI2q9UUq4coZI+UsH34vl7TLbnXdMFOybz7pLj8nISd44q
  57EsT8ZvoyX844DKvWzum5bvLeNrUpMu9dwCdHXgbeoKJzFHrQdD+VUyfLOVZM6a
  Y4kILiayKSj27mlgs8qbtR+Z9CSFhKN8ptcLsGEvQM9L1SOLbaIccsVEtPTnB2cG
  XDlPWMiv06f6N2oNFS3j
  -----END CERTIFICATE-----
  
  `.trim(),
};
app.prepare().then(() => {
  console.log(options);
  createServer(options, async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
