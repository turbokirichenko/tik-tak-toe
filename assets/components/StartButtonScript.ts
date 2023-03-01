import { _decorator, director, Component, Button, game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartButton')
export class StartButton extends Component {
    @property(Button)
    private _button: Button | null = null;

    onLoad() {
        this.node.on(Button.EventType.CLICK, this.callback, this);
    }

    private callback(button: Button) {
        console.log('callback 1');
        director.loadScene("GamingScene");
    }
}


