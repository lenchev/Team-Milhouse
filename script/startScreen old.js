window.onload = function () {

    var myAudio = new Audio('sounds/music.mp3');
    myAudio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    myAudio.play();

    var presents = $('#presents');
    presents.css('display', 'block').hide();

    presents.fadeIn(5000);

    presents.on('click', function () {
        presents.fadeOut(0),
        Load();
    });


    function Load() {

        var container = document.createElement('container');
        container.setAttribute('id', 'container');
        container.setAttribute('width', 900);
        container.setAttribute('height', 700);
        document.body.appendChild(container);

        var sources = {
            lameNoText: 'images/levelLameNoText.png',
            decentNoText: 'images/levelDecentNoText.png',
            proNoText: 'images/levelProNoText.png',
            lameFull: 'images/levelLameFull.png',
            decentFull: 'images/levelDecentFull.png',
            proFull: 'images/levelProFull.png',
            chooseDiff: 'images/chooseDiff.png'
        };

        function loadImages(sources, drawImages) {
            var images = {},
                loadedImages = 0,
                numImages = 0;

            for (var src in sources) {
                numImages++;
            }

            for (var src in sources) {
                images[src] = new Image();
                images[src].onload = function () {
                    if (++loadedImages >= numImages) {
                        drawImages(images);
                    }
                };
                images[src].src = sources[src];
            }
        }

        function drawImages(images) {
            var stage = new Kinetic.Stage({
                container: 'container',
                width: 900,
                height: 700
            });
            var layer = new Kinetic.Layer();

            // lame
            var width = images.lameFull.width;
            var height = images.lameFull.height;
            var lameImg = new Kinetic.Image({
                image: images.lameNoText,
                offset: { x: width / 2, y: height / 2 },
                width: width,
                height: height
            });

            lameImg.on('mouseover', function () {
                this.image(images.lameFull);
                this.scale({ x: 1.05, y: 1.05 });
                document.body.style.cursor = 'pointer';
                stage.draw();

            });
            lameImg.on('mouseout', function () {
                this.image(images.lameNoText);
                this.scale({ x: 1, y: 1 });
                document.body.style.cursor = 'default';
                stage.draw();
            });

            lameImg.on('click', function () {
                makePlayfield(0);
            });

            lameImg.position({ x: 156, y: 225 });
            layer.add(lameImg);

            // decent
            var width = images.decentFull.width;
            var height = images.decentFull.height;
            var decentImg = new Kinetic.Image({
                image: images.decentNoText,
                offset: { x: width / 2, y: height / 2 },
                width: width,
                height: height
            });

            decentImg.on('mouseover', function () {
                this.image(images.decentFull);
                this.scale({ x: 1.05, y: 1.05 });
                document.body.style.cursor = 'pointer';
                stage.draw();

            });
            decentImg.on('mouseout', function () {
                this.image(images.decentNoText);
                this.scale({ x: 1, y: 1 });
                document.body.style.cursor = 'default';
                stage.draw();
            });

            decentImg.on('click', function () {
                makePlayfield(1);
            });

            decentImg.position({ x: 447, y: 225 });
            layer.add(decentImg);

            stage.add(layer);

            // pro
            var width = images.proFull.width;
            var height = images.proFull.height;
            var proImg = new Kinetic.Image({
                image: images.proNoText,
                offset: { x: width / 2, y: height / 2 },
                width: width,
                height: height
            });

            proImg.on('mouseover', function () {
                this.image(images.proFull);
                this.scale({ x: 1.05, y: 1.05 });
                document.body.style.cursor = 'pointer';
                stage.draw();

            });
            proImg.on('mouseout', function () {
                this.image(images.proNoText);
                this.scale({ x: 1, y: 1 });
                document.body.style.cursor = 'default';
                stage.draw();
            });

            proImg.on('click', function () {
                makePlayfield(2);
            });

            proImg.position({ x: 738, y: 225 });
            layer.add(proImg);

            // chooseDiff
            var width = images.chooseDiff.width;
            var height = images.chooseDiff.height;
            var chooseDiffImg = new Kinetic.Image({
                image: images.chooseDiff,
                width: width,
                height: height
            });

            chooseDiffImg.position({ x: 110, y: 490 });
            layer.add(chooseDiffImg);

            stage.add(layer);
        }

        loadImages(sources, drawImages);
    }
}