import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, Inject } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { DOCUMENT } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';

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

