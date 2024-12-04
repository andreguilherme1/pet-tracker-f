import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { PetTrackerService } from '../../services/pet-tracker.service';

@Component({
  selector: 'app-pet-tracker',
  standalone: false,
  templateUrl: './pet-tracker.component.html',
  styleUrls: ['./pet-tracker.component.scss'],
})
export class PetTrackerComponent implements AfterViewInit, OnInit {
  center: google.maps.LatLngLiteral = { lat: -8.11753512553773, lng: -34.8996876037263 };
  zoom = 12;
  display: google.maps.LatLngLiteral | null = null;
  markerPosition: google.maps.LatLngLiteral | null = null;
  markers: google.maps.Marker[] = [];
  latitude: number = 0;
  longitude: number = 0;
  isAlert: boolean = false;

  @ViewChild(GoogleMap) googleMap: GoogleMap | undefined;

  constructor(private readonly _petTracker: PetTrackerService) {}

  ngOnInit(): void {
    this.getLocation();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.addMarker();
    }, 100);
  }

  getLocation() {
    this._petTracker.getLocation().subscribe((data) => {
      this.latitude = data.petLocation.latitude;
      this.longitude = data.petLocation.longitude;
      this.markerPosition = { lat: this.latitude, lng: this.longitude };

      // Remove os marcadores antigos e adiciona o novo
      this.removeMarkers();
      this.addMarker();

      // Define o alerta com base no status
      if (data.status === 'inside') {
        this.isAlert = false;
      } else if (data.status === 'outside') {
        this.isAlert = true;
      }
    });

    setTimeout(() => {
      this.getLocation();
    }, 5000);
  }

  addMarker(): void {
    if (this.googleMap && this.markerPosition) {
      const map = this.googleMap.googleMap;

      const marker = new google.maps.Marker({
        position: this.markerPosition,
        map: map,
        title: 'Localização do Pet',
      });

      // Adiciona o marcador à lista
      this.markers.push(marker);
    }
  }

  removeMarkers(): void {
    // Remove todos os marcadores do mapa
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = []; // Limpa a lista de marcadores
  }

  moveMap(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
    }
  }

  move(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }
}
