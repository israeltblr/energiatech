document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    const map = L.map('atuacaoMap').setView([-9.4054, -38.2259], 10);
    
    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add main city marker (Paulo Afonso)
    const pauloAfonsoMarker = L.marker([-9.4054, -38.2259]).addTo(map)
        .bindPopup('<b>Paulo Afonso</b><br>Sede da EnergiaTech Geradores')
        .openPopup();
    
    // Add other cities markers
    const cities = [
        { name: 'Glória', coords: [-9.3435, -38.2546] },
        { name: 'Santa Brígida', coords: [-9.7322, -38.1211] },
        { name: 'Delmiro Gouveia', coords: [-9.3852, -37.9986] },
        { name: 'Petrolândia', coords: [-9.0681, -38.3006] },
        { name: 'Jatobá', coords: [-9.1800, -38.2600] }
    ];
    
    cities.forEach(city => {
        L.marker(city.coords).addTo(map)
            .bindPopup(`<b>${city.name}</b><br>Atendimento pela EnergiaTech`);
    });
    
    // Add coverage area polygon
    const coverageArea = L.polygon([
        [-9.8, -38.4],   // Santa Brígida
        [-9.7, -38.0],   // Glória
        [-9.4, -37.9],   // Delmiro Gouveia
        [-9.0, -38.0],   // Jatobá
        [-9.0, -38.4],   // Petrolândia
        [-9.4, -38.6],   // Entre Paulo Afonso e Sta Brígida
    ], {
        color: '#005BAA',
        fillColor: '#00C897',
        fillOpacity: 0.25,
        weight: 2
    }).addTo(map);
    
    // Add legend
    const legend = L.control({ position: 'bottomright' });
    
    legend.onAdd = function(map) {
        const div = L.DomUtil.create('div', 'map-legend');
        div.innerHTML = `
            <h4>Cobertura EnergiaTech</h4>
            <div><i style="background: #005BAA"></i> Sede (Paulo Afonso)</div>
            <div><i style="background: #00C897"></i> Cidades atendidas</div>
            <div><i style="background: #00C897; opacity: 0.2; width: 20px; height: 20px; display: inline-block;"></i> Área de cobertura</div>
        `;
        return div;
    };
    
    legend.addTo(map);
    
    // Responsive map resize
    function resizeMap() {
        setTimeout(() => {
            map.invalidateSize();
        }, 200);
    }
    
    window.addEventListener('resize', resizeMap);
    
    // If map is in a tab or hidden initially, call resize when shown
    if (document.querySelector('.atuacao-map:not(:visible)')) {
        const observer = new MutationObserver(resizeMap);
        observer.observe(document.querySelector('.atuacao-map'), {
            attributes: true,
            attributeFilter: ['style']
        });
    }
});