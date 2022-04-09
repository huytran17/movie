import Admin from "../../entities/admin";
import IAdmin from "../../interfaces/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export interface ICreateAdminData {
  adminDetails: Omit<IAdmin, "_id">;
}

export type ICreateAdmin = ({
  adminDetails,
}: ICreateAdminData) => Promise<Admin | null>;

export default function makeCreateAdmin(adminDb: IAdminDb): ICreateAdmin {
  return async function createAdmin({
    adminDetails,
  }: ICreateAdminData): Promise<Admin | null> {
    const createdAdmin = await adminDb.insert(adminDetails);
    return createdAdmin;
  };
}
