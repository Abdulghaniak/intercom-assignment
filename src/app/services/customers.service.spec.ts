import { TestBed } from '@angular/core/testing';

import { CustomersService } from './customers.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('CustomersService', () => {
  let service: CustomersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomersService],
    });
    service = TestBed.inject(CustomersService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrive all customer details via GET', () => {
    const dummyCustomers =
      '{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}\n{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}';

    service.getCustomerList().subscribe((customers) => {
      expect(customers).toEqual(dummyCustomers);
    });

    const req = httpMock.expectOne(service.customerListUrl);
    expect(req.request.method).toBe('GET');

    req.flush(dummyCustomers);
  });
});
