import Admin from "../../entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";

export type IRemoveAdminById = ({
  id,
}: {
  id: string;
}) => Promise<Admin | null>;

export default function makeRemoveAdminById(
  adminDb: IAdminDb
): IRemoveAdminById {
  return async function removeAdminById({
    id,
  }: {
    id: string;
  }): Promise<Admin | null> {
    const deletedAdmin = await adminDb.delete({ id });
    return deletedAdmin;
  };
}
