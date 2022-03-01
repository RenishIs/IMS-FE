import { UsersRoleRequest } from "../request_models/user-roles";
import { BaseResponse } from "./base-response";

export interface UsersRoleResponse extends BaseResponse<UsersRoleRequest[] | UsersRoleRequest> {}