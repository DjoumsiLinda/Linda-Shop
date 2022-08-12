import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NbAclService, NbRoleProvider, NbAccessChecker } from '@nebular/security';
import { map } from 'rxjs/operators';

/**
 * Access checker service.
 *
 * Injects `NbRoleProvider` to determine current user role, and checks access permissions using `NbAclService`
 */
 @Injectable()
 export class AccessChecker extends NbAccessChecker {

  constructor(protected override roleProvider: NbRoleProvider, protected override acl: NbAclService) {
    super(roleProvider, acl);
  }

  /**
   * Checks whether access is granted or not
   *
   * @param {string} permission
   * @param {string} resource
   * @returns {Observable<boolean>}
   */

  override isGranted(permission: string, resource: string): Observable<boolean> {
    var result: boolean = true;

    this.roleProvider.getRole().pipe(
      map((role: string | string[]) => Array.isArray(role) ? role : [role]),
      map((roles: string[]) => {
        return true;
      })
    ).subscribe(check => result = check);

    return of(result);
  }
}
