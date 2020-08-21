/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../node_modules/axios/index.d.ts"/>

namespace pxsim {
    /**
     * This function gets called each time the program restarts
     */
    initCurrentRuntime = () => {
        const ws  = new WebSocket('ws://localhost:25565/', ['pxt']);
        ws.onopen = function() {
            // Web Socket is connected, send data using send()
        };
          
         ws.onmessage = function (evt) {
            var msg = JSON.parse(evt.data);
            console.log("Message is received...");
            console.log(msg);
            if (msg.type == "PlayerTravelled") {
                board().bus.queue("Player", "Walk");
            }
         };
          
         ws.onclose = function() {
            
            // websocket is closed.
            alert("Connection is closed..."); 
         };

         runtime.board = new Board();
    };

    /**
     * Gets the current 'board', eg. program state.
     */
    export function board() : Board {
        return runtime.board as Board;
    }

    /**
     * Represents the entire state of the executing program.
     * Do not store state anywhere else!
     */
    export class Board extends pxsim.BaseBoard {
        public bus: EventBus;
        public element : SVGSVGElement;
        public spriteElement: SVGCircleElement;
        public hareElement: SVGCircleElement;
        public sprite : Sprite;
        public hare: Sprite;
        
        constructor() {
            super();
            this.bus = new EventBus(runtime);
            this.element = <SVGSVGElement><any>document.getElementById('svgcanvas');
            this.spriteElement = <SVGCircleElement>this.element.getElementById('svgsprite');
            this.hareElement = <SVGCircleElement>this.element.getElementById('svgsprite2');
            this.sprite = new Sprite();
            this.hare = new Sprite();
        }
        
        initAsync(msg: pxsim.SimulatorRunMessage): Promise<void> {
            document.body.innerHTML = ''; // clear children
            document.body.appendChild(this.element);

            return Promise.resolve();
        }       
        
        turn(direction: Direction): Promise<Response> {
            const dir = (direction == Direction.Left) ? "left" : "right"
            return fetch(`http://192.168.0.2:3000/turn/${dir}`)
        }

        move(direction: Direction): Promise<Response> {
            let dir = 'forward'

            if (direction == Direction.Left) {
                dir = "left"
            } else if (direction == Direction.Right) {
                dir = "right"
            } else if (direction == Direction.Backward) {
                dir = "back"
            }

            return fetch(`http://192.168.0.2:3000/move/${dir}`)
        }

        place(slot: number, direction: Direction): Promise<Response> {
            let dir = 'forward'

            if (direction == Direction.Left) {
                dir = "left"
            } else if (direction == Direction.Right) {
                dir = "right"
            } else if (direction == Direction.Backward) {
                dir = "back"
            }

            return fetch(`http://192.168.0.2:3000/place/${slot}/${dir}`)
        }

        tpToPlayer(): Promise<Response> {
            return fetch(`http://192.168.0.2:3000/tp`)
        }

        destroy(direction: Direction): Promise<Response> {
            let dir = 'forward'

            if (direction == Direction.Left) {
                dir = "left"
            } else if (direction == Direction.Right) {
                dir = "right"
            } else if (direction == Direction.Backward) {
                dir = "back"
            }
            
            return fetch(`http://192.168.0.2:3000/destroy/${dir}`)
        }

        updateView() {
            this.spriteElement.cx.baseVal.value = this.sprite.x;
            this.spriteElement.cy.baseVal.value = this.sprite.y;

            this.hareElement.cx.baseVal.value = this.hare.x;
            this.hareElement.cy.baseVal.value = this.hare.y;
        }
    }
}