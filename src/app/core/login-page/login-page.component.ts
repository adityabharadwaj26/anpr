import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnprService } from 'src/app/anpr.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  loginDetails = {
    username: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private anprService: AnprService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loginDetails.username = this.f.username.value;
    this.loginDetails.password = this.f.password.value;
    this.loading = false;


    this.anprService.login(this.loginDetails).subscribe(res => {
      sessionStorage.setItem('token', res.token);
      this.router.navigate(['']);
    }, error => {
      alert(JSON.stringify(error.error.error));
    });
  }

}
