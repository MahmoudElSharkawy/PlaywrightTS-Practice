import { type APIRequestContext } from '@playwright/test';

export class ApisBooking {
    readonly request: APIRequestContext;


    readonly booking_serviceName = '/booking';

    constructor(request: APIRequestContext) {
        this.request = request;

    }

    async getBookingIds() {
        const response = await this.request.get(this.booking_serviceName)
        console.log(await response.json());
    };

    // Create booking and get the json body from external file 
    // Create getBookingId method to get booking id by name to make use of it anywhere

    async deleteBooking(id: string) {
        const response = await this.request.delete(this.booking_serviceName + id);
        console.log((await response.text()).toString());
        console.log(response.status());
    };

}
