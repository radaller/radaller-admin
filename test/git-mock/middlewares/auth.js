const VALID_CREDENTIALS = "Basic dmFsaWRfdXNlcm5hbWU6dmFsaWRfcGFzc3dvcmQ=";
const REGENERATE_CREDENTIALS = "Basic cmVnZW5lcmF0ZV90b2tlbl91c2VybmFtZTpyZWdlbmVyYXRlX3Rva2VuX3Bhc3N3b3Jk";
const _2FA_CREDENTIALS = "Basic MmZhX3VzZXJuYW1lOjJmYV9wYXNzd29yZA==";
const _2FA_CODE = "2fa_code";
let isTokenExist = true;
module.exports = (req, res, next) => {
    if (req.method === "POST" && req.path === "/authorizations") {
        //
        if (req.get("Authorization") === VALID_CREDENTIALS) {
            validToken(res);
        } else if (req.get("Authorization") === REGENERATE_CREDENTIALS && isTokenExist) {
            tokenAlreadyExists(res);
        } else if (req.get("Authorization") === REGENERATE_CREDENTIALS && !isTokenExist) {
            isTokenExist = true;
            validToken(res);
        } else if (req.get("Authorization") === _2FA_CREDENTIALS && !req.get("X-GitHub-OTP")) {
            _2faRequired(res)
        } else if (req.get("Authorization") === _2FA_CREDENTIALS && req.get("X-GitHub-OTP") === _2FA_CODE) {
            validToken(res);
        } else {
            badCredentials(res);
        }
    } else if (req.method === "GET" && req.path === "/authorizations") {
        next();
    } else if (req.method === "DELETE" && req.path === "/authorizations/2") {
        isTokenExist = false;
        deleteToken(res);
    } else if (req.get("Authorization") === "token valid_token") {
        next();
    } else {
        badCredentials(res);
    }
};

function _2faRequired(res) {
    res.status(401);
    res.set('X-GitHub-OTP', 'required; sms');
    res.set('Access-Control-Expose-Headers', 'X-GitHub-OTP');
    res.end(JSON.stringify({
            "message": "Must specify two-factor authentication OTP code.",
            "documentation_url": "https://developer.github.com/v3"
        }
    ));
}

function badCredentials(res) {
    res.status(401);
    res.end(JSON.stringify({
            "message": "Bad credentials",
            "documentation_url": "https://developer.github.com/v3"
        }
    ));
}
function tokenAlreadyExists(res) {
    res.status(422);
    res.end(JSON.stringify({
        "message": "Validation Failed",
        "errors": [
            {
                "resource": "OauthAccess",
                "code": "already_exists",
                "field": "description"
            }
        ],
        "documentation_url": "https://developer.github.com/v3/oauth_authorizations/#create-a-new-authorization"
    }));
}
function validToken(res) {
    res.status(201);
    res.end(JSON.stringify({
        "token": "valid_token"
    }));
}
function deleteToken(res) {
    res.status(204);
    res.end();
}