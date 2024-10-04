import { HttpException } from '@nestjs/common'

import {
  ErrorCode,
  ErrorCodeEnum,
} from '@/common/constants/error-code.constant'

export class BizException extends HttpException {
  constructor(code: ErrorCodeEnum) {
    const [message, status] = ErrorCode[code]
    super(HttpException.createBody({ code, message }), status)
  }
}
