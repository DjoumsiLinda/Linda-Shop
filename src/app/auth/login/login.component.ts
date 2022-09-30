import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import * as bcrypt from "bcryptjs";
import {ToasterService} from "../../service/toastr.service";
import {Router} from "@angular/router";
import { SharedService } from 'src/app/service/shared.service';

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
  url: string="";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToasterService,
    private router: Router,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {}

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
            this.toastrService.showMessage("Welcome "+ user.lastname+" !", "SUCCESS");
            this.sharedService.user.next(user);
            this.router.navigate(['/products/'])
            console.log("sucessfull LOGIN: ", this.url);
            localStorage.setItem("User", user.email+":"+user.password);
            
          } else {
            this.toastrService.showMessage( email + " does not exist.", "WARN");
            this.router.navigate(["/auth/login"])
          }
        });

      },
      (error)=>{
        this.toastrService.showMessage( email + " does not exist.", "WARN");
        this.router.navigate(["/auth/login"])
      }
    );

  }
  /*https://www.youtube.com/watch?v=7DzdebaSgxg
    https://www.youtube.com/watch?v=rBNOc4ymd1E
  https://www.youtube.com/watch?v=eMJ5spB3P1c */
}
