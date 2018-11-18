import React from 'react';
import { render, wait, cleanup } from 'react-testing-library';
import { useRequest } from '../useRequest';
import { fakeFetch } from './utils';

function FakeRequest({ request, arg }) {
  const { data, isLoading, ...rest } = useRequest(request, [arg]);

  console.log(data, isLoading, rest);
  return (
    <div>
      <div data-testid='request-result'>{isLoading ? 'loading' : data}</div>
      <button type='button' onClick={() => {}}>
        update
      </button>
    </div>
  );
}

test('make a request', async () => {
  const request = jest.fn(() => fakeFetch('data'));

  const { getByTestId } = render(<FakeRequest request={request} arg={{}}/>);

  await wait(() => {
    expect(request).toHaveBeenCalled();
    expect(request).toHaveBeenCalledTimes(1);
    expect(getByTestId('request-result').textContent).toBe('loading');
    expect(getByTestId('request-result').textContent).toBe('data');
  });
});

afterEach(cleanup);
