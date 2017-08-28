
(function(ns){

var PlayingScene = ns.PlayingScene = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        PlayingScene.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){

        var direction = new Hilo.Bitmap({
            id: 'direction',
            image: properties.directionImg,
        });

        var action = new Hilo.Bitmap({
            id: 'direction',
            image: properties.actionImg,
        });

        direction.x = this.width - direction.width >> 1;
        direction.y = this.height - direction.height * 3;
        action.x = this.width - action.width * 1.5;
        action.y = this.height - action.height * 5;

        this.addChild(direction, action)
    },

    show: function(){
        this.visible = true;
    }
});

})(window.game);