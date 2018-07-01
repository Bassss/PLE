/// <reference path="../includes/uiObject.ts"/>
/// <reference path="../uiObjects/menu.ts"/>

class CraftMenu extends menu {
    private craftList: HTMLElement;
    private detail: HTMLElement;

    private list: Array<HTMLElement> = []
    private craftables: Array<Item> = []
    private player: Player

    private detailButton: HTMLElement;
    private detailImage: HTMLElement;
    private detailText: HTMLElement;
    private detailRequired: HTMLElement;
    private detailTitle: HTMLElement;

    constructor(g: Game, player: Player) {
        super(g)
        this.player = player
        this.craftList = document.createElement("craftList");
        this.div.appendChild(this.craftList);
        this.detail = document.createElement("craftDetail");
        this.div.appendChild(this.detail);
        this.checkCrafts()
    }
    private checkCrafts() {
        let things = []
        for (var i = 0; i < this.game.allItems.length; i++) {
            let push = true;
            if (this.game.allItems[i].canCraft(this.player.inventoryBar) == true) {
                for (var j = 0; j < this.craftables.length; j++) {
                    if (this.craftables[j].name == this.game.allItems[i].name) {
                        push = false
                    }
                }
                if (push == true) {
                    this.craftables.push(this.game.allItems[i])
                    things.push(this.game.allItems[i])
                }
            } else {
                for (var p = 0; p < this.craftables.length; p++) {
                    for (var l = 0; l < this.list.length; l++) {
                        if (this.craftables[p].name == this.game.allItems[i].name) {
                            if (this.list[l].lastElementChild.innerHTML == this.craftables[p].name) {
                                if(this.list[l].hasAttribute("class")){
                                    this.game.deleteObject(this.detailButton)
                                    this.game.deleteObject(this.detailText)
                                    this.game.deleteObject(this.detailTitle)
                                    this.game.deleteObject(this.detailRequired)
                                    this.game.deleteObject(this.detailImage)
                                }
                                this.list[l].remove()
                                this.list.splice(l,1)
                                this.craftables.splice(p,1)

                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < things.length; i++) {
            let item = things[i]
            let listItem = document.createElement("craftListItem");
            this.craftList.appendChild(listItem);
            this.list.push(listItem)
            item.createElement(listItem)
            let image = item.div
            listItem.appendChild(image);
            let name = document.createElement("h2")
            name.innerText = item.name;
            listItem.appendChild(name);
            listItem.addEventListener("click", () => this.openDetail(listItem, item));
        }
    }
    openDetail(listItem: HTMLElement, item: Item) {
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].removeAttribute("class")
        }
        listItem.setAttribute("class", "selected")
        if (this.detailButton != undefined) {
            this.game.deleteObject(this.detailButton)
            this.game.deleteObject(this.detailText)
            this.game.deleteObject(this.detailTitle)
            this.game.deleteObject(this.detailRequired)
            this.game.deleteObject(this.detailImage)
        }
        this.detailImage = document.createElement("detailImage")
        this.detail.appendChild(this.detailImage)
        item.createElement(this.detailImage)

        this.detailTitle = document.createElement("detailTitle")
        this.detail.appendChild(this.detailTitle)
        this.detailTitle.innerHTML = "<h1>" + item.name + "</h1>"

        this.detailRequired = document.createElement("detailRequired")
        this.detail.appendChild(this.detailRequired)
        for (var i = 0; i < item.required.length; i++) {
           let req = item.required[i]
           let itemSlot: HTMLElement = document.createElement("reqitem")
           this.detailRequired.appendChild(itemSlot)
            req[0].createElement(itemSlot)
            let itemCount: HTMLElement = document.createElement("reqAmount")
            itemSlot.appendChild(itemCount)
            itemCount.innerHTML += req[1] +"X"
        }

        this.detailText = document.createElement("detailText")
        this.detail.appendChild(this.detailText)

        this.detailButton = document.createElement("craftButton")
        this.detail.appendChild(this.detailButton)
        this.detailButton.innerText = "Craft a " + item.name
        this.detailButton.addEventListener("click", () => this.createItem(item));
    }

    private createItem(item: Item) {

        for (var i = 0; i < item.required.length; i++) {
            let req = item.required[i]
            this.player.inventoryBar.removeItem(req[0], req[1])
        }
        this.player.inventoryBar.addItem(item, 1)
        this.checkCrafts()
    }
}