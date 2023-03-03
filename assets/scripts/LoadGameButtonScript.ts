import { _decorator, director, Component, Node, Button, Label } from 'cc';
import { TikTakToeContainerScript } from './TikTakToeContainerScript';
const { ccclass, property } = _decorator;

@ccclass('LoadGameButtonScript')
export class LoadGameButtonScript extends Component {

    @property(TikTakToeContainerScript) 
    private template = null;

    private _label: Label | null = null;

    onLoad() {
        this.node.on(Button.EventType.CLICK, this.callback, this);
        this._label = this.node.children[0].getComponent(Label);
    }

    private callback(button: Button) {
        this._label.string = "LOADING...";
        this.template.play().then((result) => {
            if(result) this._label.string = "RELOAD";
        });
    }
}
