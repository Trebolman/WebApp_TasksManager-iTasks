import { Component, OnInit } from '@angular/core';
import { TasksService, Task } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit',
  // templateUrl: '../tasks/tasks.component.html'
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
  
  constructor(private _taskService:TasksService) { }

  ngOnInit() {
  }

}
