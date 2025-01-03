import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OwnersViewerComponent } from './owners-viewer/owners-viewer.component';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { OwnerCreateComponent } from './owner-create/owner-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'owners',
        component: OwnersViewerComponent
      },
      {
        path: 'owners/create',
        component: OwnerCreateComponent
      },
      {
        path: 'owners/edit/:id',
        component: OwnerCreateComponent
      }
    ])
  ],
  declarations: [OwnersViewerComponent, OwnerCreateComponent]
})
export class OwnersModule { }
