import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TribuService } from '../../services/tribu.service';
import { Router } from '@angular/router';
import { SquadService } from '../../services/squads.service';

@Component({
  selector: 'app-pregunta4',
  templateUrl: './pregunta4.component.html',
  styleUrl: './pregunta4.component.css'
})
export class Pregunta4Component implements OnInit {

  nombreTribu = '';
  form: FormGroup;
  submitted = false;
  squads: any[] = [];

  constructor(
    private tribuService: TribuService,
    private squadService: SquadService,
    private router: Router
  ) {
    const squad = Number(localStorage.getItem('squad')) || undefined;
    this.form = new FormGroup({
      squad: new FormControl(squad, Validators.required),
    });
  }

  ngOnInit() {

    const idTribu = Number(localStorage.getItem('tribu') || '0');

    this.tribuService.obtener(idTribu).subscribe(data => {
      this.nombreTribu = data.nombre;
    });


    this.squadService.listarPorTribu(idTribu).subscribe(data => {
      this.squads = data;
    });
  }

  siguiente() {
    this.submitted = true;

    if (this.form.valid) {
      localStorage.setItem('squad', this.form.value.squad);
      this.router.navigate(['/poclac/p5']);
    }
  }

  changeSquad(){
    localStorage.removeItem('members')
    const keys = Object.keys(localStorage);
    const memberKeys = keys.filter(key => key.startsWith('member_'));
    memberKeys.forEach(key => localStorage.removeItem(key));
  }
}
