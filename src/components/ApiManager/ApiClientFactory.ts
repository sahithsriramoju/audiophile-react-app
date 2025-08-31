import { AxiosHeaders } from "axios";
import { ApiClient } from "./ApiClient";

export class ApiClientFactory {
    private readonly baseUrl?: string = "";
    private readonly headers?: AxiosHeaders = new AxiosHeaders({
        'Content-type':'application/json'
    });
    private readonly withCredentials? : boolean = false;
    /**
     *
     */
    constructor(baseUrl?:string, headers?:AxiosHeaders, withCredentials?:boolean) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.withCredentials = withCredentials;
    }
    public createClient() : ApiClient{
        return new ApiClient(this.baseUrl, 
            this.headers, 
            "",
            this.withCredentials);
    }
    public createAuthorizedClient(authToken:string) : ApiClient {
        return new ApiClient(this.baseUrl,
            this.headers,
            authToken,
            this.withCredentials
        );
    }
}