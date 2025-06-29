let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 16.198, lng: 103.278 },
    zoom: 17,
  });
}

async function searchRoom() {
  const roomCode = document.getElementById("search").value.trim().toUpperCase();
  const response = await fetch("rooms.json");
  const rooms = await response.json();

  if (rooms[roomCode]) {
    const data = rooms[roomCode];

    if (marker) marker.setMap(null); // remove old marker

    marker = new google.maps.Marker({
      position: { lat: data.lat, lng: data.lng },
      map,
      title: roomCode,
    });

    map.setCenter({ lat: data.lat, lng: data.lng });

    const info = `
      <strong>ห้อง: ${roomCode}</strong><br/>
      อาคาร: ${data.building}<br/>
      ชั้น: ${data.floor}<br/>
      วิชา: ${data.description}
    `;

    const infoWindow = new google.maps.InfoWindow({ content: info });
    infoWindow.open(map, marker);
  } else {
    alert("ไม่พบห้องนี้ในระบบ");
  }
}
