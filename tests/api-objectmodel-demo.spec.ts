import { test, expect } from '@playwright/test';
import { ApisBase } from '../apis/ApisBase.ts';
import { ApisBooking } from '../apis/ApisBooking.ts';


let apisBase: ApisBase;
let apisBooking: ApisBooking;

// " Create Utils to Log APIs request and response"

test('test auth', async ({ request, playwright}) => {
    apisBase = new ApisBase(request, playwright);
    const authRequest = await apisBase.login('admin', 'password123');
    apisBooking = new ApisBooking(authRequest!);

    await apisBooking.deleteBooking('/4076');
});