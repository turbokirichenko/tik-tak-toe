// abstract class for game place
export class GameTemplate {
    constructor() {}
     
    /**
     * running the game process
     */
    public play(): Promise<Boolean> {
        return Promise.resolve(true);
    }

    /**
     * restart current game process or return false
     */
    public replay(): Promise<Boolean> {
        return Promise.resolve(true);
    }

    /**
     * check result of the game
     */
    public check(): Promise<string> {
        return Promise.resolve("");
    }

    /**
     * function that break current game process
     */
    public stop(): void {
        return;
    }
}


