import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlProducts = 'http://127.0.0.1:8888/products/';
  product: any;
  constructor(private Http: HttpClient) { }


  listProduct() {
    return this.Http.get(this.urlProducts );
  }

  deleteProduct(idProduct:any) {
   
    return this.Http.delete(this.urlProducts + idProduct )
  }

  updateProduct(myObj:any) {
    return this.Http.put(this.urlProducts  + myObj['id'], myObj );
  }
  createProduct(myform:any) {
  
    this.product = {
      'title': myform.value.providerTitle,
      'price': myform.value.providerPrice,
      'image': myform.value.providerImage
    }
    return this.Http.post(this.urlProducts , this.product );
  }


  getProduct(id:any) {

    return this.Http.get(this.urlProducts  + id  )
  }


  uploadImageProduct(file:any,idProduct:any){
    return this.Http.post(this.urlProducts+'uploadImage/'+idProduct , file)
   }

  downloadImageProfile(idProduct:any){
    return this.Http.get(this.urlProducts+'downloadImage/'+idProduct , { responseType: 'blob' })
   }
 
}
