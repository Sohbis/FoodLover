import { Pipe, PipeTransform } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { isNull } from 'util';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(private instance: MenuComponent) { }
  transform(dishes: any, items: any): any {
    if (items === undefined) {
      return dishes;
    }

    for (const dish of dishes) {

      // console.log(dish.name.toLowerCase().includes(items.toLowerCase())) ;
      console.log('dish =' + dish.name + 'item =' + items);
      if (dish.name.toLowerCase().includes(items.toLowerCase()) === true) {
        console.log('match');
        this.instance.err = '';

        return dishes.filter((_dish) => _dish.name.toLowerCase().includes(items.toLowerCase()));
      } else {
        this.instance.err = 'Nothing found';
      }
      // return dishes.filter((dish) => dish.name.toLowerCase().includes(items.toLowerCase(), console.log(dish.name.toLowerCase().includes(items.toLowerCase()))));

    }
  }
}
