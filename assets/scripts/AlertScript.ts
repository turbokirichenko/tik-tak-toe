import { _decorator, Component, SpriteFrame, Sprite, } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AlertScript')
export class AlertScript extends Component {

    @property(SpriteFrame)
    private sources: SpriteFrame[] = [];


    start() {
        this.getComponent(Sprite).spriteFrame = this.sources[0];
    }
}


