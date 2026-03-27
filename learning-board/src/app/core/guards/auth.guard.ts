import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

/** Protege rutas que requieren sesión. Redirige a /auth/login si no hay token. */
export const authGuard: CanActivateFn = (_, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const currentUrl = state.url;
  const hasOAuthResponse =
    currentUrl.includes('code=') ||
    currentUrl.includes('access_token=') ||
    currentUrl.includes('token=');

  if (auth.isLoggedIn()) {
    return true;
  }

  if (hasOAuthResponse) {
    return router.parseUrl(`/auth/callback${currentUrl.includes('?') ? currentUrl.slice(currentUrl.indexOf('?')) : ''}`);
  }

  return router.createUrlTree(['/auth/login']);
};
