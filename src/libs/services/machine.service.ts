import { axiosInstance } from "@/services/instance";
import { GetQuoteDto, MachineActivity } from "@/libs/entities/machine.entity";
import {
  ChainID,
  PoolEntity,
  PoolStatus,
  UserToken,
} from "@/libs/entities/pool.entity";
import qs from "qs";

export class MachineService {
  async createEmptyMachinePoolOffChain(walletAddress: string) {
    const response = await axiosInstance.post<any>(
      `/api/pool/avaxc/${walletAddress}`,
      {}
    );

    return response.data as unknown as PoolEntity;
  }

  async syncMachine(machineId: string) {
    return axiosInstance.post(
      `/api/pool/evm/${machineId}/sync`,
      {},
      { headers: { "content-type": "text/plain;charset=UTF-8" } }
    );
  }

  async getQuote(getQuoteDto: GetQuoteDto) {
    const response = await axiosInstance.get<any>(
      `/api/metadata/market/quote`,
      {
        params: getQuoteDto,
      }
    );

    return response.data;
  }

  async getMachineList(
    ownerAddress: string,
    statuses: PoolStatus[]
  ): Promise<PoolEntity[]> {
    const response = await axiosInstance.get<PoolEntity[]>("/api/pool", {
      params: {
        statuses,
        ownerAddress,
        chainId: "avaxc",
      },
      paramsSerializer: (params) => {
        return qs.stringify(params, {
          arrayFormat: "repeat",
        });
      },
    });

    return response.data;
  }

  async syncWalletMachines(walletAddress: string) {
    return axiosInstance.post(
      `/api/pool/user/evm/${walletAddress}/sync`,
      {},
      {
        headers: { "content-type": "text/plain;charset=UTF-8" },
        params: {
          chainId: ChainID.AvaxC,
        },
      }
    );
  }

  async getMachine(machineId: string) {
    const response = await axiosInstance.get<PoolEntity>(
      `/api/pool/${machineId}`
    );
    return response.data;
  }

  async getMachineActivities(machineId: string) {
    const response = await axiosInstance.get<MachineActivity[]>(
      `/api/pool/${machineId}/activities`
    );
    return response.data;
  }

  async getPortfolioUserTokens(walletAddress: string) {
    const response = await axiosInstance.get<UserToken[]>(
      `/api/portfolio/${walletAddress}/user-tokens?chainId=avaxc`
    );
    return response.data;
  }

  async getPortfolioPnl(walletAddress: string) {
    const response = await axiosInstance.get<
      Array<{
        ownerAddress: string;
        totalROIValueInUSD: number;
      }>
    >(`/api/portfolio/${walletAddress}/pnl?chainId=avaxc`);
    return response.data;
  }

  async updateUserDeviceToken(walletAddress: string, deviceToken: string) {
    await axiosInstance.post(
      `/api/portfolio/${walletAddress}/user-device`,
      { deviceToken },
      {
        headers: { "content-type": "application/json" },
      }
    );
  }
}
