export interface IUserInfo {
   id: string,
   email: string,
   name: string
}

export interface IUser {
   userInfo: IUserInfo | null;
   accessToken: string | null
}

export interface IReview {
   _id: string;
   reviewedBy: {
      _id: string;
      name: string;
   };
   review: string;
   createdAt: Date;
   updatedAt: string;
}