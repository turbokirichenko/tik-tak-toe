import { _decorator, Component, Tween, Vec3, UITransform, director, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoopedBackgroundContainerScript')
export class LoopedBackgroundContainerScript extends Component {
    private _speed: number = 200;
    private _width: number = 1024;
    
    start() {
        //...
    }

    onLoad() {
        this.playLoop();
    }

    update(deltaTime: number) {
        //...
    }

    private playLoop() {
        const posTo: Vec3 = new Vec3(this._width, 0, 0);
        const offset: Vec3 = new Vec3(-1*this._width, 0, 0);
        const backgroundNode = this.node.children[0];
        let duration: number = this._width/this._speed;
        new Tween(backgroundNode)
            .by(0, { position: offset })
            .by(duration, { position: posTo })
            .union()
            .repeat(Infinity)
            .start();
    }
}


