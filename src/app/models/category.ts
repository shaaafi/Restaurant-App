import { foodItem } from './foodItem';

export class Category {

    constructor(public items: foodItem[]) {}
    get category(): Array<string> {
        const categories: Array<string> = [];
        for (const item of this.items) {
            if (!categories.includes(item.category)) {
                categories.push(item.category);
            }
        }
        return categories;
    }
}
