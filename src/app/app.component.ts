import {AfterViewInit, ChangeDetectorRef, Component, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ToastService, Utils} from "@openlm/openlm-common";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ToastComponent} from "@syncfusion/ej2-angular-notifications";
import {DOCUMENT} from "@angular/common";

import {NAVBAR_ITEMS} from "./shared-module/shared.constants";


@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  constructor(
    public router: Router,
    private changeDetectionRef: ChangeDetectorRef,
    private toastService: ToastService,
    @Inject(DOCUMENT)
    private document: Document
  ) {
    this.toastService.triggeredToast$
      .pipe(
        untilDestroyed(this)
      )
      .subscribe(res => {
        this.toast.show(res);
      });
  }

  @ViewChild('toast')
  public toast!: ToastComponent;

  @HostListener('window:load', ['$event'])
  public afterWindowLoad(): void {
    const startupSpinner = this.document.getElementsByClassName('startup-spinner-overlay').item(0);

    if (!!startupSpinner) {
      startupSpinner.classList.add('fade-out-startup-spinner-overlay');
      setTimeout(() => startupSpinner.remove(), 400);
    }
  }

  public applicationTitle: string = 'Licenses'
  public navbarItems = NAVBAR_ITEMS;

  public ngOnInit(): void {
    Utils.resetAllGridsUnneededSettingsOnAppStartup();
  }

  public ngAfterViewInit(): void {
    this.changeDetectionRef.detectChanges();
    this.afterWindowLoad();
  }
}
