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

export interface IPostedBy {
   _id: string;
   email: string;
   name: string;
   createdAt: Date;
   updatedAt: Date;
}

export interface ILikes {
   user:string;
   _id:string
}

export interface IDislikes {
   user:string;
   _id:string
}

export interface IPost {
   _id:string;
   post:string;
   totalLikes: number;
   totalDislikes:number;
   user: IPostedBy;
   likes:ILikes[];
   dislikes: IDislikes[];
   createdAt: Date;
   updatedAt:Date;
   comments: IComment[]
}