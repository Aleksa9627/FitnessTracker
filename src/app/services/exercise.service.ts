import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private _http: HttpClient) {}

  addExercise(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/exercises', data);
  }

  updateExercise(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/exercises/${id}`, data);
  }

  getExerciseList(): Observable<any> {
    return this._http.get('http://localhost:3000/exercises');
  }

  deleteExercise(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/exercises/${id}`);
  }
}
