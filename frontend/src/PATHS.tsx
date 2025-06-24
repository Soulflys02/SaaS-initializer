export namespace PATHS {
  export const AUTH = "/auth";
  export const HOME = "/";
  export const CONFIRM_EMAIL = "/confirm-email/:key";
  export const RESET_PASSWORD = "/reset-password/:key";
}

export namespace API_PATHS {
  export const LOGIN = "users/browser/v1/auth/login";
  export const REGISTER = "users/browser/v1/auth/signup";
  export const LOGOUT = "users/browser/v1/auth/session";
  export const CONFIRM_EMAIL = "users/browser/v1/auth/email/verify";
  export const REQUEST_PASSWORD_RESET =
    "users/browser/v1/auth/password/request";
  export const RESET_PASSWORD = "users/browser/v1/auth/password/reset";
  export const USER = "users/user/";
  export const CSRF = "users/csrf/";
  export const PUBLIC = "api/public/";
  export const PROTECTED = "api/protected/";
  export const SCOPED = "api/scoped/";
}
