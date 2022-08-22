import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import * as bcrypt from 'bcryptjs';
import {Router} from "@angular/router";
import { ToasterService} from "../../service/toastr.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm = this.formBuilder.group({
    firstname: ['', [Validators.required, Validators.maxLength(50)]],
    lastname: ['', [Validators.required, Validators.maxLength(50)]],
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })
  constructor(
    private  formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  register(): void{
    if(this.registerForm.invalid) {
      return;
    }
    let newUser: User = new User();
    newUser.firstname = this.registerForm.get("firstname")?.value!;
    newUser.lastname = this.registerForm.get("lastname")?.value!;
    newUser.email = this.registerForm.get("email")?.value!;
    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(this.registerForm.get("password")?.value!, salt);

    this.userService.register(newUser).subscribe(
      (user) =>{
        this.toastrService.showMessage("User " +  newUser.email + " wurde erstellt.", "SUCCESS");
        this.router.navigate(["/auth/login"])
      },
      (error)=>{
        this.toastrService.showMessage("User " +  newUser.email + " konnte nicht erstellt werden.", "WARN");
        this.router.navigate(["/auth/register"])
      }
    );
  }

}
