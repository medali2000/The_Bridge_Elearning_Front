import { Component , OnInit} from '@angular/core';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit{
  id: any;
  productToUpdate: any;
  title: any;
  price: any;
  image: any;

 constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) { }

 ngOnInit() {
   this.route.paramMap.subscribe(
     params => {
       this.id = params.get('id');
     }
   );
   this.productToUpdate = this.service.getProduct(this.id).subscribe(
     (response: any) => {
       //console.log(response);
       this.title = response["title"];
       this.price = response["price"];
       this.image = response["image"];
     }
   );
   // this.initFormUpdateProvider(myform);
 }

 updateProvider() {
   this.productToUpdate = {
     'title': this.title,
     'price': this.price,
     'image': this.image,
     'id': this.id
   }
   this.service.updateProduct(this.productToUpdate).subscribe(
     response => {
       console.log(response);
       this.router.navigate(['/admin/products']);
     }
     
   );
   

 }


}
