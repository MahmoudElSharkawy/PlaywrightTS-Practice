import { test, expect } from '@playwright/test';
import { ApiActions } from '../utils/ApiActions.ts';

test('API logger should capture request and response details 1', async ({ request }) => {
  const api = new ApiActions(request);

  const response = await api.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'foo1',
      body: 'bar1',
      userId: 1,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  expect(response.ok()).toBeTruthy();

  // Save logs if needed
  // api.saveToFile('logs/api-request-log.json');
});

test('API logger should capture request and response details 2', async ({ request }) => {
  const api = new ApiActions(request);

  const response = await api.post('https://jsonplaceholder.typicode.com/posts', {
    data: {
      title: 'foo2',
      body: 'bar2',
      userId: 2,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  expect(response.ok()).toBeTruthy();

  // Save logs if needed
  // api.saveToFile('logs/api-request-log.json');
});
