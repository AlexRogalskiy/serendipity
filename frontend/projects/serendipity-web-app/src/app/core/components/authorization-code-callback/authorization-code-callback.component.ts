import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from 'auth-bff-lib';
import { LoggerService } from "utils-lib";

@Component({
  template: ``
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationCodeCallbackComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private logger: LoggerService) {}

  ngOnInit(): void {

    this.logger.info('AuthorizationCodeCallbackComponent: ngOnInit()');

    this.authService.handleRedirectCallback();

    this.router.navigate(['/']);

  }

}
