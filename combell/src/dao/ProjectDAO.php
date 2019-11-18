<?php

require_once(__DIR__ . '/DAO.php');

class ProjectDAO extends DAO
{

  public function selectAll()
  {
    $sql = "SELECT `vermeesch_projects`.*, `vermeesch_tags`.`tag`
    FROM `vermeesch_tags`
    INNER JOIN `vermeesch_projects_tags`
    INNER JOIN `vermeesch_projects`
    ON `vermeesch_tags`.`tag_id` = `vermeesch_projects_tags`.`tag_id`
    AND `vermeesch_projects`.`project_id` = `vermeesch_projects_tags`.`project_id`
    ORDER BY `vermeesch_projects`.`date` DESC";
    $stmt = $this->pdo->prepare($sql);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public function selectById($id)
  {
    $sql = "SELECT `vermeesch_projects`.*, `vermeesch_tags`.`tag`
    FROM `vermeesch_tags`
    INNER JOIN `vermeesch_projects_tags`
    INNER JOIN `vermeesch_projects`
    ON `vermeesch_tags`.`tag_id` = `vermeesch_projects_tags`.`tag_id`
    AND `vermeesch_projects`.`project_id` = `vermeesch_projects_tags`.`project_id`
    WHERE `vermeesch_projects`.`project_id` = :id ";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
  }

  public function selectTags($id)
  {
    $sql = "SELECT `tag`
    FROM `vermeesch_tags`
    INNER JOIN `vermeesch_projects_tags`
    ON `vermeesch_tags`.`tag_id` = `vermeesch_projects_tags`.`tag_id`
    WHERE `vermeesch_projects_tags`.`project_id` = :id";
    $stmt = $this->pdo->prepare($sql);
    $stmt->bindValue(':id', $id);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }



  // public function filter($search = '', $tag = '')
  // {
  //   $sql = "SELECT `projects`.*, `tags`.`tag`
  //   FROM `tags`
  //   INNER JOIN `projects_tags`
  //   INNER JOIN `projects`
  //   ON `tags`.`tag_id` = `projects_tags`.`tag_id`
  //   AND `projects`.`project_id` = `projects_tags`.`project_id`
  //   WHERE 1";

  //   if (!empty($search)) {
  //     $sql .= " AND `projects`.`title` LIKE :search";
  //   }
  //   if (!empty($tag)) {
  //     $sql .= " AND `tags`.`tag` LIKE :tag";
  //   }

  //   $sql .= " ORDER BY `projects`.`date` DESC";

  //   $stmt = $this->pdo->prepare($sql);
  //   if (!empty($search)) {
  //     $stmt->bindValue(':search', '%' . $search . '%');
  //   }
  //   if (!empty($tag)) {
  //     $stmt->bindValue(':tag', $tag);
  //   }
  //   $stmt->execute();
  //   return $stmt->fetchAll(PDO::FETCH_ASSOC);
  // }
}
