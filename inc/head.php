<!DOCTYPE html>

<!--
   __             __         __          __    __
  / /________  __/ /_  __   / /_  ____ _/ /___/ /
 / __/ ___/ / / / / / / /  / __ \/ __ `/ / __  / 
/ /_/ /  / /_/ / / /_/ /  / /_/ / /_/ / / /_/ /  
\__/_/   \__,_/_/\__, /  /_.___/\__,_/_/\__,_/   
                /____/                           

-->

<!-- COMMENT ADDED -->
<!--[if IE 8]>			<html class="ie ie8"> <![endif]-->
<!--[if IE 9]>			<html class="ie ie9"> <![endif]-->
<!--[if gt IE 9]><!-->	<html> <!--<![endif]-->

	<head>
		<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="css/bald.css">
		<script src="vendor/jquery-1.12.3.min.js"></script>
		<script src="vendor/underscore.js"></script>
		<script src="js/bald.js"></script>

		<title><?php echo $meta->title ?></title>

		<!-- OG meta -->
		<?php echo 
			'<meta property="og:type" content="'.$meta->type.'"/>'.
			'<meta property="og:url" content="'.$meta->url.'"/>'.
			'<meta property="og:title" content="'.$meta->title.'"/>'.
			'<meta property="og:description" content="'.$meta->description.'"/>'.
			'<meta property="og:image" content="'.$meta->image.'"/>';
		?>
		

	</head>

	<body>
		<div id="head">
			<div class="container">
				<div class="row">
					<div class="col-md-8">
						<a href="/"><img id="top-logo" class="img img-responsive" src="images/logo-sm.gif" alt=""></a>
					</div>
					<div class="col-md-4">
						<div class="sub-head">
							<p>private press (<b style="color: red">$$not for profit$$ hahahaha ahahahaha!!!</b>)<br/>
								~~ not really too serious ~~ this is just fun ~~ are you a critic too? ~~ leave us alone </p>
								<hr>
								<p>passively featuring and casually representing works by miracle roy, larry wish, ben varian, jake tobin, tankorean, nate henricks, zach phillips, and many more</p>
								<p>as of july <strong>28 2016 2:35pm</strong> there are some bit more nascent releases on some balding horizon brewing in the cognitive plains of:</p>
								<p>DISGUISEWORKS!, marcus maurice / ben varian, itch princess (katelyn farstad), sad eyes, pamela_ and her sons, andy loebs</p>
							<div id="navigation">
								<a target="new" href="http://igm.univ-mlv.fr/~pivoteau/STRUCT/PROG/liste-mots-anglais-perm.txt">list</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>