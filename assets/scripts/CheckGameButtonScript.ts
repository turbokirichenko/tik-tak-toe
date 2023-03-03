import { _decorator, Component, Button, Label, instantiate, Prefab } from 'cc';
import { TikTakToeContainerScript } from './TikTakToeContainerScript';
const { ccclass, property } = _decorator;

@ccclass('CheckGameButtonScript')
export class CheckGameButtonScript extends Component {

    @property(TikTakToeContainerScript) 
    private template = null;

    @property(Prefab)
    private alert = null;

    onLoad() {
        this.node.on(Button.EventType.CLICK, this.callback, this);
    }

    private async callback(button: Button) {
        const result = await this.template.check();
        this.showAlert(this.switchLabel(result));
    }

    private switchLabel(result:string) {
        switch (result) {
            case "waiting": return "WAITING...";
            case "nothing": return "*\\_(:/)_/*";
            case "yellow": return "YELLOW WIN!";
            case "red": return "RED WIN!";
            default: return "CHECK";
        }
    }

    private showAlert(label: string) {
        //
        const node = instantiate(this.alert);
        node.play = () => {
            node.children[0].getComponent(Label).string = label;
        }
        node.play();
        node.parent = this.node.parent;
        this.scheduleOnce(() => {
            this.node.parent.removeChild(node);
            node.destroy();
        }, 3);
    }
}
