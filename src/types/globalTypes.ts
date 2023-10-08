export interface IUserInfo {
   id: string,
   email: string,
   name: string
}

export interface IUser {
   userInfo: IUserInfo | null;
   accessToken: string | null
}

export interface IComment {
   _id: string;
   commentedBy: {
      _id: string;
      name: string;
   };
   comment: string;
   createdAt: Date;
   updatedAt: string;
}