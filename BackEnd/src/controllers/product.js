const products=require('../models/product');

// Importar la información del admin
const {adminData}=require("../config/config")
// Controlador para manejar la creación de un nuevo producto

// Controlador para manejar la creación de un nuevo producto
module.exports.newProduct = async (req, res, next) => {
    try {
      // Obtenemos los datos del producto
      const { id_producto, nombre_producto, precio_producto, stock_producto } = req.body;
  
      // Validaciones
      if (!id_producto || !nombre_producto || precio_producto === undefined || stock_producto === undefined) {
        
        let a="";

        if (!id_producto){
            a=a+" error id  " + id_producto 

        }
        if (!nombre_producto){

            a=a+" error nombre "+ nombre_producto; 
        }
        if (precio_producto===undefined){

            a=a+" error precio " + precio_producto
        }
        if (stock_producto===undefined){

            a=a+" error de stock "
        }

        return res.status(400).json({            

          message: "Todos los campos son requeridos." + a,
          status: "error",
        });
      }
  
      // Verificar si el ID del producto ya existe
      const productoExistente = products.find((product) => product.id_producto === id_producto);
      if (productoExistente) {
        return res.status(400).json({
          message: `El producto con ID ${id_producto} ya existe.`,
          status: "error",
        });
      }
  
      // Verificar que el precio sea mayor a 0
      if (parseFloat(precio_producto) <= 0) {
        return res.status(400).json({
          message: "El precio del producto debe ser mayor a 0.",
          status: "error",
        });
      }
  
      // Verificar que el stock sea igual o mayor a 0
      if (parseInt(stock_producto, 10) < 0) {
        return res.status(400).json({
          message: "El stock del producto debe ser igual o mayor a 0.",
          status: "error",
        });
      }
  
      // Crear y guardar el producto
      const newProduct = {
        id_producto,
        nombre_producto,
        precio_producto: parseFloat(precio_producto),
        stock_producto: parseInt(stock_producto, 10),
      };
  
      products.push(newProduct);
  
      res.status(200).json({
        message: "Producto creado con éxito!",
        status: "success",
      });

      
    } catch (error) {
      res.status(500).json({
        error: error.message,
        status: "error",
      });
    }
  };
  


// Controlador para obtener todos los productos
module.exports.allProducts=async(req,res)=>{
    try{
        res.status(200).json(products);
    }catch(error){
        res.status(400).json({
            error:error.message
        })
    }
}

// Controlador para administrar el login
module.exports.login=async(req,res)=>{
    try{
        if(req.body.username==adminData.username &&
            req.body.password==adminData.password){
                res.status(200).json({
                    message:"Login exitoso",
                    status:"success"
                });
        }else{
            res.status(401).json({
                message:"Usuario/Contraseña incorrecta intente de nuevo!",
                status:"error"
            });
        }
        
    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

module.exports.allProductosOrdenados = async (req, res) => {
  try {
      const productosOrdenados = products.sort((a, b) => b.precio_producto - a.precio_producto); // Ordenar por precio descendente
      res.status(200).json(productosOrdenados);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};
