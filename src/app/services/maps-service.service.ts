import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapsServiceService {

  constructor(private httpClient: HttpClient) { }

  getRoutes(origin: string|null , destination:string|null):Observable<any>{
    return this.httpClient.get<any>(`http://localhost:8080/api/route?origin=${origin}&destination=${destination}`);
  }
}


//localhost:8080/api/route?origin=Travessa+Acrisio+Esteves+Da+Silva,+Estância,+SE&destination=Americanas,+Estância,+SE')
