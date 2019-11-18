<div class="hidden top">

</div>

<header class="section-header">
  <div class="header-grid">
    <h1 class="header-name">Jasper Vermeesch</h1>
    <div class="header-img-cont">
      <img class="header-img" src="./assets/img/header/pixel-art-me_0.png" alt="header-image" width="200" height="200">
    </div>
    <nav class="nav">
      <ul class="nav-cont">
        <li><a class="nav-link" href="#projects">lvl1 Projects</a></li>
        <li><a class="nav-link" href="#contact">lvl2 Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>

  <section id="projects" class="section-projects">
    <ul class="navigator-grid">
      <li class="up"><a class="arrow" href="#top">&#9650;</a></li>
      <div class="title-cont">
        <h2>Projects</h2>
      </div>
      <li class="down"><a class="arrow" href="#contact">&#9660;</a></li>
    </ul>
    <div class="content-wrapper">
      <div class="filter-bg">
        <form action="index.php#projects" class="filter-cont">
          <input type="hidden" name="action" value="filter" />
          <input type="hidden" name="tag[]" value="" />
          <input class="search-bar" type="text" name="search" placeholder="project titel" value="<?php echo htmlentities($search); ?>" />
          <div class="filter-buttons">
            <label for="filter-design" class="checkcontainer design design-button">
              Design
              <input id="filter-design" class="defaultcheck" type="checkbox" name="tag[]" value="design" <?php if (in_array('design', $tags)) { ?> <?php echo 'checked' ?> <?php } ?> />
              <span class="checkmark"></span>
            </label>
            <label for="filter-development" class="checkcontainer development development-button">
              Development
              <input id="filter-development" class="defaultcheck" type="checkbox" name="tag[]" value="development" <?php if (in_array('development', $tags)) { ?> <?php echo 'checked' ?> <?php } ?> />
              <span class="checkmark"></span>
            </label>
            <label for="filter-research" class="checkcontainer research research-button">
              Research
              <input id="filter-research" class="defaultcheck" type="checkbox" name="tag[]" value="marketing" <?php if (in_array('marketing', $tags)) { ?> <?php echo 'checked' ?> <?php } ?> />
              <span class="checkmark"></span>
            </label>
            <div class="filter-button-cont">
              <input type="submit" value="filter" class="click-link filter-button">
            </div>
          </div>
        </form>
        <?php if (strlen($search) > 0 || !empty($tags)) { ?>
          <form action="index.php#projects" class="filter-remove">
            <input type="submit" value="X remove filters" class="click-link remove">
          </form>
        <?php } ?>
      </div>
      <div class="projects-overview-grid">
        <?php foreach ($projects as $project) : ?>
          <?php $project ?>
          <div class="center">
            <div class="project-cont">
              <div class="project-grid">
                <h3 class="project-title">
                  <?php if ($project["favorite"] == TRUE) { ?>
                    <span class="favourite">⭐</span>
                  <?php } ?>
                  <?php echo $project["title"]  ?></h4>
                  <div class="project-img-cont">
                    <img class="project-img" src="./assets/img/<?php echo $project["img"] ?>.jpg" alt="">
                  </div>
                  <div class="project-tags">
                    <?php if (in_array("design", $project["tags"])) { ?>
                      <p class="project-tag design">Des</p>
                    <?php } ?>
                    <?php if (in_array("development", $project["tags"])) { ?>
                      <p class="project-tag development">Dev</p>
                    <?php } ?>
                    <?php if (in_array("marketing", $project["tags"])) { ?>
                      <p class="project-tag research">Res</p>
                    <?php } ?>
                  </div>
              </div>
              <div class="project-bg" id="<?php echo $project["project_id"] ?>">
                <div class="project-pop-up">
                  <div class="project-img-cont">
                    <img class="project-img" src="./assets/img/<?php echo $project["img"] ?>.jpg" alt="">
                  </div>
                  <div class="project-info-cont">
                    <p class="project-title"><?php echo $project["title"]  ?></h4>
                      <p class="project-desc"><?php echo $project["description"] ?></p>

                      <div class="project-go">
                        <a class="click-link" target="blank" href="<?php echo $project["link"]  ?>">visit</a>
                      </div>
                  </div>
                  <span class="close">&#10005;</span>
                </div>
              </div>
            </div>
          </div>
        <?php endforeach ?>
      </div>
    </div>
  </section>

  <section id="contact" class="section-contact">
    <ul class="navigator-grid">
      <li class="up white"><a class="arrow" href="#projects">&#9650;</a></li>
      <div class="title-cont">
        <h2 class="white">Contact</h2>
      </div>
    </ul>
    <div class="content-wrapper">
      <h3 class="white">I am looking for an internship</h3>
      <div class="iam">
        <p class="white motivated">I AM:</p>
        <ul class="white list">
          <li class="list-item">A motivated student <a class="white" href="https://www.howest.be/en/programmes/bachelor/devine">Devine</a></li>
          <li class="list-item">A post-graduate of <a class="white" href="https://www.arteveldehogeschool.be/opleidingen/bachelor/communicatiemanagement">Artevelde</a> with a professional degree in communications</li>
          <li class="list-item">A dreamer with many creative ideas</li>
          <li class="list-item">Optimising my programming skills</li>
          <li class="list-item">Willing to become a better web designer</li>
          <li class="list-item">Dreaming of becoming a UX-master</li>
          <li class="list-item">Not scared to speak for a crowd</li>
          <li class="list-item">Passionate about movies, music and games</li>
        </ul>
        <div class="mail">
          <a target="_blank" href="mailto:jasper.vermeesch@student.howest.be?Subject=Internship" class="click-link-darker">send me an e-mail</a>
        </div>
      </div>
    </div>



  </section>

</main>
