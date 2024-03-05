export const NFT_PAGE_LIMIT = 10;
export const TRANSACTION_PAGE_LIMIT = 10;
export const SPHERA_WORLD = "sphera_world";
export const DEFAULT_PROFILE_AVATAR = "/img/profile/default-avatar.png";

export const MAX_TRANSACTION_FEE = 1_000_000;
export const TRANSACTION_GAS = 1_000_000;

export const MIRROR_NODE_REFRESH_TIME = Number(process.env.NEXT_PUBLIC_MIRROR_NODE_REFRESH_TIME) || 5000;

export const WALLET_REGEX = /^0.0.[0-9]{7}$/gm;