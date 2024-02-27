export interface ErrorResponse {
  status: string;
  message: string;
}
export interface Error {
  status?: number;
  name?: string;
  message?: string;
  stack?: string;
}
