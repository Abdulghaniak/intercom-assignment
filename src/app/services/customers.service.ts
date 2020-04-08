import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}
  customerListUrl = 'assets/text/customers.txt';

  // Get the Customer List from customers.txt file
  getCustomerList() {
    return this.http.get(this.customerListUrl, {
      responseType: 'text' as 'json',
    });
  }
}
