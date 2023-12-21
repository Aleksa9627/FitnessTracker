import { Component, OnInit, ViewChild } from '@angular/core';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseService } from '../services/exercise.service';
import { CoreService } from '../core/core.service';
import { error } from 'console';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.css'
})
export class TrackerComponent implements OnInit {
  displayedColumns: string[] = [
    'exerciseName',
    'time',
    'restIntervals',
    'setsNumber',
    'repsNumber',
    'date',
    'description',
    'typesOfTraining',
    'id',
    'action'
  ]
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _exerciseService: ExerciseService, 
    private _coreService: CoreService) { }

  ngOnInit(): void {
    this.getExercise();
  }

  openAddEditForm() {
    const dialogRef = this._dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExercise();
        }
      },
    });
  }

  getExercise() {
    this._exerciseService.getExerciseList().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteExercise(id: number) {
    this._exerciseService.deleteExercise(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Exercise deleted!', 'done');
        this.getExercise();
      },
      error: console.log,
    })
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getExercise();
        }
      },
    });
  }
}


