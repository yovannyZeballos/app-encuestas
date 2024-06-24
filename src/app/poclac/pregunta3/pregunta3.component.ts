import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TribuService } from '../../services/tribu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta3',
  templateUrl: './pregunta3.component.html',
  styleUrl: './pregunta3.component.css'
})
export class Pregunta3Component implements OnInit {

  form: FormGroup;
  submitted = false;
  tribus: any[] = [];

  constructor(private tribuService: TribuService,
    private router: Router
  ) {
    
    const tribu = Number(localStorage.getItem('tribu')) || undefined;
    
    this.form = new FormGroup({
      tribu: new FormControl(tribu, Validators.required),
    });
  }

  ngOnInit() {
    this.tribuService.listar().subscribe(data => {
      this.tribus = data;
    });
  }

  siguiente() {
    this.submitted = true;

    if (this.form.valid) {
      localStorage.setItem('tribu', this.form.value.tribu);
      this.router.navigate(['/poclac/p4']);
    }
  }

  changeTribu(){
    localStorage.removeItem('squad');
  }
}
