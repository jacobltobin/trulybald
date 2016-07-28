$(function() {

	TbaldApp = function() {

		var app = this;
		var getCatNumFromHash = function(hash) {
			return hash.split('#!')[1].split('_')[0];
		}

		this.releases = {};
		this.views = {
			releaseGrid: {
				HTML: '',
				built: false,
				appendAttach: function() {
					$('#content').html(app.views.releaseGrid.HTML);
					$('#release-grid .item a').click(function(e) {
						var href = $(this).attr('href');
						var catNum = getCatNumFromHash(href);
						app.goToReleasePage(catNum);
					});
				}
			},
			releasePage: {
				HTML: '',
				current: null,
				appendAttach: function() {
					$('#content').html(app.views.releasePage.HTML);
				}
			}
		}
		this.currentview = 'releaseGrid';

		this.goHome = function() {
			this.views.releaseGrid.appendAttach();
		}
		this.goToReleasePage = function(catNum) {
			buildReleasePage(catNum)
			this.views.releasePage.appendAttach();
		}
		this.goToSubpage = function(page) {
			$.get( "subpages/"+page+".html", function( data ) {
				$('#content').html(data);
			});
		}
		this.buildReleaseGrid = function() {
			var html = '';
			
			html += '<div id="release-grid" class="container"><br/>';
			html += '<div class="row">';
			for (release in this.releases) {
				var rel = this.releases[release];
				var str = rel.cat+'_'+rel.artist.replace(/ /gi, "-")+'_'+rel.title.replace(/ /gi, "-");
				html += '<div class="item col-md-4 col-sm-4 col-xs-6">';
					html += '<a href="#!'+str+'"><img style="box-shadow: 0 0 19px '+rel.color+'" class="img img-responsive" src="releases/'+str+'/img/cover-th.jpg" alt=""></a>';
					html += '<div class="release-info">';
						html += '<p>'+rel.artist+'<br/><em>'+rel.title+'</em><br/><strong>'+rel.cat+'</strong></p>';
					html += '</div>';
				html += '</div>';
			}
			html += '</div>';
			html += '</div>';

			this.views.releaseGrid.HTML = html;
			this.views.releaseGrid.built = true;
		}
		buildReleasePage = function(catNum) {
			$('#content').html('LOADING');

			var rel = app.releases[catNum];
			var dir = rel.cat+'_'+rel.artist.replace(/ /gi, "-")+'_'+rel.title.replace(/ /gi, "-");
			var html = '';

			$.getJSON( "tracklist.php?release="+dir, function( data ) {
				html += '<div id="release-page" class="container"><br/>';
				html += '<div class="row">';
				html += '<div class="col-md-12">';
					html += '<div class="release-image">';
						html += '<img style="box-shadow: 0 0 19px '+rel.color+'" class="img img-responsive" src="releases/'+dir+'/img/cover.jpg" alt="">';
						html += '<div class="buy-dl">';
							html += '<a class="download-link" style="background-color: '+rel.color+'" href="releases/'+dir+'/music/download.zip">download (.wav)</a>';
						html += '</div>';
					html += '</div>';
					html += '<div class="release-info" style="background-color:'+rel.color+'">';
						html += '<h3>'+rel.artist+' <em>'+rel.title+'</em></h3>';
						html += '<h5>'+rel.format+'</h5>';
						html += '<p>'+rel.description+'</p>';
						html += '<p>'+rel.credits+'</p>';
						html += '<p>'+rel.price+'</p>';
						html += rel.paypal;
						if (rel.soldout) {
							html += '<p style="color: red; background-color: #fff"> sould out!</p>'
						}
						html += ''
						html += '<h5>~~stream~~</h5>'
						html += new AudioPlayer(dir, data).html;
					html += '</div>'
				html += '</div>';
				html += '</div>';
				html += '</div>';
				app.views.releasePage.HTML = html;

				$('#content').html(app.views.releasePage.HTML);
			});
		}

		this.init = function() {
			if (!this.views.releaseGrid.built) {
				$.getJSON( "releases/releases.json", function( data ) {
					var hash = window.location.hash;
					app.releases = data[0];
					app.buildReleaseGrid();
					if (hash.length) {
						if (hash.indexOf('subpage') > -1) {
							var page = hash.split('-')[1];
							app.goToSubpage(page);
						} else {
							var catNum = getCatNumFromHash(window.location.hash);
							app.goToReleasePage(catNum);
						}
					} else {
						app.goHome();
					}
				});
			}
		}
	}
	tbaldApp = new TbaldApp();
	tbaldApp.init();
	
	AudioPlayer = function(dir, tracks) {
		var html = '';
		var self = this;

		this.buildTrackHTML = function(track) {
			html += '<strong>'+track+'<strong><br/>'
			html += '<audio controls preload="none">';
			html += '<source src="releases/'+dir+'/music/'+track+'" type="audio/mp3">';
			html += 'Your browser does not support the audio element.';
			html += '</audio>';
			html += '<br/>';
		}

		for (var i = 0, j = tracks.length; i < j; i++) {
			var track = tracks[i];
			if (track != '.' && track != '..' && track != '.DS_Store' && track != 'download.zip') {
				this.buildTrackHTML(track);
			}
		}

		this.html = html;
	}

	$('#top-logo').click(function(e) {
		tbaldApp.goHome();
		e.preventDefault();
	});
	$('#navigation a').click(function(e) {
		if ($(this).attr('href').indexOf('#!') > -1) {
			var page = $(this).attr('href').split('#!')[1].split('-')[1];
			tbaldApp.goToSubpage(page);
		}
		else {
			//
		}
	})

})