import config from "../config";
import { USER_ROlE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";

const superAdminData = {
  id: "0001",
  email: "mdrazibsarker25@gmail.com",
  password: config.super_admin_password,
  needPasswordChange: false,
  role: USER_ROlE.superAdmin,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin

  const isSuperAdminExists = await User.findOne({ role: USER_ROlE.superAdmin });

  if (!isSuperAdminExists) {
    await User.create(superAdminData);
  }
};
export default seedSuperAdmin;
