import Admin from "../../entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetAdmins = () => Promise<Admin[] | null>;

export default function makeGetAdmins(adminDb: IAdminDb): IGetAdmins {
  return async function getAdmins(): Promise<Admin[] | null> {
    const admins = await adminDb.findAll();
    return admins;
  };
}
