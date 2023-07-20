import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  // Helper method to handle response data
  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  // Helper method to handle errors
  private handleError(error: any): Promise<never> {
    return Promise.reject(error);
  }

  // HTTP GET request
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .get<T>(url, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // HTTP POST request
  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .post<T>(url, data, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // HTTP PUT request
  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .put<T>(url, data, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // HTTP DELETE request
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axiosInstance
      .delete<T>(url, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}

export default AxiosService;
