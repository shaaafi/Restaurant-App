import { TestBed, inject } from '@angular/core/testing';

import { CompleteOrderService } from './complete-order.service';

describe('CompleteOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompleteOrderService]
    });
  });

  it('should be created', inject([CompleteOrderService], (service: CompleteOrderService) => {
    expect(service).toBeTruthy();
  }));
});
