import axios from 'axios';
import fs from 'fs';
import { ENV } from '@/stores/config';

function getFetchOptions(fileName, data) {
  const params = {
    fileName: fileName,
    data: data,
  };
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  };
}
const axiosInstance = (baseURL) => {
  const instance = axios.create({
    baseURL: baseURL,
  });
  const getLocalData = async (config) => {
    const url = config.url.split('.').shift().split('/').join('-');
    const fileName = `${config.method}:${url}`;

    const response = await fetch('http://localhost:3000/get-cache/' + fileName, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .catch((error) => {
        Promise.reject(error);
      });
    // Is cache is capture un cath from response
    return Promise.reject({
      isCache: true,
      data: response,
    });
  };
  instance.interceptors.request.use(
    async (config) => {
      if (ENV.LOCAL_ENV) {
        return getLocalData(config);
      } else {
        return config;
      }
    },
    (error) => {
      if (ENV.LOCAL_ENV) {
        return getLocalData();
      }
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    async (response) => {
      if (ENV.RECORD_CACHE && !ENV.LOCAL_ENV && response.status == 200) {
        const url = response.config.url.split('.').shift().split('/').join('-');
        const cacheKey = `${response.config.method}:${url}`;
        const options = getFetchOptions(cacheKey, response.data);
        const responseMockup = await fetch('http://localhost:3000/save-cache', options)
          .then((response) => response.json())
          .catch((error) => {
            throw error;
          });
        if (responseMockup.isSaved) {
          console.log(`Axio Instance - File was saved as ${cacheKey}`);
        }else{
          console.log(`Error on Axio Instance - The file could not be saved (${cacheKey})`);
        }
      }
      return response;
    },
    (error) => {
      if (error.isCache) {
        return Promise.resolve(error);

      }else{
        return Promise.reject(error);
      }
    },
  );
  return instance;
};

export default axiosInstance;
