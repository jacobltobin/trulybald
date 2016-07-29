<?php

$json = file_get_contents('releases/releases.json');
$releases = json_decode($json);
$cat = htmlspecialchars($_GET["cat"]);

$release = $releases[0]->$cat;

$artist = str_replace(" ", "-", $release->artist);
$title = str_replace(" ", "-", $release->title);
$dir = $release->cat.'_'.$artist.'_'.$title;
$music_directory    = 'releases/'.$dir.'/music';
$track = htmlspecialchars($_GET["track"]);

$meta = new stdClass();
$meta->type = 'music.song';
$meta->url = 'http://trulybald.com'.$_SERVER['REQUEST_URI'];
$meta->description = 'a ... .. .. music .... album . by '.$release->artist;
$meta->image = 'http://trulybald.com/releases/'.$dir.'/img/cover.jpg';
$meta->title = $track.' from '.$release->artist.'\'s '.$release->title;
$meta->audio = 'http://trulybald.com/releases/'.$dir.'/music/'.$track;

require_once('inc/head.php');

echo '<div id="release-page" class="container">
	<br>
	<div class="row">
		<div class="col-md-12">
			<div class="release-info">
				<h3>
					'.$track.' <br/>from '.$release->artist.'\'s <em>'.$release->title.'</em>
				</h3>';

				echo '<br>
				<audio controls preload="none">
					<source src="releases/'.$dir.'/music/'.$track.'" type="audio/mp3">
						Your browser does not support the audio element.
					</source>
				</audio>
			</div>
			<div class="release-image">
				<img class="img img-responsive" src="releases/'.$dir.'/img/cover.jpg" alt="">
				<div class="buy-dl">
					<a class="download-link" style="background-color: '.$release->color.'" href="releases/'.$dir.'/music/download.zip">download (.wav)</a>
				</div>
			</div>';

		echo '
		</div>
	</div>
</div>';

require_once('inc/foot.php');

?>