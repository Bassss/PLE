/// <reference path="../includes/gameObject.ts"/>

class Player extends gameObject {
    private gc: GameController;
    public standingOn: tile;
    private facing: string = "backward";

    public upKey: number = 38;
    public downKey: number = 40;
    public leftKey: number = 37;
    public rightKey: number = 39;
    public spaceKey: number = 32;
    public enterKey: number = 13;

    public wKey: number = 87;
    public aKey: number = 65;
    public sKey: number = 83;
    public dKey: number = 68;
    public eKey: number = 69;

    public leftSpeed: number = 0;
    public rightSpeed: number = 0;
    public upSpeed: number = 0;
    public downSpeed: number = 0;

    public Xpos: number = 0;
    public Ypos: number = 0;

    public inventoryBar: inventoryBar;
    public hud: Array<uiObject> = [];
    public holding: HTMLElement;

    public inventoryMenu: menu;

    constructor(g: Game, gc: GameController, pn: number, x: number, y: number) {
        super(g, "player")
        let playerNumber = pn + 1
        this.div.setAttribute("id", "player" + playerNumber);
        this.div.setAttribute("class", "still");
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        this.game.allPlayers.push(this);
        this.gc = gc;
        this.width = 50;
        this.height = 1;
        this.x = x;
        this.y = -y;
        this.Xpos = x
        this.Ypos = y
        this.focusOnMe();
        this.inventoryBar = new inventoryBar(g, this)
        this.holding = document.createElement("holding")
        this.div.appendChild(this.holding)
    }
    private move() {
        if (this.leftSpeed > 0 && this.standingOn.leftTileKind != 0 && this.standingOn.leftTileKind != 3) {
            if ((this.Xpos + this.rightSpeed) <= (this.game.container.clientWidth - 50) && (this.Xpos - this.leftSpeed) >= 0) {
                this.Xpos = this.Xpos + (this.rightSpeed - this.leftSpeed);
                this.x = this.Xpos
            }
        }
        if (this.rightSpeed > 0 && this.standingOn.rightTileKind != 0 && this.standingOn.rightTileKind != 3) {
            if ((this.Xpos + this.rightSpeed) <= (this.game.container.clientWidth - 50) && (this.Xpos - this.leftSpeed) >= 0) {
                this.Xpos = this.Xpos + (this.rightSpeed - this.leftSpeed);
                this.x = this.Xpos
            }
        }
        if (this.upSpeed > 0 && this.standingOn.upTileKind != 0 && this.standingOn.upTileKind != 3) {
            if ((this.Ypos + this.upSpeed) <= (this.game.container.clientHeight - 50) && (this.Ypos - this.downSpeed) >= 0) {
                this.Ypos = this.Ypos + (this.upSpeed - this.downSpeed);
                this.y = this.Ypos / -1
            }
        }
        if (this.downSpeed > 0 && this.standingOn.downTileKind != 0 && this.standingOn.downTileKind != 3) {
            if ((this.Ypos + this.upSpeed) <= (this.game.container.clientHeight - 50) && (this.Ypos - this.downSpeed) >= 0) {
                this.Ypos = this.Ypos + (this.upSpeed - this.downSpeed);
                this.y = this.Ypos / -1

            }
        }
        this.div.style.transform = "translate(" + this.Xpos + "px," + this.Ypos / -1 + "px)"
    }
    public update() {
        this.standingOn = this.gc.getObjectTile(this.Xpos, this.Ypos)
        this.move()

        if (this.game.Xcamera + (window.innerWidth / 3) > this.Xpos + (window.innerWidth / 3) || this.game.Xcamera + (window.innerWidth / 3) < this.Xpos - (window.innerWidth / 3)) {
            this.focusOnMe();
        }

        if (this.game.Ycamera + (window.innerWidth / 3) < ((this.Ypos - (this.game.screenHeight)) / -1) - (window.innerWidth / 3) || this.game.Ycamera - (window.innerWidth / 3) > ((this.Ypos - (this.game.screenHeight)) / -1) - (window.innerWidth / 3)) {
            this.focusOnMe();
        }

        // if (this.holding.getAttribute("type") != "tool" || this.holding.childElementCount <= 0) {
        switch (this.facing) {
            case "left":
                this.standingOn.leftTile.animatePickUp();
                this.standingOn.leftTile.downTile.animatePickUp();
                this.standingOn.leftTile.upTile.animatePickUp();
                break;
            case "right":
                this.standingOn.rightTile.animatePickUp();
                this.standingOn.rightTile.upTile.animatePickUp();
                this.standingOn.rightTile.downTile.animatePickUp();
                break;
            case "forward":
                this.standingOn.upTile.animatePickUp();
                this.standingOn.upTile.leftTile.animatePickUp();
                this.standingOn.upTile.downTile.animatePickUp();
                break;
            case "backward":
                this.standingOn.downTile.animatePickUp();
                this.standingOn.downTile.rightTile.animatePickUp();
                this.standingOn.downTile.leftTile.animatePickUp();
                break;
        }
        // }

    }
    public tryPickup() {
        let pickup: PickUp = this.standingOn.getPickUp();
        let tilePickup: PickUp;
        let lefttilePickup: PickUp;
        let righttilePickup: PickUp;

        if (pickup != null) {
            this.pickUpItem(pickup.item, 1)
        } else {
            switch (this.facing) {
                case "left":
                    tilePickup = this.standingOn.leftTile.getPickUp()
                    if (tilePickup != null) {
                        this.pickUpItem(tilePickup.item, 1)
                        break;
                    }
                    lefttilePickup = this.standingOn.leftTile.downTile.getPickUp()
                    if (lefttilePickup != null) {
                        this.pickUpItem(lefttilePickup.item, 1)
                        break;
                    }
                    righttilePickup = this.standingOn.leftTile.upTile.getPickUp()
                    if (righttilePickup != null) {
                        this.pickUpItem(righttilePickup.item, 1)
                        break;
                    }
                    break;
                case "right":
                    tilePickup = this.standingOn.rightTile.getPickUp()
                    if (tilePickup != null) {
                        this.pickUpItem(tilePickup.item, 1)
                        break;
                    }
                    lefttilePickup = this.standingOn.rightTile.upTile.getPickUp()
                    if (lefttilePickup != null) {
                        this.pickUpItem(lefttilePickup.item, 1)
                        break;
                    }
                    righttilePickup = this.standingOn.rightTile.downTile.getPickUp()
                    if (righttilePickup != null) {
                        this.pickUpItem(righttilePickup.item, 1)
                        break;
                    }
                    break;
                case "forward":
                    tilePickup = this.standingOn.upTile.getPickUp()
                    if (tilePickup != null) {
                        this.pickUpItem(tilePickup.item, 1)
                        break;
                    }
                    lefttilePickup = this.standingOn.upTile.leftTile.getPickUp()
                    if (lefttilePickup != null) {
                        this.pickUpItem(lefttilePickup.item, 1)
                        break;
                    }
                    righttilePickup = this.standingOn.upTile.downTile.getPickUp()
                    if (righttilePickup != null) {
                        this.pickUpItem(righttilePickup.item, 1)
                        break;
                    }
                    break;
                case "backward":
                    tilePickup = this.standingOn.downTile.getPickUp()
                    if (tilePickup != null) {
                        this.pickUpItem(tilePickup.item, 1)
                        break;
                    }
                    lefttilePickup = this.standingOn.downTile.rightTile.getPickUp()
                    if (lefttilePickup != null) {
                        this.pickUpItem(lefttilePickup.item, 1)
                        break;
                    }
                    righttilePickup = this.standingOn.downTile.leftTile.getPickUp()
                    if (righttilePickup != null) {
                        this.pickUpItem(righttilePickup.item, 1)
                        break;
                    }
                    break;

            }
        }
    }
    public useTool() {
        this.holding.setAttribute("animate", "true")
        setTimeout(() => { this.holding.setAttribute("animate", "false") }, 2000)
        let pickup: PickUp
        let tilePickup: PickUp;
        let lefttilePickup: PickUp;
        let righttilePickup: PickUp;
        if (this.standingOn.pickup != null) {
            if (this.standingOn.pickup.neededTool != undefined) {
                if (this.standingOn.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                    pickup = this.standingOn.getPickUp();
                }
            }
        }
        if (pickup != null) {
            this.pickUpItem(pickup.toolItem, 1)
        } else {
            switch (this.facing) {
                case "left":
                    if (this.standingOn.leftTile.pickup != null) {
                        if (this.standingOn.leftTile.pickup.neededTool != undefined) {
                            if (this.standingOn.leftTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                tilePickup = this.standingOn.leftTile.getPickUp()
                                if (tilePickup != null) {
                                    this.pickUpItem(tilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.leftTile.downTile.pickup != null) {
                        if (this.standingOn.leftTile.downTile.pickup.neededTool != undefined) {
                            if (this.standingOn.leftTile.downTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                lefttilePickup = this.standingOn.leftTile.downTile.getPickUp()
                                if (lefttilePickup != null) {
                                    this.pickUpItem(lefttilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.leftTile.upTile.pickup != null) {
                        if (this.standingOn.leftTile.upTile.pickup.neededTool != undefined) {
                            if (this.standingOn.leftTile.upTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                righttilePickup = this.standingOn.leftTile.upTile.getPickUp()
                                if (righttilePickup != null) {
                                    this.pickUpItem(righttilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    break;
                case "right":
                    if (this.standingOn.rightTile.pickup != null) {
                        if (this.standingOn.rightTile.pickup.neededTool != undefined) {
                            if (this.standingOn.rightTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                tilePickup = this.standingOn.rightTile.getPickUp()
                                if (tilePickup != null) {
                                    this.pickUpItem(tilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.rightTile.upTile.pickup != null) {
                        if (this.standingOn.rightTile.upTile.pickup.neededTool != undefined) {
                            if (this.standingOn.rightTile.upTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                lefttilePickup = this.standingOn.rightTile.upTile.getPickUp()
                                if (lefttilePickup != null) {
                                    this.pickUpItem(lefttilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.rightTile.downTile.pickup != null) {
                        if (this.standingOn.rightTile.downTile.pickup.neededTool != undefined) {
                            if (this.standingOn.rightTile.downTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                righttilePickup = this.standingOn.rightTile.downTile.getPickUp()
                                if (righttilePickup != null) {
                                    this.pickUpItem(righttilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    break;
                case "forward":
                    if (this.standingOn.pickup != null) {
                        if (this.standingOn.pickup.neededTool != undefined) {
                            if (this.standingOn.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                tilePickup = this.standingOn.upTile.getPickUp()
                                if (tilePickup != null) {
                                    this.pickUpItem(tilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.upTile.leftTile.pickup != null) {
                        if (this.standingOn.upTile.leftTile.pickup.neededTool != undefined) {
                            if (this.standingOn.upTile.leftTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                lefttilePickup = this.standingOn.upTile.leftTile.getPickUp()
                                if (lefttilePickup != null) {
                                    this.pickUpItem(lefttilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.upTile.downTile.pickup != null) {
                        if (this.standingOn.upTile.downTile.pickup.neededTool != undefined) {
                            if (this.standingOn.upTile.downTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                righttilePickup = this.standingOn.upTile.downTile.getPickUp()
                                if (righttilePickup != null) {
                                    this.pickUpItem(righttilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    break;
                case "backward":
                    if (this.standingOn.downTile.pickup != null) {
                        if (this.standingOn.downTile.pickup.neededTool != undefined) {
                            if (this.standingOn.downTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                tilePickup = this.standingOn.downTile.getPickUp()
                                if (tilePickup != null) {
                                    this.pickUpItem(tilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.downTile.rightTile.pickup != null) {
                        if (this.standingOn.downTile.rightTile.pickup.neededTool != undefined) {
                            if (this.standingOn.downTile.rightTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                lefttilePickup = this.standingOn.downTile.rightTile.getPickUp()
                                if (lefttilePickup != null) {
                                    this.pickUpItem(lefttilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.downTile.leftTile.pickup != null) {
                        if (this.standingOn.downTile.leftTile.pickup.neededTool != undefined) {
                            if (this.standingOn.downTile.leftTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                righttilePickup = this.standingOn.downTile.leftTile.getPickUp()
                                if (righttilePickup != null) {
                                    this.pickUpItem(righttilePickup.toolItem, 1)
                                    break;
                                }
                            }
                        }
                    }
                    break;

            }
        }

    }
    public pickUpItem(item: Item, amount: number) {
        this.inventoryBar.addItem(item, amount)
        this.game.waits ++
    }
    public toggleInventory() {
        if (this.inventoryMenu != null || this.inventoryMenu != undefined) {
            if (this.game.waitMenu == undefined) {
                this.inventoryMenu.exists = false;
                this.inventoryMenu = undefined;
            }
        } else {
            this.inventoryMenu = new CraftMenu(this.game, this)
        }
    }
    onKeyDown(event: KeyboardEvent): void {

        switch (event.keyCode) {
            case this.aKey:
                this.div.setAttribute("class", "left")
                this.holding.setAttribute("class", "left")
                this.facing = "left"
                if (this.standingOn.leftTileKind != 0 && this.standingOn.leftTileKind != 3) {
                    this.leftSpeed = 5;
                }
                break;
            case this.dKey:
                this.div.setAttribute("class", "right")
                this.holding.setAttribute("class", "right")
                this.facing = "right"
                if (this.standingOn.rightTileKind != 0 && this.standingOn.rightTileKind != 3) {
                    this.rightSpeed = 5;
                }
                break;
            case this.wKey:
                this.div.setAttribute("class", "jump")
                this.holding.setAttribute("class", "jump")
                this.facing = "forward"
                if (this.standingOn.upTileKind != 0 && this.standingOn.upTileKind != 3) {
                    this.upSpeed = 5;
                }
                break;
            case this.sKey:
                this.div.setAttribute("class", "still")
                this.holding.setAttribute("class", "still")
                this.facing = "backward"
                if (this.standingOn.downTileKind != 0 && this.standingOn.downTileKind != 3) {
                    this.downSpeed = 5;
                }
                break;
            case this.spaceKey:
                if (this.holding.childElementCount > 0) {
                    if (this.holding.getAttribute("type") != "tool") {
                        this.tryPickup()
                    } else {
                        this.useTool()
                    }
                } else {
                    this.tryPickup()
                }
                break;
        }
    }
    onKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case this.aKey:

                this.leftSpeed = 0;
                break;
            case this.dKey:
                this.rightSpeed = 0;
                break;
            case this.wKey:
                this.upSpeed = 0;
                break;
            case this.sKey:
                this.downSpeed = 0;
                break;
            case this.eKey:
                this.toggleInventory()
                break;
        }
    }

}