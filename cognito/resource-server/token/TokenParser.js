import * as jsonwebtoken from "jsonwebtoken";
import jwkToPem from "jwk-to-pem";
import fetch from "node-fetch";
import { callbackify } from "util";

const { COGNITO_USER_POOL_ID, REGION } = process.env;

const ISSUER = `https://cognito-idp.${REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`;
const JWKS_REQUEST_URI = `${ISSUER}/.well-known/jwks.json`;

let cachedJWKS;

const getJWKS = async () => {
  if (cachedJWKS) return cachedJWKS;

  const jsonResponse = await fetch(JWKS_REQUEST_URI).then((response) =>
    response.json()
  );

  const tempJWKS = {};
  jsonResponse?.keys?.forEach((jwk) => {
    const pem = jwkToPem(jwk);
    tempJWKS[jwk.kid] = {
      jwk,
      pem,
    };
  });

  cachedJWKS = tempJWKS;

  return cachedJWKS;
};

const tokenVerify = async (alg, token, pem) => {
  return new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, pem, { algoritms: alg }, (err, decodedToken) => {
      if (err) reject(err);
      else resolve(decodedToken);
    });
  });
};

const RS256TokenVerify = async (token, pem) => {
  return await tokenVerify(["RS256"], token, pem);
};

const verifiedClaim = async (token) => {
  let claim = await parseToClaim(token);

  validateClaim(claim);

  return claim;
};

const parseToClaim = async (token) => {
  const encodedHeader = token?.split(".")?.[0];
  const jwks = await getJWKS();
  try {
    const decodedHeader = encodedHeader
      ? Buffer.from(encodedHeader, "base64").toString("utf8")
      : "{}";
    const tokenHeader = JSON.parse(decodedHeader);
    const pem = jwks[tokenHeader?.kid]?.pem;

    if (!pem) throw new Error("pem값을 찾을수 없습니다.");

    return await RS256TokenVerify(token, pem);
  } catch (err) {
    console.log("check id token. header, token ", encodedHeader, token);

    throw err;
  }
};

const validateClaim = (claim) => {
  /*
  const currentSeconds = Math.floor(new Date().valueOf() / 1000);
  
  jsonwebtoken.verify에서 검증된다.
  if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
    throw new Error("claim is expired or invalid");
  }
  */
  if (claim.iss !== ISSUER) {
    throw new Error("claim issuer is invalid");
  }

  //id 토큰 사용. access token이면 access
  if (claim.token_use !== "id") {
    throw new Error("claim use is not id token");
  }
};
export default { verifiedClaim: callbackify(verifiedClaim) };
