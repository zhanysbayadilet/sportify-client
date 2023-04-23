import {Category} from "./category";
import {City} from "./city";
import {User} from "./user";

export class Tournament{
  id?: number
  name?: string
  subtitle?: string
  description?: string
  startDate?: any
  location?: string
  endDate?: any
  prizeFund?: number
  category?: Category
  city?: City
  organizer?: User
}
