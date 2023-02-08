import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../app.service';
import { TodoPriority } from '../../shared/enums/todo-priority';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  edit: boolean | unknown;
  currentId: number | unknown;
  todoPriority = TodoPriority
  todoForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _appService: AppService,
    private _router: Router,
    private _route: ActivatedRoute) {

    this.todoForm = this._fb.group({
      todo: [''],
      priority: [''],
    })
  }

  ngOnInit(): void {

    this._route
      .queryParams
      .subscribe(params => {
        if (this._router.url.includes("edit")) {
          this.edit = true;
          this.currentId = params['id'];
          this.todoForm.patchValue({
            todo: params['name'],
            priority: params['priority']
          });
        } else {
          this.edit = false;
          this.todoForm.patchValue({
            priority: this.todoPriority.LOW
          });
        }
      });

  }

  onSubmit(): void {
    if (this._router.url.includes("new")) {
      this._appService.addTodo(this.todoForm.controls['todo'].value, this.todoForm.value.priority)
      this._router.navigate([''])
    } else {
      this._appService.saveTodo(this.currentId, this.todoForm.controls['todo'].value, this.todoForm.value.priority);
    }
  }


}
