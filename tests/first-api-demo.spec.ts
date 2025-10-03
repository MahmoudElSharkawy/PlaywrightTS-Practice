import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';
const auth_serviceName = '/auth';
const booking_serviceName = '/booking';



test.describe('restful-booker APIs', () => {

  test('Auth', async ({ request }) => {
    const requestBody = {
      "username": "admin",
      "password": "password123"
    };
    const response = await request.post(baseURL + auth_serviceName, { data: requestBody });
    // console.log(await response.json());
    console.log((await response.json()).token);
  });


  test('Get Booking ids', async ({ request }) => {
    const response = await request.get(baseURL + booking_serviceName);
    console.log(await response.json());
  });

  test('Create Booking', async ({ request }) => {
    const requestBody = {
      "firstname": "Mahmoud",
      "lastname": "ElSharkawy",
      "totalprice": 111,
      "depositpaid": true,
      "bookingdates": {
        "checkin": "2024-01-01",
        "checkout": "2025-01-01"
      },
      "additionalneeds": "Ice Cream"
    };
    const response = await request.post(baseURL + booking_serviceName, { data: requestBody });
    console.log(await response.json());
    console.log((await response.json()).bookingid);
  });

  test('Delete Booking', async ({ request }) => {
    const response = await request.delete(baseURL + booking_serviceName + '/1570', { headers: {'Cookie': 'token=' + '5eb662b3f5546f2'} });
    console.log((await response.text()).toString());
    console.log(response.status());
  });

});