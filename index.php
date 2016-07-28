<?php

require_once('inc/head.php');

$json = file_get_contents('releases/releases.json');
$releases = json_decode($json);

?>

<div id="content">
	<div id="release-grid" class="container-fluid">
		<br>
		<div class="row">
			<div class="col-md-6">

<?php

	foreach ($releases[0] as &$release) {

		$artist = str_replace(" ", "-", $release->artist);
		$title = str_replace(" ", "-", $release->title);
		$dir = $release->cat.'_'.$artist.'_'.$title;

		echo '<div class="item col-md-6 col-sm-6 col-xs-6">
			<a href="release.php?cat='.$release->cat.'">
				<strong style="font-size:20px">'.$release->cat.'</strong>
				<img style="border: 2px solid '.$release->color.'" class="img img-responsive" src="releases/'.$dir.'/img/cover-th.jpg" alt="">
			</a>
			<div class="release-info">
				<p>
					'.$release->artist.'<br>
					<em>'.$release->title.'</em><br>
				</p>
			</div>
		</div>';

	}
?>
		</div>
		<div class="col-md-2">
			<br/>

			<p>information</p>

			<p>trulybald@gmail.com</p>

			<p>^^^ questions about ordering, or anything</p>

			<hr>
			<p style="background-color: lime">"If these 'things' have any power, besides their crazy price, it is a power to confusedly communicate something about this other world where life and intelligence shape objects, whereas in capitalism it is usually the other way around."<br/>
			- CLaire Fontaine</p>

			<hr>

			<p style="color: blue">truly bald is <strong>LOOSELY</strong> organized by jake tobin with the continued moral support of ben varian</p>
			<p style="color: salmon">*full disclosure* :) presses are funded "out of pocket", all copies not needed to recover costs are given away to the artist or friends. so this way, should our "profit margin" be more than usual, it results in more copies for the artist to sell themselves, as opposed to thinly lining my shallow pockets.</p>
			<p style="color: green">digital downloads are and will always be <em>free</em> here on this <strong style="color: red">website</strong> unless requested otherwise by the artist</p>

			<hr>
			<p>Find various selections from our catalogue at :::</p>

			<ul style="background-color: orange">
				<li>retrofit records tallahassee</li>
				<li>fresh produce, macon ga</li>
				<li>deep thoughts, jp boston mass</li>
				<li>my house in gvl FL, drop by really! email first</li>
				<li>... stores contact me for super wholesale discounts ...</li>
			</ul>
			<p>also hey If you write and like review copies those are here! just yodel</p>

			<hr>
			<p>Currently operating at:</p>

			<s>1604 NE 6th Terrace
			Gainesville FL 32609</s>
			<p>1908 NW 2nd St<br/>
			Gainesville FL 32609</p>

			<p>(this address VERY subject to change please check back before mailing)</p>

			<hr>

			<p>we have an email newsletter I'll add you if you email that address up there</p>

			<br/><br/>
		</div>
		</div>
	</div>
</div>

</body>
</html>