<?php

require_once('inc/head.php');

$json = file_get_contents('releases/releases.json');
$releases = json_decode($json);

?>

<div id="content">
	<div class="container-fluid">
		<div class="col-md-6">
			<h4><strong>recent important updates about our company</strong></h4>
			<a href="/images/buddy.png">click here to see an image of our realtor, Buddy</a><br><br>
			<hr>
			UPCOMING RELEASES FROM <br>
			TB010 - More Eaze / Ben Varian *Split* <br>
			TB011 - Pamela_ and her sons *Golden Paradise* <br>
			TB*** - DISGUISEWORKS *DISGUISEWORKS* <br>
			TB*** - Itch Princess *Everyone's a Doctor* <br>
			TB*** - Bulldada *Bulldada's Tavern* <br>
			TB*** - Celines ********* <br>
			TB*** - Big Ded --- 7" <br>
			TB*** - Miracle Roy *Calming Signals* <br>
			<hr>
			<ul>
				<li><h1 style="background-color: salmon">"Tell you what i learned about talking to an empty room - the room is never as empty as you wanna assume." - Ben Varian</h1></li>
				<s>
				<li>how far do you lean your motorcycle?</li>
				<li>elaborate bread</li>
				</s>
				<li><img src="images/tgreen.png"></li>
				<li>- Tyborg (Tyler Green)</li>
				<s>
				<li>insect cleaner - why kill'em when you can clean'em? (thanks addison)</li>
				<li>i was on the board (ceo or surf?)</li>
				<li>lock-n'-load shish kabob gloves</li>
				</s>
				<!-- <li><img src="images/nonsense.png"></li> -->
				<!-- <li>i find my favorite form of escape is cooking myself some vegetables</li> -->
				<li></li>
				<!-- <li>musician sounds too much like magician and music is a craft in so where life is the whole casserole </li> -->
				<li></li>
				<!-- <li>and so we demonstrate that we do not have the answer but are perpetually toiling in the muck of active uncertainty!</li> -->
				<li></li>
			</ul>
			<hr>
		</div>
	</div>
	<div id="release-grid" class="container-fluid">
		<br>
		<div class="row">
			<div class="col-md-6">

				<div class="item col-md-6 col-sm-6 col-xs-6">
					<a href="#">
						<strong style="font-size:20px">TB011 Coming SOON</strong>
						<img style="border: 2px solid;" class="img img-responsive" src="images/pam-un.png" alt="">
					</a>
					<div class="release-info">
						<p>
							Pamela_ and her sons<br>
							<em>Golden Paradise</em><br>
						</p>
					</div>
				</div>

<?php

	foreach ($releases[0] as &$release) {

		$artist = str_replace(" ", "-", $release->artist);
		$title = str_replace(" ", "-", $release->title);
		$dir = $release->cat.'_'.$artist.'_'.$title;

		echo '<div class="item col-md-6 col-sm-6 col-xs-6">
			<a href="releases/'.$release->cat.'">
				<strong style="font-size:20px">'.$release->cat.'</strong>';
				if ($release->gif) {
					echo '<img style="border: 2px solid '.$release->color.'" class="img img-responsive" src="releases/'.$dir.'/img/cover-th.gif" alt="">';
				}
				else {
					echo '<img style="border: 2px solid '.$release->color.'" class="img img-responsive" src="releases/'.$dir.'/img/cover-th.jpg" alt="">';
				}
			echo '</a>
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
				<li>some record stores</li>
			</ul>

			<hr>
			<p>Currently operating at:</p>

			<s>2110 NE 21st Terrace
			Gainesville FL 32609</s><br><br>
			<s>1604 NE 6th Terrace
			Gainesville FL 32609</s><br><br>
			<s>1908 NW 2nd St<br/>
			Gainesville FL 32609</s><br><br>
			<p style="background-color: yellow">135 Adair Avenue Southeast<br>Atlanta, GA 30315</p>

			<p>(this address VERY subject to change please check back before mailing)</p>

			<hr>

			<!-- <p>to clear up - all we got any more is making things for each other. tbald isn't smoke and mirroring w/ DIY ethics to obfuscate a long term running-a-label-as-a-career intent (lol!) - just experimenting with being SOMETHING. something to save up our money for besides a NEW HYDRAULIC STAND-UP DESK and UV FLOOR LAMPS. lets be honest you cant have physical copies of music without $$$$$$, and so i have a generally uncreative job programming computers from which i funnel money into PLASTIC music carrying 'novelties' (choice word by sherrill kyle) that hopefully provide invaluable help in discovering new many layered interwoven meanings hiding all over the place. peace!</p><hr> -->

			<hr>

			<b style="color: red"></b>

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