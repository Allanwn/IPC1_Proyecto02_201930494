import { Injectable } from '@angular/core';
import { HttpClient,  HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RestConstants } from './rest-constant';


@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl: string;

  constructor( private http: HttpClient, private restConstant: RestConstants ) {

    this.apiUrl =  `${this.restConstant.getApiURL()}`; 

   }


   /// metodo para login 
   
   login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);

  }
  
   // metodo para productos

   newProductos( data : any):  Observable<any> {
    return this.http.post(`${this.apiUrl}/new-product`,data);
   }

   getProductos(): Observable<any>{
    return this.http.get(`${this.apiUrl}/get-products`);
   }


   // metodo para estadistica  

   
   newCliente( data : any):  Observable<any> {
    return this.http.post(`${this.apiUrl}/new-cliente`,data);
   }

   getClientes(): Observable<any>{
    return this.http.get(`${this.apiUrl}/get-clientes`);
   }

   // metodo para estadistica
   getEstadisClie(): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/get-estadis-clie`);
   }

   getEstadisProd(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/get-estadis-prod`);
   }


}
