/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  UniversalRouter,
  UniversalRouterInterface,
} from "../../../contracts/MachineVault.sol/UniversalRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "commands",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "inputs",
        type: "bytes[]",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "commands",
        type: "bytes",
      },
      {
        internalType: "bytes[]",
        name: "inputs",
        type: "bytes[]",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export class UniversalRouter__factory {
  static readonly abi = _abi;
  static createInterface(): UniversalRouterInterface {
    return new Interface(_abi) as UniversalRouterInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): UniversalRouter {
    return new Contract(address, _abi, runner) as unknown as UniversalRouter;
  }
}
