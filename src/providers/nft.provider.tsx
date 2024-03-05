'use client'
import { useGetNftListedInfoMutation, useGetNftUserBidInfoMutation, useGetNftsMutation } from "@/api/blockchainApi";
import Loader from "@/components/Common/Loader";
import { MIRROR_NODE_REFRESH_TIME } from "@/constants/app.constants";
import { Bid, Nft, NftListedInfo } from "@/types/blockchain.type";
import { useRouter } from "next/router";
import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useUser } from "./user.provider";

interface NftContextType {
    nft: Nft | undefined;
    listedInfo: NftListedInfo | undefined;
    userBidInfo: Bid | undefined;
    reFetchNft: () => void;
    setIsLoading: (state: boolean) => void;
};

const NftContext = createContext<NftContextType | undefined>(undefined);

export const useNft = (): NftContextType => {

    const context = useContext(NftContext);

    if (!context) {
        throw new Error("useNft must be used within a NftProvider");
    }
    return context;
};

const NftProvider = ({ children }: PropsWithChildren) => {

    const router = useRouter();
    const collectionId = router.query.id;
    const nftSerail = Number(router.query.serial || null);

    const { userProfile } = useUser();

    const [getNfts] = useGetNftsMutation();
    const [getListedInfo] = useGetNftListedInfoMutation();
    const [getBidInfo, {isLoading: bidInfoLoading}] = useGetNftUserBidInfoMutation();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [nft, setNfts] = useState<Nft>();
    const [userBidInfo, setUserBidInfo] = useState<Bid>();
    const [listedInfo, setListedInfo] = useState<NftListedInfo>();

    const fetchBidInfo = useCallback(
        (tokenId: string, serial: number, accountId: string) => {
            getBidInfo({
                accountId,
                tokenId,
                serialNumber: serial,
            })
                .unwrap()
                .then((response) => {
                    const { bid } = response;
                    setUserBidInfo(bid);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [getBidInfo]
    );

    const fetchNft = useCallback(
        (tokenId: string, serial: number) => {
            getNfts({
                pageSize: 1,
                tokenId,
                serialNumber: serial,
            })
                .unwrap()
                .then((response) => {
                    const { nfts } = response;
                    if (!nfts.length) {
                        router.push("/profile");
                    }
                    setNfts(nfts[0]);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [getNfts, router]
    );

    const fetchListedInfo = useCallback(() => {
        getListedInfo({
            tokenId: nft?.token_id!,
            serialNumber: nft?.serial_number!,
        })
            .unwrap()
            .then((response) => {
                setListedInfo(response);
            })
            .catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [nft, getListedInfo]);


    const reFetchNft = () => {
        setIsLoading(true);
        setTimeout(() => {
            fetchNft(nft?.token_id!, nft?.serial_number!);
        }, MIRROR_NODE_REFRESH_TIME)
    };


    useEffect(() => {
        if (collectionId && nftSerail) {
            fetchNft(collectionId as string, nftSerail);
        }
    }, [collectionId, nftSerail, fetchNft]);

    useEffect(() => {
        if (nft) {
            fetchListedInfo();
        }
    }, [nft, fetchListedInfo]);

    useEffect(() => {
        if (nft && userProfile) {
            fetchBidInfo(nft.token_id, nft.serial_number, userProfile.accountId);
        }
    }, [nft, userProfile]);

    return (
        <NftContext.Provider
            value={{
                nft,
                listedInfo,
                userBidInfo,
                reFetchNft,
                setIsLoading,
            }}
        >
            {isLoading || bidInfoLoading || !nft ? <Loader /> : (children)}

        </NftContext.Provider>
    );
};

export default NftProvider;