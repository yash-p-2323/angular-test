import { TestBed } from '@angular/core/testing';

import { CsvProcessService } from './csv-process.service';

describe('CsvProcessService', () => {
  let service: CsvProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
