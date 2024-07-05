import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NivelCumplimientoService } from '../../services/nivel-cumplimiento.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TipoFeedbackService } from '../../services/tipo-feedback.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import {  SubscriptionLike } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pregunta6',
  templateUrl: './pregunta6.component.html',
  styleUrl: './pregunta6.component.css',
})
export class Pregunta6Component implements OnInit, OnDestroy {
  mensaje = '';
  cantidadMembers = 0;
  members = [];
  member: any = {};
  nivelesCumplimiento: any[] = [];
  form!: FormGroup;
  feedbacks: any[] = [];
  cantidadMembersEncuestados = 0;
  submitted = false;
  membersEncuestados: any[] = [];
  feedbackError = true;
  textBoton = 'Sig.';
  private locationSubscription: SubscriptionLike;

  constructor(
    private nivelCumplimientoService: NivelCumplimientoService,
    private fb: FormBuilder,
    private tipoFeedbackService: TipoFeedbackService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private location: Location
  ) {
    this.locationSubscription = this.location.subscribe((event) => {
      this.eliminarMember();
    });
  }

  ngOnInit() {
    window.addEventListener('beforeunload', this.confirmarRecarga);
    this.inicializarForm();
    this.mostrarMembers();
    this.listarNivelCumplimiento();
    this.listarTipoFeedback();
    this.setarData();
    this.validarMembers();
    this.mostrarTextoBoton();
  }

  ngOnDestroy() {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }

    window.removeEventListener('beforeunload', this.confirmarRecarga);
  }

  confirmacionRetroceso() {
    const confirmacion = confirm(
      '¿Estás seguro de regresar a la página anterior?. Los cambios avanzados hasta el momento se perderán.'
    );
    if (confirmacion) {
      this.eliminarMember();
      this.router.navigate(['/poclac/p5']);
    }
  }

  confirmarRecarga(event: BeforeUnloadEvent) {
    const mensaje =
      '¿Estás seguro de que quieres recargar la página? Los cambios no guardados se perderán.';
    event.returnValue = mensaje; // Estándar para la mayoría de los navegadores
    return mensaje; // Para algunos navegadores más antiguos
  }

  inicializarForm() {
    this.form = this.fb.group({
      general: this.fb.control('', Validators.required),
      que: this.fb.control('', Validators.required),
      como: this.fb.control('', Validators.required),
      feedbackApreciativo: this.fb.control(''),
      feedbackConstructivo: this.fb.control(''),
    });
  }

  listarNivelCumplimiento() {
    this.nivelCumplimientoService.listar().subscribe((data) => {
      this.nivelesCumplimiento = data;
    });
  }

  listarTipoFeedback() {
    this.tipoFeedbackService.listar().subscribe((data) => {
      this.feedbacks = data;
    });
  }

  mostrarMembers() {
    const membersData = localStorage.getItem('members');
    this.members = membersData ? JSON.parse(membersData) : [];

    if (this.members.length === 0) {
      this.mensaje = 'No hay miembros seleccionados';
      return;
    }

    this.cantidadMembers = this.members.length;
    this.member = this.members[0];
  }

  mostrarTextoBoton() {
    if (this.cantidadMembersEncuestados === this.cantidadMembers - 1) {
      this.textBoton = 'Finalizar';
      return;
    }

    if (this.cantidadMembers > 1) {
      this.textBoton = 'Sig. Member';
    }
  }

  siguiente() {
    this.submitted = true;

    const { feedbackApreciativo, feedbackConstructivo } = this.form.value;

    if (!feedbackApreciativo?.trim() && !feedbackConstructivo?.trim()) {
      this.feedbackError = true;
      Swal.fire({
        title: "Advertencia!",
        text: "No has respondido todas las preguntas que son obligatorias.",
        icon: "error",
        confirmButtonColor: '#001E57',
      });
      return;
    }

    this.feedbackError = false;

    if (this.form.valid) {
      localStorage.setItem(
        'member_' + this.member.id,
        JSON.stringify({
          member: this.member,
          feedback: this.form.value,
        })
      );

      this.cantidadMembersEncuestados++;

      this.mostrarTextoBoton();

      if (this.cantidadMembersEncuestados === this.cantidadMembers) {
        this.router.navigate(['/poclac/p7']);
        return;
      }

      this.member = this.members[this.cantidadMembersEncuestados];
      this.form.reset();
      this.submitted = false;
      // Desplazarse al principio de la página
      this.viewportScroller.scrollToPosition([0, 0]);

      const memberData = localStorage.getItem('member_' + this.member.id);
      if (memberData) {
        const data = JSON.parse(memberData);
        this.form.patchValue(data.feedback);
        return;
      }
    }
    else {
      Swal.fire({
        title: "Advertencia!",
        text: "No has respondido todas las preguntas que son obligatorias.",
        icon: "error",
        confirmButtonColor: '#001E57',
      });
    }
  }

  setarData() {
    for (let i = this.members.length - 1; i >= 0; i--) {
      this.member = this.members[i];
      const memberData = localStorage.getItem('member_' + this.member.id);
      if (memberData) {
        const data = JSON.parse(memberData);
        this.form.patchValue(data.feedback);
        this.cantidadMembersEncuestados = i;
        return;
      }
    }
  }

  atras() {
    if (this.cantidadMembersEncuestados == 0) {
      this.confirmacionRetroceso();
      return;
    }



    this.cantidadMembersEncuestados--;

    this.member = this.members[this.cantidadMembersEncuestados];
    this.form.reset();
    this.submitted = false;
    // Desplazarse al principio de la página
    this.viewportScroller.scrollToPosition([0, 0]);

    const memberData = localStorage.getItem('member_' + this.member.id);
    if (memberData) {
      const data = JSON.parse(memberData);
      this.form.patchValue(data.feedback);
    }

    this.mostrarTextoBoton();
  }

  eliminarMember() {
    const keys = Object.keys(localStorage);
    const memberKeys = keys.filter((key) => key.startsWith('member_'));
    memberKeys.forEach((key) => localStorage.removeItem(key));
  }

  validarMembers() {
    if (this.members.length === 0) {
      this.router.navigate(['/poclac/p5']);
    }
  }
}
