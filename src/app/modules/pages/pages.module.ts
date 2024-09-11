import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    ListComponent,
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule {}
