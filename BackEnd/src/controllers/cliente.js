const clientes=require('../models/cliente')


module.exports.newCliente=async(req,res,next)=>{

    try {
        // Obtenemos los datos del producto
        const { id_cliente, nombre, apellido, nit, edad } = req.body;
    
        // Validaciones
        if (!id_cliente || !nombre || !apellido || !nit  || edad === undefined) {
          
          let a="";
          if (!id_cliente){
              a=a+" Falta id_cliente  " + id_cliente
          }
          if (!nombre){
              a=a+" Falta nombre "+ nombre; 
          }
          if (!nit){
              a=a+" Falta nit  " + nit
          }
          if (edad===undefined){
            a=a+" error de edad"
          }
          return res.status(400).json({            
  
            message: "Todos los campos son requeridos." + a,
            status: "error",
          });
        }
    
        // Verificar si el ID del producto ya existe
        const productoExistente = clientes.find((cliente) => cliente.id_cliente === id_cliente);
        if (productoExistente) {
          return res.status(400).json({
            message: `El Cliente con ID ${id_cliente} ya existe.`,
            status: "error",
          });
        }
    
     
        // Verificar que el stock sea igual o mayor a 0
        if (parseInt(edad, 10) < 0) {
          return res.status(400).json({
            message: "El stock del producto debe ser igual o mayor a 0.",
            status: "error",
          });
        }
    
        // Crear y guardar el producto
        const newCliente = {
          id_cliente,
          nombre,
          apellido,
          nit,
          edad: parseInt(edad, 10),
        };
    
        clientes.push(newCliente);
    
        res.status(200).json({
          message: "Cliente creado con éxito!",
          status: "success",
        });
  
        
      } catch (error) {
        res.status(500).json({
          error: error.message,
          status: "error",
        });
      }
    };

    

module.exports.allCliente=async(req,res)=>{
    try{
        res.status(200).json(clientes);
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}


module.exports.clientesPorEdad = async (req, res) => {
  try {
      const mayores = clientes.filter(cliente => cliente.edad >= 18).length;
      const menores = clientes.filter(cliente => cliente.edad < 18).length;
      res.status(200).json({ mayores, menores });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
