'use client'
import React, { PropsWithChildren, createContext, useContext, useState } from "react";
import { BladeConnector, ConnectorStrategy, HederaNetwork, BladeWalletError } from '@bladelabs/blade-web3.js';
import {
  AccountAllowanceApproveTransaction,
  AccountId,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  ContractId,
  Hbar,
  HbarUnit,
  NftId,
  TokenAssociateTransaction,
  TokenId,
  Transaction,
  TransferTransaction,
  PrivateKey,
  Client,
} from "@hashgraph/sdk";

import SphereLogo from 'public/logo.png';
import { MAX_TRANSACTION_FEE, TRANSACTION_GAS } from "@/constants/app.constants";
import Modal from "@/components/Common/Modal";
import Button from "@/components/Common/Button";
import { useTranslate } from "./translate.provider";
import { useAppDispatch, useAppSelector } from "@/hooks/app";
import {
  selectHasBladeExtension,
  selectHasWalletSession,
  selectIsLoading,
  selectWalletAccId,
  selectWalletConnector,
  selectWalletSigner,
  setHasBladeExtension,
  setHasWalletSession,
  setIsLoading,
  setWalletAccId,
  setWalletConnector,
  setWalletSigner
} from "@/reducers/blade.slice";
import Loader from "@/components/Common/Loader";


const trashCollectorContractId = "0.0.7697722";

// const marketContractId = ContractId.fromString(process.env.NEXT_PUBLIC_MARKET_CONTRACT_ID!);
const marketContractId = "0.0.3418318";
// const operatorId = AccountId.fromString(process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_ID!);
const operatorId = "0.0.7524873"
// const operatorKey = PrivateKey.fromStringDer(process.env.NEXT_PUBLIC_HEDERA_ACCOUNT_PRIV_KEY!);
const operatorKey = "3030020100300706052b8104000a042204202b741e5b284b468a2c465ccd1bf74be9b58e085b7180c37548587e7bcab42e1d"

const hederaClient = process.env.NEXT_PUBLIC_HEDERA_NETWORK === 'testnet'
  ? Client.forTestnet().setOperator(operatorId, operatorKey)
  : Client.forMainnet().setOperator(operatorId, operatorKey);

interface BladeWalletContextType {
  walletSession: boolean;
  walletAccountId: AccountId | null,
  hasExtension: boolean | null;
  isLoading: boolean;

  init: () => void;
  transferNft: (
    accountId: string,
    recipientAccountId: string,
    nfts: { serialNumber: number, tokenId: string }[]
  ) => Promise<string>,
  giveAllowanceForNFT: (
    accountId: string,
    nfts: { tokenId: string, serialNumber: number }[],
  ) => Promise<string>,
  listNFT: (
    nfts: { tokenId: string, serialNumber: number, priceHBAR: number }[]
  ) => Promise<string>,
  unlistNFT: (
    tokenId: string,
    tokenSerialNumber: number,
  ) => Promise<string>,
  addBid: (
    tokenId: string,
    tokenSerialNumber: number,
    bidAmountHBAR: number | bigint,
    isTinyBar?: boolean,
  ) => Promise<string>,
  deleteBid: (
    tokenId: string,
    tokenSerialNumber: number,
    buyerEvmAddress: string,
  ) => Promise<string>,
  acceptBid: (
    tokenId: string,
    tokenSerialNumber: number,
    buyerEvmAddress: string,
    acceptedPriceHBAR: bigint,
  ) => Promise<string>,
  associateTokens: (
    tokenIds: string[],
    accountId: string,
  ) => Promise<string>,
  burnTokens: (
    senderAccountId: string,
    nfts: { serialNumber: number, tokenId: string }[]
  ) => Promise<string>,
  tinyBarToHbar: (amount: bigint, toString?: boolean) => string | number,
  hbarToTinyBar: (amount: number) => number,
  evmToToken: (evm: string) => string;
};

const BladeWalletContext = createContext<BladeWalletContextType | undefined>(undefined);
export const useBladeWallet = (): BladeWalletContextType => {

  const context = useContext(BladeWalletContext);

  if (!context) {
    throw new Error("useBladeWallet must be used within a BladeWalletProvider");
  }
  return context;
};

const BladeWalletProvider = ({ children }: PropsWithChildren) => {
  const { _t } = useTranslate();
  const dispatch = useAppDispatch();

  const walletConnector = useAppSelector(selectWalletConnector);
  const walletSigner = useAppSelector(selectWalletSigner);
  const hasWalletSession = useAppSelector(selectHasWalletSession);
  const isLoading = useAppSelector(selectIsLoading);
  const walletAccId = useAppSelector(selectWalletAccId);
  const hasBladeExtension = useAppSelector(selectHasBladeExtension);
  const [noExtensionModal, setNoExtensionModal] = useState<boolean>(false);

  const init = async () => {
    try {
      if (!hasWalletSession && !isLoading) {
        dispatch(setHasBladeExtension(null));
        const connector = await BladeConnector.init(ConnectorStrategy.EXTENSION, {
          name: "Sphere World",
          description: "Sphere World",
          url: process.env.NEXT_PUBLIC_APP_URL || '',
          icons: [process.env.NEXT_PUBLIC_APP_URL + SphereLogo.src]
        });

        dispatch(setIsLoading(true));

        let sessionConfig: any = {
          network: process.env.NEXT_PUBLIC_HEDERA_NETWORK === 'mainnet' ? HederaNetwork.Mainnet : HederaNetwork.Testnet,
        }

        if (process.env.NEXT_PUBLIC_BLADE_DAPP_COD) {
          sessionConfig = { ...sessionConfig, dAppCode: process.env.NEXT_PUBLIC_BLADE_DAPP_CODE };
        }

        await connector.createSession(sessionConfig);

        const signer = connector.getSigner();
        const accountId = (signer?.getAccountId() ?? null) as AccountId | null;
        const hasSession = !!signer && !!accountId;

        connector.onWalletLocked(() => { dispatch(setWalletSigner(null)); });
        connector.onSessionDisconnect(() => { disconnect(); });
        connector.onSessionExpire(() => { disconnect(); });


        console.log("accountId===>", accountId);
        dispatch(setWalletAccId(accountId));
        dispatch(setWalletSigner(signer));
        dispatch(setHasWalletSession(hasSession));
        dispatch(setWalletConnector(connector));
      }

    } catch (error: any) {
      if (error.name === BladeWalletError.ExtensionNotFound) {
        dispatch(setHasBladeExtension(false));
        setNoExtensionModal(true);
      } else if (error.name === BladeWalletError.NoSession) {
        console.warn(`No active blade session.`);
      } else if (error.message === `The user's wallet is locked.`) {
        console.warn(`User wallet is locked.`);
      } else {
        console.error(`Uncaught: ${error.message}`, error.stack);
      }
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const disconnect = async () => {
    walletConnector?.killSession().then(() => {
      dispatch(setWalletAccId(null));
      dispatch(setWalletSigner(null));
      dispatch(setHasWalletSession(null));
      dispatch(setWalletConnector(null));
    });
  };

  const populateAndRunTx = async (tx: Transaction) => {
    if (!walletSigner) {
      throw new Error("No wallet session");
    }
    let transactionId = "";
    let populatedTx = null;

    try {
      dispatch(setIsLoading(true));
      populatedTx = await walletSigner.populateTransaction(tx);
      transactionId = populatedTx.transactionId!.toString();
    } catch (err: any) {
      dispatch(setIsLoading(false));
      throw new Error(err?.message || err?.status?.toString())
    }

    try {
      const result = await walletSigner.call(populatedTx!.freeze());
      const receipt = await result.getReceipt(hederaClient);
      return transactionId;
    } catch (err: any) {
      console.table(err);
      throw new Error(err?.message || err?.status?.toString());
    } finally {
      console.log(`https://hashscan.io/testnet/transaction/${transactionId}`);
      dispatch(setIsLoading(false));
    }
  }

  const transferNft = async (
    accountId: string,
    recipientAccountId: string,
    nfts: { serialNumber: number, tokenId: string }[]
  ) => {
    let tx = await new TransferTransaction()
      .setMaxTransactionFee(MAX_TRANSACTION_FEE);
    nfts.forEach(nft => {
      tx = tx.addNftTransfer(
        nft.tokenId,
        nft.serialNumber,
        accountId!,
        recipientAccountId
      )
    })
    return await populateAndRunTx(tx);
  }
  const tinyBarToHbar = (amount: bigint, toSring: boolean = true) => {
    if (!amount) return 0;
    const amountString = amount.toString(); // Convert bigint to string
    return toSring ? Hbar.fromTinybars(amountString).toString() : Hbar.fromTinybars(amountString).toBigNumber().toNumber();
  }
  

  const hbarToTinyBar = (amount: number) => {
    if (!amount) return 0;
    return new Hbar(amount).toTinybars().toNumber();
  }

  const evmToToken = (evm: string) => {
    return TokenId.fromSolidityAddress(evm).toString();
  }

  const listNFT = async (
    nfts: { tokenId: string, serialNumber: number, priceHBAR: number }[]
  ) => {
    const tokens: string[] = [];
    const serials: number[] = [];
    const prices: number[] = [];

    nfts.forEach((nft) => {
      tokens.push(TokenId.fromString(nft.tokenId).toSolidityAddress());
      serials.push(nft.serialNumber);
      prices.push(new Hbar(nft.priceHBAR).toTinybars().toNumber())
    });
    const tx = new ContractExecuteTransaction()
      .setContractId(marketContractId)
      .setFunction(
        'listNFT',
        new ContractFunctionParameters()
          .addAddressArray(tokens)
          .addUint256Array(serials)
          .addUint256Array(prices)
      )
      .setGas(TRANSACTION_GAS * nfts.length)
      .setMaxTransactionFee(MAX_TRANSACTION_FEE);

    return await populateAndRunTx(tx);
  }

  const giveAllowanceForNFT = async (
    accountId: string,
    nfts: { tokenId: string, serialNumber: number }[]
  ) => {
    let tx = new AccountAllowanceApproveTransaction()
      .setMaxTransactionFee(MAX_TRANSACTION_FEE);

    nfts.forEach(nft => {
      tx = tx.approveTokenNftAllowance(
        new NftId(TokenId.fromString(nft.tokenId), nft.serialNumber),
        accountId,
        marketContractId,
      )
    })
    return await populateAndRunTx(tx);
  }

  const unlistNFT = async (
    tokenId: string,
    tokenSerialNumber: number
  ) => {
    const tx = new ContractExecuteTransaction()
      .setContractId(marketContractId)
      .setFunction(
        'unlistNFT',
        new ContractFunctionParameters()
          .addAddress(TokenId.fromString(tokenId).toSolidityAddress())
          .addUint256(tokenSerialNumber)
      )
      .setGas(TRANSACTION_GAS)
      .setMaxTransactionFee(MAX_TRANSACTION_FEE);

    return await populateAndRunTx(tx);
  }

  const addBid = async (
    tokenId: string,
    tokenSerialNumber: number,
    bidAmountHBAR: number | bigint,
    isTinyBar: boolean = false,
  ) => {
    const bidAmount = typeof bidAmountHBAR === 'bigint' ? bidAmountHBAR.toString() : bidAmountHBAR;
    const tx = new ContractExecuteTransaction()
      .setContractId(marketContractId)
      .setFunction(
        'addBid',
        new ContractFunctionParameters()
          .addAddress(TokenId.fromString(tokenId).toSolidityAddress())
          .addUint256(tokenSerialNumber)
      )
      .setPayableAmount(new Hbar(bidAmount, isTinyBar ? HbarUnit.Tinybar : HbarUnit.Hbar))
      .setGas(TRANSACTION_GAS)
      .setMaxTransactionFee(MAX_TRANSACTION_FEE);

    return await populateAndRunTx(tx);
  }

  const deleteBid = async (
    tokenId: string,
    tokenSerialNumber: number,
    buyerEvmAddress: string,
  ) => {
    const tx = new ContractExecuteTransaction()
      .setContractId(marketContractId)
      .setFunction(
        'deleteBid',
        new ContractFunctionParameters()
          .addAddress(TokenId.fromString(tokenId).toSolidityAddress())
          .addUint256(tokenSerialNumber)
          .addAddress(buyerEvmAddress)
      )
      .setGas(TRANSACTION_GAS)
      .setMaxTransactionFee(MAX_TRANSACTION_FEE);

    return await populateAndRunTx(tx);
  }

  const acceptBid = async (
    tokenId: string,
    tokenSerialNumber: number,
    buyerEvmAddress: string,
    acceptedPriceHBAR: bigint,
  ) => {
    const tx = new ContractExecuteTransaction()
      .setContractId(marketContractId)
      .setFunction(
        'acceptBid',
        new ContractFunctionParameters()
          .addAddress(TokenId.fromString(tokenId).toSolidityAddress())
          .addUint256(tokenSerialNumber)
          .addAddress(buyerEvmAddress)
          // .addUint256(acceptedPriceHBAR)
      )
      .setGas(TRANSACTION_GAS)
      .setMaxTransactionFee(MAX_TRANSACTION_FEE);

    return await populateAndRunTx(tx);
  }

  const associateTokens = async (
    tokenIds: string[],
    accountId: string,
  ) => {
    const tx = await new TokenAssociateTransaction()
      .setTokenIds(tokenIds)
      .setAccountId(accountId)
      .setMaxTransactionFee(MAX_TRANSACTION_FEE);

    return await populateAndRunTx(tx);
  }

  const burnTokens = async (
    senderAccountId: string,
    nfts: { serialNumber: number, tokenId: string }[]
  ) => {
    return await transferNft(
      senderAccountId,
      trashCollectorContractId,
      nfts
    );
  }

  return (
    <BladeWalletContext.Provider
      value={{
        init,
        walletSession: hasWalletSession,
        hasExtension: hasBladeExtension,
        walletAccountId: walletAccId,
        isLoading,
        transferNft,
        giveAllowanceForNFT,
        listNFT,
        unlistNFT,
        addBid,
        deleteBid,
        acceptBid,
        tinyBarToHbar,
        associateTokens,
        burnTokens,
        evmToToken,
        hbarToTinyBar,
      }}
    >
      {isLoading && <Loader message="Please confirm operation in your Blade Wallet" />}
      {children}
      <Modal
        show={noExtensionModal}
        onClose={() => setNoExtensionModal(false)}
      >
        <div className="p-10 flex flex-col text-white">
          <p className="text-[24px] font-semibold">{_t("Blade Wallet extension")}</p>
          <p className="text-20 font-normal pt-2">{_t("Blade Wallet extension is not accessible, please install it in order to use the platform.")}</p>

          <div className="flex flex-row items-center justify-end mt-20 gap-x-5">
            <Button
              onClick={() => setNoExtensionModal(false)}
              className="rounded-[5px] w-1/3 h-[50px] text-white border"
              label={_t("Ok")}
            />
          </div>
        </div>
      </Modal>
    </BladeWalletContext.Provider>
  );
};


export default BladeWalletProvider;
