import { Component, Input, OnInit } from '@angular/core';
import { faDollarSign, faEuroSign, faPoundSign, faYenSign, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quote-price',
  templateUrl: './quote-price.component.html',
  styleUrls: ['./quote-price.component.scss']
})
export class QuotePriceComponent implements OnInit {
    @Input() price: number;
    @Input() symbol: string;
    @Input() direction: string;
    
    icon: IconDefinition | string;
    directionColor: string;

    constructor() {}

    ngOnInit(): void {

        // Set the right currency icon
        switch (this.symbol) {
                case 'USD':
                    this.icon = faDollarSign;
                    break;
                case 'GBP':
                    this.icon = faPoundSign;
                    break;
                case 'EUR':
                    this.icon = faEuroSign;
                    break;
                case 'JPY':
                    this.icon = faYenSign;
                    break;
                case 'ZAR':
                    this.icon = 'R';
                    break;

                default:
                    this.icon = this.symbol;
                    break;
            }

            
    }
    // Helper function for template
    isIcon() {
        return ( typeof this.icon != 'string');
    }

    // Helper function for template
    setColor(_direction: string) {
        // Set the direction color
            switch(_direction.toLocaleUpperCase()) {
                case 'UP' : 
                    this.directionColor = 'price-up';
                    break;
                case 'DOWN' : 
                    this.directionColor = 'price-down';
                    break;
                case 'UNCHANGED' : 
                    this.directionColor = 'price-unchanged';
                    break;        
            }
            return this.directionColor
    }
}

