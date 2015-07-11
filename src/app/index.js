const Curves            = Famous.transitions.Curves;
const DOMElement        = Famous.core.DOMElement;
const Node              = Famous.core.Node;
import {Image}          from './Image';

export class App extends Node {
    constructor(config = {}) {
        super();

        //TODO: Allow for a config to be passed in
        let sampleConfig = {
            imagePaths: [''],
            imageSize: [200, 200],
            displayRatio: [3, 3]
        };

        this
            .setAlign(.5, 0)
            .setMountPoint(.5, 0)
            .setOrigin(.5, .5)
            .setSizeMode('absolute', 'absolute')
            .setAbsoluteSize(620, 620)
            .setScale(1, 1, 1);

        this.loadImages();
        this.positionImages();
        this.startAnimation();
    }

    loadImages() {
        this.allImages = [];
        this.queuedImages = []; //array of images that waiting to show
        this.usedImages = []; //array of images that have already shown
        this.activeImages = []; //array of images that are currently visible
        this.newImages = []; //array of images that are new to the active state or use when ensuring older images are swapped first

        let i = 26;
        while(i > 0) {
            let imageNode = new Image({
                src: `assets/images/${i}.jpg`
            });

            this.addChild(imageNode);
            this.allImages.push(imageNode);

            i--;
        }
    }

    positionImages() {
        for(var i = 0, j = this.allImages.length; i < j; i++) {
            let image = this.allImages[i];

            if(i < 9) {
                this.activeImages.push(image);

                let pos = [0, 0];

                switch(i) {
                    case 0:
                        pos = [0, 0];
                        break;
                    case 1:
                        pos = [210, 0];
                        break;
                    case 2:
                        pos = [420, 0];
                        break;
                    case 3:
                        pos = [0, 210];
                        break;
                    case 4:
                        pos = [210, 210];
                        break;
                    case 5:
                        pos = [420, 210];
                        break;
                    case 6:
                        pos = [0, 421];
                        break;
                    case 7:
                        pos = [210, 421];
                        break;
                    case 8:
                        pos = [420, 420];
                        break;
                }

                image.setPosition(pos[0], pos[1], 50);

                let blar = Math.random() * (750 - 150) + 150;

                setTimeout(() => {
                    image.opacity.set(1, {
                        duration: 1000
                    });
                }, blar);
            } else {
                this.queuedImages.push(image);
            }
        }
    }

    startAnimation() {
        window.setInterval(() => {
            this.updateImage();
        }, 1000);
    }

    updateImage() {
        let activeIndex = Math.floor(Math.random() * this.activeImages.length);
        let newIndex = Math.floor(Math.random() * this.queuedImages.length);

        if(this.queuedImages.length === 0) {
            this.queuedImages = this.usedImages;
            this.usedImages = [];
        }

        if(this.activeImages.length === 0) {
            this.activeImages = this.newImages;
            this.newImages = [];
        }

        this.swapImages(this.activeImages[activeIndex], this.queuedImages[newIndex]);
        this.updateQueues(activeIndex, newIndex);
    }

    swapImages(currentImage, nextImage) {
        let currentPos = currentImage.getPosition();

        nextImage.position.halt();
        nextImage.position.set(currentPos[0], currentPos[1], currentPos[2], {}, () => {
            currentImage.opacity.halt();
            currentImage.opacity.set(0, {
                //curve: Curves.easeIn,
                duration: 1500
            }, () => {
                nextImage.opacity.halt();
                nextImage.opacity.set(1, {
                    //curve: Curves.easeIn,
                    duration: 1000
                })
            });
        });
    }

    updateQueues(activeIndex, newIndex) {
        let usedImage = this.activeImages.splice(activeIndex, 1)[0];
        let newImage = this.queuedImages.splice(newIndex, 1)[0];

        this.usedImages.push(usedImage);
        this.newImages.push(newImage);
    }
}

const scene     = Famous.core.FamousEngine.createScene('#app');
window.app      = scene.addChild(new App());
