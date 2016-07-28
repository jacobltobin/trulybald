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
			<div class="release-image">
				<img style="border: 1px solid '.$release->color.'" class="img img-responsive" src="releases/'.$dir.'/img/cover.jpg" alt="">
				<div class="buy-dl">
					<a class="download-link" style="background-color: '.$release->color.'" href="releases/'.$dir.'/music/download.zip">download (.wav)</a>
				</div>
			</div>
			<div class="release-info">
				<h3>
					'.$release->artist.' <em>'.$release->title.'</em>
				</h3>
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
					'.$release->paypal.'
				<h5>
					~~stream~~
				</h5>
				<h5><span id="play-all"><u style="cursor: pointer; background-color: yellow">TRULY BALD "SIMULPLAY"&reg; (WARNING EXPERIMENTAL FEATURE)</u></span></h5>';

				foreach ($tracks as &$track) {

					if ($track != '.' && $track != '..' && $track != '.DS_Store' && $track != 'download.zip') {
						echo '<strong><a href="track.php?cat='.$cat.'&track='.$track.'">'.$track.'</strong><br>
						<audio controls preload="none">
							<source src="releases/'.$dir.'/music/'.$track.'" type="audio/mp3">
								Your browser does not support the audio element.
							</source>
						</audio>';
					}

				}

		echo '</div>
		</div>
	</div>
</div>
<script>$("#play-all").click(function() {for (var i = 0; i < document.getElementsByTagName("audio").length; i++) { document.getElementsByTagName("audio")[i].play()}});</script>';

?>

</body>
</html>