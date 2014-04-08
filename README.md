Responsiv art direction
=======================

Dynamisk responsiv bildhantering via javascript.


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

Lägg till alla skärmstorlekar som ska testas mot i variabeln `screen_widths` som poster
i en array med störst först och minst sist.
