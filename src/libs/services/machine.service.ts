import { axiosInstance } from "@/services/instance";
import { GetQuoteDto } from "@/libs/entities/machine.entity";
import { PoolEntity } from "@/libs/entities/pool.entity";

export class MachineService {
  async createEmptyMachinePoolOffChain(
    walletAddress: string,
  ) {
    const response = await axiosInstance.post<any>(
      `/pool/avaxc/${walletAddress}`, {}
    );

    console.log(response.data);
    return response as unknown as PoolEntity;
  }

  async getQuote(getQuoteDto: GetQuoteDto) {
    const response = await axiosInstance.get<any>(
      `/metadata/market/quote`, {
        params: getQuoteDto
      }
    );

    return response.data;
  }
}
