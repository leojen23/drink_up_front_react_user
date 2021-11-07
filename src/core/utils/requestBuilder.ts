export const requestBuilder = (endpoint: string): string => {
    const protocole: string = "http://";
    const domain: string = "drink-up-apiplatform.test:8080";
    const request: string = protocole + domain + endpoint;
    return request;
}