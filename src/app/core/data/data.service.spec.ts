import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('DataService', () => {
    let service: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get a quote for a symbol currency pair');

    it('should get quotes for a list symbol currency pairs');

    it('should get daily history for a symbol currency pair');

    it('should get trading signals for a symbol');
});
