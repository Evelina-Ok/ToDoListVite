//* Model for our List Model *//
// interface - 
export interface Item {
    id: string,
    item: string,
    checked: boolean,
}

export default class ListItem implements Item {
    // we need to create class with id, item and checked but they should be '_id', ...
    // but currently id, item and checked refer to getters and setters
    constructor(
        private _id: string = '',  //give default value of an empty string
        private _item: string = '',
        private _checked: boolean = false,
    ) {}

    //implement the interface with getters and setters
    //Getter method allows you to access the value of a property
    get id(): string {
        return this._id
    }
    //setter method enables you to modify the value of a property with certain validations or actions
    set id(id: string) {
        this._id = id
    }

    get item(): string {
        return this._item
    }
    set item(item: string) {
        this._item = item
    }

    get checked(): boolean {
        return this._checked
    }
    set checked(checked: boolean) {
        this._checked = checked
    }

}


