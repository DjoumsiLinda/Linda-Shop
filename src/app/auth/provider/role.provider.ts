import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbRoleProvider } from '@nebular/security';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class RoleProvider implements NbRoleProvider {

  constructor(private authService: NbAuthService) {
  }

  roles: string[]=['user', 'developer'];

  getRole(): Observable<string[]> {
    let result: string[] = ['user', 'developer'];

    this.authService.onTokenChange().subscribe((token) => {
      token.getPayload()['principal']['authorities'].forEach((element: { authority: string; level: string; }) => {
        result.push(element.authority + "-" + element.level);
      });
    });

    return of(result);
  }
}
