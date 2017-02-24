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
		<base href="/" />

		<link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="https://code.jquery.com/ui/1.12.0/themes/base/jquery-ui.css">
		<link rel="stylesheet" type="text/css" href="css/bald.css">

		<title><?php echo $meta->title ?></title>

		<!-- OG meta -->
		<?php echo 
			'<meta property="og:type" content="'.$meta->type.'"/>'.
			'<meta property="og:url" content="'.$meta->url.'"/>'.
			'<meta property="og:title" content="'.$meta->title.'"/>'.
			'<meta property="og:description" content="'.$meta->description.'"/>'.
			'<meta property="og:image" content="'.$meta->image.'"/>';
			'<meta property="og:image:width" content="790"/>';
			'<meta property="og:image:height" content="790"/>';
			'<meta property="fb:app_id" content="1142049949187617"/>';



			if ($meta->audio) {
				echo '<meta property="og:audio" content="'.$meta->audio.'" />';
				echo '<meta property="og:audio:type" content="audio/vnd.facebook.bridge" />';
			}
		?>
		

	</head>

	<body>

		<!-- :( :( :( :( :( :( :( :( :( :( :( :( :( FROWN -->
		<script>
		  window.fbAsyncInit = function() {
		    FB.init({
		      appId      : '1142049949187617',
		      xfbml      : true,
		      version    : 'v2.7'
		    });
		  };

		  (function(d, s, id){
		     var js, fjs = d.getElementsByTagName(s)[0];
		     if (d.getElementById(id)) {return;}
		     js = d.createElement(s); js.id = id;
		     js.src = "//connect.facebook.net/en_US/sdk.js";
		     fjs.parentNode.insertBefore(js, fjs);
		   }(document, 'script', 'facebook-jssdk'));
		</script>
		<!-- :( :( :( :( :( :( :( :( :( :( :( :( :( FROWN -->

		<div id="head">
			<div class="container">
				<div class="row">
					<div class="col-md-8">
						<a href="/"><img id="top-logo" class="img img-responsive" src="images/logo-sm.gif" alt=""></a>
					</div>
					<div class="col-md-4">
						<div class="sub-head">
							<p>not a private press not a label not really anything (<b style="color: red">$$not for profit$$ hahahaha ahahahaha!!!</b>)<br/>
								~~ not really too serious and also very serious! ~~ ;)</p>
								<p></p>
						
							<div id="navigation">
								<a target="new" href="http://igm.univ-mlv.fr/~pivoteau/STRUCT/PROG/liste-mots-anglais-perm.txt">list</a>
							</div>
						</div>
						<div class="sub-head">

						</div>
					</div>
				</div>
			</div>
		</div>