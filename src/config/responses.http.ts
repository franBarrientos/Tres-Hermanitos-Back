import { Response } from "express";

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  UNAUTORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export class ResponseHttp {
  public oK(res: Response, body: any) {
    res.status(HttpStatus.OK).json({
      ok: true,
      message: "success",
      body,
    });
  }
  public created(res: Response, body: any) {
    res.status(HttpStatus.CREATED).json({
      ok: true,
      message: "created",
      body,
    });
  }
  public notFound(res: Response, error: any, message: any) {
    res.status(HttpStatus.NOT_FOUND).json({
      ok: false,
      error: String(error),
      message: "not found",
    });
    console.error(error);
  }
  public forbidden(res: Response, error: any, message: any) {
    res.status(HttpStatus.FORBIDDEN).json({
      ok: false,
      error: String(error),
      message: "forbidden",
    });
    console.error(error);
  }
  public unauthorized(res: Response, error: any, message: any) {
    res.status(HttpStatus.UNAUTORIZED).json({
      ok: false,
      error: String(error),
      message: "unauthorized",
    });
    console.error(error);
  }
  public error(res: Response, error: any, message: any = "internal server error") {
    res.status(HttpStatus.SERVER_ERROR).json({
      ok: false,
      error: String(error),
      message: "internal server error",
    });
    console.error(error);
  }
}
