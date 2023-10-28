
  import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
  
  export interface ApiClientOptions {
    baseUrl: string;
    token:string;
  }

  const getToken = () =>{
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const item = localStorage.getItem('key')
      const token = localStorage.getItem('token');
    localStorage.setItem("userId", "12345");
    console.log(token,'-token')
    return token;
    }
  }
  
  export class ApiClient {
    constructor(options: ApiClientOptions) {
      this.baseUrl = options.baseUrl;
  
      this.http = axios.create({
        baseURL: this.baseUrl,
        headers: {
          token:getToken()
        },
      });
  
      this.http.interceptors.request.use((config) => {
        if (!config.headers) {
          config.headers = {} as AxiosRequestHeaders;
        }
  
        // if (this.sessionToken) {
        //   config.headers['Alaris-Session-Token'] = this.sessionToken;
        // } else {
        //   delete config.headers['Alaris-Session-Token'];
        // }
  
        return config;
      });
    }
  
    private baseUrl: string;
    private http: AxiosInstance;
  
 
  
    // async fetchCurrentUser() {
    //   const res = await this.http.get<UserDto>('/auth/user');
    //   return res.data ? new UserModel(res.data) : null;
    // }
  
    async userLogin(data: any) {
      const res = await this.http.post<any>('/user/login', data);
  
      return res.data;
    }
  
    // async fetchAppointments(params: AppointmentSearchDto) {
    //   const res = await this.http.get<AppointmentDto[]>('/appointments', {
    //     params,
    //   });
    //   return res.data.map((x) => new AppointmentModel(x));
    // }
  }
  