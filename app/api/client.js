import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";
import settings from "../config/settings";

const apiClient = create({
  baseURL: "http://192.168.0.101:9000/api",
});
// if app posted, use baseURL: settings.apiUrl instead, but my local api changes everyday, I will hard code it.

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  request.headers["x-auth-token"] = authToken;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }
  //either error or no internet connect, load from cache
  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

//"http://192.168.0.108:9000/api",
export default apiClient;
