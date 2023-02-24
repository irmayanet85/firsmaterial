import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MyErrorStateMatcher } from '../login/login.component';
import { Usuario } from 'src/app/models/user.models';
import { environment } from 'src/environments/environment';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hide2 = true;
  email = new FormControl('', [Validators.required, Validators.pattern(environment.emailPattern)]);
  name = new FormControl('', [Validators.required, Validators.minLength(6)]);

  password = new FormControl('AdminIrma*8', [Validators.required, this.passworRequeriment()]);
  password2 = new FormControl('AdminIrma*8', [Validators.required]);

  

  fGroupRegister = new FormGroup(
    [this.name, this.email,this.password2, this.password], 
    { asyncValidators: this.passwordNotMach() }
    );

  matcher = new MyErrorStateMatcher();
  error : string = '';
  disabledbtn : boolean = false;

  constructor(private servauth: AuthService, private route: Router, private fb: FormBuilder){

  }
  ngOnInit(): void {
    
  }
  prueba(){
 
    console.log('password desde prueba', this.password2.value, this.password.value);
    if(this.password.value === this.password2.value )
    {
      console.log('son iguales');
      this.password2.setErrors(null);
     // this.password.setErrors(null);
    
      
    } 
    else {
      console.log('son diferentes');
      this.password2.setErrors({notEqual: true});
      //this.password.setErrors({notEqual: true});
      
    }
  }
  passwordNotMach(): any{
    return (group: FormGroup) => {

      // const pass = this.password.value;
      // const pass2 = this.password2.value;

      console.log('password', this.password2.value, this.password.value);
      if(this.password.value === this.password2.value )
      {
        console.log('son iguales');
        this.password2.setErrors(null);
       // this.password.setErrors(null);
        return of(null);
        
      } 
      else {
        console.log('son diferentes');
        this.password2.setErrors({notEqual: true});
        //this.password.setErrors({notEqual: true});
        return of({ fields: true });
        
      }
      // return of('value').pipe(
      //   map((value) => (value === a || value === b ? { fields: false } : { fields: true }))
      // );
    };
   
 }
  passworRequeriment(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass = String(control.value);
      let count = 0;
      if ( (pass.length >= 8) && (pass.length <= 32))
      {
           if( pass.match(".*\\d.*") )
              count ++;
           if( pass.match(".*[a-z].*") )
              count ++;
           if( pass.match(".*[A-Z].*") )
              count ++;
           const shain = ".*[*.!@#$%^&(){}[]:" + ";'<>,.?/~`_+-=|\\].*"
           if( pass.match(shain) )
              count ++;
           
        }
     
        if (count >= 3)
        {
        
         return null;
        }
  
        return {forbiddenName: {value: 'La constrasena no cumple con el patron'}};
      }
      
    };
  register(){
    this.error='';
    if (this.fGroupRegister.valid == true){
          this.disabledbtn = true;
          const newUser: Usuario = new Usuario(this.name.value!, this.email.value!, this.password.value!)

          this.servauth.registerUser(newUser).subscribe( 
            result=> {
              this.disabledbtn = false;
               this.route.navigate(['/login']);
               console.log('registered');
            }, error =>{
             
              this.disabledbtn = false;
              if (error.error.msg){
                this.error = error.error.msg;
                console.log(error.error.msg);
              }
              console.log(error);
            } )

          
    }
    else {
      console.log('No registro');
      this.fGroupRegister.markAllAsTouched();
    }
    
  }

}
