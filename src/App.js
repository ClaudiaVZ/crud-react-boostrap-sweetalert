import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {
  const [apellido, setApellido] = useState("");
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mail, setMail] = useState("");
  const [id, setId] = useState(null);

  const [editar, setEditar] = useState(false);
  const [alumnosList, setAlumnos] = useState([]);

  
  const add = () => {
    Axios.post("http://localhost:3001/create",{
      apellido: apellido,
      nombre: nombre,
      edad: edad,
      pais: pais,
      telefono: telefono,
      mail: mail,
    }).then(() => {
      getAlumnos();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro Exitoso!!</strong>",
        html: "<i>El estudiante <strong>"+apellido+"</strong> fué registrado con éxito!! </i>",
        icon: "success",
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Ooops',
          text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde": JSON.parse(JSON.stringify(error)).message
        })
      });
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update",{
      id: id,
      apellido: apellido,
      nombre: nombre,
      edad: edad,
      pais: pais,
      telefono: telefono,
      mail: mail,
    }).then(() => {
      getAlumnos();
      //alert("Estudiante actualizado!!");
      limpiarCampos();
      Swal.fire({
        title: "<strong>Actualización Exitosa!!</strong>",
        html: "<i>El estudiante <strong>"+apellido+"</strong> fué actualizado con éxito!! </i>",
        icon: "success",
      }).catch(function(error){
        Swal.fire({
          icon: 'error',
          title: 'Ooops',
          text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde": JSON.parse(JSON.stringify(error)).message
        })
      });
    });
  };

  const deleteAlumnos = (val) => {

    Swal.fire({
      title: "Confirmar eliminación?",
      html: `<i>Realmente desea eliminar a <strong> ${val.apellido} </strong>?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getAlumnos();
          limpiarCampos();
          Swal.fire(
            'top-end',
            'success',
            `${val.apellido} fue eliminado.`,
            false,
            2000
          );
        }).catch(function(error){
          Swal.fire({
            icon: 'error',
            title: 'Ooops',
            html: 'No se logró eliminar el estudiante',
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde": JSON.parse(JSON.stringify(error)).message
          })
        });
      }
    });
  }

  const limpiarCampos = () => {
    setApellido("")
    setNombre("")
    setEdad("")
    setPais("")
    setTelefono("")
    setMail("")
    setId("");
    setEditar(false);
  }

    const editarAlumnos = (val)=> {
      setEditar(true);
      setApellido(val.apellido);
      setNombre(val.nombre);
      setEdad(val.edad);
      setPais(val.pais);
      setTelefono(val.telefono);
      setMail(val.mail);
      setId(val.id)
    };

  const getAlumnos = ()=>{
    Axios.get("http://localhost:3001/alumnos").then((response) => {
      setAlumnos(response.data);
    });
  };
  
  useEffect(()=> {
    getAlumnos();
  }, []);

  //getAlumnos();} ; llamar al cargar

  return (

    <div className="container">

      <div className="card text-center">

        <div className="card-header">GESTIÓN DE ESTUDIANTES</div>

        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Apellido:{" "}
            </span>
            <input
              type="text" value={apellido}
              onChange={(event) => {
                setApellido(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese su Apellido"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:{" "}
            </span>
            <input
              type="text" value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese su Nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:{" "}
            </span>
            <input
              type="number" value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese su Edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:{" "}
            </span>
            <input
              type="text" value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control" 
              placeholder="País donde reside"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              telefono:{" "}
            </span>
            <input
              type="text" value={telefono}
              onChange={(event) => {
                setTelefono(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese Cod de Área + Num"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Mail:{" "}
            </span>
            <input
              type="text" value={mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
              className="form-control" 
              placeholder="Ingrese correo electrónico"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="card-footer text-muted">
          {
            editar? 
            <div>
            <button className="btn btn-warning m-2" onClick={update}>Actualizar</button>
            <button className="btn btn-info m-2" onClick={limpiarCampos}>Cancelar</button>
            </div> 
            :<button className="btn btn-success" onClick={add}>Registrar</button>
          }
          
        </div>

      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Apellido</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">telefono</th>
            <th scope="col">Mail</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {alumnosList.map((val, key) => (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.apellido}</td>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.telefono}</td>
                <td>{val.mail}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" 
                            onClick={()=>{
                              editarAlumnos(val);
                            }}
                            className="btn btn-info">Editar</button>
                            <button type="button" onClick={()=>(
                              deleteAlumnos(val)
                            )} className="btn btn-danger">Eliminar</button>  
                  </div>
                </td>
              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default App;
