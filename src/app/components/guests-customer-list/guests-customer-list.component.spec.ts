import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { GuestsCustomerListComponent } from './guests-customer-list.component';
import { CustomersService } from 'src/app/services/customers.service';
import { of } from 'rxjs';

describe('GuestsCustomerListComponent', () => {
  let component: GuestsCustomerListComponent;
  let fixture: ComponentFixture<GuestsCustomerListComponent>;
  let customerService: CustomersService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CustomersService],
      declarations: [GuestsCustomerListComponent],
    }).compileComponents();
  }));

  beforeEach(inject([CustomersService], (s) => {
    fixture = TestBed.createComponent(GuestsCustomerListComponent);
    component = fixture.componentInstance;
    customerService = s;
    fixture.detectChanges();
  }));

  it('should call getCustomerList service after ngOnInit', async(() => {
    const response =
      '{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}\n{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}';

    spyOn(customerService, 'getCustomerList').and.returnValue(of(response));

    component.ngOnInit();

    fixture.detectChanges();

    expect(customerService.getCustomerList).toHaveBeenCalled();
  }));

  it('Should transform Customers List from String to JSON', () => {
    const customerList =
      '{"latitude": "52.986375", "user_id": 12, "name": "Christina McArdle", "longitude": "-6.043701"}\n{"latitude": "51.92893", "user_id": 1, "name": "Alice Cahill", "longitude": "-10.27699"}';

    const jsonCustomerList =
      '[{"latitude":"52.986375","user_id":12,"name":"Christina McArdle","longitude":"-6.043701","distance":41.77}]';

    component.transformCustomerListJSON(customerList);

    expect(JSON.stringify(component.customersFilteredArray)).toEqual(
      jsonCustomerList
    );
  });

  it('Should Converts numeric degrees to radians', () => {
    const dummyDegrees = 0.353053;
    const toRedInstace = component.toRad(dummyDegrees);

    expect(toRedInstace).toEqual(0.006161937284043541);
  });

  it('Should calculate the distance between a dummy customer coordinate & intercom office', () => {
    const customerLatitdePoint = 52.986375;
    const customerLongitudePoint = -6.043701;

    const calcCrowInstance = component.calcCrow(
      customerLatitdePoint,
      customerLongitudePoint
    );

    const expectedDistance = 41.77;
    expect(+calcCrowInstance).toEqual(expectedDistance);
  });
});
