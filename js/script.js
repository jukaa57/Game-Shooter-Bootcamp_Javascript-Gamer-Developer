function start() {
    $("#initiate").hide();

    $("#backgroundGame").append("<div id='player' class='movePlayer'></div>");
    $("#backgroundGame").append("<div id='enemies1' class='moveEnemies'></div>");
    $("#backgroundGame").append("<div id='enemies2' class='moveEnemies'></div>");
    $("#backgroundGame").append("<div id='enemies3' class='moveEnemies'></div>");
    $("#backgroundGame").append("<div id='ammo'></div>");


    let velocity1 = parseInt(Math.random()*6);
    if (velocity1 <= 3) velocity1 = 4;
    let velocity2 = parseInt(Math.random()*7);
    if (velocity2 <= 3) velocity2 = 4;
    let velocity3 = parseInt(Math.random()*8);
    if (velocity3 <= 3) velocity2 = 4;

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

    function loop() {
        moveBackground();
        moveEnemies(); 
        movePlayer();
        moveAmmo();
        collision();
    }
    
    function moveBackground() {
        left = parseInt($("#backgroundGame").css("background-position"));
        $("#backgroundGame").css("background-position", left-1)
    }

    function moveAmmo() {
        left = parseInt($("#ammo").css("left"));
        $("#ammo").css("left", left-velocity1);
        respawAmmo()
    }

    function moveEnemies() {
        left1 = parseInt($("#enemies1").css("left"));
        $("#enemies1").css("left", left1-velocity1);
        respawEnemie1()

        left2 = parseInt($("#enemies2").css("left"));
        $("#enemies2").css("left", left2-velocity2);
        respawEnemie2()

        left3 = parseInt($("#enemies3").css("left"));
        $("#enemies3").css("left", left3-velocity3);
        respawEnemie3();
    }

    function movePlayer() {
        if ( game.pressed[key.W] ) {
            let up = parseInt($("#player").css("top"));
            $("#player").css("top",up-10);

            if  (up <= 0) {
                $("#player").css("top",up + 0.001);
            }
        }

        if ( game.pressed[key.S] ) {
            let up = parseInt($("#player").css("top"));
            $("#player").css("top",up + 10);

            if  (up >= 540) {
                $("#player").css("top", up -0.0001);
            }
        }

        if ( game.pressed[key.D] ) {
           fire();
        }
    }

    function respawEnemie1() {
        if (left1 <= 0) {
            velocity1 = parseInt(Math.random()*6);
            if (velocity1 <= 3) velocity1 += 4;

            positionY = parseInt(Math.random()*540);
            $("#enemies1").css("left",953);
            $("#enemies1").css("top",positionY);
        }
    }
    
    function respawEnemie2() {
        if (left2 <= 0) {
            velocity2 = parseInt(Math.random()*7);
            if (velocity2 <= 3) velocity2 += 4;

            positionY = parseInt(Math.random()*540);
            $("#enemies2").css("left",953);
            $("#enemies2").css("top",positionY);
        }
    }

    function respawEnemie3() {
        if (left3 <= 0) {
            velocity3 = parseInt(Math.random()*8);
            if (velocity3 <= 3) velocity3 += 4;

            positionY = parseInt(Math.random()*540);
            $("#enemies3").css("left",953);
            $("#enemies3").css("top",positionY);
        }
    }

    function respawAmmo() {
        if (left <= 0) {
            velocity1 = parseInt(Math.random()*6);
            if (velocity1 <= 3) velocity1 += 4;

            positionY = parseInt(Math.random()*520);
            $("#ammo").css("left",953);
            $("#ammo").css("top",positionY);

        }
    }

    function fire() {
        if (fireB == true) {
            fireB = false;

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
       
    }

    function muzzle(mX, mY) {
        $('#backgroundGame').append('<div id="muzzle"></div>');
       
        var div = $('#muzzle'); //aliases of $('#muzzle') 
        div.css('top', mY + 50);
        div.css('left', mX + 112);
        var timeMuzzle = window.setInterval(removeMuzzle, 60);
            function removeMuzzle() {
                div.remove();
                window.clearInterval(timeMuzzle);
                timeMuzzle = null;

            }
    }

    function collision() {
        let collision1 = ($('#player').collision($('#enemies1')));
        let collision2 = ($('#player').collision($('#enemies2')));
        let collision3 = ($('#player').collision($('#enemies3')));
        let collisionB1 = ($('#fire').collision($('#enemies1')));
        let collisionB2 = ($('#fire').collision($('#enemies2')));
        let collisionB3 = ($('#fire').collision($('#enemies3')));
        let collisionAmmo = ($('#player').collision($('#ammo')));

        if (collision1.length > 0) {
            positionY = parseInt(Math.random()*540);
            $("#enemies1").css("left",953);
            $("#enemies1").css("top",positionY);
        }

        if (collision2.length > 0) {
            positionY = parseInt(Math.random()*540);
            $("#enemies2").css("left",953);
            $("#enemies2").css("top",positionY);
        }
        
        if (collision3.length > 0) {
            positionY = parseInt(Math.random()*540);
            $("#enemies3").css("left",953);
            $("#enemies3").css("top",positionY);
        }

        if (collisionB1.length > 0) {  
            positionY = parseInt(Math.random()*540);
            $("#enemies1").css("left",953);
            $("#enemies1").css("top",positionY);
        }

        if (collisionB2.length > 0) {  
            positionY = parseInt(Math.random()*540);
            $("#enemies2").css("left",953);
            $("#enemies2").css("top",positionY);
        }

        if (collisionB3.length > 0) {  
            positionY = parseInt(Math.random()*540);
            $("#enemies3").css("left",953);
            $("#enemies3").css("top",positionY);
        }

        if (collisionAmmo.length > 0) {  
            positionY = parseInt(Math.random()*540);
            $("#ammo").css("left",953);
            $("#ammo").css("top",positionY);
        }

    }
}


