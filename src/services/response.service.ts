import { responseModel } from "../model"

export const ResponseService = {
  ok: <type>(data: type): responseModel => new responseModel(200, data, ''),
  fail: (status: number, message: string): responseModel => new responseModel(status, {}, message),
  error: (message: string): responseModel => ResponseService.fail(400, message),
  notFound: <type>(name: keyof type) => ResponseService.fail(404, `Cannot find ${name}`),
  unauthorized: (): responseModel => ResponseService.fail(401, 'You have no permission to use this api')
}