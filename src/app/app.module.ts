import { TodoEffects } from './store/todo/todo.effects';
import { StoreModule } from '@ngrx/store';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TodoService } from './services/todo.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA  } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TodoListComponent } from './components/todo/todo-list/todo-list.component';
import { TodoDetailsComponent } from './components/todo/todo-details/todo-details.component';
import { EffectsModule } from '@ngrx/effects';
import { TodoListItemComponent } from './components/todo/todo-list-item/todo-list-item.component';

import * as TodoReducer from './store/todo/todo.reducer';
import { CreateOrderComponent } from './components/order/create-order/create-order.component';
import * as ItemReducer from './store/item/item.reducer';
import {ItemEffects} from './store/item/item.effects';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/order/cart/cart.component';
import * as OrderReducer from './store/order/order.reducer';
import {OrderEffects} from './store/order/order.effects';
import {RouterModule, Routes} from '@angular/router';
import { InvoiceComponent } from './components/order/invoice/invoice.component';
import { CompleteOrderComponent } from './components/order/complete-order/complete-order.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CustomerEffects} from './store/customer/customer.effects';
import * as CustomerReducer from './store/customer/customer.reducer';


const appRoutes: Routes = [
  { path: '', component: CreateOrderComponent },
  { path: 'customers/create', component: CompleteOrderComponent },
  { path: 'invoice',      component: InvoiceComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoDetailsComponent,
    TodoListItemComponent,
    CreateOrderComponent,
    HeaderComponent,
    CartComponent,
    InvoiceComponent,
    CompleteOrderComponent,
    TabsComponent,
    TabComponent
  ],
  imports: [
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    StoreModule.forRoot({todos: TodoReducer.TodoReducer}),
    EffectsModule.forRoot([TodoEffects]),
    StoreModule.forRoot({items: ItemReducer.ItemReducer, orders: OrderReducer.OrderReducer, customers : CustomerReducer.CustomerReducer}),
    EffectsModule.forRoot([ItemEffects, OrderEffects, CustomerEffects]),
  ],
  providers: [
    TodoService,
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
