import { test, expect } from '@playwright/test';
import { ApisBase } from '../apis/ApisBase.ts';
import { ApisBooking } from '../apis/ApisBooking.ts';

let apisBase: ApisBase;
let apisBooking: ApisBooking;

// Create Utils to Log APIs request and response

test.describe('Restful-Booker APIs Object Model', () => {

    test('Booking e2e scenario', async () => {
        const firstname = 'Mahmoud', lastname = 'ElSharkawy';
        await apisBooking.createBooking(firstname, lastname);
        await apisBooking.assertBookingExistsInTheList(firstname, lastname);
        const deleteBookingResponse = await apisBooking.deleteBooking(firstname, lastname);
        await apisBooking.assertOnSuccessDeleteBookingResponse(deleteBookingResponse);
        await apisBooking.assertBookingDoesNotExistInTheList(firstname, lastname);
    });

    test.beforeAll(async ({ request, playwright }) => {
        apisBase = new ApisBase(request, playwright);
        const authRequest = await apisBase.login('admin', 'password123');
        apisBooking = new ApisBooking(authRequest!);
    });

});