<main>
  <section id="overview" class="section-overview">
    <div class="navigator-single">
      <h2>Overview</h2>
      <a class="single-navigate" href="index.php#projects">
        &#9664; Back to home</a>
    </div>
    <div class="content-wrapper">
      <div class="filter-bg">
        <form action="index.php">
          <input type="hidden" name="page" value="overview" />
          <input type="hidden" name="action" value="filter" />
          <input type="hidden" name="tag[]" value="" />
          <input class="search-bar" type="search" name="search" placeholder="project titel" value="<?php echo htmlentities($search); ?>" />
          <label for="filter-design">
            <input id="filter-design" type="checkbox" name="tag[]" value="design" <?php if (in_array('design', $tags)) { ?> <?php echo 'checked' ?> <?php } ?> />
            design
          </label>
          <label for="filter-development">
            <input id="filter-development" type="checkbox" name="tag[]" value="development" <?php if (in_array('development', $tags)) { ?> <?php echo 'checked' ?> <?php } ?> />
            development
          </label>
          <label for="filter-research">
            <input id="filter-research" type="checkbox" name="tag[]" value="marketing" <?php if (in_array('marketing', $tags)) { ?> <?php echo 'checked' ?> <?php } ?> />
            research
          </label>
          <input type="submit" value="filter">
        </form>
        <?php if (strlen($search) > 0 || !empty($tags)) { ?>
          <form action="index.php">
            <input type="hidden" name="page" value="overview" />
            <input type="submit" value="remove filters">
          </form>
        <?php } ?>
      </div>
      <?php foreach ($projects as $project) : ?>
        <div class="center">
          <a class="project-cont" href="index.php?page=project&id=<?php echo $project["project_id"] ?>">
            <div class="project-grid">
              <h4 class="project-title"><?php echo $project["title"]  ?></h4>
              <div class="project-img-cont">
                <img class="project-img" src="./assets/img/<?php echo $project["img"] ?>.jpg" alt="">
              </div>
              <p class="project-desc"><?php echo $project["description"] ?></p>
              <div class="project-tags">
                <?php if (in_array("design", $project["tags"])) { ?>
                  <p class="project-tag design">Design</p>
                <?php } ?>
                <?php if (in_array("development", $project["tags"])) { ?>
                  <p class="project-tag development">Development</p>
                <?php } ?>
                <?php if (in_array("marketing", $project["tags"])) { ?>
                  <p class="project-tag research">Research</p>
                <?php } ?>
              </div>
            </div>
          </a>
        </div>
      <?php endforeach ?>
    </div>

  </section>
</main>
