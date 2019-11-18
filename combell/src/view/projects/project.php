<div class="navigator-single">
  <a class="single-navigate" href="index.php#projects">
    &#9664; Back to overview</a>
</div>

<div class="content-wrapper">
  <div class="center">
    <h2 class="text-center major-title"><?php echo $project["title"] ?></h2>
    <img class="detail-img" src="assets/img/<?php echo $project["img"] ?>.jpg" alt="">
    <p><?php echo $project["description"] ?></p>
    <br>
    <br>

    <?php foreach ($tags as $tag) { ?>
      <?php echo $tag["tag"] ?>
    <?php } ?>

  </div>

</div>
