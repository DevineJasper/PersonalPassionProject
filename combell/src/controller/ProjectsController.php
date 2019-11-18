<?php

require_once __DIR__ . '/Controller.php';
require_once __DIR__ . '/../dao/ProjectDAO.php';

class ProjectsController extends Controller
{

  private $projectDAO;

  function __construct()
  {
    $this->projectDAO = new ProjectDAO();
  }

  public function index()
  {

    $search = '';
    $tags = array();
    $tag = '';
    $projects = array();

    //merging same projects
    $allprojects = array();
    $sameproject = array();
    $projecttags = array();
    $mergedproject = array();
    $orderedprojects = array();

    $allprojects = $this->projectDAO->selectAll();
    $lengthAll = count($allprojects);

    for ($i = $lengthAll; $i > 0; $i--) {
      foreach ($allprojects as $singleproject) {
        if ($singleproject["project_id"] == $i) {
          array_push($sameproject, $singleproject);
          array_push($projecttags, $singleproject["tag"]);
        }
      }
      if (sizeof($sameproject) > 0) {
        $mergedproject = array(
          'project_id' => $sameproject[0]["project_id"],
          'title' => $sameproject[0]["title"],
          'img' => $sameproject[0]["img"],
          'link' => $sameproject[0]["link"],
          'description' => $sameproject[0]["description"],
          'date' => $sameproject[0]["date"],
          'tags' => $projecttags,
          'favorite' => $sameproject[0]["favorite"]
        );
        array_push($orderedprojects, $mergedproject);
        unset($mergedproject);
        $mergedproject = array();
        unset($sameproject);
        $sameproject = array();
        unset($projecttags);
        $projecttags = array();
      }
    }

    //filtered projects array
    $filteredprojects = array();

    if (!empty($_GET['action']) && $_GET['action'] == 'filter') {
      unset($tags);
      $tags = array();
      unset($filteredprojects);
      $filteredprojects = array();
      unset($finalfilteredprojects);
      $finalfilteredprojects = array();
      $search = strtolower(trim($_GET['search']));
      foreach ($_GET['tag'] as $tag) {
        if (strlen($tag) > 0) {
          array_push($tags, $tag);
        }
      }

      $finalfilteredprojects = array();

      if (strlen($search) > 0) {
        foreach ($orderedprojects as $filterproject) {
          $lowertitle = strtolower($filterproject["title"]);
          if (strpos($lowertitle, $search) !== false) {
            array_push($filteredprojects, $filterproject);
          }
        }
      } else {
        $filteredprojects = $orderedprojects;
      }

      foreach ($filteredprojects as $finalfilter) {
        if (!array_diff($tags, $finalfilter["tags"])) {
          array_push($finalfilteredprojects, $finalfilter);
        }
      }

      $projects = $finalfilteredprojects;
    } else {
      $projects = $orderedprojects;
    }



    $this->set('projects', $projects);
    $this->set('tags', $tags);
    $this->set('search', $search);





    $this->set('title', 'Jasper Vermeesch');
  }

  public function overview()
  {

    // $search = '';
    // $tags = array();
    // $tag = '';
    // $projects = array();

    // //merging same projects
    // $allprojects = array();
    // $sameproject = array();
    // $projecttags = array();
    // $mergedproject = array();
    // $orderedprojects = array();

    // $allprojects = $this->projectDAO->selectAll();
    // $lengthAll = count($allprojects);

    // for ($i = $lengthAll; $i > 0; $i--) {
    //   foreach ($allprojects as $singleproject) {
    //     if ($singleproject["project_id"] == $i) {
    //       array_push($sameproject, $singleproject);
    //       array_push($projecttags, $singleproject["tag"]);
    //     }
    //   }
    //   if (sizeof($sameproject) > 0) {
    //     $mergedproject = array(
    //       'project_id' => $sameproject[0]["project_id"],
    //       'title' => $sameproject[0]["title"],
    //       'img' => $sameproject[0]["img"],
    //       'link' => $sameproject[0]["link"],
    //       'description' => $sameproject[0]["description"],
    //       'date' => $sameproject[0]["date"],
    //       'tags' => $projecttags
    //     );
    //     array_push($orderedprojects, $mergedproject);
    //     unset($mergedproject);
    //     $mergedproject = array();
    //     unset($sameproject);
    //     $sameproject = array();
    //     unset($projecttags);
    //     $projecttags = array();
    //   }
    // }

    // $lengthOrdered = count($orderedprojects);

    // //filtered projects array
    // $filteredprojects = array();

    // if (!empty($_GET['action']) && $_GET['action'] == 'filter') {
    //   unset($tags);
    //   $tags = array();
    //   unset($filteredprojects);
    //   $filteredprojects = array();
    //   unset($finalfilteredprojects);
    //   $finalfilteredprojects = array();
    //   $search = strtolower(trim($_GET['search']));
    //   foreach ($_GET['tag'] as $tag) {
    //     if (strlen($tag) > 0) {
    //       array_push($tags, $tag);
    //     }
    //   }

    //   $finalfilteredprojects = array();

    //   if (strlen($search) > 0) {
    //     foreach ($orderedprojects as $filterproject) {
    //       $lowertitle = strtolower($filterproject["title"]);
    //       if (strpos($lowertitle, $search) !== false) {
    //         array_push($filteredprojects, $filterproject);
    //       }
    //     }
    //   } else {
    //     $filteredprojects = $orderedprojects;
    //   }

    //   foreach ($filteredprojects as $finalfilter) {
    //     if (!array_diff($tags, $finalfilter["tags"])) {
    //       array_push($finalfilteredprojects, $finalfilter);
    //     }
    //   }
    //   // $finalfilteredprojects = array_intersect($filteredprojects["tags"], $tags);

    //   $projects = $finalfilteredprojects;
    // } else {
    //   $projects = $orderedprojects;
    // }



    // $this->set('title', 'Projects overview');
    // $this->set('projects', $projects);
    // $this->set('tags', $tags);
    // $this->set('search', $search);
  }

  public function project()
  {
    $id = $_GET['id'];
    $project = $this->projectDAO->selectById($id);
    $tags = $this->projectDAO->selectTags($id);

    $this->set('title', $project["title"]);
    $this->set('tags', $tags);
    $this->set('project', $project);
  }
}
