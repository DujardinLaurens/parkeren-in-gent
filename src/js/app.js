(function() {

    //dom volledig klaar
    document.addEventListener("DOMContentLoaded", init);
    function init () {
        http.get('https://datatank.stad.gent/4/mobiliteit/bezettingparkingsrealtime.json').then(function(response){
            console.info(response);
            let parkingsArray = [];
            for(let i = 0, l = response.length; i < l; i++){
                let p = new Parking(
                    response[i].name,
                    response[i].description,
                    response[i].parkingStatus.availableCapacity,
                    response[i].parkingStatus.totalCapacity
                );

                parkingsArray.push(p);
            }
            renderHtml(parkingsArray);
        });
    }

    function renderHtml(parkings){
        let bobTheHTMLBuilder = ``;
        for(let i = 0, l = parkings.length; i < l; i++){
            bobTheHTMLBuilder += `
            <li class="parkings__parking ${renderAvailabilityClass(parkings[i].totalCapacity, parkings[i].availableCapacity)}">
                <div class="parkings__parking__logo">p</div>
                <div class="parkings__parking__name">${parkings[i].description}</div>
                <div class="parkings__parking__info">${parkings[i].availableCapacity} / ${parkings[i].totalCapacity}</div>
            </li>
            `;
        }

        document.querySelector(".parkings").innerHTML = bobTheHTMLBuilder;
    }

    function renderAvailabilityClass(total,avail) {
        if(avail === 0){
            return "error";
        }

        if(avail < total / 2){
            return "danger";
        }
    }
})();
