
(function(ns){

var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    bg: null,
    ground: null,
    ready: null,
    over: null,
    numberGlyphs: null,
    birdAtlas: null,
    holdback: null,
    windowBg: null,
    direction: null,
    action: null,


    load: function(){
        var resources = [
            {id:'bg', src:'images/bg_doll.png'},
            {id:'ground', src:'images/ground.png'},
            {id:'window_bg', src:'images/window_bg.png'},
            {id:'ready', src:'images/game_begin.png'},
            {id:'over', src:'images/over.png'},
            {id:'number', src:'images/number.png'},
            {id:'bird', src:'images/bird.png'},
            {id:'holdback', src:'images/holdback.png'},
            {id:'direction', src:'images/direction.png'},
            {id:'action', src:'images/action.jpg'},
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(e){
        this.bg = this.queue.get('bg').content;
        this.ground = this.queue.get('ground').content;
        this.ready = this.queue.get('ready').content;
        this.windowBg = this.queue.get('window_bg').content;
        this.over = this.queue.get('over').content;
        this.holdback = this.queue.get('holdback').content;
        this.direction = this.queue.get('direction').content;
        this.action = this.queue.get('action').content;

        this.birdAtlas = new Hilo.TextureAtlas({
            image: this.queue.get('bird').content,
            frames: [
                [0, 120, 86, 60], 
                [0, 60, 86, 60], 
                [0, 0, 86, 60]
            ],
            sprites: {
                bird: [0, 1, 2]
            }
        });

        var number = this.queue.get('number').content;
        this.numberGlyphs = {
            0: {image:number, rect:[0,0,60,91]},
            1: {image:number, rect:[61,0,60,91]},
            2: {image:number, rect:[121,0,60,91]},
            3: {image:number, rect:[191,0,60,91]},
            4: {image:number, rect:[261,0,60,91]},
            5: {image:number, rect:[331,0,60,91]},
            6: {image:number, rect:[401,0,60,91]},
            7: {image:number, rect:[471,0,60,91]},
            8: {image:number, rect:[541,0,60,91]},
            9: {image:number, rect:[611,0,60,91]}
        };

        this.queue.off('complete');
        this.fire('complete');
    }
});

})(window.game);