import { AppState } from "../AppState";
import { heroku } from "./AxiosService";

class AdsService {
  async getAds() {
    const res = await heroku.get("api/ads");
    console.log("[ADS]", res.data);
    AppState.ads = res.data;
    console.log(AppState.ads);
  }
}

export const adsService = new AdsService();
