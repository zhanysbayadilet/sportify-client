import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../core/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  hide: boolean = false;
  signUpForm!: UntypedFormGroup;

  constructor(private _router: Router,
              private _activatedRoute: ActivatedRoute,
              private _authService: AuthService,
              private _formBuilder: UntypedFormBuilder,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
        name  : ['', [Validators.required]],
        surname  : ['', [Validators.required]],
        email  : ['', [Validators.required, Validators.email]],
        password  : ['', [Validators.required]]
      }
    );
  }

  signUp() {
    this._authService.signUp(this.signUpForm.value).subscribe(res => {

    })
  }

}
