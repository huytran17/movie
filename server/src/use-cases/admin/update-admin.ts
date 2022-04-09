import Admin from "../../entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../interfaces/admin";
import { ClientSession } from "mongoose";
import _ from "lodash";

interface IUpdateAdminData {
  adminDetails: Partial<IAdmin>;
  update_password?: boolean;
}
export type IUpdateAdmin = ({
  adminDetails,
  update_password,
}: IUpdateAdminData) => Promise<Admin | null>;

export default function makeUpdateAdmin(adminDb: IAdminDb): IUpdateAdmin {
  return async function updateAdmin({
    adminDetails,
    update_password = false,
  }: IUpdateAdminData): Promise<Admin | null> {
    const existing_by_id = await adminDb.findById({
      id: adminDetails._id as string,
    });
    const existing = existing_by_id;

    if (!existing) {
      throw new RangeError("Admin not found.");
    }

    const omit_list = ["_id"];

    const final_admin_detail = _.omit(adminDetails, omit_list);
    const admin = new Admin(
      Object.assign({}, existing, final_admin_detail, {
        updated_at: new Date(),
      })
    );

    const updatedAdmin = await adminDb.update(admin);
    return updatedAdmin;
  };
}
