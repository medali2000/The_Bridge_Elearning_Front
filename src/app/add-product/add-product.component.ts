import { Component , OnInit} from '@angular/core';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/models/file-handle.model';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent  implements OnInit  {
  provider: any;

  PRODUCT!:Product

  constructor(private service: ProductService, private router: Router , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.PRODUCT = {
      title: '',
      price: 0,
      image: '',
      ProductImage: { file: null, url: null } as any,
    }

  }

  createProduct(myform:any) {
    this.service.createProduct(myform).subscribe(
      (response:any) => {
        console.log(response);
        //const ImageFormData = this.prepareFormDataImage(this.PRODUCT)
        //this.service.uploadImageProduct(ImageFormData , response['id'] ).subscribe(
          //(rep:any)=>{
            //console.log(rep)
          //}
        //)
        this.router.navigate(['/admin/products']);
      }
    );
    
  }


  prepareFormDataImage(product:Product):FormData {
    const formData = new FormData();

    formData.append(
      'image',
      product.ProductImage.file,
      product.ProductImage.file.name
    );

    return formData;
  }


  private getFilenameFromResponseHeaders(response: HttpResponse<Blob>,nomFIchier:any): string {
    const contentDispositionHeader = response.headers.get('content-disposition');
    const matches = contentDispositionHeader ? contentDispositionHeader.match(/filename="?(.+)"?/) : null;
    return matches && matches.length > 1 ? matches[1] : nomFIchier;
  }

  private saveFile(data: Blob, filename: string) {
    const blob = new Blob([data], { type: data.type });

    // Create a temporary anchor element and download the file
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    a.remove();
  }


  onImageSelected(event:any){
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }

      this.PRODUCT.ProductImage = fileHandle;

      console.log(this.PRODUCT.ProductImage)

    }
  }

  

}
