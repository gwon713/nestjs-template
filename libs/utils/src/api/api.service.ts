import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
@Injectable()
export class ApiService {
  axios: AxiosInstance;

  constructor(private readonly configService: ConfigService) {
    this.axios = axios.create({
      baseURL: this.configService.get<string>('BASE_URL'),
      headers: {
        Accept: 'application/json',
      },
    });
  }

  getAxios() {
    return this.axios;
  }
}
