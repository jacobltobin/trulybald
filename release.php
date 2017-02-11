<?php

$json = file_get_contents('releases/releases.json');
$releases = json_decode($json);
$cat = htmlspecialchars($_GET["cat"]);

$release = $releases[0]->$cat;

$artist = str_replace(" ", "-", $release->artist);
$title = str_replace(" ", "-", $release->title);
$dir = $release->cat.'_'.$artist.'_'.$title;

$music_directory    = 'releases/'.$dir.'/music';
$tracks = scandir($music_directory);

// to pass to head.php -->
$meta = new stdClass();
$meta->type = 'music.album';
$meta->url = 'http://trulybald.com'.$_SERVER['REQUEST_URI'];
$meta->description = 'a ... .. .. music .... album . by '.$release->artist;
$meta->image = 'http://trulybald.com/releases/'.$dir.'/img/cover.jpg';
$meta->title = $release->artist.' - '.$release->title;


require_once('inc/head.php');

echo '<div id="release-page" class="container">
	<br>
	<div class="row">
		<div class="col-md-12">
		<h3>
			'.$release->artist.' <em>'.$release->title.'</em>
		</h3>
		</div>
		<div class="col-md-6">
			<div class="release-image">
				<img style="border: 1px solid '.$release->color.'" class="img img-responsive" src="releases/'.$dir.'/img/cover.jpg" alt="">
				<div class="buy-dl">
					<a class="download-link" style="background-color: '.$release->color.'" href="releases/'.$dir.'/music/download.zip">download (.wav)</a>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="release-info">
				<h5>
					'.$release->format.'
				</h5>
				<p>
					'.$release->description.'
				</p>
				<p>
					'.$release->credits.'
				</p>
				<p>
					'.$release->price.'
				</p>
					'.$release->paypal;
				if ($release->soldout) {
					echo '<p><b>Soul\'d\'out !</b></p>';
				}
			echo '</div>
		</div>
		<div class="col-md-12">
			<!--<h5><span id="play-all"><u style="cursor: pointer; background-color: yellow">TRULY BALD "SIMULPLAY"&reg; (WARNING EXPERIMENTAL FEATURE)</u></span></h5>-->';

			echo '<div class="audio-player">';
				echo '<hr/>';
				require 'libraries/TBaldPlayer/TBaldPlayer_player.html';
				echo '<div class="track-list">';
					foreach ($tracks as &$track) {
						if ($track != '.' && $track != '..' && $track != '.DS_Store' && $track != 'download.zip') {
							echo '<div class="track" data-file="releases/'.$dir.'/music/'.$track.'">';
								echo '<strong>'.$track.'<a href="track.php?cat='.$cat.'&track='.$track.'">---></a></strong><br>';
							echo '</div>';
						}
					}
				echo '</div>';
			echo '</div>';
			echo '<span style="background-color:red">please be patient with the audio player, thanks</span><br>';

		echo '</div>
		</div>
	</div>
</div>';

require_once('inc/foot.php');

?>

