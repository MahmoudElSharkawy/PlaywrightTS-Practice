import { APIResponse, expect, type APIRequestContext } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { ApiActions } from '../utils/ApiActions';

export class ApisBookingLog {
  readonly request: APIRequestContext;
  readonly apiActions: ApiActions;
  readonly booking_serviceName = '/booking';

  constructor(request: APIRequestContext) {
    this.request = request;
    this.apiActions = new ApiActions(request);
  }

  async createBooking(firstname: string, lastname: string): Promise<APIResponse> {
    return await allure.step(
      `Create Booking with First Name: ${firstname} and Last Name: ${lastname}`,
      async () => {
        const requestBody = {
          firstname: firstname,
          lastname: lastname,
          totalprice: 111,
          depositpaid: true,
          bookingdates: {
            checkin: '2024-01-01',
            checkout: '2025-01-01',
          },
          additionalneeds: 'Ice Cream',
        };

        const response = await this.apiActions.post(this.booking_serviceName, { data: requestBody });
        console.log('Booking Id:', (await response.json()).bookingid);
        return response;
      }
    );
  }

  async deleteBooking(firstname: string, lastname: string): Promise<APIResponse> {
    return await allure.step(
      `Delete Booking with First Name: ${firstname} and Last Name: ${lastname}`,
      async () => {
        const bookingId = await this.getBookingId(firstname, lastname);
        console.log('Booking id in Delete:', bookingId);
        const response = await this.apiActions.delete(`${this.booking_serviceName}/${bookingId}`);
        return response;
      }
    );
  }

  async getBookingIds(firstname: string, lastname: string): Promise<APIResponse> {
    return await allure.step(
      `Get Booking Ids with First Name: ${firstname} and Last Name: ${lastname}`,
      async () => {
        const queryParams = { firstname, lastname };
        const response = await this.apiActions.get(this.booking_serviceName, { params: queryParams });
        return response;
      }
    );
  }

  async getBookingId(firstname: string, lastname: string): Promise<string> {
    const queryParams = { firstname, lastname };
    const response = await this.apiActions.get(this.booking_serviceName, { params: queryParams });
    return (await response.json())[0].bookingid;
  }

  async getBooking(firstname: string, lastname: string): Promise<APIResponse> {
    return await allure.step(
      `Get Booking with First Name: ${firstname} and Last Name: ${lastname}`,
      async () => {
        const bookingId = await this.getBookingId(firstname, lastname);
        const response = await this.apiActions.get(`${this.booking_serviceName}/${bookingId}`);
        return response;
      }
    );
  }

  // Assertions
  async assertBookingExistsInTheList(firstname: string, lastname: string) {
    await allure.step(
      `Assert Booking Exists in The List with First Name: ${firstname} and Last Name: ${lastname}`,
      async () => {
        const booking = await this.getBooking(firstname, lastname);
        const json = await booking.json();
        expect(json.firstname).toBe(firstname);
        expect(json.lastname).toBe(lastname);
      }
    );
  }

  async assertOnSuccessDeleteBookingResponse(deleteBookinResponse: APIResponse) {
    await allure.step('Assert on Success Delete Booking Response', async () => {
      const responseBody = (await deleteBookinResponse.text()).toString();
      const responseStatusCode = deleteBookinResponse.status();
      expect(responseBody).toBe('Created');
      expect(responseStatusCode).toBe(201);
    });
  }

  async assertBookingDoesNotExistInTheList(firstname: string, lastname: string) {
    await allure.step(
      `Assert Booking Does Not Exist in The List with First Name: ${firstname} and Last Name: ${lastname}`,
      async () => {
        const booking = await this.getBookingIds(firstname, lastname);
        expect(await booking.text()).toBe('[]');
      }
    );
  }
}
