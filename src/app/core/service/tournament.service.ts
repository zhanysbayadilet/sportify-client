import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Tournament} from "../model/tournament";
import {User} from "../model/user";
import {ServiceCommonConstants} from "../constants/service-common.constants";


@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  tournamentArr: Tournament[] = [];
  tournament: Tournament | undefined;
  private readonly ADMINISTRATION_URL = ServiceCommonConstants.ADMINISTRATION_URL + '/tournament';

  constructor(private http: HttpClient) { }
  requestConstructor(params: any) {
    let requestParams = '?';
    for (const param in params) {
      requestParams += (params[param] === '' || params[param] === null)
        ? '' : (param + '=' + params[param] + '&')
    }
    return requestParams;
  }

  getTournaments(params: any, filter: any): Observable<any> {
    return this.http.post(this.ADMINISTRATION_URL + '/all' + this.requestConstructor(params), {
      "searchText": filter.searchText,
      "fromDate": filter.fromDate,
      "untilDate": filter.untilDate,
      "categories": filter.categories
    });
  }

  getTournament(id: number): Observable<Tournament>{
    return this.http.get<Tournament>(`${this.ADMINISTRATION_URL}/${id}`);
  }

  deleteTournament(id: number | undefined):Observable<Tournament[]>{
    return this.http.delete<Tournament[]>(`${this.ADMINISTRATION_URL}/${id}`)
      .pipe(
        tap(tournaments => this.tournamentArr = tournaments)
      );
  }

  saveTournament(tournament: Tournament):Observable<Tournament> {
    return this.http.post<Tournament>(`${this.ADMINISTRATION_URL}/save`, tournament);
  }

  subscribeToTournament(tournamentId: number, currentUserId: number) {
    return this.http.post<Tournament>(`${this.ADMINISTRATION_URL}/${currentUserId}/${tournamentId}`, {});
  }

  getCountTournaments(): Observable<number> {
    return this.http.get<number>(`${this.ADMINISTRATION_URL}/count`);
  }

  getTournamentParticipants(params: any): Observable<any> {
    return this.http.get<User[]>(`${this.ADMINISTRATION_URL}/participants${this.requestConstructor(params)}`);
  }

  getStatusSubscribe(userId: number, tournamentId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.ADMINISTRATION_URL}/userId/${userId}/tournamentId/${tournamentId}`);
  }

  unsubscribeToTournament(userId: number, tournamentId: number): Observable<number> {
    return this.http.delete<number>(
      `${this.ADMINISTRATION_URL}/userId/${userId}/tournamentId/${tournamentId}/unsubscribe`
    );
  }

  getCityList(): Observable<any> {
    return this.http.get(this.ADMINISTRATION_URL + '/cities');
  }
}
