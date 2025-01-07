function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loader(){
    
    var tl = gsap.timeline();

    tl.from(".line h1", {
        y: 150,
        stagger: 0.2,
        duration: 0.8,
        delay: 0.4,
    });

    tl.from("#part1",{
        onStart: function () {
            var h5 = document.querySelector("#part1 h5");
            var timer = 0;
            setInterval(function () {
                if (timer < 100) {
                    timer++;
                    h5.innerHTML = timer;
                } else {
                    h5.innerHTML = timer;
                }
            }, 30);
        },
    });
    tl.from('.line h2, #loader p',{
        opacity: 0
    })

    tl.to("#loader", {
        opacity: 0,
        duration: 1,
        delay: 2,
    });
    tl.from("#page1", {
        y: 1600,
        // opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: Power4,
    });

    tl.to("#loader", {
        display: "none",
    });

    tl.from('.elem h1, .elem h2',{
        y: 150,
        stagger: 0.2,

    })

}

function cursorAnime(){
    const cursor = document.getElementById('cursor');

    document.addEventListener('mousemove', (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    });
}

function sheryAnime(){
    Shery.imageEffect(".part1ImgDiv1, .part2ImgDiv, .part3ImgDiv", {
        style: 6,
        gooey: true,
        // debug: true,
        config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7241195453907675},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":5,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.23,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.5,"range":[0,10]},"metaball":{"value":0.42,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}

    });
}

function videoPlayer(){
        const videobox = document.querySelector('.videobox');
        const playbtn = document.querySelector('#playbtn');
        const video = document.querySelector('.videobox video');
        const cursor = document.getElementById('cursor');
        const image = document.querySelector('.videobox img');

        const initialPosition = { left: '80%', bottom: '68%' };

        videobox.addEventListener('mouseenter', () => {
            videobox.style.position = 'relative'
            cursor.style.opacity = 0;
            videobox.addEventListener('mousemove', (e) => {
                const bounds = videobox.getBoundingClientRect(); 
                const x = e.clientX - bounds.left; 
                const y = e.clientY - bounds.top;

                gsap.to(playbtn, {
                    left: `${x - playbtn.offsetWidth / 2}px`, 
                    top: `${y - playbtn.offsetHeight / 2}px`,
                });
            });
        });

        videobox.addEventListener('mouseleave', () => {
            videobox.style.position = ''
            cursor.style.opacity = 1;
            gsap.to(playbtn, {
                left: initialPosition.left,
                bottom: initialPosition.bottom,
                top: '', 
            });
        });

    var flag = 0
    videobox.addEventListener("click", function () {
        if (flag == 0) {
            image.style.display = 'none'
            video.style.opacity = 1
            video.muted = false
            video.volume = 1.0
            video.play()
            playbtn.innerHTML = `<i class="ri-pause-large-fill"></i>`
            gsap.to("#playbtn", {
                scale: 0.5
            })
            flag = 1
        } else {
            image.style.display = ''
            video.pause()
            video.style.opacity = 0
            playbtn.innerHTML = `<i class="ri-play-large-fill"></i>`
            gsap.to("#playbtn", {
                scale: 1
            })
            flag = 0
        }
    })

}
    
locomotiveAnimation()
loader()
cursorAnime()
sheryAnime()
videoPlayer()