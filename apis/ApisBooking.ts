import { APIResponse, expect, type APIRequestContext } from '@playwright/test';
import { step, StepContext } from 'allure-js-commons';

export class ApisBooking {
    readonly request: APIRequestContext;

    readonly booking_serviceName = '/booking';

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async createBooking(firstname: string, lastname: string): Promise<APIResponse> {
        let response: APIResponse;
        await step("Create Booking", async (context: StepContext) => {
            await context.parameter("Username", firstname);
            await context.parameter("Password", lastname);
            const requestBody = {
                "firstname": firstname,
                "lastname": lastname,
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2024-01-01",
                    "checkout": "2025-01-01"
                },
                "additionalneeds": "Ice Cream"
            };
            response = await this.request.post(this.booking_serviceName, { data: requestBody });
            console.log('Booking Id:', (await response.json()).bookingid);
        });
        return response!;
    };

    async deleteBooking(firstname: string, lastname: string): Promise<APIResponse> {
        let response: APIResponse;
        await step("Delete Booking", async (context: StepContext) => {
            await context.parameter("Username", firstname);
            await context.parameter("Password", lastname);
            const bookingId = await this.getBookingId(firstname, lastname);
            console.log('Booking id in Delete: ' + bookingId)
            response = await this.request.delete(this.booking_serviceName + '/' + bookingId);
            // console.log((await response.text()).toString());
            // console.log(response.status());
        });
        return response!;
    };

    async getBookingIds(firstname: string, lastname: string): Promise<APIResponse> {
        let response: APIResponse;
        await step("Get Booking Ids", async (context: StepContext) => {
            await context.parameter("Username", firstname);
            await context.parameter("Password", lastname);
            const queryParams = {
                firstname: firstname,
                lastname: lastname
            };
            response = await this.request.get(this.booking_serviceName, { params: queryParams });
        });
        return response!;
    };

    async getBookingId(firstname: string, lastname: string): Promise<string> {
        const queryParams = {
            firstname: firstname,
            lastname: lastname
        };
        const response = await this.request.get(this.booking_serviceName, { params: queryParams });
        // console.log((await response.json())[0].bookingid);
        return (await response.json())[0].bookingid;
    };

    async getBooking(firstname: string, lastname: string): Promise<APIResponse> {
        let response: APIResponse;
        await step("Get Booking", async (context: StepContext) => {
            await context.parameter("Username", firstname);
            await context.parameter("Password", lastname);
            const bookingId = await this.getBookingId(firstname, lastname);
            response = await this.request.get(this.booking_serviceName + '/' + bookingId);
        });
        return response!;
    }


    // Assertions

    async assertBookingExistsInTheList(firstname: string, lastname: string) {
        await step("Assert Booking Exists in The List", async (context: StepContext) => {
            await context.parameter("Username", firstname);
            await context.parameter("Password", lastname);
            const booking = await this.getBooking(firstname, lastname);
            const fn = (await booking.json()).firstname;
            const ln = (await booking.json()).lastname;
            expect(fn).toBe(firstname);
            expect(ln).toBe(lastname);
        });
    }

    async assertOnSuccessDeleteBookingResponse(deleteBookinResponse: APIResponse) {
        await step("Assert on Success Delete Booking Response", async () => {
            const responseBody = (await deleteBookinResponse.text()).toString();
            const responseStatusCode = deleteBookinResponse.status();
            expect(responseBody).toBe('Created');
            expect(responseStatusCode).toBe(201);
        });
    }

    async assertBookingDoesNotExistInTheList(firstname: string, lastname: string) {
        await step("Assert Booking Does Not Exist in The List", async (context: StepContext) => {
            await context.parameter("Username", firstname);
            await context.parameter("Password", lastname);
            const booking = await this.getBookingIds(firstname, lastname);
            expect(await booking.text()).toBe('[]');
        });
    }

}