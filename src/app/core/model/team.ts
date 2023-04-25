import {User} from "./user";

export class Team {
  id?: string;
  name?: string;
  categoryId?: number;
  adminId?: number;
  members?: User[];
}
