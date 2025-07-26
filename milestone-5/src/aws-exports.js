const aws = {
  aws_region: "ap-south-1",
  aws_cognito_region: "ap-south-1",
  aws_user_pools_id: import.meta.env.VITE_APP_POOL_ID,
  aws_user_pools_web_client_id: import.meta.env.VITE_APP_CLIENT_ID,
  oauth: {
    domain: "mile.auth.ap-south-1.amazoncognito.com",
    scope: ["email", "openid", "profile"],
    redirectSignIn: "http://localhost:5173/",
    redirectSignOut: "http://localhost:5173/",
    responseType: "code",
  },
};
export default aws;
