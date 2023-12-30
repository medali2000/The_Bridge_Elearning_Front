import { Component , OnInit} from '@angular/core';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
  products:any;
 
  imageProfile:any
  prod :any
  prods:any
  constructor(private service: ProductService, private router: Router) { }

  ngOnInit() {
    
    this.service.listProduct().subscribe(
      (response:any) => {
       console.log(response)
        this.products = response;
        //console.log(this.prods) 
      }
    );

    /*this.service.listProduct().subscribe(
      (response: any) => {
        this.products = response.map((product: any) => ({
          ...product,
          imageUrl: this.downloadImage(product.id)
        }));
      }
    );*/

  }
  
  deleteProduct(id: any) {
    //console.log(this.provider);
    this.service.deleteProduct(id).subscribe(response => {
      console.log(response);
      this.refreshListProducts();
    })
  }
  
  refreshListProducts() {
    this.service.listProduct().subscribe(
      response => {
        this.products = response;
      }
    );
  }

  updateProduct(product:any) {
    this.router.navigate(['/admin/updateProduct/'  + product['id']]);
  }


  getBase64Image(base64String: string) {
    console.log(`data:image/png;base64, ${base64String}`)
    return `data:image/png;base64, ${base64String}`;
  }


}
