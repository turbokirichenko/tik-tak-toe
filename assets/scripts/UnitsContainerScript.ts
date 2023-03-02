import { _decorator, Component, Node, Prefab, instantiate, Vec3, RigidBody2D, Size, view, resources, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UnitsContainerScript')
export class UnitsContainerScript extends Component {

    private _dimentions: Size = null;
    private _maxSize = 16;

    @property({type: Prefab})
    public model: Prefab = null;

    @property({type: SpriteFrame})
    public sources: SpriteFrame[] = [];

    start() {
        this._dimentions = view.getVisibleSize();
        this.creatingDiamondsRandom(6);
    }

    update(deltaTime: number) {
        this.node.children.forEach(this.checkDiamondOverflow.bind(this));
        const currentSize = this._maxSize - this.node.children.length;
        if (currentSize) {
            this.creatingDiamondsRandom(currentSize);
        }
    }

    private creatingDiamondsRandom(size: number = 3): void {
        if (size > 18 || size < 0) return;
        for (let i = 0; i < size; ++i) {
            const nextDiamnd: Node = instantiate(this.model);
            const diamondRandomNum = Math.random();

            if (!nextDiamnd) return;
            nextDiamnd.setPosition(this.generatePosition(diamondRandomNum));

            const rigidObj: RigidBody2D = nextDiamnd.getComponent(RigidBody2D);
            if (rigidObj) {
                rigidObj.angularVelocity = diamondRandomNum*360;
            }

            //set background
            const sourceNum = Math.floor(diamondRandomNum*this.sources.length*9)%this.sources.length;
            nextDiamnd.getComponent(Sprite).spriteFrame = this.sources[sourceNum];

            this.node.addChild(nextDiamnd);
        }
    }

    private generatePosition(rand: number = 0.5): Vec3 {
        const posX = rand*this._dimentions.x - this._dimentions.x/2;
        const posY = rand*Math.random()*this._dimentions.y + 700;
        const posZ = 0;
        return new Vec3(posX,posY,posZ);
    }

    private checkDiamondOverflow(diamond) {
        const checkedPosition = this.checkOverflow(diamond.getPosition());
        if (checkedPosition) {
            this.node.removeChild(diamond);
            diamond.destroy();
        }
    }

    private checkOverflow(position: Vec3): Boolean {
        return (position.y < -1 * this._dimentions.y) ? true : false;
    }
}


