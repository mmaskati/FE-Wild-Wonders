
var ylwbtn = $("#ylw-btn"),
    btntxt = $("#btn-txt"),
    btnbox = $("#btn-box"),
    thankyou = $(".thankyou"),
    tl = new TimelineLite({
        paused: true
    });

TweenMax.set(ylwbtn, {
    x: 250,
    y: 100
})

// Controlling Timeline Playback
tl
.to(btntxt, 0.1, {
    autoAlpha: 0,
    ease: Power1.easeOut
})
.to(ylwbtn, 0.2, {
    width: '100vw',
    height: '100vh',
    x: 0,
    y: 0,
    autoRound: false,
    transformOrigin: "50% 50%"
})
.to(thankyou, 0.3, {
    opacity: 1,
    ease: Power1.easeOut
})

.progress(1).progress(0);

$('#ylw-btn').on('click', function() {
$(this).addClass('active');
tl.play();
});
$('#close-btn').on('click', function() {
tl.reverse();
$('#ylw-btn').removeClass('active');
});