import { SLResponse } from "./SLResponse";

export interface RegisterResponse extends SLResponse {
    data: {
        client_id: string,
        email: string,
        sl_token: string
    }
}