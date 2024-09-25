import { Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GoogleMapsModule,MapDirectionsService } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MapsServiceService } from './services/maps-service.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GoogleMapsModule,FormsModule,NgIf,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  endereco: string = '';
  bairro:string='';
  cidade:string= '';
  estado:string= '';
  cep:string='';
  numero:number | null = null;
  enderecoDestino:string= '';
  bairroDestino:string='';
  cidadeDestino:string= '';
  estadoDestino:string= '';
  cepDestino='';
  numeroDestino:number | null = null;




  directionsResults$:Observable<google.maps.DirectionsResult | undefined> | undefined;
  center: google.maps.LatLngLiteral = { lat: -23.55052, lng: -46.633308 }; // Localização inicial
  zoom = 14;
  constructor(private mapsService: MapsServiceService, private mapDirectionsService: MapDirectionsService) {

  }

  dataOrigin() {
    const originRua = this.endereco.trim().split(' ').join('+');
    const origin = `${originRua},+${this.numero},Bairro+${this.bairro.trim()},+${this.cidade.trim()},+${this.estado.trim()},Brasil,+${this.cep.trim()}`;
    console.log(origin);
    return origin;
  }

  dataDestination() {
    const destinationRua = this.enderecoDestino
    .trim().split(' ').join('+');
    const destination = `${destinationRua},+${this.numeroDestino},Bairro+${this.bairroDestino.trim()},+${this.cidadeDestino.trim()},+${this.estadoDestino.trim()},Brasil,+${this.cepDestino.trim()}`;
    console.log(destination);
    return destination;
  }

  getRoutes(){
    const origin = this.dataOrigin();
    const destination = this.dataDestination();
    this.mapsService.getRoutes(origin,destination).subscribe({
      next: (response) => {
        const bounds = response.routes[0].bounds;
        const request: google.maps.DirectionsRequest = {
          destination:{ lat: bounds.southwest.lat, lng: bounds.southwest.lng },
          origin: { lat: bounds.northeast.lat, lng: bounds.northeast.lng },
          travelMode: google.maps.TravelMode.DRIVING
        };

        this.directionsResults$ = this.mapDirectionsService.route(request).pipe(
          map(response => response.result ? response.result : undefined) // Garante que retorna apenas o resultado correto
        );

      }
    });
  }

}
