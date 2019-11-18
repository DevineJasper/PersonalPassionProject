require('./style.css');

{
  const $projects = document.querySelectorAll('.project-cont');
  let $currentproject = null;
  let $currentbg = null;
  let $currentpopup = null;
  let $currentclose = null;

  const $headerImg = document.querySelector('.header-img');
  const headerImages = [];

  const loadImages = () => {
    for (let i = 0;i < 16;i ++) {
      const url = `assets/img/header/pixel-art-me_${i}.png`;
      headerImages[i] = url;
    }
  };

  const handleImageClick = e => {
    const currentSrc = String($headerImg.src);
    console.log(currentSrc);
    const splitOne = currentSrc.split('/');
    const lastOne = splitOne.pop();
    const splitTwo = lastOne.split('_');
    const lastTwo = splitTwo.pop();
    const splitThree = lastTwo.split('.');
    const indexSrc = parseInt(splitThree[0]);
    const range = [];

    for (let i = 0;i < headerImages.length;i ++) {
      if (i !== indexSrc) {
        range.push(i);
      }
    }

    console.log(indexSrc);
    console.log(range);

    $headerImg.src = `assets/img/header/pixel-art-me_${
      range[randomRange(0, range.length - 1)]
    }.png`;
  };

  const randomRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const handleProjectClick = e => {
    if ($currentproject === null) {
      $currentproject = e.currentTarget;
      $currentbg = $currentproject.querySelector('.project-bg');
      $currentpopup = $currentbg.querySelector('.project-pop-up');
      $currentclose = $currentpopup.querySelector('.close');
      $currentbg.style.display = 'flex';
      console.log('open');
    } else {
      console.log('er is eentje open');
      if (
        !$currentpopup.contains(e.target) ||
        $currentclose.contains(e.target)
      ) {
        $currentbg.style.display = 'none';
        $currentproject = null;
        $currentbg = null;
        $currentpopup = null;
        $currentclose = null;
      }
    }
  };

  const init = () => {
    loadImages();
    $projects.forEach($project => {
      $project.addEventListener('click', handleProjectClick);
    });
    $headerImg.addEventListener('click', handleImageClick);
  };
  init();
}
