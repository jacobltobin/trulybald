<?php

require_once('inc/head.php');

$json = file_get_contents('releases/releases.json');
$releases = json_decode($json);

?>

<div id="content">
	<div class="container-fluid">
		<div class="col-md-6">
			<h4><strong>recent important updates abou our company</strong></h4>
			<hr>
			<ul>
				<li>shipping out tapes july 28 2016</li>
				<li>how far do you lean your motorcycle?</li>
				<li>elaborate bread</li>
				<li>insect cleaner - why kill'em when you can clean'em? (thanks addison)</li>
				<li>i was on the board (ceo or surf?)</li>
				<li>lock-n'-load shish kabob gloves</li>
				<li>musician sounds too much like magician and music is a craft in so where life is the whole casserole </li>
			</ul>
			<hr>
		</div>
	</div>
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

			<p style="color: blue">truly bald is <strong>LOOSELY</strong> organized by __REDACTED__ with the continued moral support of __REDACTED__, __REDACTED__, __REDACTED__ Jr., and __REDACTED__</p>
			<p style="color: salmon">*full disclosure* :) presses are funded by __REDACTED__, all copies not needed to recover costs are __REDACTED__ to __REDACTED__ or __REDACTED__. so this way, should __REDACTED__'s "profit margin" be more than usual, it results in more copies for __REDACTED__ to sell, as opposed to thinly lining __REDACTED__'s shallow pockets.</p>
			<p style="color: green">digital downloads are and will always be <em>free</em> here on this <strong style="color: red">website</strong> unless requested otherwise by __REDACTED__</p>

			<hr>
			<p>Find various selections from our catalogue at :::</p>

			<ul style="background-color: orange">
				<li>go look</li>
			</ul>

			<hr>
			<p>Currently operating at:</p>

			<s>2110 NE 21st Terrace
			Gainesville FL 32609</s><br><br>
			<s>1604 NE 6th Terrace
			Gainesville FL 32609</s><br><br>
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

<? 

require_once('inc/foot.php');

?>