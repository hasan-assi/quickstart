import { Observable } from 'rxjs/Rx';

import { Injectable } from '@angular/core';


@Injectable()
export class Data {

  public getData(): Observable<any> {

    let data: Asset[] = [];
    for (let i = 0; i < 4; i++) {
      data.push({
        msn: `hasan-${i}`,
        type: `type-${i}`,
        age: i,
        // parties: [{
        //   name: `party-${i}`,
        //   role: 'lessor'
        // }]
      });
    }
    console.log(data);

    return Observable.of(data);
  }

}

export class Asset {
  msn: string;
  age: number;
  type: string;
  // parties: { name: string, role: string }[];
}
