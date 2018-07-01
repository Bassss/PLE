class tile extends gameObject implements showTiles {
    public row: number;
    public showTile: boolean = true;

    public kindNr: number;
    public kindId: string;

    public biome: string;
    public biomeStarter: tile;
    public islandStarter: tile;

    private events: string = "";
    private random: number;
    private chance: number;
    private makeLakes: boolean = true;

    private gc: GameController;

    public upTile: tile = null;
    public leftTile: tile = null;
    public rightTile: tile = null;
    public downTile: tile = null;

    public upTileBiome: string = null;
    public leftTileBiome: string = null;
    public rightTileBiome: string = null;
    public downTileBiome: string = null;

    public upTileKind: number = null;
    public leftTileKind: number = null;
    public rightTileKind: number = null;
    public downTileKind: number = null;

    public hasStuff: boolean = false;
    public pickup: PickUp = null;
    public pickupAmount: number = 0;

    constructor(g: Game, gc: GameController, x: number, y: number) {
        super(g, "tile", document.getElementById("tileContainer"))
        this.gc = gc;
        this.row = y;
        this.x = x;
        this.y = y;
        this.div.innerText = this.x + "," + this.y;

        this.game.compTiles.add(this)
        this.turnToSaltWater()

    }
    public toggleShow() {
        if (this.showTile == false) {
            this.div.style.border = "0px solid black"
            this.div.style.color = " rgba(0,0,0,0)"
            this.showTile = true
        } else {
            this.div.style.border = "1px solid black"
            this.div.style.color = " rgba(0,0,0,1)"
            this.showTile = false
        }
    }
    public updateTiles() {
        this.setNorthWest()
        this.changeTile();
    }
    public update() {

    }
    private setNorthWest() {
        this.upTile = this.gc.getTile(this.x, this.y - 1)
        if (this.upTile == null) {
            this.upTileKind = null
        } else {
            this.upTileKind = this.upTile.kindNr
            this.upTileBiome = this.upTile.biome
        }
        this.leftTile = this.gc.getTile(this.x - 1, this.y)
        if (this.leftTile == null) {
            this.leftTileKind = null
        } else {
            this.leftTileKind = this.leftTile.kindNr
            this.leftTileBiome = this.leftTile.biome
        }
        if (this.leftTile == undefined && this.upTile == undefined) {
            this.biomeStarter = this
        } else if (this.upTile == undefined) {
            this.biomeStarter = this.leftTile.biomeStarter
        } else if (this.leftTile == undefined) {
            this.biomeStarter = this.upTile.biomeStarter
        } else {
            this.biomeStarter = this.leftTile.biomeStarter
        }
    }
    public setSurrounding() {
        this.upTile = this.gc.getTile(this.x, this.y - 1)
        if (this.upTile == null) {
            this.upTileKind = null
        } else {
            this.upTileKind = this.upTile.kindNr
            this.upTileBiome = this.upTile.biome
        }
        this.leftTile = this.gc.getTile(this.x - 1, this.y)
        if (this.leftTile == null) {
            this.leftTileKind = null
        } else {
            this.leftTileKind = this.leftTile.kindNr
            this.leftTileBiome = this.leftTile.biome
        }
        this.rightTile = this.gc.getTile(this.x + 1, this.y)
        if (this.rightTile == null) {
            this.rightTileKind = null
        } else {
            this.rightTileKind = this.rightTile.kindNr
            this.rightTileBiome = this.rightTile.biome
        }
        this.downTile = this.gc.getTile(this.x, this.y + 1)
        if (this.downTile == null) {
            this.downTileKind = null
        } else {
            this.downTileKind = this.downTile.kindNr
            this.downTileBiome = this.downTile.biome
        }
        if (this.biome == "Lake") {
            if (this.downTileBiome != "Sea" && this.upTileBiome != "Sea" && this.leftTileBiome != "Sea" && this.rightTileBiome != "Sea") {
                this.turnToFreshWater();
            } else {
                this.events += "LtoS"
                this.biome = "Sea"
            }
        }
        this.turnToSand();
        this.generatePickUp()
    }
    private changeTile() {
        this.chance = 50;
        this.random = Math.random() * 100;
        //sea starter
        if (this.y == 0) { this.chance = this.chance - 50; this.events = this.events + "y0," }
        if (this.y == 1) { this.chance = this.chance - 50; this.events = this.events + "y1," }
        if (this.y == 2) { this.chance = this.chance - 50; this.events = this.events + "y2," }
        if (this.y == 3) { this.chance = this.chance - 50; this.events = this.events + "y3," }
        if (this.y == 4) { this.chance = this.chance - 50; this.events = this.events + "y4," }
        if (this.y == 5) { this.chance = this.chance - 50; this.events = this.events + "y5," }
        if (this.y == 6) { this.chance = this.chance - 50; this.events = this.events + "y6," }
        if (this.y == 7) { this.chance = this.chance - 50; this.events = this.events + "y7," }
        if (this.y == 8) { this.chance = this.chance - 50; this.events = this.events + "y8," }
        if (this.y == 9) { this.chance = this.chance - 50; this.events = this.events + "y9," }
        if (this.y == 10) { this.chance = this.chance - 50; this.events = this.events + "y10," }
        if (this.y == 11) { this.chance = this.chance - 50; this.events = this.events + "y11," }
        if (this.y == 12) { this.chance = this.chance - 50; this.events = this.events + "y12," }
        if (this.y == 13) { this.chance = this.chance - 50; this.events = this.events + "y13," }
        if (this.y == 14) { this.chance = this.chance - 50; this.events = this.events + "y14," }
        if (this.y == 15) { this.chance = this.chance - 50; this.events = this.events + "y15," }
        if (this.y == 16) { this.chance = this.chance - 40; this.events = this.events + "y16," }
        if (this.y == 17) { this.chance = this.chance - 20; this.events = this.events + "y17," }

        if (this.x == 0) { this.chance = this.chance - 50; this.events = this.events + "x0," }
        if (this.x == 1) { this.chance = this.chance - 50; this.events = this.events + "x1," }
        if (this.x == 2) { this.chance = this.chance - 50; this.events = this.events + "x2," }
        if (this.x == 3) { this.chance = this.chance - 50; this.events = this.events + "x3," }
        if (this.x == 4) { this.chance = this.chance - 50; this.events = this.events + "x4," }
        if (this.x == 5) { this.chance = this.chance - 50; this.events = this.events + "x5," }
        if (this.x == 6) { this.chance = this.chance - 50; this.events = this.events + "x6," }
        if (this.x == 7) { this.chance = this.chance - 50; this.events = this.events + "x7," }
        if (this.x == 8) { this.chance = this.chance - 50; this.events = this.events + "x8," }
        if (this.x == 9) { this.chance = this.chance - 50; this.events = this.events + "x9," }
        if (this.x == 10) { this.chance = this.chance - 50; this.events = this.events + "x10," }
        if (this.x == 11) { this.chance = this.chance - 50; this.events = this.events + "x11," }
        if (this.x == 12) { this.chance = this.chance - 50; this.events = this.events + "x12," }
        if (this.x == 13) { this.chance = this.chance - 50; this.events = this.events + "x13," }
        if (this.x == 14) { this.chance = this.chance - 50; this.events = this.events + "x14," }
        if (this.x == 15) { this.chance = this.chance - 50; this.events = this.events + "x15," }
        if (this.x == 16) { this.chance = this.chance - 40; this.events = this.events + "x16," }
        if (this.x == 17) { this.chance = this.chance - 20; this.events = this.events + "x17," }
        //coast builder
        if (this.leftTile != null && this.upTile != null) {
            if (this.gc.islandStarter != undefined) {
                //spawn place
                if ((this.x < this.gc.islandStarter.x + 5 && this.x > this.gc.islandStarter.x - 5) && (this.y < this.gc.islandStarter.y + 5 && this.y > this.gc.islandStarter.y - 5)) {
                    this.chance += 100
                    this.events += "spawn, "
                }
                if ((this.x - 55) >= this.gc.islandStarter.x) {
                    this.events = this.events + "iSx55,"
                    this.makeLakes = false;
                }
                if ((this.y - 55) >= this.gc.islandStarter.y) {
                    this.events = this.events + "iSy55,"
                    this.makeLakes = false;
                }
                if ((this.x - 65) >= this.gc.islandStarter.x) {
                    this.events = this.events + "iSx65,"
                    this.makeLakes = false;

                    if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 50; this.events = this.events + "S+S," }
                    if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 30; this.events = this.events + "S+L," }
                    if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 20; this.events = this.events + "L+S," }
                    if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 20; this.events = this.events + "L+L," }

                    if ((this.x - 70) >= this.gc.islandStarter.x) {
                        this.events = this.events + "iSx70,"

                        if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 50; this.events = this.events + "S+S," }
                        if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 30; this.events = this.events + "S+L," }
                        if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 20; this.events = this.events + "L+S," }
                        if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 20; this.events = this.events + "L+L," }

                        if ((this.x - 75) >= this.gc.islandStarter.x) {
                            this.events = this.events + "iSx75,"

                            if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 50; this.events = this.events + "S+S," }
                            if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 30; this.events = this.events + "S+L," }
                            if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 20; this.events = this.events + "L+S," }
                            if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 20; this.events = this.events + "L+L," }

                        }
                    }

                } else if ((this.y - 65) >= this.gc.islandStarter.y) {
                    this.events = this.events + "iSy65,"
                    this.makeLakes = false;

                    if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 50; this.events = this.events + "S+S," }
                    if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 30; this.events = this.events + "S+L," }
                    if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 20; this.events = this.events + "L+S," }
                    if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 20; this.events = this.events + "L+L," }

                    if ((this.y - 70) >= this.gc.islandStarter.y) {
                        this.events = this.events + "iSy70,"

                        if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 50; this.events = this.events + "S+S," }
                        if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 30; this.events = this.events + "S+L," }
                        if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 30; this.events = this.events + "L+S," }
                        if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 15; this.events = this.events + "L+L," }

                        if ((this.y - 75) >= this.gc.islandStarter.y) {
                            this.events = this.events + "iSy75,"

                            if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 50; this.events = this.events + "S+S," }
                            if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 40; this.events = this.events + "S+L," }
                            if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 40; this.events = this.events + "L+S," }
                            if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 5; this.events = this.events + "L+L," }

                        }
                    }

                } else {
                    if (this.makeLakes == false && this.x > 18) {
                        this.chance = this.chance + 50

                    } else {
                        if (this.upTileKind == 0 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance - 40; this.events = this.events + "S+S," }
                        if (this.upTileKind == 0 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 30; this.events = this.events + "S+L," }
                        if (this.upTileKind == 1 && this.leftTileKind == 0 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 20; this.events = this.events + "L+S," }
                        if (this.upTileKind == 1 && this.leftTileKind == 1 && this.upTileBiome != "Lake" && this.leftTileBiome != "Lake") { this.chance = this.chance + 49.8; this.events = this.events + "L+L," }
                    }
                }
            }
        }
        //lake builder
        if (this.leftTile != null && this.upTile != null && this.makeLakes == true) {
            if (this.leftTile.biomeStarter != undefined && this.upTile.biomeStarter != undefined) {
                if ((this.x - 10) >= this.leftTile.biomeStarter.x && (this.leftTileBiome == "Lake")) {
                    this.chance = this.chance + 10; this.events = this.events + "lB10,"
                    if ((this.x - 20) >= this.leftTile.biomeStarter.x && (this.leftTileBiome == "Lake")) {
                        this.chance = this.chance + 30; this.events = this.events + "lB20,"
                    }
                } else if ((this.y - 10) >= this.upTile.biomeStarter.y && (this.upTileBiome == "Lake")) {
                    this.chance = this.chance + 10; this.events = this.events + "uB10,"
                    if ((this.y - 20) >= this.upTile.biomeStarter.y && (this.upTileBiome == "Lake")) {
                        this.chance = this.chance + 30; this.events = this.events + "uB20,"
                    }
                } else {
                    if (this.upTileBiome == "Lake") { this.chance = this.chance - 24; this.events = this.events + "UL," }
                    if (this.leftTileBiome == "Lake") { this.chance = this.chance - 24; this.events = this.events + "LL," }
                }
            }
        }

        //Tile filler
        this.div.innerText = this.x + "," + this.y;
        if (this.chance > this.random) {
            this.turnToLand()
        } else if ((this.upTileKind == 1 && this.leftTileKind == 1) && this.makeLakes == true) {
            this.biome = "Lake";
            this.biomeStarter = this;

        } else if (((this.upTileKind == 1 && this.leftTileKind == 1) || this.leftTileBiome == "Lake" || this.upTileBiome == "Lake") && this.makeLakes == true) {
            this.biome = "Lake";
            if (this.leftTileBiome == "Lake") {
                this.biomeStarter = this.leftTile.biomeStarter;
            } else if (this.upTileBiome == "Lake") {
                this.biomeStarter = this.upTile.biomeStarter;
            }
        }
        this.div.addEventListener("click", this.click.bind(this));
    }
    public turnToSand() {
        if (
            (
                (this.upTileKind == 0 || this.upTileKind == 3) ||
                (this.leftTileKind == 0 || this.leftTileKind == 3) ||
                (this.downTileKind == 0 || this.downTileKind == 3) ||
                (this.rightTileKind == 0 || this.rightTileKind == 3)
            )
            && (this.kindNr == 1 || this.kindNr == 2)
        ) {
            this.div.setAttribute("class", "sand")
            this.kindNr = 2
            this.kindId = "sand"
            this.biome = "Beach"
        }
    }
    public turnToLand() {
        this.div.setAttribute("class", "grass")
        this.kindNr = 1
        this.kindId = "grass"
        this.biome = "Plains"
        if (this.leftTile != null && this.upTile != null) {
            if (this.biome != this.leftTile.biomeStarter.biome && this.biome != this.upTile.biomeStarter.biome) {
                this.biomeStarter = this
            } else if (this.biome != this.leftTile.biomeStarter.biome && this.biome == this.upTile.biomeStarter.biome) {
                this.biomeStarter = this.upTile.biomeStarter
            } else if (this.biome == this.leftTile.biomeStarter.biome && this.biome != this.upTile.biomeStarter.biome) {
                this.biomeStarter = this.leftTile.biomeStarter
            }
        }
        if (this.gc.islandStarter == undefined && this.upTile.kindNr == 0) {
            this.islandStarter = this
            this.gc.islandStarter = this
            if (this.game.allPlayers.length <= 0) {
                this.game.requestPlayer(this.gc, ((0) + (this.x * 50)), ((this.game.screenHeight) - 50 + (this.y * -50)));
            }
        } else {
            this.islandStarter = this.gc.islandStarter
        }
    }
    public turnToSaltWater() {
        this.div.setAttribute("class", "saltWater")
        this.kindNr = 0
        this.kindId = "saltWater"
        this.biome = "Sea"
    }
    public turnToFreshWater() {

        if (
            (
                (this.upTileKind == 1 || this.upTileKind == 2 || this.upTileKind == 3) &&
                (this.leftTileKind == 1 || this.leftTileKind == 2 || this.leftTileKind == 3)
            ) &&
            (this.kindNr == 0 || this.kindNr == 3)
        ) {
            this.div.setAttribute("class", "freshWater")
            this.kindNr = 3
            this.kindId = "freshWater"
            // this.biome = "Lake"
        }

    }
    public generatePickUp() {
        switch (this.biome) {
            case "Plains":
                this.pickUpPlains()
                break;
            case "Sea":
                this.pickUpSea()
                break;
            case "Lake":
                this.pickUpLake()
                break;
            case "Beach":
                this.pickUpBeach()
                break;

        }
    }
    private pickUpPlains() {
        let chance = 30;
        let random = Math.random() * 100;
        let kindChance = Math.random() * 100;
        let kind: PickUp = null;
        switch (true) {
            case kindChance < 10 && kindChance > 0:
                kind = new FlowerPickUp(this.game, this.div)
                break;
            case kindChance < 12 && kindChance > 10:
                kind = new StonePickUp(this.game, this.div)
                break;
            case kindChance < 22 && kindChance > 20:
                kind = new TreePickUp(this.game, this.div)
                break;
            case kindChance < 40 && kindChance > 30:

                break;

        }
        if (kind != null) {
            if (chance > random) {
                this.pickup = kind
                this.pickupAmount = kind.amount;
                this.pickup.createElement()
            }
        }
    }
    private pickUpLake() {
        let chance = 30;
        let random = Math.random() * 100;
        let kindChance = Math.random() * 100;
        let kind: PickUp = null;
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
                this.pickup = kind
                this.pickupAmount = 1;
                this.pickup.createElement()
                // console.log(this.pickup.name)
            }
        }
    }
    private pickUpSea() {
        let chance = 30;
        let random = Math.random() * 100;
        let kindChance = Math.random() * 100;
        let kind: PickUp = null;
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
                this.pickup = kind
                this.pickupAmount = 1;
                this.pickup.createElement()
                // console.log(this.pickup.name)
            }
        }
    }
    private pickUpBeach() {
        let chance = 30;
        let random = Math.random() * 100;
        let kindChance = Math.random() * 100;
        let kind: PickUp = null;
        switch (true) {
            case kindChance < 5 && kindChance > 0:
                kind = new WoodPickUp(this.game, this.div)
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
                this.pickup = kind
                this.pickupAmount = 1;
                this.pickup.createElement()
                // console.log(this.pickup.name)
            }
        }
    }
    public animatePickUp() {
        if (this.pickup != null) {
            if (this.pickup.div != undefined) {
                if (this.game.allPlayers[0].holding.getAttribute("type") != "tool" || this.game.allPlayers[0].holding.childElementCount <= 0) {
                    this.pickup.div.style.animationPlayState = "Running";
                } else {
                    if (this.pickup.neededTool != undefined) {
                        if (this.game.allPlayers[0].holding.firstElementChild.getAttribute("type") == this.pickup.neededTool.type) {
                            this.pickup.div.style.animationPlayState = "Running";
                        }
                    }
                }

            }
        }
    }
    public getPickUp() {
        if (this.pickup != null) {
            if (this.pickupAmount == 1) {
                let pickup = this.pickup
                this.pickup.lowerAmount();
                this.pickupAmount = 0
                this.pickup.exists = false;
                this.game.deleteObject(this.pickup.div)
                this.pickup = null
                return pickup
            } else if (this.pickupAmount - 1 > 0) {
                this.pickup.lowerAmount()
                this.pickupAmount = this.pickup.amount
                return this.pickup
            } else {
                return null
            }
        }

    }
    click() {
        // this.setSurrounding()
        console.log("_______________________________")
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
        console.log("canMakeLakes: " + this.makeLakes)
        if (this.islandStarter != undefined) {
            console.log("islandStarterX: " + this.islandStarter.x);
            console.log("islandStarterY: " + this.islandStarter.y);
        }
    }
}