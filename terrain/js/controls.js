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
	nMountains: 20,
	coneX: -1,
	coneY: -1,
	slope: 4,
	erosionX: 0.8,
	erosionY: 1,
	erosionZ: 10,
	setLevelX: 0.2,
	setLevelY: 0.6,
	coteEscarpe:3,
    fontsizes: {
        region: 0,
        city: 0,
        town: 0
    }
}

function updateValue(myParams) {	
	myParams.npts = d3.select("input#idPoints").value;
	myParams.ncities = d3.select("input#idVilles").value;
	myParams.nterrs = d3.select("input#idTerritoires").value;
	myParams.nMountains = d3.select("input#idPoints").value;
	myParams.coneX = d3.select("input#idConeX").value;
	myParams.coneY = d3.select("input#idConeY").value;
	myParams.slope = d3.select("input#idPente").value;
	myParams.erosionX = d3.select("input#idErosionA").value;
	myParams.erosionY = d3.select("input#idErosionB").value;
	myParams.erosionZ = d3.select("input#idErosionC").value;
	myParams.setLevelX = d3.select("input#idMerX").value;
	myParams.setLevelY = d3.select("input#idMerY").value;
	myParams.coteEscarpe = d3.select("input#idCote").value;
	
	
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

function generateMap(){
	updateValue(myParams); 
	  
    doMap( svg, myParams );
  };
