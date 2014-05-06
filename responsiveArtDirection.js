// Responsiv AD
// ============

// ###Dynamisk responsiv bildhantering via javascript


// Funktion för att dynamiskt byta ut bilder på en sida så att de
// anpassas till skärmstorleken. Alltså inte en traditionell omskalning,
// utan gör det möjligt att ha helt olika bilder för olika skärmar.

// Standardbilden anges i `<img />` med attributet `data-default-src` och
// namnet på den används sedan för att hämta de anpassade bilderna.

// Övriga bilder ska ligga bredvid standardbilden och vara namngivna enligt följande:

//     Standard:                     bild.png
//     Högupplöst:                   bild@2x.png
//     Specifik skärmstorlek:        bild@320.png
//     Högupplöst + skärmanpassning: bild@320-2x.png

// Skärmstorleken som anges ska vara densamma som en traditionell mediaquery i CSS.

// Används Wordpress och standardbilden skalas om vid uppladdning dit så tar skriptet
// hand om WP:s namngivning också. Så länge alla bilder är döpta enligt ovan och
// ligger i samma mapp på servern (har samma sökväg) så kommer det att fungera.

// Lägg till alla skärmstorlekar som ska testas mot i variabeln `RAD_breakpoints` som poster
// i en array med störst först och minst sist.

// ###Hur gör man?

// 1. Filen `responsiveArtDirection.js` är beroende av jQuery och skall laddas efter att jQuery laddats.
// 2. Filen `responsive_art_direction.php` ska laddas i Wordpress i det aktiva temat och ändrar där bilder infogade i en artikel så att de stämmer överens med syntaxen för javascriptet.
// 3. Vid användning i WP läggs sökvägen till en laddningsbild `spinner.gif` i alla bilder så att den visas innan skriptet byter ut den mot den responsiva bilden.
// 4. Ändra variabeln `window.RAD_breakpoints` (i `global scope`) till att inkludera alla brytpunkter för skärmstorlekar som bilderna ska kunna anpassas till.

// Lycka till!

;(function(responsiveArtDirection, $, undefined){

	"use strict";

	var suffix			= "",
		retina			= window.matchMedia("only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 2dppx)"),
		RAD_breakpoints	= window.RAD_breakpoints || ["950","768","480","320"];


	responsiveArtDirection.run = function(){

		// Byt alla bilder första gången
		swapImages();
		
		// Byt bilder igen vid ändring av fönsterstorlek
		// men vänta en halv sekund så att inte funktionen körs kontinuerligt
		$(window).on("resize", function(e){
			setTimeout(function(){
				swapImages();
			}, 500);
		});

		// Gör det möjligt att köra bildväxlingen programmatiskt också
		// via en händelselyssnare
		$(window).on("responsive_art_direction", function(e){
			swapImages();
		});

	}


	function swapImages(){
		var size_match = [];
		$.each(RAD_breakpoints, function(i, arr){
			if(window.matchMedia("only screen and (max-width: " + arr + "px)").matches){
				size_match.push("@" + arr);
			}
		});
		suffix = (size_match[0]) ? size_match[size_match.length - 1] : "@";
		$("img[data-default-src]").each(function(i, obj){
			var $img	= $(obj),
				src		= $img.attr("data-default-src"),
				wp_src	= "",
				ext		= src.substr(src.lastIndexOf('.')),
				divider = (suffix.length > 1) ? "-" : "";

			// Om bilden är suffixad av Wordpress i.o.m. omskalning vid uppladdning
			// får vi ta hand om det också. (bild-100x200.png)
			if(src.match(/[\-]{1}\d+[x]{1}\d+/) !== null){
				wp_src = src;
				src = src.substr(0, src.lastIndexOf("-"));
			}
			
			// Bort med filsuffix om det finns något
			src = src.replace(ext, "");

			// Används en högupplöst skärm?
			if(retina.matches){
				fetchImage(src + suffix + divider + "2x" + ext, function(img){
					console.log("Laddar 2x bild.");
					$img.attr("src", img.src);
					$img.attr("width", img.naturalWidth / 2).attr("height", "auto");
					}, function(){
						console.log("Ingen 2x bild funnen.");
						fetchImage(src + suffix + ext, function(img){
							console.log("Laddar 1x bild.")
							$img.attr("src", img.src);
							$img.attr("width", img.naturalWidth).attr("height", "auto");
						}, function(){
							console.log("Ingen 1x bild funnen.");
							console.log("Laddar standardbilden.");
							$img.attr("src", $img.attr("data-default-src"));
							$img.attr("width", "auto").attr("height", "auto");
						});	
					}
				);
			// Lågupplösta skärmar
			} else {
				if(suffix.length == 1)
					suffix = "";
				if(wp_src && suffix == ""){
					fetchImage(wp_src, function(img){
						console.log("Laddar standardbilden.");
						$img.attr("src", $img.attr("data-default-src"));
						$img.attr("width", "auto").attr("height", "auto");
					}, function(){
						console.log("Ingen Standardbild");
					});
				} else {
					fetchImage(src + suffix + ext, function(img){
						console.log("Laddar 1x bild.");
						$img.attr("src", img.src);
						$img.attr("width", "auto").attr("height", "auto");
					}, function(){
						console.log("Ingen 1x bild funnen.");
						console.log("Laddar standardbilden.");
						$img.attr("src", $img.attr("data-default-src"));
						$img.attr("width", "auto").attr("height", "auto");
					});	
				}
			}
		});
	}

	function fetchImage(src, success, error){
		try {
			var img = new Image();
				img.src = src;
				img.onload = function(){
					success(img);
				}
				img.onerror = function(){
					error();
				}
		}
		catch(e){
			console.log(e);
		}
	}
	
})(window.responsiveArtDirection = window.responsiveArtDirection || {}, jQuery);

jQuery(document).ready(function($){
	responsiveArtDirection.run();
});
