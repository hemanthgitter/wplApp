import { SharedService } from './../shared.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(private sharedService: SharedService, private sanitizer: DomSanitizer) {}
  products: [];
	image: SafeUrl;

  ngOnInit() {
	this.sharedService.getAllProducts().subscribe(res => {
		this.products = res.result;
		if (this.products.length > 0) {
			const TYPED_ARRAY = new Uint8Array(res.result[0].image.data);
			const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
			const base64String = btoa(STRING_CHAR);
			this.image = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64String);
			console.log( this.image);
		}
	});
  }
}
