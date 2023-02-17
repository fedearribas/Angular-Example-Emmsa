import { NgModule } from '@angular/core';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

@NgModule({
  declarations: [],
  exports: [
    MenubarModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    AccordionModule,
    PanelModule,
    DropdownModule,
    CardModule,
    TableModule,
    ToolbarModule,
    InputSwitchModule,
    MenuModule,
    MessagesModule,
    MessageModule
  ]
})
export class PrimengModule { }
