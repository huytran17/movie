import Admin from "../../entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetAdminById = ({ id }: { id: string }) => Promise<Admin | null>;

export default function makeGetAdminById(adminDb: IAdminDb): IGetAdminById {
  return async function getAdminById({
    id,
  }: {
    id: string;
  }): Promise<Admin | null> {
    const admin = await adminDb.findById({ id });
    return admin;
  };
}
