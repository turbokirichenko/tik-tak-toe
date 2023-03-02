import { _decorator, director, Component, Button, Scene } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartButton')
export class StartButton extends Component {

    onLoad() {
        this.node.on(Button.EventType.CLICK, this.callback, this);
    }

    private callback() {
        director.loadScene("GamingScene");
    }
}


