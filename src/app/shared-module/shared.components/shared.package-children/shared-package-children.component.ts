import {AfterViewInit, Component, Inject, Input, ViewChild} from "@angular/core";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {GridWrapperComponent, ITableData, UIState, Utils} from "@openlm/openlm-common";
import {fromEvent, Observable} from "rxjs";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";
import {DOCUMENT} from "@angular/common";
import {debounceTime} from "rxjs/operators";

@UntilDestroy()
@Component({
  selector: 'app-package-children',
  templateUrl: './shared-package-children.component.html',
  styleUrls: ['./shared-package-children.component.scss']
})


export class SharedPackageChildrenComponent<T, K extends (keyof T & string)> implements AfterViewInit {

  private resizeEvent$ = fromEvent(window, 'resize');

  constructor(
    @Inject(DOCUMENT)
    private document: Document
  ) {
  }

  @ViewChild('packageChildrenGrid')
  private packageChildrenGrid!: GridWrapperComponent;

  @ViewChild('packageChildrenDialog')
  private packageChildrenDialog!: DialogComponent;

  @Input()
  public loadDataFn!: (uiState?: UIState, packageId?: number) => Promise<void>;

  @Input()
  public changeVisibilityStateFn!: (visibilityState?: boolean) => void;

  @Input()
  public defaultColumns!: K[];

  @Input()
  public dataSource$!: Observable<ITableData<T>>;

  @Input()
  public isDialogVisible$!: Observable<boolean>;

  @Input()
  public parentPackageName$!: Observable<string>;

  public ngAfterViewInit(): void {
    this.setDialogDimensions();
    this.setDialogPosition();

    this.resizeEvent$
      .pipe(
        untilDestroyed(this),
        debounceTime(100)
      ).subscribe(() => {
      this.setDialogDimensions();
      this.setDialogPosition();
    })
  }

  public onDataBound(): void {
    const textContent = 'No available Package Child details for the selected repository';

    Utils.displayNoRecordsTextToGrid(this.packageChildrenGrid, textContent);
  }

  private setDialogDimensions(): void {
    const containerElementClientRect = (this.document.getElementsByClassName('component-wrapper').item(0) as HTMLElement).getBoundingClientRect();

    this.packageChildrenDialog.width = containerElementClientRect.width * 80 / 100;
    this.packageChildrenDialog.height = containerElementClientRect.height * 90 / 100;
  }

  private setDialogPosition(): void {
    const containerElementClientRect = (this.document.getElementsByClassName('component-wrapper').item(0) as HTMLElement).getBoundingClientRect();

    this.packageChildrenDialog.position = {
      X: (containerElementClientRect.width - (this.packageChildrenDialog.width as number)) / 2 + containerElementClientRect.left,
      Y: (containerElementClientRect.height - (this.packageChildrenDialog.height as number)) / 2 + containerElementClientRect.top
    }
  }
}
