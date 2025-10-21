import { type APIRequestContext, type PlaywrightWorkerArgs } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ApiActions } from '../utils/ApiActions';

type PlaywrightModule = PlaywrightWorkerArgs['playwright'];

export class ApisBaseLog {
    apiContext: APIRequestContext;
    playwrightAPI: PlaywrightModule;
    apiActions: ApiActions;

    readonly baseURL = 'https://restful-booker.herokuapp.com';
    readonly auth_serviceName = '/auth';

    constructor(apiContext: APIRequestContext, playwright: PlaywrightModule) {
        this.apiContext = apiContext;
        this.playwrightAPI = playwright;
        this.apiActions = new ApiActions(this.apiContext);
    }

    async login(username: string, password: string): Promise<APIRequestContext | null> {
        return await allure.step('Login with User Name: ' + username + ' and Password: ' + password,
            async () => {
                const url = this.baseURL + this.auth_serviceName;
                const requestBody = {
                    username: username,
                    password: password,
                };
                const headers = {
                    'Content-Type': 'application/json',
                };

                const response = await this.apiActions.post(url, {
                    data: requestBody,
                    headers: headers,
                });

                if (response.ok()) {
                    const json = await response.json();
                    console.log('Token: ', json.token);

                    // 🟢 Wrap context creation in its own Allure step
                    return await allure.step('Create Authenticated API Context', async () => {
                        const newContext = await this.playwrightAPI.request.newContext({
                            baseURL: this.baseURL,
                            extraHTTPHeaders: {
                                Cookie: 'token=' + json.token,
                            },
                        });

                        // 🟢 Attach context details to Allure report
                        await allure.attachment(
                            'Authenticated Context Details',
                            JSON.stringify(
                                {
                                    baseURL: this.baseURL,
                                    token: json.token,
                                    extraHTTPHeaders: {
                                        Cookie: 'token=' + json.token,
                                    },
                                },
                                null,
                                2
                            ),
                            'application/json'
                        );
                        return newContext;
                    });
                } else {
                    console.error(
                        `Login failed with status ${response.status()} for user ${username}. Response text: ${await response.text()}`
                    );
                    return null;
                }
            }
        );
    }
}
