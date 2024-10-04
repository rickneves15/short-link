export enum ErrorCodeEnum {
  AuthFail = 20001,
  UserNotFound = 30000,
  UserExist = 30001,
}

export const ErrorCode = Object.freeze<Record<ErrorCodeEnum, [string, number]>>(
  {
    [ErrorCodeEnum.AuthFail]: [
      'auth failed, please check your email and password',
      400,
    ],
    [ErrorCodeEnum.UserNotFound]: ['user not found', 404],
    [ErrorCodeEnum.UserExist]: ['user already exist', 400],
  },
)
