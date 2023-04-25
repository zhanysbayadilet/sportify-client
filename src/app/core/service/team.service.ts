import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Tournament} from "../model/tournament";
import {ServiceCommonConstants} from "../constants/service-common.constants";
import {Team} from "../model/team";


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  teams: Team[] = [];
  team: Team | undefined;
  private readonly ADMINISTRATION_URL = ServiceCommonConstants.ADMINISTRATION_URL + '/team';

  constructor(private http: HttpClient) { }
  requestConstructor(params: any) {
    let requestParams = '?';
    for (const param in params) {
      requestParams += (params[param] === '' || params[param] === null)
        ? '' : (param + '=' + params[param] + '&')
    }
    return requestParams;
  }

  getTeams(params: any): Observable<any> {
    return this.http.get(this.ADMINISTRATION_URL + '/all' + this.requestConstructor(params));
  }

  getTeam(id: number): Observable<Team>{
    return this.http.get<Team>(`${this.ADMINISTRATION_URL}/${id}`);
  }

  deleteTeam(id: number | undefined):Observable<any>{
    return this.http.delete<any>(`${this.ADMINISTRATION_URL}/${id}`);
  }

  saveTeam(team: Team):Observable<Tournament> {
    return this.http.post<Tournament>(`${this.ADMINISTRATION_URL}/save`, team);
  }
}
