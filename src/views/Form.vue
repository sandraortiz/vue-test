<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Correo</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usuarios" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{ item.nombre }}</td>
          <td>{{ item.correo }}</td>
          <td>
            <button
              @click.prevent="eliminarDato(item.id)"
              class="btn btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Correo</th>
          <th scope="col">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in textos" :key="index">
          <th scope="row">{{ index }}</th>
          <td>{{ item.name }}</td>
          <td>
            <button
              @click.prevent="eliminarDato(item.id)"
              class="btn btn-danger"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="exportPDF" type="submit" class="btn btn-primary">
      Export pdf
    </button>
    <button @click="signOut" type="submit" class="btn btn-primary">
      Cerrar Sesion
    </button>
  </div>
</template>

<script>
import jsPDF from "jspdf"
import 'jspdf-autotable'

import { getAuth, signOut } from "firebase/auth";
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
  name: "Form",
  data() {
    return {
      email: "",
      password: "",
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
    signOut() {
      const auth = getAuth();
      signOut(auth)
        .then(this.$router.push({ path: "/" }))
        .catch((error) => {
          // An error happened.
        });
    },
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
    exportPDF() {
      var vm = this;
      var columns = [
        { title: "nombre", dataKey: "nombre" },
        { title: "correo", dataKey: "correo" },
      ];
      var doc = new jsPDF("p", "pt");
      doc.text("To Do List", 40, 40);
      doc.autoTable(columns, vm.usuarios, {
        margin: { top: 60 },
      });
      doc.save("todos.pdf");
    },
  },
  mounted() {
    this.obtenerDatos();
    this.obtenerTextos();
  },
};
</script>

<style>
</style>