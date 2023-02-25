import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, RouterModule } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {

  hide = true;
  emailFormControl = new FormControl('irmayanet86@nauta.cu', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('AmriTenay*85', [Validators.required]);
  fGrouplogin = new FormGroup([this.emailFormControl,this.passwordFormControl]);

  matcher = new MyErrorStateMatcher();
  faillogin : boolean = false;
  constructor(private servauth: AuthService, private route: Router){

  }
  auth(){
    this.faillogin=false;
    if (this.fGrouplogin.valid == true){
          let btn = document.querySelector("#btnlogin");
          
          btn?.classList.add('disabled');

          this.servauth.login(this.emailFormControl.value!, this.passwordFormControl.value!).subscribe( 
            result=> {
               this.route.navigate(['/dashboard']);
               btn?.classList.remove('disabled');
            }, error =>{
              this.faillogin=true;
              btn?.classList.remove('disabled');
              console.log(error);
            } )

          
    }
    
  }
}
