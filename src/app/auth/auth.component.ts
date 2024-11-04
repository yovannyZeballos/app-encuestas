import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { usuario, password } = this.loginForm.value;
      this.authService.login(usuario, password).subscribe(
        response => {
          this.authService.setToken(response.token);
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Has iniciado sesión correctamente.'
          }).then(() => {
            // Redirigir al usuario a otra página después de cerrar el modal
            this.router.navigate(['/admin']);
          });
        },
        error => {
          // Manejar el error del servidor
          console.error('Error en el inicio de sesión', error);
          Swal.fire({
            icon: 'error',
            title: 'Error en el inicio de sesión',
            text: 'Por favor, verifica tus credenciales e intenta nuevamente.'
          });
        }
      );
    } else {
      // Mostrar errores
      console.log('Formulario no válido');
    }
  }
}