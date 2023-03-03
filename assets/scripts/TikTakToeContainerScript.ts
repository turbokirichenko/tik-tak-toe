import { _decorator, Component, Node, Prefab, SpriteFrame, instantiate, Vec3, UITransform, Size, Sprite, RigidBody2D, view, BoxCollider2D } from 'cc';
const { ccclass, property } = _decorator;
import { GameTemplate } from '../classes/GameTemplate';

@ccclass('TikTakToeContainerScript')
export class TikTakToeContainerScript extends Component implements GameTemplate {

    @property(Prefab)
    private model: Prefab = null;

    @property(SpriteFrame)
    private sources: SpriteFrame[] = [];

    private _viewDimentions: Size = null;
    private _unitDimentions: Size = new Size(80, 80);
    private _gameVec9: Array<Boolean> = [];
    private _isPlaying: Boolean = false;

    start() {
        this._viewDimentions = view.getVisibleSize();
        if (this.sources.length < 2) throw new Error('Set minimum 2 Sources!');
    }

    public play(): Promise<Boolean> {
        if (this._isPlaying) return Promise.resolve(false);
        this.node.removeAllChildren();

        this._gameVec9 = this.generateGameVector9();
        this._isPlaying = true;
        return this.drawCrossZero();
    }

    public replay(): Promise<Boolean> {
        this.stop();
        return this.play();
    }

    public check(): Promise<string> {
        return new Promise((resolve) => {
            if (this._isPlaying) {
                resolve("waiting");
                return;
            }
            let CrossWins = 0;
            let ZeroWins = 0;

            const eq = (a,b) => this._gameVec9[a] == this._gameVec9[b];
            // check string
            for (let i = 0; i < 3; ++i) {
                const temp = 3*i;
                if (eq(temp, temp + 1) && eq(temp, temp + 2)) {
                    this._gameVec9[temp] ? ++CrossWins : ++ZeroWins;
                }
            }
            // check column
            for (let i = 0; i < 3; ++i) {
                if (eq(i, i + 3) && eq(i, i + 6)) {
                    this._gameVec9[i] ? ++CrossWins : ++ZeroWins;
                }
            }
            // check diag
            for (let i = 0; i < 2; ++i) {
                const temp = 2*i;
                if (eq(temp, 4) && eq(8-temp, 4)) {
                    this._gameVec9[4] ? ++CrossWins : ++ZeroWins;
                }
            }
            //resolve winners
            resolve(
                (CrossWins == ZeroWins)
                    ? "nothing"
                    : (CrossWins > ZeroWins) ? "yellow" : "red"
            );
        });
    }

    public stop(): void {
        this.unscheduleAllCallbacks();
        this.node.removeAllChildren();
        this._isPlaying = false;
    }

    private drawCrossZero (): Promise<Boolean> {
        let queue = -1;
        return new Promise((resolve) => {
            this.schedule(() => {
                const temp = ++queue%9;
                const side = this._gameVec9[temp];
                const node = this.spawnDiamond(side, new Vec3(temp%3,temp%3,0));
                this.node.addChild(node);
                if (queue == 8) {
                    this._isPlaying = false;
                    resolve(true);
                }
            }, 0.2, 8);
        });
    }

    private spawnDiamond (side: Boolean, position: Vec3): Node {
        const diamond = instantiate(this.model);
        
        if(!diamond) return;
        diamond.setPosition(this.generatePosition(position));
        diamond.getComponent(UITransform)!.contentSize = this._unitDimentions;
        diamond.getComponent(BoxCollider2D)!.size = this._unitDimentions;
        diamond.getComponent(Sprite)!.spriteFrame = this.sources[Number(side)];
        diamond.getComponent(RigidBody2D)!.angularVelocity = 0;
        return diamond;
    }

    private generatePosition (position: Vec3): Vec3 {
        const interval = 0.1; // interval between columns of physical square
        const posX = (1+interval)*this._unitDimentions.x*(position.x - 1);
        const posY = this._viewDimentions.y;
        const posZ = 0;
        return new Vec3(posX, posY, posZ);
    }

    private generateGameVector9 () {
        const matrix = [];
        let maxCount = 5;
        let crossCount = 0;
        let zeroCount = 0;
        for (let i = 0; i < 9; ++i) {
            //pushing cross or zero to matrix
            const result = this.tossCoinSimulation();
            if (result) {
                if (crossCount < maxCount) {
                    ++crossCount;
                    matrix.push(result);
                } else {
                    ++zeroCount;
                    matrix.push(!result);
                }
            } else {
                if (zeroCount < maxCount) {
                    ++zeroCount;
                    matrix.push(result);
                } else {
                    ++crossCount;
                    matrix.push(!result);
                }
            }
        }
        return matrix;
    }

    private tossCoinSimulation () {
        return Math.random() > 0.5;
    }
}


