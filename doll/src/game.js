(function(){

window.onload = function(){
    game.init();
}

var game = window.game = {
    width: 0,
    height: 0,

    asset: null,
    stage: null,
    ticker: null,
    state: null,

    bg: null,
    windowBg: null,
    // ground: null,
    holdbacks: null,
    gameReadyScene: null,
    gamePlayingScene: null,

    init: function(){
        this.asset = new game.Asset();
        this.asset.on('complete', function(e){
            this.asset.off('complete');
            this.initStage();
        }.bind(this));
        this.asset.load();
    },

    initStage: function(){
        this.width = 720;
        this.height = 1280;
        this.scale = 0.5;

        //舞台画布
        var canvasType = location.search.indexOf('dom') != -1 ? 'div' : 'canvas';
        var canvas = Hilo.createElement(canvasType, {
            style: {
                position: 'absolute',
                width: this.width * this.scale + 'px',
                height: this.height * this.scale + 'px'
            }
        });

        //舞台
        this.stage = new Hilo.Stage({
            canvas: canvas,
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale
        }).addTo(document.body);

        //启动计时器
        this.ticker = new Hilo.Ticker(60);
        this.ticker.addTick(Hilo.Tween);
        this.ticker.addTick(this.stage);
        this.ticker.start();

        //绑定交互事件
        this.stage.enableDOMEvent(Hilo.event.POINTER_START, true);
        this.stage.on(Hilo.event.POINTER_START, this.onUserInput.bind(this));

        //Space键控制
        if(document.addEventListener){
            document.addEventListener('keydown', function(e){
                if(e.keyCode === 32) this.onUserInput(e);
            }.bind(this));
        }else{
            document.attachEvent('onkeydown', function(e){
                if(e.keyCode === 32) this.onUserInput(e);
            }.bind(this));
        }
        
        //舞台更新
        // this.stage.onUpdate = this.onUpdate.bind(this);

        //初始化
        this.initBackground();
        this.initScenes();
        this.initHoldbacks();

        //准备游戏
        this.gameReady();
    },

    initBackground: function(){
        //背景
        var bgWidth = this.width * this.scale;
        var bgHeight = this.height * this.scale;

        // document.body.insertBefore(Hilo.createElement('div', {
        //     id: 'bg',
        //     style: {
        //         background: 'url(images/bg.png) no-repeat',
        //         backgroundSize: bgWidth + 'px, ' + bgHeight + 'px',
        //         position: 'absolute',
        //         width: bgWidth + 'px',
        //         height: bgHeight + 'px',
        //         zIndex: -1,
        //         top: 0,
        //         left: 0
        //     }
        // }), document.body.childNodes[0]);

        this.windowBg = new Hilo.Bitmap({
            id: 'window_bg',
            image: this.asset.windowBg
        });
        this.windowBg.x = this.width - this.windowBg.width >> 1;
        this.windowBg.addTo(this.stage)

        this.bg = new Hilo.Bitmap({
            id: 'bg',
            image: this.asset.bg
        }).addTo(this.stage);

    },

    initHoldbacks: function(){
        this.holdbacks = new game.Holdbacks({
            id: 'holdbacks',
            image: this.asset.holdback,
            height: this.height,
            startX: this.width * 2,
            // groundY: this.ground.y
        }).addTo(this.stage);
    },

    initScenes: function(){
        //准备场景
        // this.gameReadyScene = new game.ReadyScene({
        //     id: 'readyScene',
        //     width: this.width,
        //     height: this.height,
        //     image: this.asset.ready
        // }).addTo(this.stage);

        // 准备场景
        this.gameReadyScene = new game.ReadyScene(
            {
                id: 'readyScene',
                width: this.width,
                height: this.height,
                image: this.asset.ready
            }
        ).addTo(this.stage);

        this.gameReadyScene.getChildById('game_begin').on(Hilo.event.POINTER_START, function(e){
            console.log(666)
            e.stopImmediatePropagation && e.stopImmediatePropagation();
            this.gameStart();
        }.bind(this));

        this.gamePlayingScene = new game.PlayingScene({
            id: 'playingScene',
            width: this.width,
            height: this.height,
            directionImg: this.asset.direction,
            actionImg: this.asset.action,
            visible: false
        }).addTo(this.stage);
    },

    onUserInput: function(e){
        if(this.state !== 'over'){
            //启动游戏场景
            if(this.state !== 'playing') this.gameStart();
            //控制小鸟往上飞
        }
    },

    onUpdate: function(delta){
        if(this.state === 'ready'){
            return;
        }
    },

    gameReady: function(){
        this.state = 'ready';
        this.gameReadyScene.visible = true;
        this.holdbacks.reset();
    },

    gameStart: function(){
        this.state = 'playing';
        this.gameReadyScene.visible = false;
        this.gamePlayingScene.visible = true;
        this.gamePlayingScene.show();
    },

};

})();