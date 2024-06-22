import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RolesService } from '../../services/rol.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta2',
  templateUrl: './pregunta2.component.html',
  styleUrl: './pregunta2.component.css'
})
export class Pregunta2Component implements OnInit {

  form: FormGroup;
  submitted = false;
  roles: any[] = [];

  constructor(private rolesService: RolesService,
    private router: Router
  ) {
    this.form = new FormGroup({
      rol: new FormControl(localStorage.getItem('rol') || '', Validators.required),
    });
  }

  ngOnInit() {
    this.rolesService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  siguiente() {
    this.submitted = true;

    if (this.form.valid) {
      localStorage.setItem('rol', this.form.value.rol);
      this.router.navigate(['/poclac/p3']);
    }
  }
}
