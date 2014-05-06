Responsiv AD
============

###Dynamisk responsiv bildhantering via javascript


Funktion för att dynamiskt byta ut bilder på en sida så att de
anpassas till skärmstorleken. Alltså inte en traditionell omskalning,
utan gör det möjligt att ha helt olika bilder för olika skärmar.

Standardbilden anges i `<img />` med attributet `data-default-src` och
namnet på den används sedan för att hämta de anpassade bilderna.

Övriga bilder ska ligga bredvid standardbilden och vara namngivna enligt följande:

    Standard:                     bild.png
    Högupplöst:                   bild@2x.png
    Specifik skärmstorlek:        bild@320.png
    Högupplöst + skärmanpassning: bild@320-2x.png

Skärmstorleken som anges ska vara densamma som en traditionell mediaquery i CSS.

Används Wordpress och standardbilden skalas om vid uppladdning dit så tar skriptet
hand om WP:s namngivning också. Så länge alla bilder är döpta enligt ovan och
ligger i samma mapp på servern (har samma sökväg) så kommer det att fungera.

Lägg till alla skärmstorlekar som ska testas mot i variabeln `RAD_breakpoints` som poster
i en array med störst först och minst sist.

###Hur gör man?

1. Filen `responsiveArtDirection.js` är beroende av jQuery och skall laddas efter att jQuery laddats.
2. Filen `responsive_art_direction.php` ska laddas i Wordpress i det aktiva temat och ändrar där bilder infogade i en artikel så att de stämmer överens med syntaxen för javascriptet.
3. Vid användning i WP läggs sökvägen till en laddningsbild `spinner.gif` i alla bilder så att den visas innan skriptet byter ut den mot den responsiva bilden.
4. Ändra variabeln `window.RAD_breakpoints` (i `global scope`) till att inkludera alla brytpunkter för skärmstorlekar som bilderna ska kunna anpassas till.
5. Behöver man programmatiskt initiera en bildomladdning (om innehållet t ex laddas via AJAX) så lyssnar programmet på händelsen `responsive_art_direction`. Exempel: `$(window).trigger("responsive_art_direction")`.

Lycka till!
