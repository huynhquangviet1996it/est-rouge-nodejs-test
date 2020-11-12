import { Response } from 'express';
import { Err } from 'joi';

export enum responseStatusCodes {
  success = 200,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  internalServerError = 500,
}
export function successResponse(
  message: string,
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
  data: any,
  res: Response
): void {
  res.status(responseStatusCodes.success).json({
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
  res.status(responseStatusCodes.unauthorized).json({
    status: 'FAILURE',
    message,
    errors,
  });
}

export function notFoundResponse(
  message: string,
  errors: Error | Error[],
  res: Response
): void {
  res.status(responseStatusCodes.notFound).json({
    status: 'FAILURE',
    message,
    errors,
  });
}

export function insufficientParameters(
  message: string,
  errors: Error | Error[] | Err,
  res: Response
): void {
  res.status(responseStatusCodes.badRequest).json({
    status: 'FAILURE',
    message: message.length ?? 'Insufficient parameters',
    errors,
  });
}

export function internalServerErrorResponse(
  message: string,
  errors: Error | null,
  res: Response
): void {
  res.status(responseStatusCodes.internalServerError).json({
    status: 'FAILURE',
    message,
    errors,
  });
}
