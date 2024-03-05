import { Nft } from "@/types/blockchain.type";

export type ActivityType = "canceled" | "approved" | "rejected" | "purchased";

export interface IActivity {
  type: ActivityType;
  date: Date;
  nft: any;
  priceSPT: string;
  usdPrice: string;
  from: {
    username: string;
  };
}

export const generateActivity = (): IActivity[] => {
  const mockData = [];
  const profileImgUrl = "/img/profile/default-avatar.png";
  const nfts = generateNfts();
  const types: ActivityType[] = [
    "canceled",
    "approved",
    "rejected",
    "purchased",
  ];
  const users = [
    { username: "johndoe", profileImgUrl },
    { username: "janedoe", profileImgUrl },
    { username: "alexsmith", profileImgUrl },
    { username: "emilyrose", profileImgUrl },
  ];

  for (let i = 0; i < 10; i++) {
    const priceSPT = (Math.random() * 20 + 10).toFixed(1);
    const usdPrice = (Math.random() * 3 + 1).toFixed(2);
    const nftIndex = Math.floor(Math.random() * nfts.length);
    const typeIndex = Math.floor(Math.random() * types.length);
    const userIndex = Math.floor(Math.random() * users.length);

    mockData.push({
      date: generateRandomDate(new Date(2021, 0, 1), new Date()),
      nft: nfts[nftIndex],
      priceSPT,
      usdPrice: `$${usdPrice}`,
      type: types[typeIndex],
      from: users[userIndex],
    });
  }

  return mockData;
};

export const generateNfts = (length = 10) => {
  const mockNfts = [];
  const accountIds = [1, 2, 3, 4];
  const tokenIds = [100, 200, 300, 400];
  const serialNumbers = [10, 20, 30, 40];
  const createdTimestamps = [
    "2022-01-01",
    "2022-02-01",
    "2022-03-01",
    "2022-04-01",
  ];

  for (let i = 0; i < length; i++) {
    const accountIdIndex = Math.floor(Math.random() * accountIds.length);
    const tokenIdIndex = Math.floor(Math.random() * tokenIds.length);
    const imageId = Math.ceil(Math.random() * 5);
    const serialNumberIndex = Math.floor(Math.random() * serialNumbers.length);
    const createdTimestampIndex = Math.floor(
      Math.random() * createdTimestamps.length
    );

    const nftMetadata = {
      name: `NFT ${i}`,
      image: `/img/presets/achievements/${imageId}.png`,
      type: "image",
      description: `This is NFT ${i}`,
      attributes: [
        {
          trait_type: "Color",
          value: "Blue",
        },
        {
          trait_type: "Size",
          value: "Large",
        },
      ],
    };

    const nftCollectionMetadata = {
      name: `Collection ${i}`,
      image: `https://example.com/collection${i}.png`,
      description: `This is collection ${i}`,
    };

    const nftCollection = {
      token_id: `token${i}`,
      name: `Collection ${i}`,
      symbol: `COL${i}`,
      created_timestamp: createdTimestamps[createdTimestampIndex],
      total_supply: 100,
      max_supply: 1000,
      custom_fee: {
        royalty_fees: "10%",
        fixed_fees: "1%",
      },
      entity: {
        memo: `Memo for collection ${i}`,
      },
      metadata: nftCollectionMetadata,
    };

    const accountNftHistory = [
      {
        account_id: accountIds[accountIdIndex],
        start_timestamp: "2022-01-01",
        end_timestamp: "2022-12-31",
      },
    ];

    mockNfts.push({
      token_id: tokenIds[tokenIdIndex],
      account_id: accountIds[accountIdIndex],
      serial_number: serialNumbers[serialNumberIndex],
      metadata: nftMetadata,
      created_timestamp: createdTimestamps[createdTimestampIndex],
      history: accountNftHistory,
      token: nftCollection,
    });
  }

  return mockNfts;
};

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};