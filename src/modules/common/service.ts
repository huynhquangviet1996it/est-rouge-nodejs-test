import { Response } from 'express';

export enum response_status_codes {
  success = 200,
  bad_request = 400,
  unauthorized = 401,
  internal_server_error = 500,
}
export function successResponse(
  message: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  data: any,
  res: Response
): void {
  res.status(response_status_codes.success).json({
    status: 'SUCCESS',
    message,
    data,
  });
}

export function unauthorizedResponse(
  message: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  errors: any,
  res: Response
): void {
  res.status(response_status_codes.unauthorized).json({
    status: 'FAILURE',
    message,
    errors,
  });
}
