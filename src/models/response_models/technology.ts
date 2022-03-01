import { TechnologyRequest } from "../request_models/technology";
import { BaseResponse } from "./base-response";

export interface TechnologyResponse extends BaseResponse<TechnologyRequest[] | TechnologyRequest> {}