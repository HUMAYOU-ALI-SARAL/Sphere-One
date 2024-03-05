"use client"
import UserLayout from "@/pages/layouts/user.layout";
import React from "react";
import Header from "@/components/User/Header/Header";
import Footer from "@/components/Marketplace/Footer";
import NftOverview from "@/components/Nft/NftOverview";
import NftProvider from "@/providers/nft.provider";

const NftPage = () => {
    return (
        <UserLayout title="NFT">
            <Header />
            <NftProvider>
                <NftOverview />
            </NftProvider>
            <Footer />
        </UserLayout>
    );
};

export default NftPage;