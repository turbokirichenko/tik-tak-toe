import { _decorator, Component, Tween, Vec3, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoopedBackgroundContainerScript')
export class LoopedBackgroundContainerScript extends Component {
    private _speed: number = 200;
    private _offset: number = 1024;

    @property({type: Node})
    private _background: Node | null = null;

    @property({type: Vec3})
    private static _prevBackgroundPosition: Vec3 = new Vec3(0,0,0);

    onLoad() {
        this._background = this.node.children[0];
        this._background.position = LoopedBackgroundContainerScript._prevBackgroundPosition;
        this.playLoop();
    }

    lateUpdate() {
        // update last position
        const { position } = this._background;
        // position of X must be between [0, 1024)
        const lastPositionX = position.x%this._offset
        LoopedBackgroundContainerScript._prevBackgroundPosition = new Vec3(lastPositionX, 0, 0);
    }

    private playLoop() {
        const posTo: Vec3 = new Vec3(this._offset, 0, 0);
        const offset: Vec3 = new Vec3(-this._offset, 0, 0);
        let duration: number = this._offset/this._speed;
        new Tween(this._background)
            .by(duration, { position: posTo })
            .by(0, { position: offset })
            .union()
            .repeat(Infinity)
            .start();
    }
}


