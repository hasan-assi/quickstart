import { HtmlSpecFilter } from 'jasmine';
import { applyMixins } from 'rxjs/util/applyMixins';
import { appendFile } from 'fs';
import { Component } from '@angular/core';
import { Data } from './service/data.service';
import * as html2canvas from 'html2canvas';


@Component({
  moduleId: module.id,
  selector: 'my-app',
  styleUrls: ['app.component.css'],
  templateUrl: 'app.component.html'
})
export class AppComponent {

  private keys: any;
  private selectedHeaders: any =[];
  private selectedList: any =[];
  private result: any=[];


  getDataModelNames() {
    // let result: any ;
    this.data.getData().subscribe(x => this.result = x);
    console.log('getDateModel>', this.result);
    this.keys = Object.keys(this.result[0]);
  }

  constructor(
    private data: Data
  ) {
    this.getDataModelNames();
  }

  onDragSuccess(orderedProduct: Product) {
    // orderedProduct.quantity--;
  }

  onDropSuccess(key: any) {

    this.selectedHeaders.push({key: key.dragData, x: key.mouseEvent.layerX, y: key.mouseEvent.layerY});
    // this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
  }

   onDropListSuccess(key: any) {

    this.selectedList.push(key.dragData);
    // this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
  }

  getValue(key:any){
    return this.result[0][key.key];
  }

  onExportButtonClick() {
    const el = document.getElementById('2Export');
    html2canvas(el)
      .then((canvas: any) => {
        document.body.appendChild(canvas);
      });
    }
}

class Product {
  constructor(public name: string, public quantity: number, public cost: number) { }
}
