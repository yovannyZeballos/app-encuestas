import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SquadService } from '../../services/squads.service';
import { MemberService } from '../../services/member.service';
import { alMenosUnoSeleccionadoValidator } from '../../Validators/checkbox.validator';

@Component({
  selector: 'app-pregunta5',
  templateUrl: './pregunta5.component.html',
  styleUrl: './pregunta5.component.css'
})
export class Pregunta5Component implements OnInit {

  nombreSquad = '';
  form: FormGroup;
  submitted = false;

  constructor(
    private memberService: MemberService,
    private squadService: SquadService,
    private router: Router,
    private fb: FormBuilder

  ) {
    this.form = this.fb.group({
      checkboxes: this.fb.array([])
    });
  }

  ngOnInit() {
    const idSquad = Number(localStorage.getItem('squad') || '0');
    this.squadService.obtener(idSquad).subscribe(data => {
      this.nombreSquad = data.nombre;
    });

    this.inicializarValoresForm();

  }

  inicializarValoresForm() {
    const idSquad = Number(localStorage.getItem('squad') || '0');
    const membersSeleccionados = JSON.parse(localStorage.getItem('members') || '[]');

    this.memberService.listarPorSquad(idSquad).subscribe(members => {
      const controls = members.map(member => this.fb.group({
        id: member.id,
        nombre: member.nombre,
        seleccionado: membersSeleccionados.some((m: any) => m.id === member.id)
      }));
      this.form.setControl('checkboxes', this.fb.array(controls, alMenosUnoSeleccionadoValidator()));
    });
  }

  get checkboxesFormArray(): FormArray {
    return this.form.get('checkboxes') as FormArray;
  }

  siguiente() {
    this.submitted = true;

    if (this.form.valid) {
      const seleccionados = this.form.value.checkboxes.filter((c: any) => c.seleccionado);
      localStorage.setItem('members', JSON.stringify(seleccionados));
      this.eliminarMember();
      this.router.navigate(['/poclac/p6']);
    }
  }

  eliminarMember() {
    const keys = Object.keys(localStorage);
    const memberKeys = keys.filter(key => key.startsWith('member_'));
    memberKeys.forEach(key => localStorage.removeItem(key));
  }
}
