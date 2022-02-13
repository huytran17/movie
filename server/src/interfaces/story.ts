import User from "../entities/user";

export default interface IStory {
  _id: string;
  viewers: User[];
  creator: User;
  content: string;
  expired_at: Date;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
