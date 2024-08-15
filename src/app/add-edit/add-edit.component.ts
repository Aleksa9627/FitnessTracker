import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '../services/exercise.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrl: './add-edit.component.css'
})

export class AddEditComponent implements OnInit {
  trainingForm: FormGroup;
  trainingTypes: string[] = [
    'Weightlifting',
    'Powerlifting',
    'Bodybuilding',
    'Crossfit',
    'Treadmill',
    'Walking',
    'Cycling',
    'Pool swimming',
    'Outdoor Running',
    'HIIT',
    'Indoor Fitness'
  ]
  constructor(private _fb: FormBuilder,
    private _exerciseService: ExerciseService,
    private _dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.trainingForm = this._fb.group({
      exerciseName: '',
      time: '',
      restIntervals: '',
      setsNumber: '',
      repsNumber: '',
      date: '',
      description: '',
      typesOfTraining: ''
    })
  }
  ngOnInit(): void {
    this.trainingForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.trainingForm.valid) {
      if (this.data) {
        this._exerciseService.updateExercise(this.data.id, this.trainingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Exercise detail updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      } else {
        this._exerciseService.addExercise(this.trainingForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Exercise added successfully!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        });
      }
    }
  }
}
