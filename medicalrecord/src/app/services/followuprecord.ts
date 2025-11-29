import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {FollowupRecord} from '../models/followuprecord';


@Injectable({
  providedIn: 'root',
})
export class Followuprecord {

  private apiUrl = 'http://localhost:3000/api/FollowupRecord';

  constructor(private http: HttpClient) {}

  // GET ALL
  getAll(): Observable<FollowupRecord[]> {
    return this.http.get<FollowupRecord[]>(this.apiUrl);
  }

  // GET ONE
  getById(id: string): Observable<FollowupRecord> {
    return this.http.get<FollowupRecord>(`${this.apiUrl}/${id}`);
  }

  // CREATE
  create(record: FollowupRecord): Observable<FollowupRecord> {
    return this.http.post<FollowupRecord>(this.apiUrl, record);
  }

  // UPDATE
  update(id: string, record: FollowupRecord): Observable<FollowupRecord> {
    return this.http.put<FollowupRecord>(`${this.apiUrl}/${id}`, record);
  }

  // DELETE
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
