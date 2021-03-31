import { getPeople } from './PeopleService';

import { people } from '../mocks/people';

describe('Services - PeopleService', () => {
  function mockFetch(url: any, options?: any): any {
    const urlObj = new URL(url);
    const pathNameSplit = urlObj.pathname.split('/');

    return Promise.resolve({
      json: () => {
        console.log(pathNameSplit);
        if (pathNameSplit.length > 3) {
          return Promise.resolve(people[0]);
        }

        return Promise.resolve(people);
      },
    });
  }

  beforeAll(() => {
    global.fetch = jest.fn(mockFetch);
  });

  beforeEach(() => {
    // @ts-ignore
    global.fetch.mockClear();
  });

  afterAll(() => {
    // @ts-ignore
    global.fetch.mockRestore();
  });

  it('it should return the correct response without specifying id', async () => {
    const result = await getPeople();

    expect(global.fetch).toHaveBeenCalled();
    // @ts-ignore
    expect(global.fetch.mock.calls[0][0]).toBe(
      'http://localhost:3000/api/people'
    );
    expect(result.length).toBe(10);
  });

  it('it should return the correct response with specifying id', async () => {
    const result = await getPeople(1);

    expect(global.fetch).toHaveBeenCalled();
    // @ts-ignore
    expect(global.fetch.mock.calls[0][0]).toBe(
      'http://localhost:3000/api/people/1'
    );
    expect(result).toEqual(people[0]);
  });
});
