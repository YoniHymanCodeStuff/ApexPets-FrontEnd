import { Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { OrderQueryParams } from 'src/app/model_Interfaces/OrderQueryParams';
import { orderWithCustomer } from 'src/app/model_Interfaces/orderWithCustomer';
import { Pagination } from 'src/app/model_Interfaces/Pagination';
import { OrdersService } from 'src/app/Services/orders.service';
import { OrderTableSchema } from './orderTableSchema';


@Component({
  selector: 'app-order-viewer',
  templateUrl: './order-viewer.component.html',
  styleUrls: ['./order-viewer.component.css']
})
export class OrderViewerComponent implements OnInit {

  @ViewChild('statusSelect') statusSelectInput: any;

  orders: orderWithCustomer[];
  columnsToDisplay = ['orderId', 'orderTimeStamp'];
  queryParams: OrderQueryParams = new OrderQueryParams();
  pagination: Pagination;

  tableSchema: any = OrderTableSchema;
  displayedColumns: string[] = OrderTableSchema.map((col) => col.key);

  orderStatuses: string[] = ["Pending", "Shipping", "Hunting", "Delivered"];

  constructor(private orderService: OrdersService, private toastr: ToastrService) {
    this.queryParams.pageNumber = 1;
    this.queryParams.itemsPerPage = 10;
  }

  ngOnInit(): void {
    this.LoadOrders();
  }

  LoadOrders() {
    this.orderService.GetAllOrders(this.queryParams).subscribe({
      next: data => {
        this.orders = data.result;
        this.pagination = data.pagination
      }
    });
  }



  SortChange(sorting: Sort) {
    this.queryParams.OrderBy = sorting.active;
    this.queryParams.OrderDirection = sorting.direction;
    this.LoadOrders();
  }

  UpdateStatus(status: string, orderToUpdate: orderWithCustomer) {

    if (orderToUpdate.orderStatus !== status)
      this.orderService.updateOrderStatus(status, orderToUpdate).subscribe({
        complete: () => {
          this.LoadOrders();
          this.toastr.success("Updated Order status.")

        }
      })
  }

  pageChanged(page: any) {

    this.queryParams.pageNumber = page.pageIndex + 1;
    this.queryParams.itemsPerPage = page.pageSize;
    this.LoadOrders();
  }

  ClearSearch(SearchTerm: string) {
    if (SearchTerm == '')
      this.FireSearch(SearchTerm);
  }

  FireSearch(SearchTerm: string) {
    this.queryParams.SearchString = SearchTerm;
    this.LoadOrders();
  }


}
