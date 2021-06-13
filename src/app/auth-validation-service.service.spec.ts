import { TestBed } from '@angular/core/testing';

import { AuthValidationServiceService } from './auth-validation-service.service';

describe('AuthValidationServiceService', () => {
  let service: AuthValidationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthValidationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
