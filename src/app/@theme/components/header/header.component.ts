import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { NbAccessChecker } from '@nebular/security';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbWindowRef, NbWindowService } from '@nebular/theme';
import { Subject, Subscription, timer } from 'rxjs';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  
}
