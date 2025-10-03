import { type APIRequestContext, type PlaywrightWorkerArgs } from '@playwright/test';
type PlaywrightModule = PlaywrightWorkerArgs['playwright'];

export class ApisBase {
    apiContext: APIRequestContext;
    playwright: PlaywrightWorkerArgs;
    playwrightAPI: PlaywrightModule;

    readonly baseURL = 'https://restful-booker.herokuapp.com';   // should handle the base URL from the config file


    readonly auth_serviceName = '/auth';


    constructor(apiContext: APIRequestContext, playwright: PlaywrightModule) {
        this.apiContext = apiContext;
        this.playwrightAPI = playwright; 

    }

    async login(username: string, password: string) : Promise<APIRequestContext | null> {
        const url = this.baseURL + this.auth_serviceName;
        const requestBody = {
            "username": username,
            "password": password
        };
        const headers = {
            'Content-Type': 'application/json'
        };

        // Use the stored 'this.request' object
        const response = await this.apiContext.post(url, {
            data: requestBody,
            headers: headers
        });

        if (response.ok()) {
            const json = await response.json();
            console.log('token is: ' + json.token)
            this.apiContext = await this.playwrightAPI.request.newContext({
                // Should handle the base URL from the config file
                baseURL: this.baseURL,
                extraHTTPHeaders: {
                    'Cookie': 'token=' + json.token,
                },
            });
            return this.apiContext;
        } else {
            console.error(`Login failed with status ${response.status()} for user ${username}. Response text: ${await response.text()}`);
            return null;
        }

    }

}