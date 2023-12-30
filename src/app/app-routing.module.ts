import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  { path: "", component: HeaderComponent },
  { path:"admin", component:DashbordComponent ,
   children:[
    {  path:'products' , component:ListProductComponent },
    {  path:'addProduct' , component:AddProductComponent },
    {  path:'updateProduct/:id' , component:UpdateProductComponent }

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
