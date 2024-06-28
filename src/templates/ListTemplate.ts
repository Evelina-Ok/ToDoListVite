import FullList from "../model/FullList"

interface DOMList {
    ul: HTMLUListElement,
    //methods:
    //clears the list:
    clear(): void,
    //receives full list:
    render(fulllist:FullList): void,
}

// create: class named list template, export default, implement DOM interface,
// make singleton so we only need this one template for the entire app
// clear method should just clear out all of the HTML inside of the unordered list
// render method should render the full list
// uncommented list in html is your guide

export default class ListTemplate implements DOMList {
    ul: HTMLUListElement

    static instance: ListTemplate = new ListTemplate()
    //singleton
    //we didn't specify the parameter 
    //but we assigned it inside the constructor hence we specify ul above
    private constructor() {
        //with assertion
        this.ul = document.getElementById('listItems') as HTMLUListElement
    }

    clear(): void {
        //set to empty string to clear 
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear()

        fullList.list.forEach(item => {
            const li = document.createElement('li') as HTMLLIElement
            li.className = 'item'

            const check = document.createElement('input') as HTMLInputElement
            check.type = 'checkbox'
            //each item id is unique:
            check.id = item.id
            //tabIndex is not required. As an input element, the checkbox receives a default tabIndex for page navigation
            //same for each one:
            check.tabIndex = 0
            check.checked = item.checked
            li.append(check)
            //if you're wondering why we didn't write '_' in 'item.id' and 'item.checked', is because here we're referring to 'item.id' and 'item, we're using getters and setters

            check.addEventListener('change', () => {
                item.checked = !item.checked
                fullList.save()
            })

            const label = document.createElement('label') as HTMLLabelElement
            label.htmlFor = item.id
            label.textContent = item.item
            li.append(label)

            const button = document.createElement('button') as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            //this removes item from the data and then we render the list without that item
            button.addEventListener('click', () => {
                fullList.removeItem(item.id)
                this.render(fullList)
            })

            this.ul.append(li)
        })
    }
}