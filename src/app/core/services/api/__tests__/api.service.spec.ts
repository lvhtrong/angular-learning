import { ApiService } from '../api.service';

const getHttpInstance = () => {
  return {
    get: jest.fn().mockReturnValue('get-return'),
    post: jest.fn().mockReturnValue('post-return'),
  };
};

const setup = ({ http }) => {
  return new ApiService(http);
};

describe('get', () => {
  it('should call http get function', () => {
    const http = getHttpInstance();
    const apiService = setup({ http });
    const url = 'url';
    const options = {};

    const result = apiService.get(url, options);

    expect(result).toEqual('get-return');

    expect(http.get).toHaveBeenCalledTimes(1);
    expect(http.get).toHaveBeenCalledWith(url, options);
  });
});

describe('post', () => {
  it('should call http post function', () => {
    const http = getHttpInstance();
    const apiService = setup({ http });
    const url = 'url';
    const body = 'body';
    const options = {};

    const result = apiService.post(url, body, options);

    expect(result).toEqual('post-return');

    expect(http.post).toHaveBeenCalledTimes(1);
    expect(http.post).toHaveBeenCalledWith(url, body, options);
  });
});
