var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Composite = (function () {
    function Composite() {
        this.items = [];
    }
    Composite.prototype.update = function () {
        for (var i = 0; i < this.items.length; i += 1) {
            this.items[i].update();
        }
    };
    Composite.prototype.add = function (c) {
        this.items.push(c);
    };
    Composite.prototype.remove = function (i) {
        if (this.items.length <= i) {
            throw new Error("index out of bound!");
        }
        this.items.splice(i, 1);
    };
    return Composite;
}());
var compTiles = (function () {
    function compTiles(g) {
        this.debug = false;
        this.items = [];
        this.game = g;
    }
    compTiles.prototype.toggleShow = function () {
        for (var i = 0; i < this.items.length; i += 1) {
            this.items[i].toggleShow();
        }
        if (this.debug == false) {
            document.getElementById("container").style.height = "0";
            document.getElementById("uiContainer").style.height = "0";
            document.getElementsByTagName("body")[0].style.overflow = "visible";
            this.debug = true;
        }
        else {
            document.getElementById("container").style.height = this.game.screenHeight + "px";
            document.getElementById("uiContainer").style.height = "100%";
            document.body.style.overflow = "hidden";
            this.debug = false;
        }
    };
    compTiles.prototype.updateTiles = function () {
        for (var i = 0; i < this.items.length; i += 1) {
            this.items[i].updateTiles();
        }
    };
    compTiles.prototype.setSurrounding = function () {
        for (var i = 0; i < this.items.length; i += 1) {
            this.items[i].setSurrounding();
        }
    };
    compTiles.prototype.add = function (c) {
        this.items.push(c);
    };
    compTiles.prototype.remove = function (i) {
        if (this.items.length <= i) {
            throw new Error("index out of bound!");
        }
        this.items.splice(i, 1);
    };
    return compTiles;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        this.screenWidth = Math.floor(window.innerWidth / 100) * 400;
        this.screenHeight = Math.floor(window.innerHeight / 100) * 400;
        this.active = true;
        this.gameUpdater = new Composite;
        this.compTiles = new compTiles(this);
        this.gameActive = false;
        this.gameTick = 0;
        this.gameSec = 0;
        this.waits = 1;
        this.container = document.getElementById("container");
        this.uiContainer = document.getElementById("uiContainer");
        this.allGameObjects = [];
        this.allPlayers = [];
        this.allUiObjects = [];
        this.buttonScreen = new button(this, "", "windowChanger", 0);
        this.allViews = [new StartMenuView(this), new GameView(this), new OptionsMenuView(this), new EndMenuView(this)];
        this.allItems = [new Stick(this), new Wood(this), new Stone(this), new SharpRock(this), new Fiber(this), new Rope(this), new AxeHead(this), new Spear(this), new Axe(this)];
        requestAnimationFrame(function () { return _this.gameLoop(); });
        this.requestNewView("startMenuView");
    }
    Game.instance = function () {
        if (!Game._instance)
            Game._instance = new Game();
        return Game._instance;
    };
    Game.prototype.requestPlayer = function (gc, x, y) {
        var player = new Player(this, gc, this.allPlayers.length, x, y);
    };
    Game.prototype.requestNewView = function (name) {
        for (var i = 0; i < this.allViews.length; i++) {
            if (this.allViews[i].name == name) {
                this.currentView = this.allViews[i];
                this.currentView.setActive();
            }
            else {
                this.allViews[i].setUnactive();
            }
        }
    };
    Game.prototype.uiCleaner = function () {
        var _this = this;
        if (this.allUiObjects.length > 0) {
            var _loop_1 = function () {
                if (this_1.allUiObjects[i] != undefined) {
                    if (this_1.allUiObjects[i].exists == false) {
                        this_1.allUiObjects[i].div.style.transform = "scale(0)";
                        var object_1 = this_1.allUiObjects[i];
                        this_1.allUiObjects.splice(i, 1);
                        setTimeout(function () { return _this.deleteObject(object_1.div); }, 500);
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i < this.allUiObjects.length; i++) {
                _loop_1();
            }
        }
    };
    Game.prototype.GameObjectCleaner = function () {
        var _this = this;
        if (this.allGameObjects.length > 0) {
            var _loop_2 = function () {
                if (this_2.allGameObjects[i] != undefined) {
                    if (this_2.allGameObjects[i].exists == false) {
                        var object_2 = this_2.allGameObjects[i];
                        this_2.allGameObjects.splice(i, 1);
                        setTimeout(function () { return _this.deleteObject(object_2.div); }, 500);
                    }
                }
            };
            var this_2 = this;
            for (var i = 0; i < this.allGameObjects.length; i++) {
                _loop_2();
            }
        }
    };
    Game.prototype.deleteObject = function (o) {
        o.remove();
    };
    Game.prototype.collisionCheck = function (c1, c2) {
        return !(c2.x > c1.x + c1.width ||
            c2.x + c2.width < c1.x ||
            c2.y > c1.y + c1.height ||
            c2.y + c2.height < c1.y);
    };
    Game.prototype.setScreen = function (x, y) {
        var coords = [(x - (window.innerWidth / 2)), (this.screenHeight) + (y - (window.innerHeight / 2))];
        this.buttonScreen.exists = false;
        this.buttonScreen = new button(this, "", "windowChanger", coords);
        this.buttonScreen.div.click();
        this.Xcamera = coords[0];
        this.Ycamera = coords[1];
    };
    Game.prototype.uiAnimations = function () {
        this.uiCleaner();
        this.currentView.update();
    };
    Game.prototype.gameAnimations = function () {
        if (this.gameActive) {
            this.gameObject = this.gameUpdater;
            this.gameObject.update();
            this.GameObjectCleaner();
            this.gameTick++;
            this.gameSec = Math.round(this.gameTick / 47);
            if (this.waitMenu != undefined) {
                this.waitMenu.timer();
            }
        }
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.active) {
            this.gameAnimations();
            this.uiAnimations();
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.endGame = function () {
        this.active = false;
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.instance();
});
var GameController = (function () {
    function GameController(g, v) {
        this.allTiles = [];
        this.tileRows = [];
        this.showTiles = false;
        this.prefTile = null;
        this.currentRow = 0;
        this.currentRowTiles = [];
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        this.gameView = v;
        this.game = g;
        this.game.gameUpdater.add(this);
    }
    GameController.prototype.getObjectTile = function (xObject, yObject) {
        var xTile = Math.round(xObject / 50);
        var yTile = Math.round((((this.game.screenHeight) - yObject) - 50) / 50);
        return this.getTile(xTile, yTile);
    };
    GameController.prototype.getTile = function (x, y) {
        var tile;
        if (y < 0 || y >= this.allTiles.length) {
            return null;
        }
        var rowTile = this.allTiles[y];
        for (var i = 0; i < rowTile.length; i++) {
            if (rowTile[i].x == x) {
                return rowTile[i];
            }
        }
        return null;
    };
    GameController.prototype.getTileKind = function (x, y) {
        var tileKind;
        var tile;
        tile = this.getTile(x, y);
        if (tile == undefined || tile == null) {
            return null;
        }
        tileKind = tile.kindNr;
        return tileKind;
    };
    GameController.prototype.makeTile = function (x, y) {
        if (y == this.currentRow) {
            this.currentRowTiles.push(new tile(this.game, this, x, y));
        }
        else {
            this.allTiles.push(this.currentRowTiles);
            this.currentRowTiles = [];
            this.currentRow = y;
            this.currentRowTiles.push(new tile(this.game, this, x, y));
        }
    };
    GameController.prototype.generateWorld = function () {
        document.getElementById("tileContainer").style.width = this.game.screenWidth + "px";
        document.getElementById("container").style.width = this.game.screenWidth + "px";
        document.getElementById("tileContainer").style.height = this.game.screenHeight + "px";
        document.getElementById("container").style.height = this.game.screenHeight + "px";
        for (var i = 0; this.tileRows.length * 50 < this.game.screenHeight; i++) {
            this.tileRows.push(0);
            for (var j = 0; this.tileRows[i] * 50 < this.game.screenWidth; j++) {
                this.makeTile(j, i);
                this.tileRows[i]++;
            }
        }
        this.allTiles.push(this.currentRowTiles);
        this.currentRowTiles = [];
        this.currentRow++;
        this.game.compTiles.updateTiles();
        this.game.compTiles.setSurrounding();
    };
    GameController.prototype.update = function () {
    };
    GameController.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case 13:
                this.game.compTiles.toggleShow();
                break;
        }
    };
    return GameController;
}());
var Changer = (function () {
    function Changer(collection) {
        this.collection = [];
        this.position = 0;
        this.collection = collection;
    }
    Changer.prototype.next = function () {
        var result = this.collection[this.position];
        this.position += 1;
        return result;
    };
    Changer.prototype.hasNext = function () {
        return this.position < this.collection.length;
    };
    return Changer;
}());
var gameObject = (function () {
    function gameObject(g, tag, parent) {
        this.game = g;
        if (parent == null) {
            this.parent = this.game.container;
        }
        else {
            this.parent = parent;
        }
        this.div = document.createElement(tag);
        this.styleHeight = this.div.style.height;
        this.parent.appendChild(this.div);
        this.exists = true;
        this.game.allGameObjects.push(this);
        this.hide();
        this.game.gameUpdater.add(this);
    }
    Object.defineProperty(gameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(gameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(gameObject.prototype, "div", {
        get: function () { return this._div; },
        set: function (value) { this._div = value; },
        enumerable: true,
        configurable: true
    });
    gameObject.prototype.hide = function () {
        this.div.style.display = "none";
    };
    gameObject.prototype.show = function () {
        this.div.style.display = "";
    };
    gameObject.prototype.focusOnMe = function () {
        this.game.setScreen(this.x, this.y);
    };
    gameObject.prototype.update = function () {
    };
    return gameObject;
}());
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(g, gc, pn, x, y) {
        var _this = _super.call(this, g, "player") || this;
        _this.facing = "backward";
        _this.upKey = 38;
        _this.downKey = 40;
        _this.leftKey = 37;
        _this.rightKey = 39;
        _this.spaceKey = 32;
        _this.enterKey = 13;
        _this.wKey = 87;
        _this.aKey = 65;
        _this.sKey = 83;
        _this.dKey = 68;
        _this.eKey = 69;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        _this.upSpeed = 0;
        _this.downSpeed = 0;
        _this.Xpos = 0;
        _this.Ypos = 0;
        _this.hud = [];
        var playerNumber = pn + 1;
        _this.div.setAttribute("id", "player" + playerNumber);
        _this.div.setAttribute("class", "still");
        window.addEventListener("keydown", _this.onKeyDown.bind(_this));
        window.addEventListener("keyup", _this.onKeyUp.bind(_this));
        _this.game.allPlayers.push(_this);
        _this.gc = gc;
        _this.width = 50;
        _this.height = 1;
        _this.x = x;
        _this.y = -y;
        _this.Xpos = x;
        _this.Ypos = y;
        _this.focusOnMe();
        _this.inventoryBar = new inventoryBar(g, _this);
        _this.holding = document.createElement("holding");
        _this.div.appendChild(_this.holding);
        return _this;
    }
    Player.prototype.move = function () {
        if (this.leftSpeed > 0 && this.standingOn.leftTileKind != 0 && this.standingOn.leftTileKind != 3) {
            if ((this.Xpos + this.rightSpeed) <= (this.game.container.clientWidth - 50) && (this.Xpos - this.leftSpeed) >= 0) {
                this.Xpos = this.Xpos + (this.rightSpeed - this.leftSpeed);
                this.x = this.Xpos;
            }
        }
        if (this.rightSpeed > 0 && this.standingOn.rightTileKind != 0 && this.standingOn.rightTileKind != 3) {
            if ((this.Xpos + this.rightSpeed) <= (this.game.container.clientWidth - 50) && (this.Xpos - this.leftSpeed) >= 0) {
                this.Xpos = this.Xpos + (this.rightSpeed - this.leftSpeed);
                this.x = this.Xpos;
            }
        }
        if (this.upSpeed > 0 && this.standingOn.upTileKind != 0 && this.standingOn.upTileKind != 3) {
            if ((this.Ypos + this.upSpeed) <= (this.game.container.clientHeight - 50) && (this.Ypos - this.downSpeed) >= 0) {
                this.Ypos = this.Ypos + (this.upSpeed - this.downSpeed);
                this.y = this.Ypos / -1;
            }
        }
        if (this.downSpeed > 0 && this.standingOn.downTileKind != 0 && this.standingOn.downTileKind != 3) {
            if ((this.Ypos + this.upSpeed) <= (this.game.container.clientHeight - 50) && (this.Ypos - this.downSpeed) >= 0) {
                this.Ypos = this.Ypos + (this.upSpeed - this.downSpeed);
                this.y = this.Ypos / -1;
            }
        }
        this.div.style.transform = "translate(" + this.Xpos + "px," + this.Ypos / -1 + "px)";
    };
    Player.prototype.update = function () {
        this.standingOn = this.gc.getObjectTile(this.Xpos, this.Ypos);
        this.move();
        if (this.game.Xcamera + (window.innerWidth / 3) > this.Xpos + (window.innerWidth / 3) || this.game.Xcamera + (window.innerWidth / 3) < this.Xpos - (window.innerWidth / 3)) {
            this.focusOnMe();
        }
        if (this.game.Ycamera + (window.innerWidth / 3) < ((this.Ypos - (this.game.screenHeight)) / -1) - (window.innerWidth / 3) || this.game.Ycamera - (window.innerWidth / 3) > ((this.Ypos - (this.game.screenHeight)) / -1) - (window.innerWidth / 3)) {
            this.focusOnMe();
        }
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
    };
    Player.prototype.tryPickup = function () {
        var pickup = this.standingOn.getPickUp();
        var tilePickup;
        var lefttilePickup;
        var righttilePickup;
        if (pickup != null) {
            this.pickUpItem(pickup.item, 1);
        }
        else {
            switch (this.facing) {
                case "left":
                    tilePickup = this.standingOn.leftTile.getPickUp();
                    if (tilePickup != null) {
                        this.pickUpItem(tilePickup.item, 1);
                        break;
                    }
                    lefttilePickup = this.standingOn.leftTile.downTile.getPickUp();
                    if (lefttilePickup != null) {
                        this.pickUpItem(lefttilePickup.item, 1);
                        break;
                    }
                    righttilePickup = this.standingOn.leftTile.upTile.getPickUp();
                    if (righttilePickup != null) {
                        this.pickUpItem(righttilePickup.item, 1);
                        break;
                    }
                    break;
                case "right":
                    tilePickup = this.standingOn.rightTile.getPickUp();
                    if (tilePickup != null) {
                        this.pickUpItem(tilePickup.item, 1);
                        break;
                    }
                    lefttilePickup = this.standingOn.rightTile.upTile.getPickUp();
                    if (lefttilePickup != null) {
                        this.pickUpItem(lefttilePickup.item, 1);
                        break;
                    }
                    righttilePickup = this.standingOn.rightTile.downTile.getPickUp();
                    if (righttilePickup != null) {
                        this.pickUpItem(righttilePickup.item, 1);
                        break;
                    }
                    break;
                case "forward":
                    tilePickup = this.standingOn.upTile.getPickUp();
                    if (tilePickup != null) {
                        this.pickUpItem(tilePickup.item, 1);
                        break;
                    }
                    lefttilePickup = this.standingOn.upTile.leftTile.getPickUp();
                    if (lefttilePickup != null) {
                        this.pickUpItem(lefttilePickup.item, 1);
                        break;
                    }
                    righttilePickup = this.standingOn.upTile.downTile.getPickUp();
                    if (righttilePickup != null) {
                        this.pickUpItem(righttilePickup.item, 1);
                        break;
                    }
                    break;
                case "backward":
                    tilePickup = this.standingOn.downTile.getPickUp();
                    if (tilePickup != null) {
                        this.pickUpItem(tilePickup.item, 1);
                        break;
                    }
                    lefttilePickup = this.standingOn.downTile.rightTile.getPickUp();
                    if (lefttilePickup != null) {
                        this.pickUpItem(lefttilePickup.item, 1);
                        break;
                    }
                    righttilePickup = this.standingOn.downTile.leftTile.getPickUp();
                    if (righttilePickup != null) {
                        this.pickUpItem(righttilePickup.item, 1);
                        break;
                    }
                    break;
            }
        }
    };
    Player.prototype.useTool = function () {
        var _this = this;
        this.holding.setAttribute("animate", "true");
        setTimeout(function () { _this.holding.setAttribute("animate", "false"); }, 2000);
        var pickup;
        var tilePickup;
        var lefttilePickup;
        var righttilePickup;
        if (this.standingOn.pickup != null) {
            if (this.standingOn.pickup.neededTool != undefined) {
                if (this.standingOn.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                    pickup = this.standingOn.getPickUp();
                }
            }
        }
        if (pickup != null) {
            this.pickUpItem(pickup.toolItem, 1);
        }
        else {
            switch (this.facing) {
                case "left":
                    if (this.standingOn.leftTile.pickup != null) {
                        if (this.standingOn.leftTile.pickup.neededTool != undefined) {
                            if (this.standingOn.leftTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                tilePickup = this.standingOn.leftTile.getPickUp();
                                if (tilePickup != null) {
                                    this.pickUpItem(tilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.leftTile.downTile.pickup != null) {
                        if (this.standingOn.leftTile.downTile.pickup.neededTool != undefined) {
                            if (this.standingOn.leftTile.downTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                lefttilePickup = this.standingOn.leftTile.downTile.getPickUp();
                                if (lefttilePickup != null) {
                                    this.pickUpItem(lefttilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.leftTile.upTile.pickup != null) {
                        if (this.standingOn.leftTile.upTile.pickup.neededTool != undefined) {
                            if (this.standingOn.leftTile.upTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                righttilePickup = this.standingOn.leftTile.upTile.getPickUp();
                                if (righttilePickup != null) {
                                    this.pickUpItem(righttilePickup.toolItem, 1);
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
                                tilePickup = this.standingOn.rightTile.getPickUp();
                                if (tilePickup != null) {
                                    this.pickUpItem(tilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.rightTile.upTile.pickup != null) {
                        if (this.standingOn.rightTile.upTile.pickup.neededTool != undefined) {
                            if (this.standingOn.rightTile.upTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                lefttilePickup = this.standingOn.rightTile.upTile.getPickUp();
                                if (lefttilePickup != null) {
                                    this.pickUpItem(lefttilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.rightTile.downTile.pickup != null) {
                        if (this.standingOn.rightTile.downTile.pickup.neededTool != undefined) {
                            if (this.standingOn.rightTile.downTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                righttilePickup = this.standingOn.rightTile.downTile.getPickUp();
                                if (righttilePickup != null) {
                                    this.pickUpItem(righttilePickup.toolItem, 1);
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
                                tilePickup = this.standingOn.upTile.getPickUp();
                                if (tilePickup != null) {
                                    this.pickUpItem(tilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.upTile.leftTile.pickup != null) {
                        if (this.standingOn.upTile.leftTile.pickup.neededTool != undefined) {
                            if (this.standingOn.upTile.leftTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                lefttilePickup = this.standingOn.upTile.leftTile.getPickUp();
                                if (lefttilePickup != null) {
                                    this.pickUpItem(lefttilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.upTile.downTile.pickup != null) {
                        if (this.standingOn.upTile.downTile.pickup.neededTool != undefined) {
                            if (this.standingOn.upTile.downTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                righttilePickup = this.standingOn.upTile.downTile.getPickUp();
                                if (righttilePickup != null) {
                                    this.pickUpItem(righttilePickup.toolItem, 1);
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
                                tilePickup = this.standingOn.downTile.getPickUp();
                                if (tilePickup != null) {
                                    this.pickUpItem(tilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.downTile.rightTile.pickup != null) {
                        if (this.standingOn.downTile.rightTile.pickup.neededTool != undefined) {
                            if (this.standingOn.downTile.rightTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                lefttilePickup = this.standingOn.downTile.rightTile.getPickUp();
                                if (lefttilePickup != null) {
                                    this.pickUpItem(lefttilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    if (this.standingOn.downTile.leftTile.pickup != null) {
                        if (this.standingOn.downTile.leftTile.pickup.neededTool != undefined) {
                            if (this.standingOn.downTile.leftTile.pickup.neededTool.type == this.holding.firstElementChild.getAttribute("type")) {
                                righttilePickup = this.standingOn.downTile.leftTile.getPickUp();
                                if (righttilePickup != null) {
                                    this.pickUpItem(righttilePickup.toolItem, 1);
                                    break;
                                }
                            }
                        }
                    }
                    break;
            }
        }
    };
    Player.prototype.pickUpItem = function (item, amount) {
        this.inventoryBar.addItem(item, amount);
        this.game.waits++;
    };
    Player.prototype.toggleInventory = function () {
        if (this.inventoryMenu != null || this.inventoryMenu != undefined) {
            if (this.game.waitMenu == undefined) {
                this.inventoryMenu.exists = false;
                this.inventoryMenu = undefined;
            }
        }
        else {
            this.inventoryMenu = new CraftMenu(this.game, this);
        }
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.aKey:
                this.div.setAttribute("class", "left");
                this.holding.setAttribute("class", "left");
                this.facing = "left";
                if (this.standingOn.leftTileKind != 0 && this.standingOn.leftTileKind != 3) {
                    this.leftSpeed = 5;
                }
                break;
            case this.dKey:
                this.div.setAttribute("class", "right");
                this.holding.setAttribute("class", "right");
                this.facing = "right";
                if (this.standingOn.rightTileKind != 0 && this.standingOn.rightTileKind != 3) {
                    this.rightSpeed = 5;
                }
                break;
            case this.wKey:
                this.div.setAttribute("class", "jump");
                this.holding.setAttribute("class", "jump");
                this.facing = "forward";
                if (this.standingOn.upTileKind != 0 && this.standingOn.upTileKind != 3) {
                    this.upSpeed = 5;
                }
                break;
            case this.sKey:
                this.div.setAttribute("class", "still");
                this.holding.setAttribute("class", "still");
                this.facing = "backward";
                if (this.standingOn.downTileKind != 0 && this.standingOn.downTileKind != 3) {
                    this.downSpeed = 5;
                }
                break;
            case this.spaceKey:
                if (this.holding.childElementCount > 0) {
                    if (this.holding.getAttribute("type") != "tool") {
                        this.tryPickup();
                    }
                    else {
                        this.useTool();
                    }
                }
                else {
                    this.tryPickup();
                }
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
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
                this.toggleInventory();
                break;
        }
    };
    return Player;
}(gameObject));
var tile = (function (_super) {
    __extends(tile, _super);
    function tile(g, gc, x, y) {
        var _this = _super.call(this, g, "tile", document.getElementById("tileContainer")) || this;
        _this.showTile = true;
        _this.events = "";
        _this.makeLakes = true;
        _this.upTile = null;
        _this.leftTile = null;
        _this.rightTile = null;
        _this.downTile = null;
        _this.upTileBiome = null;
        _this.leftTileBiome = null;
        _this.rightTileBiome = null;
        _this.downTileBiome = null;
        _this.upTileKind = null;
        _this.leftTileKind = null;
        _this.rightTileKind = null;
        _this.downTileKind = null;
        _this.hasStuff = false;
        _this.pickup = null;
        _this.pickupAmount = 0;
        _this.gc = gc;
        _this.row = y;
        _this.x = x;
        _this.y = y;
        _this.div.innerText = _this.x + "," + _this.y;
        _this.game.compTiles.add(_this);
        _this.turnToSaltWater();
        return _this;
    }
    tile.prototype.toggleShow = function () {
        if (this.showTile == false) {
            this.div.style.border = "0px solid black";
            this.div.style.color = " rgba(0,0,0,0)";
            this.showTile = true;
        }
        else {
            this.div.style.border = "1px solid black";
            this.div.style.color = " rgba(0,0,0,1)";
            this.showTile = false;
        }
    };
    tile.prototype.updateTiles = function () {
        this.setNorthWest();
        this.changeTile();
    };
    tile.prototype.update = function () {
    };
    tile.prototype.setNorthWest = function () {
        this.upTile = this.gc.getTile(this.x, this.y - 1);
        if (this.upTile == null) {
            this.upTileKind = null;
        }
        else {
            this.upTileKind = this.upTile.kindNr;
            this.upTileBiome = this.upTile.biome;
        }
        this.leftTile = this.gc.getTile(this.x - 1, this.y);
        if (this.leftTile == null) {
            this.leftTileKind = null;
        }
        else {
            this.leftTileKind = this.leftTile.kindNr;
            this.leftTileBiome = this.leftTile.biome;
        }
        if (this.leftTile == undefined && this.upTile == undefined) {
            this.biomeStarter = this;
        }
        else if (this.upTile == undefined) {
            this.biomeStarter = this.leftTile.biomeStarter;
        }
        else if (this.leftTile == undefined) {
            this.biomeStarter = this.upTile.biomeStarter;
        }
        else {
            this.biomeStarter = this.leftTile.biomeStarter;
        }
    };
    tile.prototype.setSurrounding = function () {
        this.upTile = this.gc.getTile(this.x, this.y - 1);
        if (this.upTile == null) {
            this.upTileKind = null;
        }
        else {
            this.upTileKind = this.upTile.kindNr;
            this.upTileBiome = this.upTile.biome;
        }
        this.leftTile = this.gc.getTile(this.x - 1, this.y);
        if (this.leftTile == null) {
            this.leftTileKind = null;
        }
        else {
            this.leftTileKind = this.leftTile.kindNr;
            this.leftTileBiome = this.leftTile.biome;
        }
        this.rightTile = this.gc.getTile(this.x + 1, this.y);
        if (this.rightTile == null) {
            this.rightTileKind = null;
        }
        else {
            this.rightTileKind = this.rightTile.kindNr;
            this.rightTileBiome = this.rightTile.biome;
        }
        this.downTile = this.gc.getTile(this.x, this.y + 1);
        if (this.downTile == null) {
            this.downTileKind = null;
        }
        else {
            this.downTileKind = this.downTile.kindNr;
            this.downTileBiome = this.downTile.biome;
        }
        if (this.biome == "Lake") {
            if (this.downTileBiome != "Sea" && this.upTileBiome != "Sea" && this.leftTileBiome != "Sea" && this.rightTileBiome != "Sea") {
                this.turnToFreshWater();
            }
            else {
                this.events += "LtoS";
                this.biome = "Sea";
            }
        }
        this.turnToSand();
        this.generatePickUp();
    };
    tile.prototype.changeTile = function () {
        this.chance = 50;
        this.random = Math.random() * 100;
        if (this.y == 0) {
            this.chance = this.chance - 50;
            this.events = this.events + "y0,";
        }
        if (this.y == 1) {
            this.chance = this.chance - 50;
            this.events = this.events + "y1,";
        }
        if (this.y == 2) {
            this.chance = this.chance - 50;
            this.events = this.events + "y2,";
        }
        if (this.y == 3) {
            this.chance = this.chance - 50;
            this.events = this.events + "y3,";
        }
        if (this.y == 4) {
            this.chance = this.chance - 50;
            this.events = this.events + "y4,";
        }
        if (this.y == 5) {
            this.chance = this.chance - 50;
            this.events = this.events + "y5,";
        }
        if (this.y == 6) {
            this.chance = this.chance - 50;
            this.events = this.events + "y6,";
        }
        if (this.y == 7) {
            this.chance = this.chance - 50;
            this.events = this.events + "y7,";
        }
        if (this.y == 8) {
            this.chance = this.chance - 50;
            this.events = this.events + "y8,";
        }
        if (this.y == 9) {
            this.chance = this.chance - 50;
            this.events = this.events + "y9,";
        }
        if (this.y == 10) {
            this.chance = this.chance - 50;
            this.events = this.events + "y10,";
        }
        if (this.y == 11) {
            this.chance = this.chance - 50;
            this.events = this.events + "y11,";
        }
        if (this.y == 12) {
            this.chance = this.chance - 50;
            this.events = this.events + "y12,";
        }
        if (this.y == 13) {
            this.chance = this.chance - 50;
            this.events = this.events + "y13,";
        }
        if (this.y == 14) {
            this.chance = this.chance - 50;
            this.events = this.events + "y14,";
        }
        if (this.y == 15) {
            this.chance = this.chance - 50;
            this.events = this.events + "y15,";
        }
        if (this.y == 16) {
            this.chance = this.chance - 40;
            this.events = this.events + "y16,";
        }
        if (this.y == 17) {
            this.chance = this.chance - 20;
            this.events = this.events + "y17,";
        }
        if (this.x == 0) {
            this.chance = this.chance - 50;
            this.events = this.events + "x0,";
        }
        if (this.x == 1) {
            this.chance = this.chance - 50;
            this.events = this.events + "x1,";
        }
        if (this.x == 2) {
            this.chance = this.chance - 50;
            this.events = this.events + "x2,";
        }
        if (this.x == 3) {
            this.chance = this.chance - 50;
            this.events = this.events + "x3,";
        }
        if (this.x == 4) {
            this.chance = this.chance - 50;
            this.events = this.events + "x4,";
        }
        if (this.x == 5) {
            this.chance = this.chance - 50;
            this.events = this.events + "x5,";
        }
        if (this.x == 6) {
            this.chance = this.chance - 50;
            this.events = this.events + "x6,";
        }
        if (this.x == 7) {
            this.chance = this.chance - 50;
            this.events = this.events + "x7,";
        }
        if (this.x == 8) {
            this.chance = this.chance - 50;
            this.events = this.events + "x8,";
        }
        if (this.x == 9) {
            this.chance = this.chance - 50;
            this.events = this.events + "x9,";
        }
        if (this.x == 10) {
            this.chance = this.chance - 50;
            this.events = this.events + "x10,";
        }
        if (this.x == 11) {
            this.chance = this.chance - 50;
            this.events = this.events + "x11,";
        }
        if (this.x == 12) {
            this.chance = this.chance - 50;
            this.events = this.events + "x12,";
        }
        if (this.x == 13) {
            this.chance = this.chance - 50;
            this.events = this.events + "x13,";
        }
        if (this.x == 14) {
            this.chance = this.chance - 50;
            this.events = this.events + "x14,";
        }
        if (this.x == 15) {
            this.chance = this.chance - 50;
            this.events = this.events + "x15,";
        }
        if (this.x == 16) {
            this.chance = this.chance - 40;
            this.events = this.events + "x16,";
        }
        if (this.x == 17) {
            this.chance = this.chance - 20;
            this.events = this.events + "x17,";
        }
        if (this.leftTile != null && this.upTile != null) {
            if (this.gc.islandStarter != undefined) {
                if ((this.x < this.gc.islandStarter.x + 5 && this.x > this.gc.islandStarter.x - 5) && (this.y < this.gc.islandStarter.y + 5 && this.y > this.gc.islandStarter.y - 5)) {
                    this.chance += 100;
                    this.events += "spawn, ";
                }
                if ((this.x - 55) >= this.gc.islandStarter.x) {
                    this.events = this.events + "iSx55,";
                    this.makeLakes = false;
                }
                if ((this.y - 55) >= this.gc.islandStarter.y) {
                    this.events = this.events + "iSy55,";
                    this.makeLakes = false;
                }
                if ((this.x - 65) >= this.gc.islandStarter.x) {
                    this.events = this.events + "iSx65,";
                    this.makeLakes = false;
                    if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                        this.chance = this.chance - 50;
                        this.events = this.events + "S+S,";
                    }
                    if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                        this.chance = this.chance - 30;
                        this.events = this.events + "S+L,";
                    }
                    if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                        this.chance = this.chance - 20;
                        this.events = this.events + "L+S,";
                    }
                    if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                        this.chance = this.chance + 20;
                        this.events = this.events + "L+L,";
                    }
                    if ((this.x - 70) >= this.gc.islandStarter.x) {
                        this.events = this.events + "iSx70,";
                        if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance - 50;
                            this.events = this.events + "S+S,";
                        }
                        if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance - 30;
                            this.events = this.events + "S+L,";
                        }
                        if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance - 20;
                            this.events = this.events + "L+S,";
                        }
                        if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance + 20;
                            this.events = this.events + "L+L,";
                        }
                        if ((this.x - 75) >= this.gc.islandStarter.x) {
                            this.events = this.events + "iSx75,";
                            if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                                this.chance = this.chance - 50;
                                this.events = this.events + "S+S,";
                            }
                            if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                                this.chance = this.chance - 30;
                                this.events = this.events + "S+L,";
                            }
                            if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                                this.chance = this.chance - 20;
                                this.events = this.events + "L+S,";
                            }
                            if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                                this.chance = this.chance + 20;
                                this.events = this.events + "L+L,";
                            }
                        }
                    }
                }
                else if ((this.y - 65) >= this.gc.islandStarter.y) {
                    this.events = this.events + "iSy65,";
                    this.makeLakes = false;
                    if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                        this.chance = this.chance - 50;
                        this.events = this.events + "S+S,";
                    }
                    if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                        this.chance = this.chance - 30;
                        this.events = this.events + "S+L,";
                    }
                    if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                        this.chance = this.chance - 20;
                        this.events = this.events + "L+S,";
                    }
                    if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                        this.chance = this.chance + 20;
                        this.events = this.events + "L+L,";
                    }
                    if ((this.y - 70) >= this.gc.islandStarter.y) {
                        this.events = this.events + "iSy70,";
                        if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance - 50;
                            this.events = this.events + "S+S,";
                        }
                        if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance - 30;
                            this.events = this.events + "S+L,";
                        }
                        if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance - 30;
                            this.events = this.events + "L+S,";
                        }
                        if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance + 15;
                            this.events = this.events + "L+L,";
                        }
                        if ((this.y - 75) >= this.gc.islandStarter.y) {
                            this.events = this.events + "iSy75,";
                            if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                                this.chance = this.chance - 50;
                                this.events = this.events + "S+S,";
                            }
                            if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                                this.chance = this.chance - 40;
                                this.events = this.events + "S+L,";
                            }
                            if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                                this.chance = this.chance - 40;
                                this.events = this.events + "L+S,";
                            }
                            if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                                this.chance = this.chance + 5;
                                this.events = this.events + "L+L,";
                            }
                        }
                    }
                }
                else {
                    if (this.makeLakes == false && this.x > 18) {
                        this.chance = this.chance + 50;
                    }
                    else {
                        if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance - 40;
                            this.events = this.events + "S+S,";
                        }
                        if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance + 30;
                            this.events = this.events + "S+L,";
                        }
                        if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance + 20;
                            this.events = this.events + "L+S,";
                        }
                        if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") {
                            this.chance = this.chance + 49.8;
                            this.events = this.events + "L+L,";
                        }
                    }
                }
            }
        }
        if (this.leftTile != null && this.upTile != null && this.makeLakes == true) {
            if (this.leftTile.biomeStarter != undefined && this.upTile.biomeStarter != undefined) {
                if ((this.x - 10) >= this.leftTile.biomeStarter.x && (this.leftTileBiome == "Lake")) {
                    this.chance = this.chance + 10;
                    this.events = this.events + "lB10,";
                    if ((this.x - 20) >= this.leftTile.biomeStarter.x && (this.leftTileBiome == "Lake")) {
                        this.chance = this.chance + 30;
                        this.events = this.events + "lB20,";
                    }
                }
                else if ((this.y - 10) >= this.upTile.biomeStarter.y && (this.upTileBiome == "Lake")) {
                    this.chance = this.chance + 10;
                    this.events = this.events + "uB10,";
                    if ((this.y - 20) >= this.upTile.biomeStarter.y && (this.upTileBiome == "Lake")) {
                        this.chance = this.chance + 30;
                        this.events = this.events + "uB20,";
                    }
                }
                else {
                    if (this.upTileBiome == "Lake") {
                        this.chance = this.chance - 24;
                        this.events = this.events + "UL,";
                    }
                    if (this.leftTileBiome == "Lake") {
                        this.chance = this.chance - 24;
                        this.events = this.events + "LL,";
                    }
                }
            }
        }
        this.div.innerText = this.x + "," + this.y;
        if (this.chance > this.random) {
            this.turnToLand();
        }
        else if ((this.upTileKind == 1 && this.leftTileKind == 1) && this.makeLakes == true) {
            this.biome = "Lake";
            this.biomeStarter = this;
        }
        else if (((this.upTileKind == 1 && this.leftTileKind == 1) || this.leftTileBiome == "Lake" || this.upTileBiome == "Lake") && this.makeLakes == true) {
            this.biome = "Lake";
            if (this.leftTileBiome == "Lake") {
                this.biomeStarter = this.leftTile.biomeStarter;
            }
            else if (this.upTileBiome == "Lake") {
                this.biomeStarter = this.upTile.biomeStarter;
            }
        }
        this.div.addEventListener("click", this.click.bind(this));
    };
    tile.prototype.turnToSand = function () {
        if (((this.upTileKind == 0 || this.upTileKind == 3) ||
            (this.leftTileKind == 0 || this.leftTileKind == 3) ||
            (this.downTileKind == 0 || this.downTileKind == 3) ||
            (this.rightTileKind == 0 || this.rightTileKind == 3))
            && (this.kindNr == 1 || this.kindNr == 2)) {
            this.div.setAttribute("class", "sand");
            this.kindNr = 2;
            this.kindId = "sand";
            this.biome = "Beach";
        }
    };
    tile.prototype.turnToLand = function () {
        this.div.setAttribute("class", "grass");
        this.kindNr = 1;
        this.kindId = "grass";
        this.biome = "Plains";
        if (this.leftTile != null && this.upTile != null) {
            if (this.biome != this.leftTile.biomeStarter.biome && this.biome != this.upTile.biomeStarter.biome) {
                this.biomeStarter = this;
            }
            else if (this.biome != this.leftTile.biomeStarter.biome && this.biome == this.upTile.biomeStarter.biome) {
                this.biomeStarter = this.upTile.biomeStarter;
            }
            else if (this.biome == this.leftTile.biomeStarter.biome && this.biome != this.upTile.biomeStarter.biome) {
                this.biomeStarter = this.leftTile.biomeStarter;
            }
        }
        if (this.gc.islandStarter == undefined && this.upTile.kindNr == 0) {
            this.islandStarter = this;
            this.gc.islandStarter = this;
            if (this.game.allPlayers.length <= 0) {
                this.game.requestPlayer(this.gc, ((0) + (this.x * 50)), ((this.game.screenHeight) - 50 + (this.y * -50)));
            }
        }
        else {
            this.islandStarter = this.gc.islandStarter;
        }
    };
    tile.prototype.turnToSaltWater = function () {
        this.div.setAttribute("class", "saltWater");
        this.kindNr = 0;
        this.kindId = "saltWater";
        this.biome = "Sea";
    };
    tile.prototype.turnToFreshWater = function () {
        if (((this.upTileKind == 1 || this.upTileKind == 2 || this.upTileKind == 3) &&
            (this.leftTileKind == 1 || this.leftTileKind == 2 || this.leftTileKind == 3)) &&
            (this.kindNr == 0 || this.kindNr == 3)) {
            this.div.setAttribute("class", "freshWater");
            this.kindNr = 3;
            this.kindId = "freshWater";
        }
    };
    tile.prototype.generatePickUp = function () {
        switch (this.biome) {
            case "Plains":
                this.pickUpPlains();
                break;
            case "Sea":
                this.pickUpSea();
                break;
            case "Lake":
                this.pickUpLake();
                break;
            case "Beach":
                this.pickUpBeach();
                break;
        }
    };
    tile.prototype.pickUpPlains = function () {
        var chance = 30;
        var random = Math.random() * 100;
        var kindChance = Math.random() * 100;
        var kind = null;
        switch (true) {
            case kindChance < 10 && kindChance > 0:
                kind = new FlowerPickUp(this.game, this.div);
                break;
            case kindChance < 12 && kindChance > 10:
                kind = new StonePickUp(this.game, this.div);
                break;
            case kindChance < 22 && kindChance > 20:
                kind = new TreePickUp(this.game, this.div);
                break;
            case kindChance < 40 && kindChance > 30:
                break;
        }
        if (kind != null) {
            if (chance > random) {
                this.pickup = kind;
                this.pickupAmount = kind.amount;
                this.pickup.createElement();
            }
        }
    };
    tile.prototype.pickUpLake = function () {
        var chance = 30;
        var random = Math.random() * 100;
        var kindChance = Math.random() * 100;
        var kind = null;
        switch (true) {
            case kindChance < 10 && kindChance > 0:
                break;
            case kindChance < 20 && kindChance > 10:
                break;
            case kindChance < 30 && kindChance > 20:
                break;
            case kindChance < 40 && kindChance > 30:
                break;
        }
        if (kind != null) {
            if (chance > random) {
                this.pickup = kind;
                this.pickupAmount = 1;
                this.pickup.createElement();
            }
        }
    };
    tile.prototype.pickUpSea = function () {
        var chance = 30;
        var random = Math.random() * 100;
        var kindChance = Math.random() * 100;
        var kind = null;
        switch (true) {
            case kindChance < 10 && kindChance > 0:
                break;
            case kindChance < 20 && kindChance > 10:
                break;
            case kindChance < 30 && kindChance > 20:
                break;
            case kindChance < 40 && kindChance > 30:
                break;
        }
        if (kind != null) {
            if (chance > random) {
                this.pickup = kind;
                this.pickupAmount = 1;
                this.pickup.createElement();
            }
        }
    };
    tile.prototype.pickUpBeach = function () {
        var chance = 30;
        var random = Math.random() * 100;
        var kindChance = Math.random() * 100;
        var kind = null;
        switch (true) {
            case kindChance < 5 && kindChance > 0:
                kind = new WoodPickUp(this.game, this.div);
                break;
            case kindChance < 20 && kindChance > 10:
                break;
            case kindChance < 30 && kindChance > 20:
                break;
            case kindChance < 40 && kindChance > 30:
                break;
        }
        if (kind != null) {
            if (chance > random) {
                this.pickup = kind;
                this.pickupAmount = 1;
                this.pickup.createElement();
            }
        }
    };
    tile.prototype.animatePickUp = function () {
        if (this.pickup != null) {
            if (this.pickup.div != undefined) {
                if (this.game.allPlayers[0].holding.getAttribute("type") != "tool" || this.game.allPlayers[0].holding.childElementCount <= 0) {
                    this.pickup.div.style.animationPlayState = "Running";
                }
                else {
                    if (this.pickup.neededTool != undefined) {
                        if (this.game.allPlayers[0].holding.firstElementChild.getAttribute("type") == this.pickup.neededTool.type) {
                            this.pickup.div.style.animationPlayState = "Running";
                        }
                    }
                }
            }
        }
    };
    tile.prototype.getPickUp = function () {
        if (this.pickup != null) {
            if (this.pickupAmount == 1) {
                var pickup = this.pickup;
                this.pickup.lowerAmount();
                this.pickupAmount = 0;
                this.pickup.exists = false;
                this.game.deleteObject(this.pickup.div);
                this.pickup = null;
                return pickup;
            }
            else if (this.pickupAmount - 1 > 0) {
                this.pickup.lowerAmount();
                this.pickupAmount = this.pickup.amount;
                return this.pickup;
            }
            else {
                return null;
            }
        }
    };
    tile.prototype.click = function () {
        console.log("_______________________________");
        console.log("up: " + this.upTileKind);
        console.log("down: " + this.downTileKind);
        console.log("left: " + this.leftTileKind);
        console.log("right: " + this.rightTileKind);
        console.log("upBiome: " + this.upTileBiome);
        console.log("downBiome: " + this.downTileBiome);
        console.log("leftBiome: " + this.leftTileBiome);
        console.log("rightBiome: " + this.rightTileBiome);
        console.log("biomeStarterX: " + this.biomeStarter.x);
        console.log("biomeStarterY: " + this.biomeStarter.y);
        console.log("land%: " + this.chance);
        console.log("random: " + this.random);
        console.log("kindNr: " + this.kindNr);
        console.log("kindId: " + this.kindId);
        console.log("biome: " + this.biome);
        console.log("x: " + this.x);
        console.log("y: " + this.y);
        console.log("events: " + this.events);
        console.log("canMakeLakes: " + this.makeLakes);
        if (this.islandStarter != undefined) {
            console.log("islandStarterX: " + this.islandStarter.x);
            console.log("islandStarterY: " + this.islandStarter.y);
        }
    };
    return tile;
}(gameObject));
var Item = (function () {
    function Item(g, type, parent) {
        this.craftable = true;
        this.required = [];
        this.tool = false;
        this.game = g;
        this.parent = parent;
        this.type = type;
        this.exists = true;
    }
    Item.prototype.createElement = function (parent) {
        this.parent = parent;
        this.div = document.createElement("item");
        this.parent.appendChild(this.div);
        this.div.setAttribute("type", this.type);
    };
    Item.prototype.canCraft = function (inventoryBar) {
        var yay = true;
        if (this.craftable == false) {
            return false;
        }
        for (var i = 0; i < this.required.length; i++) {
            var req = this.required[i];
            if (inventoryBar.findItem(req[0].name, req[1]) != true) {
                yay = false;
            }
        }
        if (yay == true) {
            return true;
        }
        else {
            return false;
        }
    };
    return Item;
}());
var PickUp = (function () {
    function PickUp(g, type, parent) {
        this.stage = 1;
        this.stages = 1;
        this.kind = 1;
        this.kinds = 1;
        this.amount = 1;
        this.changesOnPickup = false;
        this.wind = false;
        this.game = g;
        this.parent = parent;
        this.type = type;
        this.exists = true;
    }
    PickUp.prototype.createElement = function (parent) {
        var _this = this;
        if (parent === void 0) { parent = this.parent; }
        this.parent = parent;
        if (this.wind == true) {
            var wind = document.createElement("wind");
            this.parent.appendChild(wind);
            this.parent = wind;
        }
        this.div = document.createElement("pickUp");
        this.parent.appendChild(this.div);
        this.div.setAttribute("type", this.type);
        this.div.addEventListener('animationiteration', function () {
            _this.div.style.animationPlayState = "paused";
        }, false);
        this.setKind();
        this.div.setAttribute("stage", this.stage + "");
    };
    PickUp.prototype.generateItem = function () {
        return this.item;
    };
    PickUp.prototype.setStage = function () {
        if (this.stage < this.stages) {
            this.stage += 1;
        }
        this.div.setAttribute("stage", this.stage + "");
        return this.stage;
    };
    PickUp.prototype.setKind = function () {
        var random = Math.round(Math.random() * 100);
        var devide = 100 / this.kinds;
        var result = random / devide;
        result = Math.round(result);
        if (result < 1) {
            result = 1;
        }
        this.kind = result;
        this.div.setAttribute("kind", this.kind + "");
        return this.kind;
    };
    PickUp.prototype.lowerAmount = function () {
        this.amount += -1;
        if (this.changesOnPickup == true) {
            this.setStage();
        }
    };
    PickUp.prototype.generateItemWithTool = function () {
        return this.toolItem;
    };
    return PickUp;
}());
var uiObject = (function () {
    function uiObject(g, tag, parent) {
        this.game = g;
        if (parent == null) {
            this.parent = this.game.uiContainer;
        }
        else {
            this.parent = parent;
        }
        this.div = document.createElement(tag);
        this.parent.appendChild(this.div);
        this.exists = true;
        this.game.allUiObjects.push(this);
    }
    Object.defineProperty(uiObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(uiObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(uiObject.prototype, "div", {
        get: function () { return this._div; },
        set: function (value) { this._div = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(uiObject.prototype, "width", {
        get: function () { return this._width; },
        set: function (value) { this._width = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(uiObject.prototype, "height", {
        get: function () { return this._height; },
        set: function (value) { this._height = value; },
        enumerable: true,
        configurable: true
    });
    uiObject.prototype.hideBottom = function () {
        this.div.setAttribute("class", "hideBottom");
    };
    uiObject.prototype.unhide = function () {
        this.div.removeAttribute("class");
    };
    return uiObject;
}());
var View = (function () {
    function View(g, n) {
        this.name = n;
        this.game = g;
    }
    View.prototype.setActive = function () {
        this.active = true;
        console.log(this.name + " is active");
        this.show();
    };
    View.prototype.setUnactive = function () {
        this.active = false;
        this.unshow();
    };
    View.prototype.show = function () {
    };
    View.prototype.unshow = function () {
    };
    View.prototype.update = function () {
    };
    return View;
}());
var Axe = (function (_super) {
    __extends(Axe, _super);
    function Axe(g, p) {
        var _this = _super.call(this, g, "axeItem", p) || this;
        _this.name = "axe";
        _this.craftable = true;
        _this.tool = true;
        var req = [];
        req.push(new AxeHead(_this.game));
        req.push(1);
        _this.required.push(req);
        req = [];
        req.push(new Stick(_this.game));
        req.push(2);
        _this.required.push(req);
        req = [];
        req.push(new Rope(_this.game));
        req.push(1);
        _this.required.push(req);
        return _this;
    }
    return Axe;
}(Item));
var AxeHead = (function (_super) {
    __extends(AxeHead, _super);
    function AxeHead(g, p) {
        var _this = _super.call(this, g, "axeHeadItem", p) || this;
        _this.name = "axe head";
        _this.craftable = true;
        var req = [];
        req.push(new SharpRock(_this.game));
        req.push(1);
        _this.required.push(req);
        req = [];
        req.push(new Stone(_this.game));
        req.push(2);
        _this.required.push(req);
        return _this;
    }
    return AxeHead;
}(Item));
var Fiber = (function (_super) {
    __extends(Fiber, _super);
    function Fiber(g, p) {
        var _this = _super.call(this, g, "fiberItem", p) || this;
        _this.name = "fiber";
        _this.craftable = false;
        return _this;
    }
    return Fiber;
}(Item));
var Rope = (function (_super) {
    __extends(Rope, _super);
    function Rope(g, p) {
        var _this = _super.call(this, g, "ropeItem", p) || this;
        _this.name = "rope";
        _this.craftable = true;
        var req = [];
        req.push(new Fiber(_this.game));
        req.push(4);
        _this.required.push(req);
        return _this;
    }
    return Rope;
}(Item));
var SharpRock = (function (_super) {
    __extends(SharpRock, _super);
    function SharpRock(g, p) {
        var _this = _super.call(this, g, "sharpRockItem", p) || this;
        _this.name = "Sharp rock";
        _this.craftable = true;
        var req = [];
        req.push(new Stone(_this.game));
        req.push(2);
        _this.required.push(req);
        return _this;
    }
    return SharpRock;
}(Item));
var Spear = (function (_super) {
    __extends(Spear, _super);
    function Spear(g, p) {
        var _this = _super.call(this, g, "spearItem", p) || this;
        _this.name = "spear";
        _this.craftable = true;
        _this.tool = true;
        var req = [];
        req.push(new SharpRock(_this.game));
        req.push(1);
        _this.required.push(req);
        req = [];
        req.push(new Stick(_this.game));
        req.push(2);
        _this.required.push(req);
        req = [];
        req.push(new Rope(_this.game));
        req.push(1);
        _this.required.push(req);
        return _this;
    }
    return Spear;
}(Item));
var Stick = (function (_super) {
    __extends(Stick, _super);
    function Stick(g, p) {
        var _this = _super.call(this, g, "stickItem", p) || this;
        _this.name = "stick";
        _this.craftable = true;
        var req = [];
        req.push(new Wood(_this.game));
        req.push(1);
        _this.required.push(req);
        req = [];
        req.push(new SharpRock(_this.game));
        req.push(1);
        _this.required.push(req);
        return _this;
    }
    return Stick;
}(Item));
var Stone = (function (_super) {
    __extends(Stone, _super);
    function Stone(g, p) {
        var _this = _super.call(this, g, "stoneItem", p) || this;
        _this.name = "stone";
        _this.craftable = false;
        return _this;
    }
    return Stone;
}(Item));
var Wood = (function (_super) {
    __extends(Wood, _super);
    function Wood(g, p) {
        var _this = _super.call(this, g, "woodItem", p) || this;
        _this.name = "wood";
        _this.craftable = false;
        return _this;
    }
    return Wood;
}(Item));
var FlowerPickUp = (function (_super) {
    __extends(FlowerPickUp, _super);
    function FlowerPickUp(g, p) {
        var _this = _super.call(this, g, "flowerPickUp", p) || this;
        _this.name = "flower";
        _this.item = new Fiber(g, p);
        _this.kinds = 2;
        _this.wind = true;
        return _this;
    }
    return FlowerPickUp;
}(PickUp));
var StonePickUp = (function (_super) {
    __extends(StonePickUp, _super);
    function StonePickUp(g, p) {
        var _this = _super.call(this, g, "stonePickUp", p) || this;
        _this.name = "stone";
        _this.item = new Stone(g, p);
        _this.changesOnPickup = true;
        _this.stages = 3;
        _this.amount = 3;
        return _this;
    }
    return StonePickUp;
}(PickUp));
var TreePickUp = (function (_super) {
    __extends(TreePickUp, _super);
    function TreePickUp(g, p) {
        var _this = _super.call(this, g, "TreePickUp", p) || this;
        _this.name = "Tree";
        _this.item = new Stick(g, p);
        _this.toolItem = new Wood(g, p);
        _this.changesOnPickup = true;
        _this.stages = 3;
        _this.kinds = 1;
        _this.amount = 3;
        _this.neededTool = new Axe(g, p);
        return _this;
    }
    return TreePickUp;
}(PickUp));
var WoodPickUp = (function (_super) {
    __extends(WoodPickUp, _super);
    function WoodPickUp(g, p) {
        var _this = _super.call(this, g, "woodPickUp", p) || this;
        _this.name = "wood";
        _this.item = new Wood(g, p);
        return _this;
    }
    return WoodPickUp;
}(PickUp));
var button = (function (_super) {
    __extends(button, _super);
    function button(g, n, t, v, s) {
        if (v === void 0) { v = null; }
        var _this = _super.call(this, g, "button") || this;
        _this.type = t;
        _this.name = n;
        _this.div.innerText = _this.name;
        _this.checkType(v, s);
        return _this;
    }
    button.prototype.checkType = function (v, s) {
        var _this = this;
        switch (this.type) {
            case "changeView": {
                this.div.addEventListener("click", function () { return _this.changeView(v); });
                this.div.setAttribute("class", "changeView");
                if (s != undefined) {
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "slider": {
                this.div.addEventListener("click", function () { return _this.slider(v); });
                this.div.setAttribute("class", "slider");
                if (s != undefined) {
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "joinGame": {
                this.div.addEventListener("click", function () { return _this.joinGame(v); });
                this.div.setAttribute("class", "joinGame");
                if (s != undefined) {
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "on": {
                this.div.addEventListener("click", function () { return _this.on(); });
                this.div.setAttribute("class", "on");
                if (s != undefined) {
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "off": {
                this.div.addEventListener("click", function () { return _this.off(); });
                this.div.setAttribute("class", "off");
                if (s != undefined) {
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "save": {
                this.div.addEventListener("click", function () { return _this.save(v); });
                this.div.setAttribute("class", "save");
                if (s != undefined) {
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "stopGame": {
                this.div.addEventListener("click", function () { return _this.stopGame(); });
                this.div.setAttribute("class", "stopGame");
                if (s != undefined) {
                    this.div.setAttribute("style", s);
                }
                break;
            }
            case "windowChanger": {
                this.div.addEventListener("click", function () { return _this.setScreen(v); });
                this.div.setAttribute("class", "windowChanger(X: " + v[0] + ", Y: " + v[1] + ") hidden");
                break;
            }
            case "disabled": {
                this.div.setAttribute("class", "disabled");
                break;
            }
            default: {
                this.div.setAttribute("class", "Error");
                break;
            }
        }
    };
    button.prototype.changeView = function (v) {
        this.game.requestNewView(v);
    };
    button.prototype.slider = function (v) {
    };
    button.prototype.on = function () {
    };
    button.prototype.off = function () {
    };
    button.prototype.joinGame = function (v) {
    };
    button.prototype.save = function (v) {
    };
    button.prototype.stopGame = function () {
        window.location.href = "http://blank";
    };
    button.prototype.setScreen = function (coords) {
        var y = coords[1];
        var x = coords[0];
        window.scroll({
            top: y,
            left: x,
            behavior: "smooth"
        });
    };
    return button;
}(uiObject));
var menu = (function (_super) {
    __extends(menu, _super);
    function menu(g) {
        var _this = _super.call(this, g, "menu") || this;
        _this.waitfor();
        return _this;
    }
    menu.prototype.waitfor = function () {
        var _this = this;
        this.waitStart = this.game.gameTick;
        this.waitTime = this.game.waits;
        this.waitScreen = document.createElement("wait");
        this.game.uiContainer.appendChild(this.waitScreen);
        this.timerElement = document.createElement("timer");
        this.waitScreen.appendChild(this.timerElement);
        this.payButton = document.createElement("paybutton");
        this.waitScreen.appendChild(this.payButton);
        this.payButton.innerText = "Pay 10 fiber";
        this.payButton.addEventListener("click", function () { return _this.pay(); });
        this.timerElement.innerText = this.waitTime + "";
        this.game.waitMenu = this;
    };
    menu.prototype.timer = function () {
        this.timerElement.innerText = this.waitTime - Math.round((this.game.gameTick - this.waitStart) / 47) + "";
        if ((this.game.gameTick - this.waitStart) / 47 >= this.waitTime) {
            this.game.waitMenu = undefined;
            this.waitScreen.remove();
        }
    };
    menu.prototype.pay = function () {
        if (this.game.allPlayers[0].inventoryBar.findItem("fiber", 10)) {
            this.game.allPlayers[0].inventoryBar.removeItem(new Fiber(this.game), 10);
            this.waitTime = 0;
        }
    };
    return menu;
}(uiObject));
var CraftMenu = (function (_super) {
    __extends(CraftMenu, _super);
    function CraftMenu(g, player) {
        var _this = _super.call(this, g) || this;
        _this.list = [];
        _this.craftables = [];
        _this.player = player;
        _this.craftList = document.createElement("craftList");
        _this.div.appendChild(_this.craftList);
        _this.detail = document.createElement("craftDetail");
        _this.div.appendChild(_this.detail);
        _this.checkCrafts();
        return _this;
    }
    CraftMenu.prototype.checkCrafts = function () {
        var _this = this;
        var things = [];
        for (var i = 0; i < this.game.allItems.length; i++) {
            var push = true;
            if (this.game.allItems[i].canCraft(this.player.inventoryBar) == true) {
                for (var j = 0; j < this.craftables.length; j++) {
                    if (this.craftables[j].name == this.game.allItems[i].name) {
                        push = false;
                    }
                }
                if (push == true) {
                    this.craftables.push(this.game.allItems[i]);
                    things.push(this.game.allItems[i]);
                }
            }
            else {
                for (var p = 0; p < this.craftables.length; p++) {
                    for (var l = 0; l < this.list.length; l++) {
                        if (this.craftables[p].name == this.game.allItems[i].name) {
                            if (this.list[l].lastElementChild.innerHTML == this.craftables[p].name) {
                                if (this.list[l].hasAttribute("class")) {
                                    this.game.deleteObject(this.detailButton);
                                    this.game.deleteObject(this.detailText);
                                    this.game.deleteObject(this.detailTitle);
                                    this.game.deleteObject(this.detailRequired);
                                    this.game.deleteObject(this.detailImage);
                                }
                                this.list[l].remove();
                                this.list.splice(l, 1);
                                this.craftables.splice(p, 1);
                            }
                        }
                    }
                }
            }
        }
        var _loop_3 = function () {
            var item = things[i];
            var listItem = document.createElement("craftListItem");
            this_3.craftList.appendChild(listItem);
            this_3.list.push(listItem);
            item.createElement(listItem);
            var image = item.div;
            listItem.appendChild(image);
            var name_1 = document.createElement("h2");
            name_1.innerText = item.name;
            listItem.appendChild(name_1);
            listItem.addEventListener("click", function () { return _this.openDetail(listItem, item); });
        };
        var this_3 = this;
        for (var i = 0; i < things.length; i++) {
            _loop_3();
        }
    };
    CraftMenu.prototype.openDetail = function (listItem, item) {
        var _this = this;
        for (var i = 0; i < this.list.length; i++) {
            this.list[i].removeAttribute("class");
        }
        listItem.setAttribute("class", "selected");
        if (this.detailButton != undefined) {
            this.game.deleteObject(this.detailButton);
            this.game.deleteObject(this.detailText);
            this.game.deleteObject(this.detailTitle);
            this.game.deleteObject(this.detailRequired);
            this.game.deleteObject(this.detailImage);
        }
        this.detailImage = document.createElement("detailImage");
        this.detail.appendChild(this.detailImage);
        item.createElement(this.detailImage);
        this.detailTitle = document.createElement("detailTitle");
        this.detail.appendChild(this.detailTitle);
        this.detailTitle.innerHTML = "<h1>" + item.name + "</h1>";
        this.detailRequired = document.createElement("detailRequired");
        this.detail.appendChild(this.detailRequired);
        for (var i = 0; i < item.required.length; i++) {
            var req = item.required[i];
            var itemSlot = document.createElement("reqitem");
            this.detailRequired.appendChild(itemSlot);
            req[0].createElement(itemSlot);
            var itemCount = document.createElement("reqAmount");
            itemSlot.appendChild(itemCount);
            itemCount.innerHTML += req[1] + "X";
        }
        this.detailText = document.createElement("detailText");
        this.detail.appendChild(this.detailText);
        this.detailButton = document.createElement("craftButton");
        this.detail.appendChild(this.detailButton);
        this.detailButton.innerText = "Craft a " + item.name;
        this.detailButton.addEventListener("click", function () { return _this.createItem(item); });
    };
    CraftMenu.prototype.createItem = function (item) {
        for (var i = 0; i < item.required.length; i++) {
            var req = item.required[i];
            this.player.inventoryBar.removeItem(req[0], req[1]);
        }
        this.player.inventoryBar.addItem(item, 1);
        this.checkCrafts();
    };
    return CraftMenu;
}(menu));
var inventoryBar = (function (_super) {
    __extends(inventoryBar, _super);
    function inventoryBar(g, p) {
        var _this = _super.call(this, g, "inventoryBar") || this;
        _this.slots = [];
        _this.oneKey = 49;
        _this.twoKey = 50;
        _this.threeKey = 51;
        _this.fourKey = 52;
        _this.fiveKey = 53;
        _this.sixKey = 54;
        _this.sevenKey = 55;
        _this.eightKey = 56;
        _this.neinKey = 57;
        _this.tenKey = 48;
        for (var i = 0; i < 10; i++) {
            _this.slots.push(new slot(g, _this.div));
        }
        window.addEventListener("keydown", _this.onKeyDown.bind(_this));
        _this.hideBottom();
        _this.player = p;
        _this.player.hud.push(_this);
        _this.selectedSlot = _this.slots[0];
        _this.selectedSlot.div.setAttribute("class", "selected");
        return _this;
    }
    inventoryBar.prototype.addItem = function (item, amount) {
        if (amount === void 0) { amount = 1; }
        var done = false;
        for (var i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item != undefined || this.slots[i].item != null) {
                if (this.slots[i].item.name == item.name) {
                    this.slots[i].addAmount(amount);
                    done = true;
                    break;
                }
            }
        }
        if (done == false) {
            for (var i = 0; i < this.slots.length; i++) {
                if (this.slots[i].item == undefined || this.slots[i].item == null) {
                    this.slots[i].addItem(item, amount);
                    if (this.slots[i].div.childElementCount > 1) {
                        this.slots[i].div.lastElementChild.remove();
                    }
                    this.slots[i].item.createElement(this.slots[i].div);
                    done = true;
                    break;
                }
            }
        }
    };
    inventoryBar.prototype.removeItem = function (item, amount) {
        if (amount === void 0) { amount = 1; }
        for (var i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item != undefined || this.slots[i].item != null) {
                if (this.slots[i].item.name == item.name) {
                    if (this.slots[i].itemAmount - amount > 1) {
                        this.slots[i].removeAmount(amount);
                    }
                    else if (this.slots[i].itemAmount - amount >= 1) {
                        this.slots[i].removeAmount(amount);
                        this.slots[i].itemCount.innerText = "";
                    }
                    else if (this.slots[i].itemAmount - amount >= 0) {
                        this.slots[i].itemCount.innerText = "";
                        this.game.deleteObject(this.slots[i].item.div);
                        this.slots[i].item = null;
                        if (this.slots[i].div.childElementCount > 1) {
                            this.slots[i].div.lastElementChild.remove();
                        }
                    }
                }
            }
        }
    };
    inventoryBar.prototype.findItem = function (name, amount) {
        for (var i = 0; i < this.slots.length; i++) {
            if (this.slots[i].item != undefined || this.slots[i].item != null) {
                if (this.slots[i].item.name == name) {
                    if (this.slots[i].itemAmount >= amount) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        return false;
    };
    inventoryBar.prototype.onKeyDown = function (event) {
        if (this.player.holding.childElementCount > 0) {
            this.player.holding.lastElementChild.remove();
        }
        switch (event.keyCode) {
            case this.oneKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[0];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.twoKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[1];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.threeKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[2];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.fourKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[3];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.fiveKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[4];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.sixKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[5];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.sevenKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[6];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.eightKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[7];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.neinKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[8];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
            case this.tenKey:
                this.selectedSlot.div.removeAttribute("class");
                this.selectedSlot = this.slots[9];
                this.selectedSlot.div.setAttribute("class", "selected");
                break;
        }
        if (this.selectedSlot.item != undefined) {
            this.selectedSlot.item.createElement(this.player.holding);
            this.player.holding.setAttribute("type", "item");
            if (this.selectedSlot.item.tool == true) {
                this.player.holding.setAttribute("type", "tool");
            }
        }
    };
    return inventoryBar;
}(uiObject));
var slot = (function (_super) {
    __extends(slot, _super);
    function slot(g, p) {
        var _this = _super.call(this, g, "slot", p) || this;
        _this.item = null;
        _this.itemAmount = 0;
        _this.itemCount = document.createElement("itemCount");
        _this.div.appendChild(_this.itemCount);
        return _this;
    }
    slot.prototype.addItem = function (item, amount) {
        if (amount === void 0) { amount = 1; }
        this.item = item;
        this.itemAmount = amount;
        if (this.itemAmount > 1) {
            this.itemCount.innerText = this.itemAmount + "";
        }
    };
    slot.prototype.addAmount = function (amount) {
        this.itemAmount += amount;
        this.itemCount.innerText = this.itemAmount + "";
    };
    slot.prototype.removeAmount = function (amount) {
        this.itemAmount += -amount;
        this.itemCount.innerText = this.itemAmount + "";
    };
    return slot;
}(uiObject));
var starticon = (function (_super) {
    __extends(starticon, _super);
    function starticon(g) {
        return _super.call(this, g, "icon") || this;
    }
    return starticon;
}(uiObject));
var title = (function (_super) {
    __extends(title, _super);
    function title(g, n) {
        var _this = _super.call(this, g, "title") || this;
        _this.name = n;
        _this.div.innerText = _this.name;
        return _this;
    }
    return title;
}(uiObject));
var EndMenuView = (function (_super) {
    __extends(EndMenuView, _super);
    function EndMenuView(g) {
        return _super.call(this, g, "endMenuView") || this;
    }
    EndMenuView.prototype.show = function () {
    };
    EndMenuView.prototype.unshow = function () {
    };
    EndMenuView.prototype.update = function () {
    };
    return EndMenuView;
}(View));
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView(g) {
        var _this = _super.call(this, g, "gameView") || this;
        _this.allUiObjects = [];
        _this.hidden = true;
        _this.gameController = new GameController(_this.game, _this);
        _this.game.gameUpdater.add(_this);
        _this.gameController.generateWorld();
        return _this;
    }
    GameView.prototype.show = function () {
        this.game.gameActive = true;
        this.allUiObjects.push(new button(this.game, "Menu", "changeView", "optionsMenuView", "left: 0; top: 0;margin: 20px;"));
    };
    GameView.prototype.unshow = function () {
        this.game.gameActive = false;
        for (var i = 0; i < this.allUiObjects.length; i++) {
            this.allUiObjects[i].exists = false;
        }
        this.allUiObjects = [];
    };
    GameView.prototype.update = function () {
        if (this.game.gameActive == true) {
            if (this.hidden == true) {
                for (var i = 0; i < this.game.allPlayers[0].hud.length; i++) {
                    this.game.allPlayers[0].hud[i].unhide();
                }
                for (var i = 0; i < this.game.allGameObjects.length; i++) {
                    this.game.allGameObjects[i].show();
                }
                this.hidden = false;
            }
        }
        else {
            if (this.hidden == false) {
                for (var i = 0; i < this.game.allGameObjects.length; i++) {
                    this.game.allGameObjects[i].hide();
                }
                this.hidden = true;
            }
        }
    };
    return GameView;
}(View));
var OptionsMenuView = (function (_super) {
    __extends(OptionsMenuView, _super);
    function OptionsMenuView(g) {
        var _this = _super.call(this, g, "optionsMenuView") || this;
        _this.allUiObjects = [];
        return _this;
    }
    OptionsMenuView.prototype.show = function () {
        this.allUiObjects.push(new title(this.game, "Pauze"), new button(this.game, "Start", "changeView", "gameView"), new button(this.game, "Stop", "stopGame"));
    };
    OptionsMenuView.prototype.unshow = function () {
        for (var i = 0; i < this.allUiObjects.length; i++) {
            this.allUiObjects[i].exists = false;
        }
        this.allUiObjects = [];
    };
    OptionsMenuView.prototype.update = function () {
    };
    return OptionsMenuView;
}(View));
var StartMenuView = (function (_super) {
    __extends(StartMenuView, _super);
    function StartMenuView(g) {
        var _this = _super.call(this, g, "startMenuView") || this;
        _this.allUiObjects = [];
        return _this;
    }
    StartMenuView.prototype.show = function () {
        this.allUiObjects.push(new title(this.game, "PLE"), new button(this.game, "Generate new World", "changeView", "gameView"), new button(this.game, "Load World", "disabled"), new button(this.game, "Options", "disabled"), new button(this.game, "Stop", "stopGame"));
    };
    StartMenuView.prototype.unshow = function () {
        for (var i = 0; i < this.allUiObjects.length; i++) {
            this.allUiObjects[i].exists = false;
        }
        this.allUiObjects = [];
    };
    StartMenuView.prototype.update = function () {
    };
    return StartMenuView;
}(View));
//# sourceMappingURL=main.js.map