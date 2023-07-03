import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    public myForm: FormGroup = this.fb.group({
        email: ['josue@correo.com', [Validators.required, Validators.email]],
        password: ['minami', [Validators.required, Validators.minLength(6)]]
    })

    login() {

        // A este punto surge el problema del CORS si no se corrigió en el backend

        const { email, password } = this.myForm.value;

        this.authService.login(email, password)
            .subscribe({
                next: () => this.router.navigateByUrl('/dashboard'),
                error: (message) => {
                    Swal.fire('Error', message, 'error')
                }
            })
    }
}
