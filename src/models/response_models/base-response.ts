export interface BaseResponse<T> {
  status: number;
  success: boolean;
  data: T;
  message: string;
}
