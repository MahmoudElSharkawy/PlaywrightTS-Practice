import { test, expect } from '@playwright/test';

test.describe('Complex Json Path', () => {

  test('test complex jsonpath 1', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts');
    const responseBody = await response.json()
    console.log(responseBody);

    const filterJson = responseBody.find(item => item.title === 'qui est esse').id;
    console.log(filterJson);
    expect(filterJson).toBe(2);
  });

    test('test complex jsonpath 2', async ({ request }) => {
    const response = await request.get('https://automationexercise.com/api/productsList');
    const responseBody = await response.json()
    console.log(responseBody);

    const filterJson = responseBody.products.find(item => item.name === 'Soft Stretch Jeans').id;
    console.log(filterJson);
    expect(filterJson).toBe(33);
  });

});