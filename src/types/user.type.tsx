export interface UserLink {
  id?: number;
  name: string;
  url: string;
}

export interface UserProfileType {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  username: string;
  accountId: string;
  links: UserLink[];
  bgImgUrl: string;
  profileImgUrl: string;
  createdAt: Date;
  evmAddress: string;
}

export interface UserProfileResponse extends UserProfileType {}

export interface UserAccountIdResponse {
  accountId: string;
}

export interface SaveUserProfileRequest {
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  links: UserLink[];
}

export interface ChangeUserPasswordRequest {
  oldPassword: string;
  newPassword: string;
}
