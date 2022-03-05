# Enunciado 2

> En la carpeta [question-2](https://bitbucket.org/vestua-com/questions/src/main/question-2/) se ha exportado eventos de navegación de usuarios anonimizados de la plataforma Vestuá. Se le pide al equipo de Ingeniería que hagan un análisis sobre los datos de navegación. En particular se solicita:
>
> - Calcular la cantidad de visitas únicas por cada producto.
> - Calcular la cantidad de clicks únicos por cada producto.
> - Calular el CTR (*Clickthrough Rate*) de cada producto.
> 
> El set de datos contiene la siguiente estructura:
> 
> - `user`: id del usuario que ejecutó el evento.
> - `entityId`: id de la entidad al que el usuario ejecutó el evento.
> - `entityType`: tipo de entidad al que se ejecutó el evento.
> - `eventType`: tipo de evento. Puede ser `impression` o `click`.
> 
> Como miembro del equipo de ingeniería, te solicitan modificar el archivo [script.js](https://bitbucket.org/vestua-com/questions/src/main/question-2/script.js) para que pueda leer el set de datos y generar un archivo `output.csv` con las siguientes columnas:
> 
> - `productId`: id del producto.
> - `clicks`: cantidad de *clicks* únicos que tiene el producto
> - `impressions`: cantidad de impresiones únicas que tiene el producto.
> - `ctr`: métrica CTR del producto.

# Razonamiento

_Escribir aquí los supuestos asumidos, reflexiones y explicaciones de la solución_

> - Utilicé unos modulos que me premiten ayudan con la lectura y escritura de archivos CSV
    - csv-parser
    - csv-writer

## Analisis de datos de navegación
> - Para la parte de los calculos de visitas unicas, clics unicos y CTR por producto
    - Utilicé "diccionarios" que son objetos los cuales se van llenado tras las iteraciones en un conjunto de datos, se llenan segun la selección de datos que desees hacer. Ejemplo:

    if (id in visitsDic)
        ++visitsDic[id];
    else visitsDic[id] = 1;

    - En esta proción de código vemos que estamos iterando en un objeto que se declaró previamente como objeto vacío visitsObj = {}, de las iteraciones se encarga nuestro código del modulo csv-parser ya que en el on('data') nos va iterando por cada fila de datos en el archivo CSV
    
    - En cada iteracion se realiza la condicional IF que cuestiona si el id del producto en cual fue escrito en la variable id previamente, está dentro del diccionario visitsObj. Recordando que en en principio esta vacio dicho diccionario, la primera vez que se ejecuta la condicional IF resulta en FALSE, ya que no está el id en visitsObj, por lo tanto, en la sección del else nos encargamos de agreagar ese id con el valor de 1 ya que es la primera ves que se encuentra.

    - Al seguir realizando iteraciones van a haber id's que ya estén dentro de visitsObj, por lo tanto, solo se les irá incrementando en uno, representando el número de visitas por cada producto

> - Para el analisis de los clics unicos por producto, se resuelve de la misma manera que las visitas unicas solo que ahora trabajamos con el eventType el cual nos dice si fue un clic o una impresión.

    if (event == 'click')
        if (id in clicksDic)
            ++clicksDic[id];
        else clicksDic[id] = 1;

    - Este código es el que se encarga de ver con la primera condicional IF si el producto que se esta revisando tiene como evento un clic
    - De ser así, la segunda condicional IF se encarga de revisar si ese producto esta registrado en el diccionario de clics; al igual que en el diccionario de visitas va agregando al diccionario de clics el producto con su numero total de clics recibidos.

> - Para las impresiones tenemos el mismo escenario, vamos seleccionando los productos que tienen impresión como eventType y los agregamos al diccionario impressionsDic

     if (event == 'click')
        if (id in clicksDic)
            ++clicksDic[id];
        else clicksDic[id] = 1;
    // Impressions
    else if (id in impressionsDic)
        ++impressionsDic[id];
        else impressionsDic[id] = 1;
    
    - Como se puede observar, la seleccion de productos con eventType impression forma parte de la condicional IF que utilizamos para detectar el evento clic, asi que en caso de no ser clic es impreción ya que solo estan esos dos tipos de eventos en los productos listados en el archivo BrowsingEvents.csv

> - Por ultimo en la sección del on('end'), tenemos el codigo que se encarga de iterar directamente en los diccionarios que creamos anteriormente seleccionando los productos que solo tienen una visita, un clic y calculando el CTR de cada producto y en un contador especifico para cada escenario va incrementando cada ves que se cumple la condicion de tener solo una visita o un clic

    for (const id in visitsDic) {
        if (visitsDic[id] == 1)             
            visits++;        
        impressions++;
    }
    for (const id in clicksDic)
        if (clicksDic[id] == 1)
            clicks++;
    for (const id in visitsDic) {
        let ctr = clicksDic[id] / impressionsDic[id];
        if (isNaN(ctr))
            ctr = 0;
        ctrDic[id] = ctr;
    }
    console.log(visits + ': Productos con visita unica');
    console.log(clicks + ': Productos con click unico');
    for (const id in ctrDic) 
        console.log('CTR de ' + id + ' es de ' + ctrDic[id])

    - Para el calculo del CTR se utilizó la fórmula designada para dicha tarea donde CTR = numero de clics / numero de impresiones
    - Se llevó a cabo iterando en el diccionario de visitas ya que ese diccionario contiene todos los productos con su numero de visitas, pero en este caso el número de visitas no nos interesa, solo necesitamos saber el id de cada producto
    - Este id nos sirve para revisar cuantos clics tiene registrados y cuantas impresiones
    - Al obtener esos dos datos, inmediatamente hace la operación de dividir número de clics por número de visitas y los registra en el diccionario ctrDic
    - Las 4 lineas finales de código representan la escritura en consola de la información requerida, para el caso de CTR necesitamos iterar en el diccionario de ctrDic para ir mostrando cada producto con su CTR respectivo.

## Escribir en output.csv con la nueva estructura de datos
.on('data', (row) => {
    id = row.entityId;
    event = row.eventType;
    //unique visits per products log
    if (id in visitsDic)
      ++visitsDic[id];
    else visitsDic[id] = 1;
    //unique clicks per products
    if (event == 'click')
      if (id in clicksDic)
        ++clicksDic[id];
      else clicksDic[id] = 1;
    // Impressions
    else if (id in impressionsDic)
      ++impressionsDic[id];
    else impressionsDic[id] = 1;
  })

  > - En esta primera sección de codigo que vemos arriba, lo que hacemos es generar  3 diccionarios (Objetos) con los datos de visitas, clicks e impresiones respectivamente; esto con la finalidad de poder disponer de esos datos para contar la cantidad de productos con visitas unicas, click unicos e impresiones unicas.

  .on('end', () => {
    console.log('CSV file successfully processed');
    for (const id in visitsDic)
        if (visitsDic[id] == 1)             
            visits++;    

    for (const id in clicksDic)
        if (clicksDic[id] == 1)
            clicks++;

    for (const id in visitsDic) {
        let ctr = clicksDic[id] / impressionsDic[id];
        if (isNaN(ctr))
            ctr = 0;
        ctrDic[id] = ctr;
    }
> - En esta segunda sección de código que vemos arriba, lo que hacemos es contar cuantos productos tenemos con visitas unicas, clicks unicos y también calculamos el CTR, todo esto lo podemos llevar a cabo gracias a los diccionarios de datos que generamos en la primer sección de código

for (const key in visitsDic) {
      let product = new productClass(key, clicksDic[key], impressionsDic[key], ctrDic[key]);
      productsArray.push({
        productId: product.id,
        clicks: product.clicks == undefined ? 0 : product.clicks,
        impressions: product.impressions,
        ctr: product.ctr
      })
    }
    createNewStructure(productsArray);

> -  En esta sección de código que tenemos arriba, lo que hacemos es iterar en el diccionario de visitas, ya que este diccionario contiene todos los ID de los productos y con ayuda de una clase "producto", generamos objetos con las caracteristicas de la nueva estructura de datos con la que vamos a escribir el nuevo archivo "output.csv". Los tados los obtenemos de los diccionarios clickDic, impressionsDic y ctrDic y lo hacemos con el ID que obtenemos de visitisDic

> - Una vez que se iteró todo el diccionario de visitsDic y generamos el arreglo que contiene todos los objetos de tipo producto que generamos, dicho arreglo pasa como parametro de la función "createNewStructure" la cual se encarga de escribir el archivo "output.csv"; el código que escribe el archivo es el siguiente:

function createNewStructure(productsArray) {
  const createCsvWriter = require('csv-writer').createObjectCsvWriter;
  const csvWriter = createCsvWriter({
    path: 'output.csv',
    header: [
      { id: 'productId', title: 'Product ID' },
      { id: 'clicks', title: 'Clicks' },
      { id: 'impressions', title: 'Impressions' },
      { id: 'ctr', title: 'CTR' },
    ]
  });
  
  csvWriter
    .writeRecords(productsArray)
    .then(() => console.log('The CSV file was written successfully'));
  
}