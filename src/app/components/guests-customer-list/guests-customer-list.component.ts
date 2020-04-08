import {Component, OnInit} from '@angular/core';
import {CustomersService} from 'src/app/services/customers.service';
import {ICustomer} from './ICustomer';

@Component({
  selector: 'app-guests-customer-list',
  templateUrl: './guests-customer-list.component.html',
  styleUrls: ['./guests-customer-list.component.scss'],
})
export class GuestsCustomerListComponent implements OnInit {
  customersFilteredArray = [];
  constructor(private customerService: CustomersService) {}

  ngOnInit(): void {
    this.getCustomerListJSON();
  }

  // Get the Customer List from getCustomerList service file
  getCustomerListJSON() {
    this.customerService.getCustomerList().subscribe((data) => {
      this.transformCustomerListJSON(data);
    });
  }

  // Transform customer list from String to array of JSON object for easier iteration
  transformCustomerListJSON(data) {
    const customersArray = [];
    const guestRadiusDistance = 100;
    const tempCusArray: any = (data as string).split('\n');

    tempCusArray.forEach((element) => {
      if (!element) {
        return;
      }

      const jsonElement: ICustomer = JSON.parse(element);
      jsonElement.distance = parseFloat(
        this.calcCrow(jsonElement.latitude, jsonElement.longitude)
      );

      if (jsonElement.distance <= guestRadiusDistance) {
        customersArray.push(jsonElement);
      }
    });

    this.sortingCustomerList(customersArray);
  }

  // Sorting the array based on the User ID (ascending)
  sortingCustomerList(customersArray) {
    this.customersFilteredArray = customersArray.sort((a, b) => {
      return a.user_id - b.user_id;
    });
    console.log(JSON.stringify(this.customersFilteredArray));
  }

  // This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  calcCrow(customerLatitdePoint, customerLongitudePoint) {
    const R = 6371; // km
    let officeLatitdePoint = 53.339428;
    const officeLongitudePoint = -6.257664;

    const distanceLat = this.toRad(officeLatitdePoint - customerLatitdePoint);
    const distanceLon = this.toRad(
      officeLongitudePoint - customerLongitudePoint
    );
    customerLatitdePoint = this.toRad(customerLatitdePoint);
    officeLatitdePoint = this.toRad(officeLatitdePoint);

    const a =
      Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
      Math.sin(distanceLon / 2) *
        Math.sin(distanceLon / 2) *
        Math.cos(customerLatitdePoint) *
        Math.cos(officeLatitdePoint);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = (R * c).toFixed(2);
    return distance;
  }

  // Converts numeric degrees to radians
  toRad(Value: number) {
    return (Value * Math.PI) / 180;
  }
}
