/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export declare namespace Types {
  export type StopConditionStruct = {
    value: BigNumberish;
    operator: BigNumberish;
  };

  export type StopConditionStructOutput = [value: bigint, operator: bigint] & {
    value: bigint;
    operator: bigint;
  };

  export type ValueComparisonStruct = {
    value0: BigNumberish;
    value1: BigNumberish;
    operator: BigNumberish;
  };

  export type ValueComparisonStructOutput = [
    value0: bigint,
    value1: bigint,
    operator: bigint
  ] & { value0: bigint; value1: bigint; operator: bigint };

  export type TradingStopConditionStruct = {
    stopType: BigNumberish;
    value: BigNumberish;
  };

  export type TradingStopConditionStructOutput = [
    stopType: bigint,
    value: bigint
  ] & { stopType: bigint; value: bigint };
}

export declare namespace Params {
  export type CreateMachineParamsStruct = {
    id: string;
    owner: AddressLike;
    ammRouterAddress: AddressLike;
    baseTokenAddress: AddressLike;
    targetTokenAddress: AddressLike;
    ammRouterVersion: BigNumberish;
    startAt: BigNumberish;
    batchVolume: BigNumberish;
    stopConditions: Types.StopConditionStruct[];
    frequency: BigNumberish;
    openingPositionCondition: Types.ValueComparisonStruct;
    takeProfitCondition: Types.TradingStopConditionStruct;
    stopLossCondition: Types.TradingStopConditionStruct;
  };

  export type CreateMachineParamsStructOutput = [
    id: string,
    owner: string,
    ammRouterAddress: string,
    baseTokenAddress: string,
    targetTokenAddress: string,
    ammRouterVersion: bigint,
    startAt: bigint,
    batchVolume: bigint,
    stopConditions: Types.StopConditionStructOutput[],
    frequency: bigint,
    openingPositionCondition: Types.ValueComparisonStructOutput,
    takeProfitCondition: Types.TradingStopConditionStructOutput,
    stopLossCondition: Types.TradingStopConditionStructOutput
  ] & {
    id: string;
    owner: string;
    ammRouterAddress: string;
    baseTokenAddress: string;
    targetTokenAddress: string;
    ammRouterVersion: bigint;
    startAt: bigint;
    batchVolume: bigint;
    stopConditions: Types.StopConditionStructOutput[];
    frequency: bigint;
    openingPositionCondition: Types.ValueComparisonStructOutput;
    takeProfitCondition: Types.TradingStopConditionStructOutput;
    stopLossCondition: Types.TradingStopConditionStructOutput;
  };

  export type UpdateMachineParamsStruct = {
    id: string;
    startAt: BigNumberish;
    batchVolume: BigNumberish;
    stopConditions: Types.StopConditionStruct[];
    frequency: BigNumberish;
    openingPositionCondition: Types.ValueComparisonStruct;
    takeProfitCondition: Types.TradingStopConditionStruct;
    stopLossCondition: Types.TradingStopConditionStruct;
  };

  export type UpdateMachineParamsStructOutput = [
    id: string,
    startAt: bigint,
    batchVolume: bigint,
    stopConditions: Types.StopConditionStructOutput[],
    frequency: bigint,
    openingPositionCondition: Types.ValueComparisonStructOutput,
    takeProfitCondition: Types.TradingStopConditionStructOutput,
    stopLossCondition: Types.TradingStopConditionStructOutput
  ] & {
    id: string;
    startAt: bigint;
    batchVolume: bigint;
    stopConditions: Types.StopConditionStructOutput[];
    frequency: bigint;
    openingPositionCondition: Types.ValueComparisonStructOutput;
    takeProfitCondition: Types.TradingStopConditionStructOutput;
    stopLossCondition: Types.TradingStopConditionStructOutput;
  };
}

export interface MachineChefInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "closeMachine"
      | "closePosition"
      | "createMachine"
      | "createMachineAndDepositEther"
      | "createMachineAndDepositToken"
      | "depositEther"
      | "depositToken"
      | "initialize"
      | "multicall"
      | "owner"
      | "pause"
      | "pauseMachine"
      | "paused"
      | "registry"
      | "renounceOwnership"
      | "restartMachine"
      | "setRegistry"
      | "setVault"
      | "transferOwnership"
      | "tryClosingPosition"
      | "tryMakingDCASwap"
      | "unpause"
      | "updateMachine"
      | "vault"
      | "withdraw"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Initialized"
      | "OwnershipTransferred"
      | "Paused"
      | "RegistryUpdated"
      | "Unpaused"
      | "VaultUpdated"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "closeMachine",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "closePosition",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "createMachine",
    values: [Params.CreateMachineParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "createMachineAndDepositEther",
    values: [Params.CreateMachineParamsStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "createMachineAndDepositToken",
    values: [Params.CreateMachineParamsStruct, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "depositEther",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "depositToken",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "multicall",
    values: [BytesLike[]]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "pauseMachine",
    values: [string]
  ): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "registry", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "restartMachine",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "setRegistry",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "setVault",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "tryClosingPosition",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "tryMakingDCASwap",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "updateMachine",
    values: [Params.UpdateMachineParamsStruct]
  ): string;
  encodeFunctionData(functionFragment: "vault", values?: undefined): string;
  encodeFunctionData(functionFragment: "withdraw", values: [string]): string;

  decodeFunctionResult(
    functionFragment: "closeMachine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "closePosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMachine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMachineAndDepositEther",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createMachineAndDepositToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositEther",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "depositToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "multicall", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pauseMachine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "registry", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "restartMachine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRegistry",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "setVault", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tryClosingPosition",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tryMakingDCASwap",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "updateMachine",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "vault", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export namespace InitializedEvent {
  export type InputTuple = [version: BigNumberish];
  export type OutputTuple = [version: bigint];
  export interface OutputObject {
    version: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace PausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RegistryUpdatedEvent {
  export type InputTuple = [actor: AddressLike, updatedAddress: AddressLike];
  export type OutputTuple = [actor: string, updatedAddress: string];
  export interface OutputObject {
    actor: string;
    updatedAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace UnpausedEvent {
  export type InputTuple = [account: AddressLike];
  export type OutputTuple = [account: string];
  export interface OutputObject {
    account: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace VaultUpdatedEvent {
  export type InputTuple = [actor: AddressLike, updatedAddress: AddressLike];
  export type OutputTuple = [actor: string, updatedAddress: string];
  export interface OutputObject {
    actor: string;
    updatedAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface MachineChef extends BaseContract {
  connect(runner?: ContractRunner | null): MachineChef;
  waitForDeployment(): Promise<this>;

  interface: MachineChefInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  closeMachine: TypedContractMethod<[machineId: string], [void], "nonpayable">;

  closePosition: TypedContractMethod<
    [machineId: string, fee: BigNumberish, minOut: BigNumberish],
    [void],
    "nonpayable"
  >;

  createMachine: TypedContractMethod<
    [params: Params.CreateMachineParamsStruct],
    [void],
    "nonpayable"
  >;

  createMachineAndDepositEther: TypedContractMethod<
    [params: Params.CreateMachineParamsStruct],
    [void],
    "payable"
  >;

  createMachineAndDepositToken: TypedContractMethod<
    [params: Params.CreateMachineParamsStruct, depositAmount: BigNumberish],
    [void],
    "nonpayable"
  >;

  depositEther: TypedContractMethod<[machineId: string], [void], "payable">;

  depositToken: TypedContractMethod<
    [machineId: string, amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  initialize: TypedContractMethod<[], [void], "nonpayable">;

  multicall: TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;

  owner: TypedContractMethod<[], [string], "view">;

  pause: TypedContractMethod<[], [void], "nonpayable">;

  pauseMachine: TypedContractMethod<[machineId: string], [void], "nonpayable">;

  paused: TypedContractMethod<[], [boolean], "view">;

  registry: TypedContractMethod<[], [string], "view">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  restartMachine: TypedContractMethod<
    [machineId: string],
    [void],
    "nonpayable"
  >;

  setRegistry: TypedContractMethod<
    [registryAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  setVault: TypedContractMethod<
    [vaultAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  tryClosingPosition: TypedContractMethod<
    [machineId: string, fee: BigNumberish, minOut: BigNumberish],
    [void],
    "nonpayable"
  >;

  tryMakingDCASwap: TypedContractMethod<
    [machineId: string, fee: BigNumberish, minOut: BigNumberish],
    [void],
    "nonpayable"
  >;

  unpause: TypedContractMethod<[], [void], "nonpayable">;

  updateMachine: TypedContractMethod<
    [params: Params.UpdateMachineParamsStruct],
    [void],
    "nonpayable"
  >;

  vault: TypedContractMethod<[], [string], "view">;

  withdraw: TypedContractMethod<[machineId: string], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "closeMachine"
  ): TypedContractMethod<[machineId: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "closePosition"
  ): TypedContractMethod<
    [machineId: string, fee: BigNumberish, minOut: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createMachine"
  ): TypedContractMethod<
    [params: Params.CreateMachineParamsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "createMachineAndDepositEther"
  ): TypedContractMethod<
    [params: Params.CreateMachineParamsStruct],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "createMachineAndDepositToken"
  ): TypedContractMethod<
    [params: Params.CreateMachineParamsStruct, depositAmount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "depositEther"
  ): TypedContractMethod<[machineId: string], [void], "payable">;
  getFunction(
    nameOrSignature: "depositToken"
  ): TypedContractMethod<
    [machineId: string, amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "initialize"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "multicall"
  ): TypedContractMethod<[data: BytesLike[]], [string[]], "nonpayable">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "pause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "pauseMachine"
  ): TypedContractMethod<[machineId: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "paused"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "registry"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "restartMachine"
  ): TypedContractMethod<[machineId: string], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setRegistry"
  ): TypedContractMethod<[registryAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "setVault"
  ): TypedContractMethod<[vaultAddress: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "tryClosingPosition"
  ): TypedContractMethod<
    [machineId: string, fee: BigNumberish, minOut: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "tryMakingDCASwap"
  ): TypedContractMethod<
    [machineId: string, fee: BigNumberish, minOut: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "unpause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateMachine"
  ): TypedContractMethod<
    [params: Params.UpdateMachineParamsStruct],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "vault"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[machineId: string], [void], "nonpayable">;

  getEvent(
    key: "Initialized"
  ): TypedContractEvent<
    InitializedEvent.InputTuple,
    InitializedEvent.OutputTuple,
    InitializedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Paused"
  ): TypedContractEvent<
    PausedEvent.InputTuple,
    PausedEvent.OutputTuple,
    PausedEvent.OutputObject
  >;
  getEvent(
    key: "RegistryUpdated"
  ): TypedContractEvent<
    RegistryUpdatedEvent.InputTuple,
    RegistryUpdatedEvent.OutputTuple,
    RegistryUpdatedEvent.OutputObject
  >;
  getEvent(
    key: "Unpaused"
  ): TypedContractEvent<
    UnpausedEvent.InputTuple,
    UnpausedEvent.OutputTuple,
    UnpausedEvent.OutputObject
  >;
  getEvent(
    key: "VaultUpdated"
  ): TypedContractEvent<
    VaultUpdatedEvent.InputTuple,
    VaultUpdatedEvent.OutputTuple,
    VaultUpdatedEvent.OutputObject
  >;

  filters: {
    "Initialized(uint8)": TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;
    Initialized: TypedContractEvent<
      InitializedEvent.InputTuple,
      InitializedEvent.OutputTuple,
      InitializedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Paused(address)": TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;
    Paused: TypedContractEvent<
      PausedEvent.InputTuple,
      PausedEvent.OutputTuple,
      PausedEvent.OutputObject
    >;

    "RegistryUpdated(address,address)": TypedContractEvent<
      RegistryUpdatedEvent.InputTuple,
      RegistryUpdatedEvent.OutputTuple,
      RegistryUpdatedEvent.OutputObject
    >;
    RegistryUpdated: TypedContractEvent<
      RegistryUpdatedEvent.InputTuple,
      RegistryUpdatedEvent.OutputTuple,
      RegistryUpdatedEvent.OutputObject
    >;

    "Unpaused(address)": TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;
    Unpaused: TypedContractEvent<
      UnpausedEvent.InputTuple,
      UnpausedEvent.OutputTuple,
      UnpausedEvent.OutputObject
    >;

    "VaultUpdated(address,address)": TypedContractEvent<
      VaultUpdatedEvent.InputTuple,
      VaultUpdatedEvent.OutputTuple,
      VaultUpdatedEvent.OutputObject
    >;
    VaultUpdated: TypedContractEvent<
      VaultUpdatedEvent.InputTuple,
      VaultUpdatedEvent.OutputTuple,
      VaultUpdatedEvent.OutputObject
    >;
  };
}