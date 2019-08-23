import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject, iif, of } from 'rxjs';
import { takeUntil, switchMap, flatMap, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'plop-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  private readonly unsubscribe: Subject<void>;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private changeDetectorRef: ChangeDetectorRef,
    private swUpdate: SwUpdate,
    private snackbar: MatSnackBar
    // private authService: AuthService
  ) {
    this.unsubscribe = new Subject();
  }

  ngOnInit(): void {
    // if (this.swUpdate.isEnabled) {
    this.swUpdate.available.pipe(
      takeUntil(this.unsubscribe),
      switchMap(() => this.snackbar.open('Newer version of the app is available', 'Refresh').onAction())
    ).subscribe(this.reloadPage, this.reloadPage);
    // }
    // this.authService.get().pipe(
    //   tap(r => console.log(r)),
    //   mergeMap((user) => iif(() => user, of(true), this.authService.guestSignin()))
    // ).subscribe(data => {
    //   console.log(data);
    // });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private reloadPage = (): void => {
    this.document.location.reload();
    this.changeDetectorRef.markForCheck();
  }

}

