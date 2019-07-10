import { TestBed } from '@angular/core/testing';

import { FcmWithCapacitorService } from './fcm-with-capacitor.service';

describe('FcmWithCapacitorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcmWithCapacitorService = TestBed.get(FcmWithCapacitorService);
    expect(service).toBeTruthy();
  });
});
