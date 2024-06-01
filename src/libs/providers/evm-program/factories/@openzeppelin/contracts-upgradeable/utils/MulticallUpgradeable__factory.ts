/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  MulticallUpgradeable,
  MulticallUpgradeableInterface,
} from "../../../../@openzeppelin/contracts-upgradeable/utils/MulticallUpgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes[]",
        name: "data",
        type: "bytes[]",
      },
    ],
    name: "multicall",
    outputs: [
      {
        internalType: "bytes[]",
        name: "results",
        type: "bytes[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class MulticallUpgradeable__factory {
  static readonly abi = _abi;
  static createInterface(): MulticallUpgradeableInterface {
    return new Interface(_abi) as MulticallUpgradeableInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): MulticallUpgradeable {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as MulticallUpgradeable;
  }
}