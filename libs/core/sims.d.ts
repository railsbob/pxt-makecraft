// Auto-generated from simulator. Do not edit.
declare namespace basic {
    /**
     * Listens to player walk event
     * @param handler 
     */
    //% blockId=basicPlayerTravelled block="on player walk"
    //% weight=100
    //% shim=basic::onWalkAsync promise
    function onWalk(handler: () => void): void;

}
declare namespace agent {
    /**
     * Moves the agent forward
     * @param direction the direction to turn, eg: Direction.Forward
     * @param steps steps to move, eg:1
     */
    //% weight=95
    //% blockId=agentMove block="agent move %direction"
    //% shim=agent::moveAsync promise
    function move(direction: Direction): void;

    /**
     * Turns the agent
     * @param direction the direction to turn, eg: Direction.Left
     */
    //% weight=90
    //% blockId=agentTurn block="agent turn %direction"
    //% turnAsync.fieldEditor="gridpicker"
    //% shim=agent::turnAsync promise
    function turn(direction: Direction): void;

    /**
     * Places an item from given slot in the given direction
     * @param slot the inventory slot number, eg:1
     * @param direction the direction to place the item, eg: Direction.Forward
     */
    //% weight=85
    //% blockId=agentPlace block="agent place %slot %direction"
    //% placeAsync.fieldEditor="gridpicker"
    //% shim=agent::placeAsync promise
    function place(slot: number, direction: Direction): void;

    /**
     * Destroys the block in the given direction
     * @param direction the direction to destroy the item, eg: Direction.Forward
     */
    //% weight=80
    //% blockId=agentDestroy block="agent destroy %direction"
    //% placeAsync.fieldEditor="gridpicker"
    //% shim=agent::destroyAsync promise
    function destroy(direction: Direction): void;

    /**
     * Teleports the agent to the player
     */
    //% weight=95
    //% blockId=agentTp block="agent teleport to player"
    //% shim=agent::teleportAsync promise
    function teleport(): void;

}
declare namespace player {
    /**
     * Listens to player walk event
     * @param handler 
     */
    //% weight=85
    //% blockId=onWalk block="on player walk"
    //% shim=player::onWalkAsync promise
    function onWalk(handler: () => void): void;

    /**
     * Listens to player command event
     * @param command the chat command, eg: run
     * @param handler 
     */
    //% weight=80
    //% blockId=onChatCommand block="on chat command %command"
    //% shim=player::onChatCommandAsync promise
    function onChatCommand(command: string, handler: () => void): void;

}
declare namespace hare {
    /**
     * This is hop
     */
    //% blockId="sampleHop" block="hop %hop on color %color=colorNumberPicker"
    //% hop.fieldEditor="gridpicker"
    //% shim=hare::hop
    function hop(hop: Hop, color: number): void;

    //% blockId=sampleOnLand block="on land"
    //% optionalVariableArgs
    //% shim=hare::onLand
    function onLand(handler: (height: number, more: number, most: number) => void): void;

}
declare namespace turtle {
    /**
     * Moves the sprite forward
     * @param steps number of steps to move, eg: 1
     */
    //% weight=50
    //% blockId=sampleForward block="forward %steps"
    //% shim=turtle::forwardAsync promise
    function forward(steps: number): void;

    /**
     * Moves the sprite forward
     * @param direction the direction to turn, eg: Direction.Left
     * @param angle degrees to turn, eg:90
     */
    //% weight=50
    //% blockId=sampleTurn block="turn %direction|by %angle degrees"
    //% angle.min=-180 angle.max=180
    //% shim=turtle::turnAsync promise
    function turn(direction: Direction, angle: number): void;

    /**
     * Triggers when the turtle bumps a wall
     * @param handler 
     */
    //% blockId=onBump block="on bump"
    //% shim=turtle::onBump
    function onBump(handler: () => void): void;

}
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=45 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=44
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //%
    //% shim=console::log
    function log(msg: string): void;

}
    /**
     * A ghost on the screen.
     */
    //%
    declare class Sprite {
        /**
         * The X-coordiante
         */
        //%
        //% shim=.x
        public x: number;

        /**
         * The Y-coordiante
         */
        //%
        //% shim=.y
        public y: number;

        /**
         * Move the thing forward
         */
        //%
        //% shim=.forwardAsync promise
        public forward(steps: number): void;

    }

// Auto-generated. Do not edit. Really.
