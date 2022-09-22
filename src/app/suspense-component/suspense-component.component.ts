import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { from } from 'rxjs';
import { Suspenseable } from 'src/app';
import { DefaultViewDirective } from '../directives/default-view.directive';
import { ErrorViewDirective } from '../directives/error-view.directive';
import { FallbackViewDirective } from '../directives/fallback-view.directive';

@Component({
  selector: 'suspense',
  template: `<ng-template #anchor></ng-template>`,
})
export class SuspenseComponentComponent {
  @ViewChild('anchor', { read: ViewContainerRef }) anchor: ViewContainerRef;
  @ContentChild(DefaultViewDirective) defaultView: DefaultViewDirective;
  @ContentChild(FallbackViewDirective) fallbackView: FallbackViewDirective;
  @ContentChild(ErrorViewDirective) errorView: ErrorViewDirective;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  private compRef: ComponentRef<Suspenseable> | null;

  ngAfterViewInit() {
    this.anchor.createEmbeddedView(this.fallbackView.tpl);

    this.defaultView.fetch().then((comp) => {
      const factory = this.resolver.resolveComponentFactory(comp.default);
      this.compRef = factory.create(this.injector);

      from(this.compRef.instance.setup()).subscribe({
        next: () => {
          this.anchor.remove();
          if (this.compRef) this.anchor.insert(this.compRef.hostView);
        },
        error: () => {
          this.anchor.remove();
          this.anchor.createEmbeddedView(this.errorView.tpl);
        },
      });
    });
  }

  ngOnDestroy() {
    this.compRef?.destroy();
    this.compRef = null;
  }
}
