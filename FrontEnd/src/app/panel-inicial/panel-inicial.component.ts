import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartType } from 'chart.js';

import { NgChartsModule } from 'ng2-charts';

import { Router, RouterOutlet } from '@angular/router';
import { SolicitudService } from '../services/solicitud.service';

@Component({
  selector: 'app-panel-inicial',
  standalone: true,
  imports: [FormsModule, CommonModule,   NgChartsModule],
  templateUrl: './panel-inicial.component.html',
  styleUrl: './panel-inicial.component.css'
})
export class PanelInicialComponent {

  // mensjaes: 

  messages: string= ""; // Array para almacenar los mensajes



    // Propiedades para los datos de los textarea
    nuevoProducto: string = '';
    nuevoCliente: string = '';
    proStatus: String='';
    clieStatus: String='';

    /// getes
    clientes: any[] = []; 
    productos: any[]= [];

    /// estadisticas 


      // Datos para el gráfico de barras
  barChartLabels: string[] = [];

  barChartData: any[] = [];

  barChartType: any = 'bar';
   barChartLegend = true;
  barChartOptions = {
    responsive: true,
  };

  // Variables de gráficos
  pieChartLabels: string[] = ['Mayores de 18', 'Menores de 18'];
  pieChartData: any[] = [];
  pieChartType: any = 'pie';
  pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      }
    }
  };
  pieChartLegend = true;
  
    constructor(private  solicituService : SolicitudService, private router: Router) {}

    ngOnInit(): void {
      this.cargarClientes(); // Llama a cargarClientes cuando se inicialice el componente
      this.cargarProductos();

      // para estadisticas: 
      this.estadisClientes();
      this.estadisProductos();

    }

    cargarProductos(): void {
      this.solicituService.getProductos().subscribe(
        (data) => {
          this.productos = data; // Almacena los datos en el array
        },
        (error) => {
          console.error('Error al cargar clientes:', error);
        }
      );
    }
  

    agregarProducto(){
      const data =  JSON.parse(this.nuevoProducto );
      console.log("datos : -->"+ data.producto);
      this.solicituService.newProductos(data).subscribe(

        (response) => {
          this.proStatus = response.message;
          this.messages = response.message;
          console.log('Producto guardado con exito: ', response);
          this.cargarProductos(); 
          this.estadisProductos();
        },
        (error) => {

               // Aquí capturamos el error y mostramos el mensaje del servidor
      if (error.error && error.error.message) {

        this.messages = "Error al agregar Producto " +error.error.message; // Asignar el mensaje de error del servidor
      } else {
        this.messages = 'Ocurrió un error inesperado.'; // Mensaje genérico si no hay mensaje específico
      }
          
       
          console.error('Error en producto nuevo :', error);
        }
      );
     }

       // Método para cargar los clientes desde el servicio
  cargarClientes(): void {
    this.solicituService.getClientes().subscribe(
      (data) => {
        this.clientes = data; // Almacena los datos en el array
      },
      (error) => {
        console.error('Error al cargar clientes:', error);
      }
    );
  }



    agregarCliente(){

      const data = JSON.parse(this.nuevoCliente);
      console.log("datos : -->"+ data);

      this.solicituService.newCliente(data).subscribe(

        (response) => {
          this.proStatus = response.message;
          console.log('Cliente guardado con exito: ', response);
          this.messages = response.message;
          this.cargarClientes();
          this.estadisClientes();
        },
        (error) => {
       
               // Aquí capturamos el error y mostramos el mensaje del servidor
      if (error.error && error.error.message) {
        this.messages = "Error al Agregar Cliente: "+ error.error.message; // Asignar el mensaje de error del servidor
      } else {
        this.messages = 'Ocurrió un error inesperado.'; // Mensaje genérico si no hay mensaje específico
      }
          console.error('Error en de cliente nuevo :', error);
         
        }
      );
    }


    estadisProductos() {

      this.solicituService.getEstadisProd().subscribe(productos =>{
        this.barChartLabels = productos.slice(0, 5).map((p: { nombre_producto: any; }) => p.nombre_producto); // Top 5 productos
        this.barChartData = [
          { data: productos.slice(0, 5).map((p: { precio_producto: any; }) => p.precio_producto), label: 'Precio' }
        ];
      });
 
    }
  
    estadisClientes() {
      this.solicituService.getEstadisClie().subscribe(clientes => {
        if (clientes) {
          // Asegúrate de que clientes.mayores y clientes.menores sean números válidos
          const mayores = clientes.mayores || 0; // Si no tiene valor, asigna 0
          const menores = clientes.menores || 0; // Si no tiene valor, asigna 0
  
          // Asigna los valores a pieChartData en el formato correcto
          this.pieChartData = [
            { data: [mayores, menores], label: 'Distribución de Clientes por Edad' }
          ];
        }
      });
    }

}
