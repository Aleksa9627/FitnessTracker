import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Exercise } from '../interfaces/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private _http: HttpClient, private _authService: AuthService) { }

  addExercise(data: Exercise): Observable<any> {
    data.userId = +sessionStorage.getItem('id');
    return this._http.post('http://localhost:3000/exercises', data);
  }

  updateExercise(id: number, data: Exercise): Observable<Exercise> {
    data.userId = +sessionStorage.getItem('id');
    return this._http.put<Exercise>(`http://localhost:3000/exercises/${id}`, data);
  }

  getExerciseList(): Observable<Exercise[]> {
    return this._http.get<Exercise[]>('http://localhost:3000/exercises');
  }

  deleteExercise(id: number): Observable<Exercise> {
    return this._http.delete<Exercise>(`http://localhost:3000/exercises/${id}`);
  }
}
