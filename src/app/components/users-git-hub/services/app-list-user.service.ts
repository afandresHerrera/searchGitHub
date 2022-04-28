
import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppListUserService {
  private userUrl = " https://api.github.com/users"; // URL to web api
  public numberUsers: number = 100;

  constructor(private http: HttpClient) { }

  public getUsesr(textSearch: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${textSearch}`);
  }
}
