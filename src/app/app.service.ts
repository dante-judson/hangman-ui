import { Injectable } from '@angular/core';
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Word } from './word';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private gameOver = new BehaviorSubject(false);  

  private serviceUrl = `${environment.backendServer}word/`;

  constructor(private http: HttpClient) { }

  getRamdonWord():Observable<Word> {
    return this.http.get<Word>(`${this.serviceUrl}random`);
  }

  attempt(letters: string[], id:number):Observable<Word> {
    return this.http.post<Word>(`${this.serviceUrl}${id}/attempt`,letters);
  }

  isGameOver() {
    return this.gameOver.asObservable();
  }

  setGameOver(gameOver) {
    this.gameOver.next(gameOver);
  }

}
