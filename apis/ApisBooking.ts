import { APIResponse, expect, type APIRequestContext } from '@playwright/test';

export class ApisBooking {
    readonly request: APIRequestContext;

    readonly booking_serviceName = '/booking';

    constructor(request: APIRequestContext) {
        this.request = request;

    }

    async createBooking(firstname: string, lastname: string): Promise<APIResponse> {
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
        const response = await this.request.post(this.booking_serviceName, { data: requestBody });
        console.log('Booking Id:',(await response.json()).bookingid);
        return response;
    };

    async deleteBooking(firstname: string, lastname: string): Promise<APIResponse> {
        const bookingId = await this.getBookingId(firstname, lastname);
        console.log('Booking id in Delete: ' + bookingId)
        const response = await this.request.delete(this.booking_serviceName + '/' + bookingId);
        // console.log((await response.text()).toString());
        // console.log(response.status());
        return response;
    };

    async getBookingIds(firstname: string, lastname: string): Promise<APIResponse> {
        const queryParams = {
            firstname: firstname,
            lastname: lastname
        };
        const response = await this.request.get(this.booking_serviceName, { params: queryParams });
        return response;
    };

    async getBookingId(firstname: string, lastname: string): Promise<string> {
        const queryParams = {
            firstname: firstname,
            lastname: lastname
        };
        const response = await this.request.get(this.booking_serviceName, { params: queryParams });
        // console.log(await response.json());
        // console.log((await response.json())[0].bookingid);
        return (await response.json())[0].bookingid;
    };

    async getBooking(firstname: string, lastname: string): Promise<APIResponse> {
        const bookingId = await this.getBookingId(firstname, lastname);
        const response = this.request.get(this.booking_serviceName + '/' + bookingId)
        return response;
    }


    // Assertions
    
    async assertBookingExistsInTheList(firstname: string, lastname: string) {
        const booking = await this.getBooking(firstname, lastname);
        const fn = (await booking.json()).firstname;
        const ln = (await booking.json()).lastname;
        expect(fn).toBe(firstname);
        expect(ln).toBe(lastname);
    }

    async assertOnSuccessDeleteBookingResponse(deleteBookinResponse: APIResponse) {
        const responseBody = (await deleteBookinResponse.text()).toString();
        const responseStatusCode = deleteBookinResponse.status();
        expect(responseBody).toBe('Created');
        expect(responseStatusCode).toBe(201);
    }

    async assertBookingDoesNotExistInTheList(firstname: string, lastname: string) {
        const booking = await this.getBookingIds(firstname, lastname);
        expect(await booking.text()).toBe('[]');
    }


}
