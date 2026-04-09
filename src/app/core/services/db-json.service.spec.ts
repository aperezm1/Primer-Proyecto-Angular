import { TestBed } from '@angular/core/testing';

import { DbJsonService } from './db-json.service';

describe('DbJsonService', () => {
  let service: DbJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
