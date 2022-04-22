import Admin from "../../entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IRestoreAdminById = ({
  id,
}: {
  id: string;
}) => Promise<Admin | null>;

export default function makeRestoreAdminById(
  adminDb: IAdminDb
): IRestoreAdminById {
  return async function restoreAdminById({
    id,
  }: {
    id: string;
  }): Promise<Admin | null> {
    const restoredAdmin = await adminDb.restore({ id });
    return restoredAdmin;
  };
}
