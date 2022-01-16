# Backend Servicio Notas para Proyecto de FIS

# Para más consultar en la Wiki de este repositorio.

```
1º npm install
```

```
2º npm start
```
Servicio Notas realizado por Manuel García y Rocío Vecino. Este repositorio contiene toda la información para poder acceder a un cluster de Mongo Atlas,
despliegue en okteto, pruebas unitarias y de integración, servicios REST (get,put,post,delete) sobre las notas y su respectivas validaciones, apikey para ejecutar dichos servicios REST.
En avanzado tenemos una implementación del servicio AWS S3 bucket, con el que podemos subir un archivo desde nuestro servicio a un cloud de S3 (AMAZON) y una documentación de nuestra API en Swagger.

ESQUEMA DE LA COLECCIÓN DEL MODELO DE SERVICIO NOTAS.  

Para nuestro microservicio de notas, hemos hecho uso de Mongo Db. En un primer momento estuvimos haciendo uso de Mongo Compass, hasta que hicimos la integración o relación de nuestro backend con Mongo Atlas. 
El modelo que sigue nuestro microservicio es que se muestra en la siguiente imagen:
 
Donde como se ve, están los siguientes atributos:
-	Tendrá nota de tipo String (Suspenso, Aprobado, Notable, Sobresaliente). 
-	Tendrá una asignatura (que será la relación con el microservicio de Materias). 
-	Tendrá un alumno.
-	ImagenIdentificacion: este atributo del modelo servirá para subir imágenes o archivos al sistema de Amazon S3.

MÉTODOS DEL BACKEND DE SERVICIO NOTAS.

En nuestro backend se hace uso de algunos métodos de API REST. Que son los siguientes: 

-	GET: Obtiene las notas que se encuentren almacenadas en nuestra Base de Datos de Mango. En la siguiente imagen se puede ver un ejemplo de dicha funcionalidad haciendo uso de postman. 

-	POST: Método Post para insertar las notas de los alumnos. 

-	GET: obtener nota por id de la nota. 

-	PUT: dado un id de la nota lo modifica.

-	DELETE: Dado un id de una nota elimina la nota.

-	POST y GET de la imagen de la identificación (s3).

FRONTEND.

En el frontend se trata de implementar la funcionalidad de los métodos desarrollados en el backend. Por lo tanto, nuevamente tendrá la siguiente funcionalidad. 
-	Añadir la nota de un alumno. 
-	Get: Mostrar la lista de calificaciones que hay en la base de datos de Mongo Atlas. 
-	Modificar una determinada nota de un alumno. 
-	Eliminar una determinada nota de un alumno.
A parte de esta funcionalidad, también se encuentra la relacionada con la funcionalidad de la implementación de Amazon S3, que son las siguientes: 
-	Get: Mostrar la imagen subida a Amazon S3 de una nota determinada.
-	Post: Añadir o modificar una imagen o archivo asociada a la nota. 
Como ejemplo del frontend, se puede ver la siguiente imagen: 
 
SWAGGER.

Una de las implementaciones de nivel avanzado en el backend del microservicio de notas es Swagger. Una herramienta que hemos descubierto que es muy útil. Permitiendo probar todos los métodos de nuestro backend sin tener necesidad de desarrollar el frontend. Además, Se le puede pasar al cliente de un SaaS para que interactúe y diseñe su propia integración.
Un ejemplo de esta aplicación se puede ver en la siguiente imagen: 
 
Muy útil para realizar todas las pruebas de forma rápida de las integraciones API REST de nuestro microservicio. 
AMAZON S3.
También, se implementa el uso de Amazon S3 que mediante el uso de esta herramienta permite guardar imágenes en la nube. Pudiendo consultar y hacer post (Insertar) la imagen. Un ejemplo se puede ver en la siguiente imagen: 
 

TRABAJO PENDIENTE.

Algo que nos hubiese gustado implementar son los siguientes puntos: 

-	Poner un botón e implementar en el frontend una función para que nos devolviera un Excel con las notas de los estudiantes, pudiendo poner unos criterios de búsqueda a introducir por el usuario en el frontend para que solo descargara en el Excel los datos que desea el usuario final. 

-	Integrar un api externo para realización de una firma digital. Tendría dos métodos principalmente: 

o	Get: Para conseguir la firma digital. 
o	Post: Para insertar la firma digital. 
El enlace en el que se ve la posible integración es el siguiente: https://rapidapi.com/collection/best-esignature-apis
-	Implementación de una firma digital sin hacer uso de una api externa, sino haciendo uso de una librería de node que es la siguiente: node-signpdf. En ambos casos primero se crearía un pdf con los resultados obtenidos a partir de unos filtros de búsqueda del usuario. La investigación de como hacerlo y que consideramos muy interesante se encuentra en los siguientes enlaces: https://medium.com/caution-your-blast/how-to-digitally-sign-a-pdf-programmatically-using-javascript-nodejs-54194af7bdc3 y https://www.pdftron.com/documentation/nodejs/guides/features/signature/

LO QUE HEMOS APRENDIDO.

Hemos aprendido lo siguiente: 
-	Al menos en nuestro caso, no sabíamos mucho del Javascript, node, mongo, react (mern). Hemos descubierto el cambio que supone de hacer uso de una base de datos relacional tipo SQL y uno no relacional tipo mongo. Es un cambio grande cuando solo habíamos trabajado con base de datos relacionadas. 

-	Hemos descubierto que, aunque parezca que solo es ver los videos del profesor para realizar el trabajo no es así, ya que al traspasar los vídeos del profe a nuestro pequeño microservicio siempre podemos tener pequeños problemas que puede tenernos bloqueados como una semana. 

-	Trabajar en equipo no solo en parejas con nuestro microservicio sino la ayuda que hay entre todos los miembros del equipo para que todos vayamos por buen sendero. 

-	Que nos queda mucho por aprender en relación con los microservicios y que puede haber muchas fuentes para aprender más. 

TIEMPO INVERTIDO.

El tiempo invertido puede rondar entre las 140 horas o más aproximadamente. Ya que hay que tener en cuenta las siguientes razones: 
-	Ver vídeos prácticos del profesor. 

-	Trasponer el contenido del profesor de los vídeos y de clase a nuestro microservicio. 

-	Resolución de errores. 

-	Investigación de las funcionalidades adicionales que se podría añadir a nuestro microservicio. 

-	Quedadas en grupo para montar la idea del proyecto, dividir los microservicios, dudas y seguimiento, conectar los microservicios en okteto, pruebas, etc. 
