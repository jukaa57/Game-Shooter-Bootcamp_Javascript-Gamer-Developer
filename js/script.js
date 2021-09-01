function start() {
    $("#initiate").hide();

    $("#backgroundGame").append("<div id='player' class='movePlayer'></div>");
    $("#backgroundGame").append("<div id='enemies1' class='moveEnemies'></div>");
    $("#backgroundGame").append("<div id='enemies2' class='moveEnemies'></div>");
    $("#backgroundGame").append("<div id='enemies3' class='moveEnemies'></div>");
    $("#backgroundGame").append("<div id='wall'</div>");
    $("#backgroundGame").append("<div id='ammo'></div>");
    $("#backgroundGame").append("<div id='information'</div>");
    $("#backgroundGame").append("<div id='life'</div>");
    $("#backgroundGame").append("<p id='bullets'></p>");

    const somReload = document.getElementById('reload');
    const somZombie = document.getElementById('zombieDead');
    const somFireShotgun = document.getElementById('fireShotgun');
    const somPlayer = document.getElementById('playerCollision');
    const somGameOver = document.getElementById('gameOver');
    const somMusic = document.getElementById('music');


    let information = {
        life: 5,
        lifeWall: 6,
        bullet: 20,
        getBullet:0,
        dead:0
    };

    let gameOver = false;
    let vel = {
        vel1: 4,
        vel2: 4,
        vel3: 4,
        vel4: 4
    };

    let positionY = parseInt(Math.random()*600);
    let fireB = true;
    const game = {};
    const key = {
        W: 87,
        S: 83,
        D: 68
    }
    
    game.pressed = [];
    $(document).keydown(function(e){
        game.pressed[e.which] = true;
    });
    
    $(document).keyup(function(e){
        game.pressed[e.which] = false;
    });
    game.timer = setInterval( loop, 30 );


    somMusic.addEventListener("ended", function(){ somMusic.currentTime = 0; somMusic.play(); }, false)
    somMusic.play();
    somMusic.volume = 0.05;

    function loop() {
        moveBackground();
        moveEnemies(); 
        movePlayer();
        moveAmmo();
        collision();
        informations();
        lifeWall(); 
    }
    
    function moveBackground() {
        left = parseInt($("#backgroundGame").css("background-position"));
        $("#backgroundGame").css("background-position", left-1)
    }

    function informations() {
        $('#information').html("<h2> Life: " + information.life + " Bullets: " + information.bullet + " Dead: " + information.dead + "</h2>")
    } 

    function lifeWall() {
        if(information.lifeWall == 6) {
            $("#life").css("background-image", "url(assets/image/LifeFull.png)");
        }
            
        if(information.lifeWall == 5) {
            $("#life").css("background-image", "url(assets/image/Life5.png)");
        }

        if(information.lifeWall == 4) {
            $("#life").css("background-image", "url(assets/image/Life4.png)");
        }
        
        if(information.lifeWall == 3) {
            $("#life").css("background-image", "url(assets/image/Life3.png)");
        }
        
        if(information.lifeWall == 2) {
            $("#life").css("background-image", "url(assets/image/Life2.png)");
        }

        if(information.lifeWall == 1) {
            $("#life").css("background-image", "url(assets/image/Life1.png)");
        }

        if(information.lifeWall == 0){
            $("#life").css("background-image", "url(assets/image/Lifenull.png)");
            endGame();
        }
        
    }

    function movePlayer() {
        if ( game.pressed[key.W] ) {
            let up = parseInt($("#player").css("top"));
            $("#player").css("top",up-15);

            if  (up <= 0) {
                $("#player").css("top",up + 0.001);
            }
        }

        if ( game.pressed[key.S] ) {
            let up = parseInt($("#player").css("top"));
            $("#player").css("top",up + 15);

            if  (up >= 540) {
                $("#player").css("top", up -0.0001);
            }
        }

        if ( game.pressed[key.D] ) {
           fire();
        }
    }

    function moveAmmo() {
        left = parseInt($("#ammo").css("left"));
        $("#ammo").css("left", left-vel.vel4);
        respawnAmmo()
    }

    function moveEnemies() {
        left1 = parseInt($("#enemies1").css("left"));
        $("#enemies1").css("left", left1-vel.vel1);
        respawnEnemie1()

        left2 = parseInt($("#enemies2").css("left"));
        $("#enemies2").css("left", left2-vel.vel2);
        respawnEnemie2()

        left3 = parseInt($("#enemies3").css("left"));
        $("#enemies3").css("left", left3-vel.vel3);
        respawnEnemie3();
    }

    function respawnEnemie1() {
        if (left1 <= 0) {
            information.lifeWall--
            vel.vel1 = vel.vel1 + 0.2
            positionY = parseInt(Math.random()*540);
            $("#enemies1").css("left",900);
            $("#enemies1").css("top",positionY);
        }else if(left1 == 950) {
            vel.vel1 = vel.vel1 + 0.2
            positionY = parseInt(Math.random()*540);
            $("#enemies1").css("left",900);
            $("#enemies1").css("top",positionY);
        }
    }
    
    function respawnEnemie2() {
        if (left2 <= 0) {
            information.lifeWall--
            vel.vel2 = vel.vel2 + 0.25
            positionY = parseInt(Math.random()*540);
            $("#enemies2").css("left",900);
            $("#enemies2").css("top",positionY);
        }else if(left2 == 950) {
            vel.vel2 = vel.vel2 + 0.25
            positionY = parseInt(Math.random()*540);
            $("#enemies2").css("left",900);
            $("#enemies2").css("top",positionY);
        }
    }

    function respawnEnemie3() {
        if (left3 <= 0) {
            information.lifeWall--
            vel.vel3 = vel.vel3 + .3
            positionY = parseInt(Math.random()*540);
            $("#enemies3").css("left",900);
            $("#enemies3").css("top",positionY); 
        }else if(left3 == 950) {
            vel.vel3 = vel.vel3 + 0.3
            positionY = parseInt(Math.random()*540);
            $("#enemies3").css("left",900);
            $("#enemies3").css("top",positionY);
        }
    }

    function respawnAmmo() {
        if (left <= 0) {
            vel.vel4 = parseInt(Math.random()*10);
            if(vel.vel4 <= 3) vel.vel4 += 6;
            positionY = parseInt(Math.random()*520);
            $("#ammo").css("left",910);
            $("#ammo").css("top",positionY);
        }
    }

    function fire() {
        if (fireB == true && information.bullet > 0) {
            somFireShotgun.play();
            somFireShotgun.volume = .5
            information.bullet -=1
            fireB = false;""
            upB = parseInt($('#player').css('top'));
            leftB = parseInt($('#player').css('left'));
            fireX = leftB + 120;
            fireUp = upB + 51;
            $('#backgroundGame').append("<div id='fire'></div>");
            $('#fire').css("top",fireUp);
            $('#fire').css("left", fireX);
        
            muzzle(leftB,upB)
            var timeBullet = window.setInterval(fireNow, 30);
        }

        function fireNow() {
            leftB = parseInt($('#fire').css('left'));
            $('#fire').css('left', leftB + 15);

            if (leftB > 900) {
                window.clearInterval(timeBullet);
                timeBullet = null;
                $('#fire').remove();
                fireB = true
            }
        }

        function muzzle(mX, mY) {
            $('#backgroundGame').append('<div id="muzzle"></div>');
            var div = $('#muzzle'); //aliases of $('#muzzle') 
            div.css('top', mY + 48);
            div.css('left', mX + 112);
            var timeMuzzle = window.setInterval(removeMuzzle, 60);
            function removeMuzzle() {
                div.remove();
                window.clearInterval(timeMuzzle);
                timeMuzzle = null;
            }
        }
    }

    function bulletRecive() {
        $("#bullets").animate({top:555, opacity:100}, "slow")
        $("#bullets").html("+" + information.getBullet)
        information.getBullet = 0

        $("#bullets").animate({top:570, opacity:0}, "slow")


    }

    function collision() {
        let collision1 = ($('#player').collision($('#enemies1')));
        let collision2 = ($('#player').collision($('#enemies2')));
        let collision3 = ($('#player').collision($('#enemies3')));
        let collisionB1 = ($('#fire').collision($('#enemies1')));
        let collisionB2 = ($('#fire').collision($('#enemies2')));
        let collisionB3 = ($('#fire').collision($('#enemies3')));
        let collisionB4 = ($('#fire').collision($('#ammo')));
        let collisionAmmo = ($('#player').collision($('#ammo')));

        if (collision1.length > 0) {
            somPlayer.play();
            somPlayer.volume = 0.2,
            information.life--;
            if (information.life == 0) { endGame(); }

            positionY = parseInt(Math.random()*540);
            $("#enemies1").css("left",950);
            $("#enemies1").css("top",positionY);
        }

        if (collision2.length > 0) {
            somPlayer.play();
            somPlayer.volume = 0.2;
            information.life--;
            if (information.life == 0) { endGame();}

            positionY = parseInt(Math.random()*540);
            $("#enemies2").css("left",950);
            $("#enemies2").css("top",positionY);
        }
        
        if (collision3.length > 0) {
            somPlayer.play();
            somPlayer.volume = 0.2;
            information.life--;
            if (information.life == 0) { endGame(); }

            positionY = parseInt(Math.random()*540);
            $("#enemies3").css("left",950);
            $("#enemies3").css("top",positionY);
        }

        if (collisionB1.length > 0) {  
            somZombie.play();
            somZombie.volume = 0.05;
            information.dead++;
            
            positionY = parseInt(Math.random()*540);
            $("#enemies1").css("left",950);
            $("#enemies1").css("top",positionY);
            $('#fire').css("left", 950)
        }

        if (collisionB2.length > 0) {  
            somZombie.play();
            somZombie.volume = 0.05;
            information.dead++;

            positionY = parseInt(Math.random()*540);
            $("#enemies2").css("left",950);
            $("#enemies2").css("top",positionY);
            $('#fire').css("left", 950);
        }

        if (collisionB3.length > 0) {  
            somZombie.play();
            somZombie.volume = 0.05;
            information.dead++;

            positionY = parseInt(Math.random()*540);
            $("#enemies3").css("left",950);
            $("#enemies3").css("top",positionY);
            $('#fire').css("left", 950)
        }

        if (collisionB4.length > 0) {
            somReload.play();
            somReload.volume = 0.1;
            information.getBullet += parseInt(Math.random()*20) ;
            if(information.getBullet <= 3) information.getBullet += 4;
            information.bullet += information.getBullet;

            bulletRecive();
            $('#ammo').css('display', 'none');
            $('#fire').css("left", 950);
            respawnTimePunish();
        }

        if (collisionAmmo.length > 0) {  
            somReload.play();
            somReload.volume = 0.1;
            information.getBullet += parseInt(Math.random()*15) ;
            if(information.getBullet <= 5) information.getBullet += 8;
            information.bullet += information.getBullet ;

            bulletRecive();
            $('#ammo').css('display', 'none');
            timeRespawnAmmo();
        }
    }

    function timeRespawnAmmo() {
        let timeReload = window.setInterval(respawnB, 6000);
        function respawnB() {
            $('#ammo').css('display', 'block');
            window.clearInterval(timeReload);
            timeReload = null;
            if(gameOver == false) respawnAmmo()
        }
    }

    function respawnTimePunish() {
        let timeReload = window.setInterval(respawnA, 10000);
        function respawnA() {
            $('#ammo').css('display', 'block');
            window.clearInterval(timeReload);
            timeReload = null;
            if(gameOver == false) respawnAmmo()
        }
    }

    function endGame() {
        gameOver = true;
        somMusic.pause();
        somGameOver.play();

        window.clearInterval(game.timer);
        game.timer = null
        $('#player').remove();
        $('#ammo').remove();
        $('#fire').remove();
        $('#enemies1').remove();
        $('#enemies2').remove();
        $('#enemies3').remove();
        $('#information').remove();
        $('#bullets').remove();
        $('#life').remove();
        $('#wall').remove();
        $('#backgroundGame').append('<div id="end"></div>')
        $("#end").html("<h1> Game Over </h1><p>Zumbie Mortos: " + information.dead + "</p>" + "<div id='restart' onClick='restartGame()'><h3>Jogar Novamente</h3>")
    }
}

function restartGame() {
    $('#end').remove();
    $('#life').remove();
    $('#wall').remove();
    start();
}