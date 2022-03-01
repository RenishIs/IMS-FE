import { UsersRequest } from "../request_models/user-request";
import { BaseResponse } from "./base-response";

export interface UsersResponse extends BaseResponse<UsersRequest[] | UsersRequest> {}