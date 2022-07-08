import axios from "axios";
import qs from "qs";

import { APIQuery, APIResponse } from "../interfaces";
import { API_ENDPOINTS } from "../constants/apiConstants";

axios.defaults.baseURL = API_ENDPOINTS.API_BASE;

export default class APIUtils {
  static responseObjFactory(): APIResponse {
    return {
      data: [],
      error: "",
      success: false,
    };
  }

  static buildHeaders(authToken: string) {
    return {
      Authorization: `Bearer ${authToken}`,
    };
  }

  // Create / POST

  static async createResource(
    endpoint: string,
    authToken: string,
    data: { [key: string]: any }
  ): Promise<APIResponse> {
    const result = this.responseObjFactory();
    try {
      const headers = this.buildHeaders(authToken);
      const {
        data: { data: responseData, error, success },
      } = await axios.post(endpoint, data, { headers });

      result.data = responseData;
      result.error = error;
      result.success = success;

      return result;
    } catch (e) {
      result.error = (e as Error).message;
      return result;
    }
  }

  // Read / GET

  static async fetchItemById(
    endpoint: string,
    authToken: string,
    itemId: string
  ): Promise<APIResponse> {
    const result = this.responseObjFactory();
    try {
      const targetUrl = `${endpoint}/${itemId}`;
      const headers = this.buildHeaders(authToken);

      const {
        data: { data: item, error, success },
      } = await axios.get(targetUrl, { headers });

      result.data = item;
      result.error = error;
      result.success = success;

      return result;
    } catch (e) {
      result.error = (e as Error).message;
      return result;
    }
  }

  static async fetchItems(
    endpoint: string,
    authToken: string,
    queryObject?: APIQuery
  ): Promise<APIResponse> {
    const result = this.responseObjFactory();
    try {
      let targetUrl = `${endpoint}`;
      if (queryObject) targetUrl += `?${qs.stringify(queryObject)}`;

      const headers = this.buildHeaders(authToken);
      const {
        data: { data: list, error, success },
      } = await axios.get(targetUrl, { headers });

      result.data = list as object[];
      result.error = error;
      result.success = success;

      return result;
    } catch (e) {
      result.error = (e as Error).message;
      return result;
    }
  }

  // Update / PUT
  static async updateResource(
    endpoint: string,
    authToken: string,
    resourceId: string,
    data: { [key: string]: any }
  ): Promise<APIResponse> {
    const result = this.responseObjFactory();
    try {
      const targetUrl = `${endpoint}/${resourceId}`;
      const headers = this.buildHeaders(authToken);
      const {
        data: { data: responseData, error, success },
      } = await axios.put(targetUrl, data, { headers });

      result.data = responseData;
      result.error = error;
      result.success = success;

      return result;
    } catch (e) {
      result.error = (e as Error).message;
      return result;
    }
  }

  // Delete / DELETE
  static async deleteResource(
    endpoint: string,
    authToken: string,
    resourceId: string
  ): Promise<APIResponse> {
    const result = this.responseObjFactory();
    try {
      const targetUrl = `${endpoint}/${resourceId}`;
      const headers = this.buildHeaders(authToken);
      const {
        data: { error, success },
      } = await axios.delete(targetUrl, { headers });

      result.error = error;
      result.success = success;

      return result;
    } catch (e) {
      result.error = (e as Error).message;
      return result;
    }
  }
}
