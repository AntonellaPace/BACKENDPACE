import dotenv from "dotenv";

dotenv.config({
    path: "./.env.desarrollo"
});

const configObject = {
    mongo_url: process.env.MONGO_URL,
    token_pass: process.env.TOKEN_PASS,
    cookie: process.env.COOKIE,
    gh_client_id: process.env.GH_CLIENT_ID,
    gh_client_secret: process.env.GH_CLIENT_SECRET,
    gh_callback_url: process.env.GH_CALLBACK_URL
};

export default configObject;

