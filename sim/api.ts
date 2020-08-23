/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.basic {
    /**
     * Listens to player walk event
     * @param handler 
     */
    //% blockId=basicPlayerTravelled block="on player walk"
    //% weight=100
    export function onWalkAsync(handler: RefAction) {
        pxsim.player.onWalkAsync(handler)
        return Promise.delay(400)
    }
}

namespace pxsim.agent {
    /**
     * Moves the agent forward
     * @param direction the direction to turn, eg: Direction.Forward
     * @param steps steps to move, eg:1
     */
    //% weight=95
    //% blockId=agentMove block="agent move %direction"
    export function moveAsync(direction: Direction) {
        board().move(direction)
        return Promise.delay(400)
    }

    /**
     * Turns the agent
     * @param direction the direction to turn, eg: Direction.Left
     */
    //% weight=90
    //% blockId=agentTurn block="agent turn %direction"
    //% turnAsync.fieldEditor="gridpicker"
    export function turnAsync(direction: Direction) {
        board().turn(direction)
        return Promise.delay(400)
    }

    /**
     * Places an item from given slot in the given direction
     * @param slot the inventory slot number, eg:1
     * @param direction the direction to place the item, eg: Direction.Forward
     */
    //% weight=85
    //% blockId=agentPlace block="agent place %slot %direction"
    //% placeAsync.fieldEditor="gridpicker"
    export function placeAsync(slot: number, direction: Direction) {
        board().place(slot, direction)
        return Promise.delay(400)
    }

    /**
     * Destroys the block in the given direction
     * @param direction the direction to destroy the item, eg: Direction.Forward
     */
    //% weight=80
    //% blockId=agentDestroy block="agent destroy %direction"
    //% placeAsync.fieldEditor="gridpicker"
    export function destroyAsync(direction: Direction) {
        board().destroy(direction)
        return Promise.delay(400)
    }

    /**
     * Teleports the agent to the player
     */
    //% weight=95
    //% blockId=agentTp block="agent teleport to player"
    export function teleportAsync() {
        board().tpToPlayer()
        return Promise.delay(400)
    }
}

namespace pxsim.player {
    /**
     * Listens to player walk event
     * @param handler 
     */
    //% weight=85
    //% blockId=onWalk block="on player walk"
    export function onWalkAsync(handler: RefAction) {
        let b = board();
        b.bus.listen("Player", "Walk", handler);
        return Promise.delay(400);
    }

    /**
     * Listens to player command event
     * @param command the chat command, eg: run
     * @param handler 
     */
    //% weight=80
    //% blockId=onChatCommand block="on chat command %command"
    export function onChatCommandAsync(command: string, handler: RefAction) {
        let b = board();
        b.bus.listen("Player", `Chat:${command}`, handler);
        return Promise.delay(400);
    }
}

namespace pxsim.hare {
    /**
     * This is hop
     */
    //% blockId="sampleHop" block="hop %hop on color %color=colorNumberPicker"
    //% hop.fieldEditor="gridpicker"
    export function hop(hop: Hop, color: number) {

    }

    //% blockId=sampleOnLand block="on land"
    //% optionalVariableArgs
    export function onLand(handler: (height: number, more: number, most: number) => void) {

    }
}

namespace pxsim.turtle {
    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=50
    //% blockId=sampleForward block="forward %steps"
    export function forwardAsync(steps: number) {
        return board().sprite.forwardAsync(steps)
    }

    /**
     * Moves the sprite forward
     * @param direction the direction to turn, eg: Direction.Left
     * @param angle degrees to turn, eg:90
     */
    //% weight=50
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    //% angle.min=-180 angle.max=180
    export function turnAsync(direction: Direction, angle: number) {
        let b = board();

        if (direction == Direction.Left)
            b.sprite.angle -= angle;
        else
            b.sprite.angle += angle;
        return Promise.delay(400)
    }

    /**
     * Triggers when the turtle bumps a wall
     * @param handler 
     */
    //% blockId=onBump block="on bump"
    export function onBump(handler: RefAction) {
        let b = board();

        b.bus.listen("Turtle", "Bump", handler);
    }
}

namespace pxsim.loops {

    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=45 blockGap=8
    //% blockId=device_forever block="forever" 
    export function forever(body: RefAction): void {
        thread.forever(body)
    }

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=44
    //% block="pause (ms) %pause" blockId=device_pause
    export function pauseAsync(ms: number) {
        return Promise.delay(ms)
    }
}

function logMsg(m:string) { console.log(m) }

namespace pxsim.console {
    /**
     * Print out message
     */
    //% 
    export function log(msg:string) {
        logMsg("CONSOLE: " + msg)
        // why doesn't that work?
        //board().writeSerial(msg + "\n")
    }
}

namespace pxsim {
    /**
     * A ghost on the screen.
     */
    //%
    export class Sprite {
        /**
         * The X-coordiante
         */
        //%
        public x = 100;
         /**
         * The Y-coordiante
         */
        //%
        public y = 100;
        public angle = 90;
        
        constructor() {
        }
        
        private foobar() {}

        /**
         * Move the thing forward
         */
        //%
        public forwardAsync(steps: number) {
            let deg = this.angle / 180 * Math.PI;
            this.x += Math.cos(deg) * steps * 10;
            this.y += Math.sin(deg) * steps * 10;
            board().updateView();

            if (this.x < 0 || this.y < 0)
                board().bus.queue("TURTLE", "BUMP");

            return Promise.delay(400)
        }
    }
}
