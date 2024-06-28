import './css/style.css'
// console.log("hi");

import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    //singletons:
    const fullList = FullList.instance
    const template = ListTemplate.instance

    // Add listener to new entry form submit
    const itemEntryForm = document.getElementById('itemEntryForm') as HTMLFormElement
    itemEntryForm.addEventListener('submit', (event: SubmitEvent): void => {
        event.preventDefault()

         // Get the new item value
        const input = document.getElementById('newItem') as HTMLInputElement
        const newEntryText: string = input.value.trim()
        //checking the length property of the text isn't necessary. 
        //An empty string evaluates as false too.
        if (!newEntryText.length) return

        // calculate item ID
        const itemId: number = fullList.list.length
        //ternary statement:
        //if the number exists:
        ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
        //if it doesn't exist:
        : 1 

        //toString method because it has to be string        
        // create new item
        const newItem = new ListItem(itemId.toString(), newEntryText)

        fullList.addItem(newItem)

        template.render(fullList)
    })


    // Add listener to "Clear" button
    const clearItems = document.getElementById('clearItemsButton') as HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        fullList.clearList()
        template.clear()
    })

    // Function Calls:
    fullList.load()
    template.render(fullList)
}

//adding a listener to the document itself and we're listening for the DOM content loaded event 
//and when that happens, we'll call initApp
//you can also just defer
//this essentially says we're not going to run our JavaScript until we make sure this DOM content is loaded and all elements exist
document.addEventListener('DOMContentLoaded', initApp)
