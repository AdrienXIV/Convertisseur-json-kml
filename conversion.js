const fs = require('fs');

function convert(jsonfile, emplacementFichierKml) {
    let fichierjson = require("./" + jsonfile); //récupération du fichier json dans le répertoire

    let kmlfile = // écriture du format d'un fichier kml
        `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>`;

    // ajout de toutes les coordonnées dans les balises correspondantes d'un fichier kml
    fichierjson.forEach(element => { 
        kmlfile += `
    <Placemark>
        <Point>
            <coordinates>` + element.lat + "," + element.lng + `</coordinates>
            <confiance>` + element.confiance + `</confiance>
        </Point>
    </Placemark>`;

    });
    kmlfile += `
    </Document>
</kml>`;

    // écriture du nouveau fichier
    fs.writeFile("./" + emplacementFichierKml, kmlfile, function (err) {

        if (err) {
            return console.log(err);
        }
    });
}

// paquet caporal.js pour créer un programme par ligne de commande 
const prog = require('caporal');
prog
    .version('1.0.0')
    .description('Programme pour convertir un fichier JSON en KML') // description du programme
    .command('fichier', 'Fichier JSON à convertir') // commande de lancement du programme => node conversion.js fichier
    .argument('<jsonfile>', 'nom du fichier json') // argument obligatoire
    .argument('<kmlfile>', 'nom du fichier kml') // argument obligatoire
    .action(function (args, options, logger) {

        convert(args.jsonfile, args.kmlfile); // récupération du nom du fichier json passé en ligne de commande  par le paramètre args
                                              // et du nom du fichier kml à créer

        logger.info("Fichier : " + args.kmlfile + " créé"); // affichage dans la console

    });

prog.parse(process.argv); // construction des arguments en ligne de commande pour que le programme puisse lire