import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide: boolean = false;
  signInForm!: UntypedFormGroup;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _authService: AuthService,
              private _formBuilder: UntypedFormBuilder,
              private _snackBar: MatSnackBar) {
    // localStorage.clear();
  }


  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
        username  : ['', Validators.required],
        password  : ['', Validators.required],
      }
    );
  }

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }
    this.signInForm.disable();
    this._authService.signIn(this.signInForm.value)
      .subscribe((v) => {
          console.log(v);
          // localStorage.getItem('HEADER_USER');
          localStorage.setItem('HEADER_USER', JSON.stringify(v.user));
          this._authService.accessToken = v.token;
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '';
          this._router.navigateByUrl(redirectURL).then();
        }
      );

  }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'OK', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }
}
