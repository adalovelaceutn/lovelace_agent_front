import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  template: `
    <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#1a1b1e;color:#e8e9ec;font-family:sans-serif;padding:24px;">
      <div style="max-width:560px;text-align:center;line-height:1.5;">
        <p style="margin:0 0 12px;font-size:18px;">{{ title }}</p>
        <p style="margin:0;color:#b7bac5;">{{ message }}</p>
      </div>
    </div>
  `,
})
export class AuthCallbackComponent implements OnInit {
  title = 'Autenticando...';
  message = 'Procesando la respuesta de Google.';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = this.extractToken();
    const code = this.extractCode();

    if (token) {
      this.authService.storeToken(token);
      this.router.navigate(['/dashboard']);
      return;
    }

    if (code) {
      this.title = 'No se pudo completar el login con Google';
      this.message =
        'Google devolvio un code de autorizacion, pero el backend no expone ningun endpoint para canjearlo por un access token de la aplicacion. Hay que corregir ese flujo del lado servidor.';
      return;
    }

    this.title = 'Respuesta OAuth invalida';
    this.message = 'No se encontro ningun token ni codigo de autorizacion en la URL.';
  }

  private extractToken(): string | null {
    const params = new URLSearchParams(window.location.search);
    const queryToken = params.get('access_token') ?? params.get('token');
    if (queryToken) {
      return queryToken;
    }

    const hash = window.location.hash.replace(/^#/, '');
    const hashParams = new URLSearchParams(hash);
    return hashParams.get('access_token') ?? hashParams.get('token');
  }

  private extractCode(): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }
}
