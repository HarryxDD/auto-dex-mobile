import { axiosInstance } from "@/services/instance";
import { GetQuoteDto, MachineActivity } from "@/libs/entities/machine.entity";
import { ChainID, PoolEntity, PoolStatus } from "@/libs/entities/pool.entity";
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
      {
        headers: {
          "content-type": "text/plain;charset=UTF-8",
        },
      }
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
        headers: {
          "content-type": "text/plain;charset=UTF-8",
        },
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
}
