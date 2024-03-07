import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';
import { ConnectionsComponent } from './find-connections.component';
import { ConnectionsModuleRoutingModule } from './find-connections-routing.module';

@NgModule({
  declarations: [ConnectionsComponent],
  imports: [ConnectionsModuleRoutingModule, SharedModule],
})
export class ConnectionsModule {}
