import Admin from "../../entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IGetAdmins = ({
  exclude_user_ids,
}: {
  exclude_user_ids: string[];
}) => Promise<Admin[] | null>;

export default function makeGetAdmins(adminDb: IAdminDb): IGetAdmins {
  return async function getAdmins({
    exclude_user_ids,
  }: {
    exclude_user_ids: string[];
  }): Promise<Admin[] | null> {
    const admins = await adminDb.findAll({ exclude_user_ids });
    return admins;
  };
}
