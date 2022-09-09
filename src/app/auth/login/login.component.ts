import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToasterService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    let localEmail = localStorage.key(0)|| "";
    let localPassword = localStorage.getItem(localEmail)||"";
    if(localEmail==null || localPassword==null || localEmail== "" || localPassword==""){
      return;
    }

    this.userService.login(localEmail).subscribe(
      (user) =>{
        if (user.password.localeCompare(localPassword) ==0) {
          this.toastrService.showMessage(" Wilkommen "+ user.lastname+" !", "SUCCESS");
          localStorage.setItem(user.email, user.password);
          this.router.navigate(["/pages"])
        }

      },
      (error)=>{
        this.toastrService.showMessage( localEmail + " existiert nicht.", "WARN");
        this.router.navigate(["/auth/login"])
      }
    );
  }

  login(): void{
    if(this.loginForm.invalid) {
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    let email = this.loginForm.get("email")?.value!;
    this.userService.login(email).subscribe(
      (user) =>{
        bcrypt.compare(this.loginForm.get("password")?.value!, user.password).then((match) => {
          if (match) {
            this.toastrService.showMessage(" Wilkommen "+ user.lastname+" !", "SUCCESS");
            localStorage.setItem(user.email, user.password);
            this.router.navigate(["/pages"])
          } else {
            this.toastrService.showMessage( email + " existiert nicht.", "WARN");
            this.router.navigate(["/auth/login"])
          }
        });

      },
      (error)=>{
        this.toastrService.showMessage( email + " existiert nicht.", "WARN");
        this.router.navigate(["/auth/login"])
      }
    );

  }
  /*https://www.youtube.com/watch?v=7DzdebaSgxg
    https://www.youtube.com/watch?v=rBNOc4ymd1E
  https://www.youtube.com/watch?v=eMJ5spB3P1c */
}
