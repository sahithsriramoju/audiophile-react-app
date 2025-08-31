import { type AxiosInstance, 
    type AxiosRequestConfig,
    type AxiosHeaders,
    type AxiosError, 
    isAxiosError} from "axios";
import type { ApiClientInterface } from "./ApiClientInterface";
import axios from "axios";

export class ApiClient implements ApiClientInterface{
    private readonly baseUrl?: string;
    private readonly headers? : AxiosHeaders;
    private readonly authToken?: string = "";
    private readonly withCredentials?: boolean = false;
    /**
     *
     */
    constructor(baseUrl?:string, 
        headers?: AxiosHeaders, authToken?: string , withCredentials?: boolean ) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this.authToken = authToken;
        this.withCredentials = withCredentials;
    }
    private createClient(params:object={}) : AxiosInstance {
        const config : AxiosRequestConfig = {
            baseURL: this.baseUrl,
            headers: this.headers,
            params : params,
            withCredentials : this.withCredentials
        }
        if(this.authToken != ""){
            config.headers = {
                ...this.headers,
                Authorization: `Bearer ${this.authToken}`
            }
        }
        return axios.create(config);
    }
   
    private handleError(error:AxiosError){
        if(axios.isCancel(error)){
            console.error(`Request is canceled ${error.message}`)
        }
        else{
            console.error(`Error message: ${error}`)
        }
    }
    public async get<T>(endpoint: string, params?: any, signal?: AbortSignal): Promise<T> {
        try {
            const client = this.createClient(params);
            const response = await client.get(endpoint, { signal: signal });
            return response.data;
        }
        catch(error: any){
           const axiosError = isAxiosError(error); 
           console.error(axiosError);  
           this.handleError(error)
        }
        throw new Error('Request failed');
    }
    public async post<T>(endpoint: string, data?: any, signal?: AbortSignal): Promise<T> {
        try{
            const client = this.createClient();
            const response = await client.post(endpoint,data,{signal:signal});
            return response.data;
        }catch(error: any){
           const axiosError = isAxiosError(error); 
           console.error(axiosError);  
           this.handleError(error)
        }
        throw new Error('Request failed');
    }
    
}