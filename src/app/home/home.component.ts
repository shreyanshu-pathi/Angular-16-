import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  name1: string = 'Shreya';
  name2 = signal('Virat');
  name3 = new BehaviorSubject('Rohit');
  name$ = this.name3.asObservable();

  update(): void{
    setInterval(()=>{
      this.name1 = 'Shreyanshu';
      this.name2.set('Virat kohli');
      this.name3.next('Rohit sharma');
    });
  }

  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);

  emailFound: boolean = false;
  registerForm: FormGroup;

  constructor(){
    this.registerForm = this.fb.group({
      name: [''],
      phone: [''],
      email: [''],
      password: ['']
    });
  }

  save(): void{
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // const enteredEmail = this.registerForm.get('email')?.value.toLowercase();
const enteredEmail = this.registerForm.get('email')?.value
    .trim()
    .toLowerCase();
    this.emailFound = users.some(
      (user:any)=> user.email?.trim().toLowercase() === enteredEmail);

      if(this.emailFound){
        this.snackBar.open('Email is already exists', 'Close', {
          duration: 3000
        });
        return;
      }

    const newUser = this.registerForm.getRawValue();

    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    this.snackBar.open('User successfully registered', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

    this.registerForm.reset();
  }
}
