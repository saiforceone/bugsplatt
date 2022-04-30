import axios, {AxiosRequestHeaders} from "axios";

export interface APIResponse {
  success: boolean;
  data: object[] | object;
  error?: string;
}

class APIUtils {

  static buildDefaultResponse(): APIResponse {
    return {
      success: false,
      data: {},
    }
  }


  static async performGetRequest(url: string, headers: AxiosRequestHeaders): Promise<APIResponse> {

    const response = this.buildDefaultResponse();
    
    try {

      // 1. perform get request using axios
      const {data, status} = await axios.get(url, {headers});
      
      // 2. handle the response
      if (status !== 200 || !data) {
        response.error = 'Unexpected error occurred while attempting to retrieve data';
        return response;
      }

      response.data = data;
      response.success = true;

      return response;
    } catch (e) {
      response.error = (e as Error).message;
      return response;
    }
  }
}

export default APIUtils;
