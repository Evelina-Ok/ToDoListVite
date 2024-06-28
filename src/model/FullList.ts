import ListItem from "./ListItem.js"

//create new interface which also refers to our getter for our list
//it will have method for the list
interface List{
    //list refers to the ListItem we created earlier but it's an array of list items
    list: ListItem[],
    //void is not returning anything
    //often when working with DOM
    //you're doing smth to the document object model and not returning smth from the function
    load(): void,
    save(): void,
    clearList(): void,
    addItem(itemObj: ListItem): void,
    removeItem(id: string): void,
}

export default class FullList implements List {

    //after constructor we continue code here:
    //
    static instance: FullList = new FullList()

    //in this project there's only one list, so we put 'private' in front of the constructor

    //inside here we create constructor that's going to receive a list which will also be private
    // the _list is an array of ListItem which gonna have a default value of an empty array
    //singleton:
    private constructor(private _list: ListItem[] = []){}

    //getting list from the interface we created earlier and create the methods
    get list(): ListItem[] {
        return this._list
    }

    load(): void {   
        //retrieving from local storage if it's there:     
        //define storedList which will be a union type of either string or it could possibly be a null
        //we are retrieving 'myList'
        const storedList: string | null = localStorage.getItem("myList")
        //if it's not equal to string which we expect because we strigify, then we return
        if (typeof storedList !== "string") return

        //create new items from parsedList:
        const parsedList: { _id: string,  _item: string, _checked: boolean }[] = JSON.parse(storedList)

        //going through parsed liste and creating new list item for each one that was stringified and was saved into local storage and populating our list again:
        //forEach item Object in the array
        parsedList.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._item, itemObj._checked)
            //calling a method 'addItem'
            //referring to 'FullList' as we created an instance earlier and pass newListItem
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        //save our list in the local storage so it persists even if we refresh the page
        localStorage.setItem("myList", JSON.stringify(this._list))
             
    }

    clearList(): void {
        //this will clear out the list:
        this._list = []
        //this will overwrite anything we have in the local storage so the old list won't reload
        this.save()
    }

    addItem(itemObj: ListItem): void {
        //push item object that we receive
        this._list.push(itemObj)
        this.save() 
    }

    //received id which is a string and returns void
    removeItem(id: string): void {
        //filter items in the list - we keep everything that does not equal to the id we receive in this method
        this._list = this._list.filter(item => item.id !== id)
        this.save()
    }
}