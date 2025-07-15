// Importar las dependencias
import express from "express"
import {connection} from "./mysql/mysql.js"

// Obtener el puerto del servidor
process.loadEnvFile()
const PORT = process.env.PORT || 5000
console.log(PORT);

// Crear la aplicación
const app = express()

// Ruta de los ficheros estáticos
app.use(express.static(process.cwd() + "/public"))

// RUTAS
app.get("/", (req, res) => {
res.sendFile("index.html")
})

app.get("/alumnos", (req, res)=>{
    const query = "SELECT * FROM alumno"
    connection.query( query, (err, result) => {
        if (err) throw err
        // console.log(result);
        res.json(result)
    })
})

app.get("/alumnos/:letra", (req, res) => {
    const query = `SELECT * FROM alumno WHERE apellido1 like "${req.params.letra}%";`
    connection.query( query, (err, result) => {
        if (err) throw err
        // console.log(result);
        res.json(result)
    })
})

app.listen(PORT, () => console.log(`Servidor abierto en http://localhost:${PORT}`))