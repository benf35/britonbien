function addSVG( div ) {
  return div.insert( "svg", ":first-child" )
    .attr( "height", 800 )
    .attr( "width", 800 )
    .attr( "viewBox", "-900 -900 2000 2000" );
  }
//Taille largeur/longueur de la map
var myDefaultExtent = {
    width: 1,
    height: 1
};
  
var myParams = {
    extent: myDefaultExtent,
    generator: myGenerateCoast,
    npts: 10000,// détail de la map (nombre de points)
    ncities: 20,
    nterrs: 10,
    fontsizes: {
        region: 0,
        city: 0,
        town: 0
    }
}

function myGenerateCoast(params) {
    var mesh = generateGoodMesh(params.npts, params.extent);
    var h = add(
            slope(mesh, randomVector(4)),
            cone(mesh, runif(-1, -1)),
            mountains(mesh, 50)
            );
    for (var i = 0; i < 10; i++) {
        h = relax(h);
    }
    h = peaky(h);
	//h = visualizeDownhill(h);
    h = doErosion(h, runif(0.8, 1), 10);
    h = setSeaLevel(h, runif(0.2, 0.6));
    h = fillSinks(h);
    h = cleanCoast(h, 3);// côtes escarpées (+ faible, plus escarpé)
    return h;
}

var myMap = d3.select( "div#container" );
var svg = addSVG( myMap );

myMap.append( "button" )
  .text( "Generate high resolution map" )
  .on( "click", function () {
    doMap( svg, myParams );
  });

  myMap.append( "button" )
  .text( "Number of points" )
  .on( "click", function () {
    doMap( svg, myParams );
  });
