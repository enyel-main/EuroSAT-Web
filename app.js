let modelo = null;

const clases = [
  "AnnualCrop",
  "Forest",
  "HerbaceousVegetation",
  "Highway",
  "Industrial",
  "Pasture",
  "PermanentCrop",
  "Residential",
  "River",
  "SeaLake"
];

const entradaImagen = document.getElementById("entradaImagen");
const vistaPrevia = document.getElementById("vistaPrevia");
const botonPredecir = document.getElementById("botonPredecir");
const estado = document.getElementById("estado");
const claseResultado = document.getElementById("claseResultado");
const confianzaResultado = document.getElementById("confianzaResultado");

async function cargarModelo() {
  try {
    modelo = await tf.loadLayersModel("modelo_eurosat/model.json");
    estado.textContent = "Modelo cargado correctamente.";
  } catch (error) {
    estado.textContent = "No se pudo cargar el modelo. Revisa la carpeta modelo_eurosat.";
    console.error(error);
  }
}

entradaImagen.addEventListener("change", function () {
  const archivo = entradaImagen.files[0];

  if (!archivo) {
    return;
  }

  vistaPrevia.src = URL.createObjectURL(archivo);
  vistaPrevia.style.display = "block";
  botonPredecir.disabled = false;
  claseResultado.textContent = "Imagen lista";
  confianzaResultado.textContent = "";
});

botonPredecir.addEventListener("click", async function () {
  if (!modelo) {
    estado.textContent = "El modelo todavía no está cargado.";
    return;
  }

  estado.textContent = "Clasificando imagen...";

  const tensor = tf.browser
    .fromPixels(vistaPrevia)
    .resizeNearestNeighbor([64, 64])
    .toFloat()
    .expandDims();

  const prediccion = modelo.predict(tensor);
  const valores = await prediccion.data();

  let indiceMayor = 0;
  let valorMayor = valores[0];

  for (let i = 1; i < valores.length; i++) {
    if (valores[i] > valorMayor) {
      valorMayor = valores[i];
      indiceMayor = i;
    }
  }

  const clase = clases[indiceMayor];
  const confianza = (valorMayor * 100).toFixed(2);

  estado.textContent = "Predicción realizada.";
  claseResultado.textContent = clase;
  confianzaResultado.textContent = "Confianza aproximada: " + confianza + "%";

  tensor.dispose();
  prediccion.dispose();
});

cargarModelo();
