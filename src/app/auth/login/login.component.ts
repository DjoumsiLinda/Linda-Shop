import { Component, Inject, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../model/user";
import {UserService} from "../../service/user.service";
import * as bcrypt from "bcryptjs";
import {ToasterService} from "../../service/toastr.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  loginForm = this.formBuilder.group({
    email:['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private  formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login(): void{
    if(this.loginForm.invalid) {
      return;
    }
    let findUser: User = new User();
    const salt = bcrypt.genSaltSync(10);
    findUser.email = this.loginForm.get("email")?.value!;
    findUser.password = bcrypt.hashSync(this.loginForm.get("password")?.value!, salt);

    this.userService.login(this.loginForm.get("email")?.value!).subscribe(
      (user) =>{
        bcrypt.compare(this.loginForm.get("password")?.value!, user.password).then((match) => {
          if (match) {
            this.toastrService.showMessage(" Wilkommen "+ user.lastname+" !", "SUCCESS");
            this.router.navigate(["/pages"])
          } else {
            this.toastrService.showMessage( findUser.email + " existiert nicht.", "WARN");
            this.router.navigate(["/auth/login"])
          }
        });

      },
      (error)=>{
        this.toastrService.showMessage( findUser.email + " existiert nicht.", "WARN");
        this.router.navigate(["/auth/login"])
      }
    );
  }


  /*https://www.youtube.com/watch?v=7DzdebaSgxg
    https://www.youtube.com/watch?v=rBNOc4ymd1E
  https://www.youtube.com/watch?v=eMJ5spB3P1c */
}
