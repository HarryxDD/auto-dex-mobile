import { axiosInstance } from "@/services/instance";
import { Token } from "../entities/platform-config.entity";

export class TokenService {
  public syncMarketData() {
    console.log(axiosInstance.getUri());
    return axiosInstance.post("/api/whitelist/market/sync-price", {}, { baseURL: `${process.env.API_URL ? process.env.API_URL : ''}/`, headers: { 'Content-Type': 'application/json' } });
  }

  public fetchWhiteListedTokens() {
    return axiosInstance.get<Token[]>("/api/whitelist", { baseURL: `${process.env.API_URL ? process.env.API_URL : ''}/`, headers: { 'Content-Type': 'application/json' } });
  }
}
