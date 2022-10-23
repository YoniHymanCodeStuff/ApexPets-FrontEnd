import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { environment } from 'src/environments/environment';
import { ShoppingCartItem } from '../model_Interfaces/ShoppingCartItem';
import { tap, Observable, of } from 'rxjs';
import { CartAnimal } from '../model_Interfaces/CartAnimal';
import { Order } from '../model_Interfaces/Order';
import { PaginationResult } from '../model_Interfaces/Pagination';
import { OrderQueryParams } from '../model_Interfaces/OrderQueryParams';
import { orderWithCustomer } from '../model_Interfaces/orderWithCustomer';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseUrl = environment.apiUrl + 'order/';
  private shoppingCartCache: CartAnimal[] = [];

  private customerOrdersCache: Order[] = [];

  AllOrdersCache: orderWithCustomer[] = [];
  cachedAllOrdersQueries = new Map<string, PaginationResult<number[]>>();
  allOrderIdsStored: number[] = [];


  constructor(private http: HttpClient, private accountService: AccountService,
    private paginationService: PaginationService) {
    this.accountService.CurrentUser$.subscribe(() => { this.emptyCache();console.log("cache emptied") });
  }

  emptyCache() {

    this.shoppingCartCache = [];
    this.customerOrdersCache = [];
    this.AllOrdersCache = [];

  }

  GetCartAnimals() {
    if (this.shoppingCartCache.length > 0) {
      return of(this.shoppingCartCache)
    }

    return this.http.get<CartAnimal[]>(`${this.baseUrl}CartAnimals`).pipe(tap(
      result => { this.shoppingCartCache = result }
    ));
  }

  RemoveFromCart(_username: string, _item: ShoppingCartItem) {
    let retobj = { username: _username, item: _item }

    return this.http.put(this.baseUrl + 'Cart-Remove', retobj).pipe(
      tap(() => {
        this.shoppingCartCache = this.shoppingCartCache.filter(x => x.cartItemId != _item.id)
      })
    );

  }


  AddToCart(_username: string, _animalId: number) {


    let retobj = { username: _username, animalId: _animalId }


    return this.http.post<CartAnimal>(this.baseUrl + 'cart-add', retobj).pipe(tap(
      newCartAnimal => {
        if (this.shoppingCartCache.length > 0) {
          this.shoppingCartCache.push(newCartAnimal)
        }
      }
    ));

  }



  Checkout() {
    return this.http.delete(this.baseUrl + 'Checkout').pipe(tap(
      () => { this.shoppingCartCache = [] }
    ));
  }

  GetCustomerOrders() {

    if (this.customerOrdersCache.length > 0) {
      return of(this.customerOrdersCache);
    }

    return this.http.get<Order[]>(this.baseUrl + 'orders').pipe(tap(
      result => {
        this.customerOrdersCache = result;
      }
    ));
  }

  GetAllOrders(queryParams: OrderQueryParams): Observable<PaginationResult<orderWithCustomer[]>> {
    let queryKey = Object.values(queryParams).join('-');

    const cachedQuery = this.cachedAllOrdersQueries.get(queryKey);
    if (cachedQuery) {

      let filteredOrders = this.AllOrdersCache.filter(x => cachedQuery.result.includes(x.orderId));

      var paginatedOrders: PaginationResult<orderWithCustomer[]> = {
        pagination: cachedQuery.pagination,
        result: filteredOrders
      }
      return of(paginatedOrders);
    }

    let params = this.paginationService.GetPaginationParams(queryParams.pageNumber, queryParams.itemsPerPage);

    if (queryParams.EarliestDate) { params = params.append('EarliestDate', queryParams.EarliestDate.toDateString()) }
    if (queryParams.LatestDate) { params = params.append('LatestDate', queryParams.LatestDate.toDateString()) }
    if (queryParams.OrderStatus) { params = params.append('OrderStatus', queryParams.OrderStatus) }
    if (queryParams.OrderBy) { params = params.append('OrderBy', queryParams.OrderBy) }
    if (queryParams.SearchString) { params = params.append('SearchString', queryParams.SearchString) }
    if (queryParams.OrderDirection === 'desc') { params = params.append('IsDescending', true.toString()) }

    return this.paginationService.GetPaginatedResult<orderWithCustomer[]>(this.baseUrl + "allOrders", params).pipe(tap(
      res => {

        var idArray = res.result.map(function (x) { return x.orderId });

        var paginatedIdArray: PaginationResult<number[]> = {
          result: idArray,
          pagination: res.pagination
        }
        this.cachedAllOrdersQueries.set(queryKey, paginatedIdArray);


        let idsNotAlreadyStored = idArray.filter(x => this.allOrderIdsStored.includes(x) == false);

        this.allOrderIdsStored = this.allOrderIdsStored.concat(idsNotAlreadyStored);

        let ordersToAdd = res.result.filter(x => idsNotAlreadyStored.includes(x.orderId));

        this.AllOrdersCache = this.AllOrdersCache.concat(ordersToAdd);
      }
    ));
  }

  updateOrderStatus(newStatus: string, order: orderWithCustomer) {
    return this.http.patch<orderWithCustomer>(this.baseUrl + 'updateStatus', { newStatus, order })
      .pipe(tap(
        (updatedOrder) => {
          let index = this.AllOrdersCache.findIndex(x => x.orderId == order.orderId);
          this.AllOrdersCache[index].orderStatus = newStatus;

          if (this.customerOrdersCache.find(x => x.id == order.orderId) !== undefined) {
            let orderIndex = this.customerOrdersCache.findIndex(x => x.id == order.orderId);
            this.customerOrdersCache[orderIndex].orderStatus = newStatus;
          }
        }
      ));
  }
}
