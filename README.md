# Clasificador EuroSAT para Vercel

Web sencilla para clasificar imágenes satelitales con el modelo entrenado en Google Colab.

## Estructura

- `index.html`
- `style.css`
- `app.js`
- `modelo_eurosat/`

## 1. Guardar el modelo en Colab

Al final del notebook del primer modelo, usa una de estas opciones:

```python
model.save("modelo_eurosat.h5")
```

o, si tu variable se llama `modelo`:

```python
modelo.save("modelo_eurosat.h5")
```

## 2. Convertir el modelo a TensorFlow.js

En Colab ejecuta:

```python
!pip install tensorflowjs
!mkdir modelo_eurosat
!tensorflowjs_converter --input_format=keras modelo_eurosat.h5 modelo_eurosat
!zip -r modelo_eurosat.zip modelo_eurosat
```

Luego descarga el ZIP:

```python
from google.colab import files
files.download("modelo_eurosat.zip")
```

## 3. Copiar el modelo en la web

Descomprime `modelo_eurosat.zip` y copia sus archivos dentro de la carpeta:

```text
modelo_eurosat/
```

Debe quedar algo parecido a:

```text
modelo_eurosat/model.json
modelo_eurosat/group1-shard1of1.bin
```

## 4. Subir a Vercel

1. Sube esta carpeta a GitHub.
2. En Vercel selecciona `Add New Project`.
3. Importa el repositorio.
4. Framework Preset: `Other`.
5. Build Command: vacío.
6. Output Directory: vacío.
7. Deploy.

## Nota

Se recomienda usar el primer modelo CNN porque es el más ligero para web.
