export enum ErrorCodeEnum {
  AuthFail = 20001,
  UserNotFound = 30000,
  UserExist = 30001,
  LinkExist = 30002,
  LinkNotFound = 30003,
  LinkAuthorizationFailed = 30004,
}

export const ErrorCode = Object.freeze<Record<ErrorCodeEnum, [string, number]>>(
  {
    [ErrorCodeEnum.AuthFail]: [
      'auth failed, please check your email and password',
      400,
    ],
    [ErrorCodeEnum.UserNotFound]: ['user not found', 404],
    [ErrorCodeEnum.UserExist]: ['user already exist', 400],
    [ErrorCodeEnum.LinkExist]: ['link has already been shortened', 400],
    [ErrorCodeEnum.LinkNotFound]: ['link not found', 404],
    [ErrorCodeEnum.LinkAuthorizationFailed]: ['link authorization failed', 403],
  },
)
