const Curves           = Famous.transitions.Curves;
const DOMElement       = Famous.domRenderables.DOMElement;
const Node             = Famous.core.Node;
const Opacity          = Famous.components.Opacity;
const Position         = Famous.components.Position;
const Rotation         = Famous.components.Rotation;

export class Image extends Node {
    constructor(model = {}) {
        super();

        this.model = model;
        this
            .setAlign(0, 0)
            .setMountPoint(0, 0)
            .setOrigin(0, 0)
            .setScale(1, 1, 1)
            .setSizeMode('absolute', 'absolute')
            .setAbsoluteSize(200, 200);

        this.position = new Position(this);
        this.rotation = new Rotation(this);
        this.opacity  = new Opacity(this);
        this.opacity.set(0);

        this.domEl = new DOMElement(this, {
            tagName: 'img',
            classes: [],
            properties: {},
            attributes: {
                'src': this.model.src
            }
        });
    }
/*
    show() {
        this.opacity.set(1, {
            curve: Curves.easeIn,
            duration: 1000
        });
    }

    hide(cb) {
        this.opacity.set(0, {
            curve: Curves.easeOut,
            duration: 750
        }, cb);
    }*/
}

