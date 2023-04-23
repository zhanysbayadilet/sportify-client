import {Injectable} from "@angular/core";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private user?: User;

  public getUserInToken(): User{
    return JSON.parse(localStorage.getItem('HEADER_USER') ?? 'null');;
  }
}
