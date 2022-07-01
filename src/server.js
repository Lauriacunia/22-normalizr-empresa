import express, { json, urlencoded } from 'express';
import { normalize, schema, denormalize } from 'normalizr';
import { inspect } from 'util';
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

const empresa = {
    id: "1000",
    nombre: "Coderhouse",
    gerente: {
      id: "2",
      nombre: "Pedro",
      apellido: "Mei",
      DNI: "20442639",
      direccion: "CABA 457",
      telefono: "1567811544"
    },
    encargado: {
      id: "3",
      nombre: "Pablo",
      apellido: "Blanco",
      DNI: "20442640",
      direccion: "CABA 458",
      telefono: "1567811545"
    },
    empleados: [
      {
        id: "1",
        nombre: "Nicole",
        apellido: "Gonzalez",
        DNI: "20442638",
        direccion: "CABA 456",
        telefono: "1567811543"
      },
      {
        id: "2",
        nombre: "Pedro",
        apellido: "Mei",
        DNI: "20442639",
        direccion: "CABA 457",
        telefono: "1567811544"
      },
      {
        id: "3",
        nombre: "Pablo",
        apellido: "Blanco",
        DNI: "20442640",
        direccion: "CABA 458",
        telefono: "1567811545"
      },
      {
        id: "4",
        nombre: "Ana",
        apellido: "Rojo",
        DNI: "20442641",
        direccion: "CABA 459",
        telefono: "1567811546"
      },
      {
      id: "5",
      nombre: "Lucia",
      apellido: "Sorbo",
      DNI: "20442642",
      direccion: "CABA 460",
      telefono: "1567811547"
      },
      {
      id: "6",
      nombre: "Jose",
      apellido: "Pieres",
      DNI: "20442643",
      direccion: "CABA 461",
      telefono: "1567811548"
      },
      {
      id: "7",
      nombre: "Maria",
      apellido: "Lopez",
      DNI: "20442644",
      direccion: "CABA 462",
      telefono: "1567811549"
            }
       ]
};


/** Definir schema empleado */

const empleadoSchema = new schema.Entity('empleados');

/** Definir schema empresa */

const empresaSchema = new schema.Entity('empresas', {
    gerente: empleadoSchema,
    encargado: empleadoSchema,
    empleados: [empleadoSchema]
});

/** Normalizar  */
const empresaNormalized = normalize(empresa, empresaSchema);

console.log('Data original sin normalizar. Tamaño:', JSON.stringify(empresa).length);
console.log('Data normalizada. Tamaño:', JSON.stringify(empresaNormalized).length);

function print(obj)
{
    console.log(inspect(obj, { depth: null }));
}

//print(empresa);
print(empresaNormalized);



/** Desnormalizar */
 const empresaDenormalized = denormalize(empresaNormalized.result, empresaSchema, empresaNormalized.entities);

 print(empresaDenormalized);


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
