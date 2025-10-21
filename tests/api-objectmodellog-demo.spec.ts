import { test, expect } from '@playwright/test';
import { ApisBaseLog } from '../apis/ApisBaseLog.ts';
import { ApisBookingLog } from '../apis/ApisBookingLog.ts';
import * as allure from "allure-js-commons";

let apisBase: ApisBaseLog;
let apisBooking: ApisBookingLog;

// Create Utils to Log APIs request and response

test.describe('Restful-Booker APIs Object Model', () => {

    test('Booking e2e scenario Logging 1', async () => {
        allure.feature('Restful-Booker APIs Object Model Logging');
        const firstname = 'Mahmoud', lastname = 'ElSharkawy1';
        await apisBooking.createBooking(firstname, lastname);
        await apisBooking.assertBookingExistsInTheList(firstname, lastname);
        const deleteBookingResponse = await apisBooking.deleteBooking(firstname, lastname);
        await apisBooking.assertOnSuccessDeleteBookingResponse(deleteBookingResponse);
        await apisBooking.assertBookingDoesNotExistInTheList(firstname, lastname);
    });

    test('Booking e2e scenario Logging 2', async () => {
        allure.feature('Restful-Booker APIs Object Model');
        const firstname = 'Mahmoud', lastname = 'ElSharkawy2';
        await apisBooking.createBooking(firstname, lastname);
        await apisBooking.assertBookingExistsInTheList(firstname, lastname);
        const deleteBookingResponse = await apisBooking.deleteBooking(firstname, lastname);
        await apisBooking.assertOnSuccessDeleteBookingResponse(deleteBookingResponse);
        await apisBooking.assertBookingDoesNotExistInTheList(firstname, lastname);
    });

    test.beforeAll(async ({ request, playwright }) => {
        apisBase = new ApisBaseLog(request, playwright);
        const authRequest = await apisBase.login('admin', 'password123');
        apisBooking = new ApisBookingLog(authRequest!);
    });

});