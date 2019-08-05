import { foodItem } from './foodItem';

export class Category {

    constructor(public items: foodItem[]) {}

     category(): Array<CategoriesItems> {
        const categories: Array<CategoriesItems> = [];
        for (const item of this.items) {
            console.log('item changed');
            if (categories.length === 0) {
                const i: CategoriesItems = {
                    categoryName: item.category
                };
             //   console.log('Value of i000 is:  ' + JSON.stringify(i));
                categories.push(i);
            } else {
                let check = true ;
                for (const c of categories) {
                 //  console.log('Value of 22i is:  ' + 'calling' + JSON.stringify(c));
                   if (c.categoryName.includes(item.category)) {
                    check = false;
                    }
            }
                if (check) {
                    const i: CategoriesItems = {
                        categoryName: item.category
                    };
                   // console.log('Cata name: ' + c.categoryName + item.category + c.categoryName.includes(item.category));
                    categories.push(i);

                }
            }


        }
        return categories;
    }

    itemsByCatagory(category: string): foodItem[] {
        const items: foodItem[] = [];
        for (const item of this.items) {
            if (item.category.includes(category)) {
                items.push(item);
            }
        }
        return items;
    }
}

export interface CategoriesItems {
   categoryName: string;
   categoryitems?: foodItem[];
}
