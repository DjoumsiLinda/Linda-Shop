import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { max } from 'rxjs';
import { Adresse } from 'src/app/model/adresse';
import { User } from 'src/app/model/user';
import { ToasterService } from 'src/app/service/toastr.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  user: User = new User;
  settingForm: FormGroup = this.initProfile(new User());
  editProfile: boolean = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToasterService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let localEmail = localStorage.getItem("User")?.split(":")[0]|| "";
    let localPassword = localStorage.getItem("User")?.split(":")[1]|| "";
    if(localEmail==null || localPassword==null || localEmail== "" || localPassword==""){
      return;
    }else{
      this.userService.login(localEmail).subscribe(
        (user) =>{
          if (user.password.localeCompare(localPassword) ==0) {
            this.user=user;
            this.initProfile(this.user)
          }else{
            console.log("password dont match in SettingComponent")
            this.router.navigate(["/auth/login"])
          }
        },
        (error)=>{
          this.toastrService.showMessage( localEmail + " does not exist.", "WARN");
          this.router.navigate(["/auth/register"])
        }
      );
    }
    console.log("*********", this.settingForm.valid)
  }

  setting(){
    console.log("*********", this.settingForm.valid)
    if(!this.settingForm) {
      return;
    }
    
    let updateUser: User=new User();
    let adresse1: Adresse=new Adresse();
    let adresse2: Adresse=new Adresse();
    updateUser.firstname=this.settingForm.value.firstname;
    updateUser.lastname=this.settingForm.value.lastname;
    updateUser.email=this.settingForm.value.email;
    if(!updateUser.email.includes("@")){
      this.toastrService.showMessage("Email Adress not correct.", "WARN");
      return;
    }
    //updateUser.password=this.user.password;
    updateUser.iban=this.settingForm.value?.iban;
    if(!updateUser.iban.includes("DE")){
      this.toastrService.showMessage("IBAN not correct.", "WARN");
      return;
    }
    adresse1.id=this.user.userAdresse.id;
    adresse2.id=this.user.lieferAdresse.id;
    adresse1.plz=this.settingForm.value?.adressePlz;
    adresse1.strasse=this.settingForm.value?.adresseStrasse;
    adresse1.ort=this.settingForm.value?.adresseOrt;
    adresse2.plz=this.settingForm.value?.lieferadressePlz;
    adresse2.strasse=this.settingForm.value?.lieferadresseStrasse;
    adresse2.ort=this.settingForm.value?.lieferadresseOrt;
    updateUser.userAdresse=adresse1;
    updateUser.lieferAdresse=adresse2;
    this.userService.updateUser(updateUser).subscribe(
      (user) =>{
        this.user=user;
        this.toastrService.showMessage("User " +  updateUser.email + " was update.", "SUCCESS");
      },
      (error)=>{
        this.toastrService.showMessage("User " +  updateUser.email + " could not be updated.", "WARN");
      }
    );
  
  }

  initProfile(user: User): FormGroup {
    return this.settingForm = this.formBuilder.group({
      firstname: [this.user.firstname, [Validators.required, Validators.maxLength(50)]],
      lastname: [this.user.lastname, [Validators.required, Validators.maxLength(50)]],
      email: [this.user.email, [Validators.required, Validators.maxLength(30)]],
      //password: [this.user.password, [Validators.required, Validators.minLength(5)]],
      iban: [this.user.iban, Validators.maxLength(15)],
      adressePlz: [this.user.userAdresse?.plz, Validators.maxLength(7)],
      adresseStrasse: [this.user.userAdresse?.strasse],
      adresseOrt: [this.user.userAdresse?.ort],
      lieferadressePlz: [this.user.lieferAdresse?.plz, Validators.maxLength(7)],
      lieferadresseStrasse: [this.user.lieferAdresse?.strasse],
      lieferadresseOrt: [this.user.lieferAdresse?.ort]
    });
  }

  onEditHandle(){
    this.editProfile=!this.editProfile;
  }

}
