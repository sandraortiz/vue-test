<template>
  <div class="container">
    <router-link to="/about" tag="button">Inica sesion</router-link>
    <br><br>
    <form>
      <div class="input-group mb-3">
        <span class="input-group-text">Nombre</span>
        <input v-model="usuario.nombre" type="text" class="form-control" />
      </div>

      <div class="input-group mb-3">
        <span class="input-group-text">Correo</span>
        <input v-model="usuario.correo" type="text" class="form-control" />
      </div>

      <div class="mt-3">
        <button @click.prevent="agregarDato()" class="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  
  </div>
</template>

<script>
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";
import { db } from "../main";
import router from "../router/index";

export default {
  name: "Home",
  data() {
    return {
      usuarios: [],
      textos: [],
      usuario: {
        nombre: "",
        correo: "",
      },
      texto: {
        name: "",
      },
    };
  },
  methods: {
    async obtenerDatos() {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      querySnapshot.forEach((doc) => {
        let usuario = doc.data();
        usuario.id = doc.id;
        this.usuarios.push(usuario);
        console.log(usuario);
      });
    },
    async obtenerTextos() {
      const querySnapshot = await getDocs(collection(db, "textos"));
      querySnapshot.forEach((doc) => {
        let texto = doc.data();
        texto.id = doc.id;
        this.textos.push(texto);
        console.log(texto);
      });
    },
    async agregarDato() {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre: this.usuario.nombre,
        correo: this.usuario.correo,
      })
        .then(() => {
          router.go("/");
          console.log("Documento añadido");
        })
        .catch(function (error) {
          console.error("Error al añadir el documento: ", error);
        });
    },
    // DELETE / ELIMINAR / BORRAR
    async eliminarDato(id) {
      await deleteDoc(doc(db, "usuarios", id));
      router.go("/");
    },
  },
  mounted() {
    this.obtenerDatos();
    this.obtenerTextos();
  },
};
</script>
