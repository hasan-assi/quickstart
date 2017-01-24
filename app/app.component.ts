// import { HtmlSpecFilter } from 'jasmine';
import { applyMixins } from 'rxjs/util/applyMixins';
import { appendFile } from 'fs';
import { Component } from '@angular/core';
import { Data } from './service/data.service';
import * as html2canvas from '../node_modules/html2canvas/dist/html2canvas';
import * as jsPDF from '../node_modules/jspdf/dist/jspdf.debug.js';

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
    html2canvas(el, {
      onrendered: (canvas: any) => {
        const pdf = new jsPDF('p', 'pt', 'letter');
        for (let i = 0; i <= el.clientHeight / 980; i++) {
          const srcImg = canvas;
          const sX = 0;
          const sY = 980 * i; // start 980 pixels down for every new page
          const sWidth = 900;
          const sHeight = 980;
          const dX = 0;
          const dY = 0;
          const dWidth = 900;
          const dHeight = 980;

          const onePageCanvas = document.createElement("canvas");
          onePageCanvas.setAttribute('width', '900px');
          onePageCanvas.setAttribute('height', '980px');
          var ctx = onePageCanvas.getContext('2d');
          // details on this usage of this function:
          // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
          ctx.drawImage(srcImg, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight);

          // document.body.appendChild(canvas);
          var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

          var width = onePageCanvas.width;
          var height = onePageCanvas.clientHeight;

          //! If we're on anything other than the first page,
          // add another page
          if (i > 0) {
            pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
          }
          //! now we declare that we're working on that page
          pdf.setPage(i + 1);
          //! now we add content to that page!
          pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width * .62), (height * .62));

        }
        //! after the for loop is finished running, we save the pdf.
        pdf.save('export.pdf');
      }
    });
  }
}

class Product {
  constructor(public name: string, public quantity: number, public cost: number) { }
}
