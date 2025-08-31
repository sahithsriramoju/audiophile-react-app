export interface ApiClientInterface{
    get<T>(endpoint:string, params?:any, signal?:AbortSignal):Promise<T>
    post<T>(endpoint:string, data?:any,signal?:AbortSignal):Promise<T>
}