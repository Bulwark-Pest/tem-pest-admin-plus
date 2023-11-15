
// Global variables for bait stations
let baitStations = [];
let markerPoints = [];
let sideLengths = [];
let totalFeet = 0;
let totalStations = 0;

// Class definition for BaitStation
export class BaitStation {
    constructor(marker, station, coveredRange, uncoveredRange) {
        this.marker = marker;
        this.station = station;
        this.coveredRange = coveredRange;
        this.uncoveredRange = uncoveredRange;
        this.closestPolygonIndex = -1;
    }

    erase() {
        this.marker.setMap(null);
        this.station.setMap(null);
        this.coveredRange.setMap(null);
        this.uncoveredRange.setMap(null);
    }

    move(position) {
        this.marker.setPosition(position);
        this.station.setCenter(position);
        this.coveredRange.setCenter(position);
        this.uncoveredRange.setCenter(position);
    }
}

function createBaitStation(position) {
    // Check if a bait station already exists at the given position
    for (let i = 0; i < baitStations.length; i++) {
        if (google.maps.geometry.spherical.computeDistanceBetween(baitStations[i].marker.getPosition(), position) < 1e-9) { // almost the same position
            return; // If a bait station exists at this position, do not create a new one
        }
    }

    let marker = new google.maps.Marker({
        position: position,
        map: map,
        draggable: true,
        title: 'Bait Station',
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15, // size of the dot
            fillColor: "rgba(0,0,0,0)", // color of the dot
            fillOpacity: 1,
            strokeWeight: 0 // border size
        },
    });

    let station = new google.maps.Circle({
        map: map,
        center: marker.getPosition(),
        radius: 0.2,
        strokeColor: '#000000',
        strokeWeight: 1,  // remove the line around the circle
        draggable: false,
        clickable: false
    });

    let coveredRange = new google.maps.Circle({
        map: map,
        center: marker.getPosition(),
        radius: coverage,  // 9 feet in meters
        fillColor: '#00ff00',  // green
        strokeWeight: 0,  // remove the line around the circle
        draggable: false,
        clickable: false
    });

    let uncoveredRange = new google.maps.Circle({
        map: map,
        center: marker.getPosition(),
        radius: uncoverage,  // 18 feet in meters
        fillColor: "rgba(0,0,0,0.01)",  // No fill
        strokeColor: '#000000', // Outline
        strokeWeight: .25,
        draggable: false,
        clickable: false
    });

    let baitStation = new BaitStation(marker, station, uncoveredRange, coveredRange);
    baitStations.push(baitStation);  // Add the newly created bait station to the baitStations array

    marker.addListener('click', function() {
        baitStation.clicked = true;
        if(eraserMode) {
            baitStation.erase(); // Call the erase function from the BaitStation class
            let stationIndex = baitStations.findIndex(station => station.marker.position.equals(marker.position));
            if(stationIndex !== -1) baitStations.splice(stationIndex, 1);
        }
    });

    marker.addListener('drag', function() {
        baitStation.move(this.getPosition());
    });

    return baitStation;
}

// Clear all bait stations
function clearBaitStations() {
    for(let i = 0; i < baitStations.length; i++) {
        baitStations[i].erase();
    }
    baitStations = [];
    markerPoints = [];
}

function confirmStations() {
    if (outlines.length === 0) {
        console.log("No outlines available, only bait stations will be recorded.");
        let baitStationList = baitStations.map(baitStation => {
            let stationPos = baitStation.marker.getPosition();
            return { lat: stationPos.lat(), lng: stationPos.lng() };
        });

        let masterList = [{
            outlinePoints: [],
            baitStations: baitStationList
        }];

        console.log("Master List: ", masterList);
        return; // Exit the function if there are no outlines
    }

    assignStationsToPolygons(); // Assign stations to the nearest polygon


    markerPoints = [];
    sideLengths = [];
    totalStations = 0;
    totalFeet = 0;

    let masterList = []; // List to hold the details of each polygon

    for (let k = 0; k < outlines.length; k++) {
        let path = outlines[k].getPath();
        let num_points = path.getLength();

        let polygonPoints = []; // To store the points of this polygon
        let associatedStations = []; // To store the bait stations associated with this polygon

        for (let i = 0; i < num_points; i++) {
            let startPoint = path.getAt(i);
            let endPoint = path.getAt((i + 1) % num_points);
            let sideLength = google.maps.geometry.spherical.computeDistanceBetween(
                startPoint,
                endPoint
            );
            const distanceFeet = sideLength * 3.28084;
            totalFeet += distanceFeet; // Add the side length to the totalFeet
            sideLengths.push( parseFloat(distanceFeet.toFixed(2))); // Add each side length to a list that can be displayed

            // Add the latLng object to the array
            polygonPoints.push({ lat: startPoint.lat(), lng: startPoint.lng() });
        }

        // Find the associated bait stations
        for (let i = 0; i < baitStations.length; i++) {
            if (baitStations[i].closestPolygonIndex === k) {
                let stationPos = baitStations[i].marker.getPosition();
                associatedStations.push({ lat: stationPos.lat(), lng: stationPos.lng() });
                const markerPosition = baitStations[i].marker.getPosition().toString();
                markerPoints.push(markerPosition);
            }
        }

        masterList.push({
            outlinePoints: polygonPoints,
            baitStations: associatedStations
        });
    }
    let includeStations = "";
    totalStations = markerPoints.length
    if (csmode) {
        csStations = crawlSpaceStations(sideLengths);
        totalStations = csStations + markerPoints.length;
        includeStations = " (Include Crawl Space Station)";
    }
    console.log("Linear Distance: " + totalFeet.toFixed(2) + " ft");
    console.log("Side Lengths: " + sideLengths.map(length => length + " ft").join(", "));
    console.log("Expected Markers: " + Math.floor(totalFeet / 18));
    console.log("Marker Total" + includeStations + ": " + totalStations);
    console.log("Master List: ", masterList);
}

function addStationWithinRestraints() {
    let totalFeet = 0;
    let sideLengths = [];
    const offsetDistance = 0.5144; // 3 feet in meters

    for (let k = 0; k < outlines.length; k++) {
        let path = outlines[k].getPath();
        let num_points = path.getLength();

        for (let i = 0; i < num_points; i++) {
            let startPoint = path.getAt(i);
            let endPoint = path.getAt((i + 1) % num_points);
            let sideLength = google.maps.geometry.spherical.computeDistanceBetween(startPoint, endPoint);
            const distanceFeet = sideLength * 3.28084; // Convert to feet
            totalFeet += distanceFeet;
            sideLengths.push(sideLength);
        }

        let expectedStations = Math.ceil(totalFeet / 18);
        let spacing = totalFeet / expectedStations;
        let spacingMeters = spacing / 3.28084; // Convert to meters
        let remainingDist = 0.9144; // Start 3 feet from the first corner in meters

        for (let i = 0; i < num_points; i++) {
            let startPoint = path.getAt(i);
            let endPoint = path.getAt((i + 1) % num_points);
            let sideLength = sideLengths[i];
            let coveredDist = 0;

            while (coveredDist < sideLength) {
                let nextCoveredDist = coveredDist + remainingDist;

                if (nextCoveredDist <= sideLength) {
                    let fraction = nextCoveredDist / sideLength;
                    let latLng = google.maps.geometry.spherical.interpolate(startPoint, endPoint, fraction);
                    let heading = google.maps.geometry.spherical.computeHeading(startPoint, endPoint);
                    let offsetHeading = (heading + 90) % 360;
                    let offsetLatLng = google.maps.geometry.spherical.computeOffset(latLng, offsetDistance, offsetHeading);

                    if (google.maps.geometry.poly.containsLocation(offsetLatLng, outlines[k])) {
                        offsetHeading = (heading - 90 + 360) % 360;
                        offsetLatLng = google.maps.geometry.spherical.computeOffset(latLng, offsetDistance, offsetHeading);
                    }

                    createBaitStation(offsetLatLng);
                    coveredDist = nextCoveredDist;
                    remainingDist = spacingMeters; // Reset the remaining distance to the calculated spacing
                } else {
                    remainingDist -= sideLength - coveredDist;
                    break;
                }
            }
        }
    }
}



function findClosestPolygon(position) {
    let closestDistance = Number.MAX_VALUE;
    let closestOutlineIndex = -1;

    // Loop through each polygon
    for (let k = 0; k < outlines.length; k++) {
        let path = outlines[k].getPath();
        let num_points = path.getLength();

        // Loop through each point in the polygon
        for (let i = 0; i < num_points; i++) {
            let startPoint = path.getAt(i);
            let endPoint = path.getAt((i + 1) % num_points);

            // Calculate distances from the position to each point
            let distanceToStart = google.maps.geometry.spherical.computeDistanceBetween(position, startPoint);
            let distanceToEnd = google.maps.geometry.spherical.computeDistanceBetween(position, endPoint);

            if(distanceToStart < closestDistance) {
                closestDistance = distanceToStart;
                closestOutlineIndex = k;
            }

            if(distanceToEnd < closestDistance) {
                closestDistance = distanceToEnd;
                closestOutlineIndex = k;
            }
        }
    }

    return closestOutlineIndex;
}

function assignStationsToPolygons() {
    for (let i = 0; i < baitStations.length; i++) {
        let position = baitStations[i].marker.getPosition();
        baitStations[i].closestPolygonIndex = findClosestPolygon(position);
    }
}

function crawlSpaceStations(sides) {
    let total = sides.reduce((sum, side) => sum + side - 7.5, 0);
    let squareArea = (total / 4) * (total / 4);
    let circleArea = Math.PI * Math.pow(15, 2);
    return Math.ceil(squareArea / circleArea);
}
