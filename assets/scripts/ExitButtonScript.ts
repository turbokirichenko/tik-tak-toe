import { _decorator, director, Component, Node, Button } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ExitButtonScript')
export class ExitButtonScript extends Component {
    onLoad() {
        this.node.on(Button.EventType.CLICK, this.callback, this);
    }

    private callback(button: Button) {
        director.loadScene("LoadingScene");
    }
}


