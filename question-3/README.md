# Enunciado 3

> Implementar un método de verificación lógica de paréntesis. Es decir, implementar el método `parenthesisChecker(str)` que recibe un `string` como parámetro y devuelve un `boolean`. La respuesta del método debe ser `true` si la cadena de `string` es válida en términos de paréntesis (`( )`, `[ ]`, `{ }`), i.e. cada apertura de paréntesis se cierra correctamente. A continuación se muestran ejemplos de `string` válidos e inválidos.
> 
> **Ejemplos válidos**: la función debe devuelve `true`.
>
> - `parenthesisChecker('a * (b + c)')` → `true`
> - `parenthesisChecker('a * (b + c * [d])')` → `true`
> - `parenthesisChecker('[]{}()abc{([])}')` → `true`
>
> **Ejemplos válidos**: la función debe devuelve `false`.
>
> - `parenthesisChecker('(()')` → `false`
> - `parenthesisChecker('(([))')` → `false`
> - `parenthesisChecker('([)]')` → `false`

# Razonamiento

_Escribir aquí los supuestos asumidos, reflexiones y explicaciones de la solución_

> - Lo primero que pensé fue en separar en un arreglo todos los parentesis para tener un mejor manejo ya que las letras y otros caracteres no importan en este ejercicio
    for (let i = 0; i < string.length; i++) {
        const char = string.charAt(i);
        if (openParenthesis[char] || closeParenthesis[char]) {
            parenthesisArray.push(char);
        }
    }
 - ¿Como separa los parentesis? 
 - El ciclo for se encarga de iterar la cadena de texto que contiene el texto de entrada con caracteres y parentesis.
 - En la variable char separamos el caracter en el que está posisionado con respecto a el valor de i.
 - La condicional IF se encarga de revisar si el caracter almacenado en char, es igual a los posibles parentesis que existen, estos parentesis estan almacenados en los objetos openParenthesis y closeParenthesis; como sus nombres lo dicen, el objeto openParenthesis contiene los parentesis de apertura y closeParenthesis contiene los parentesis de cierre.
 - Dicho de otra manera, lo que hace es ver si el caracter es un parentesis o no
 - Si sí es un parentesis, lo guardará en el arreglo parenthesisArray. Este arreglo es el que almacenará todos los parentesis que tenga nuestra cadena.
> - Ahora se viene la primer comprobación dentro del arreglo parenthesisArray, esta confirmación es por medio de una condicional IF
    if (parenthesisArray[0] in closeParenthesis)
        return false;
 - Lo que verifica es que el primer parentesis almacenado en el arreglo de parentesis, no sea un parentesis de cierre, porque si es de cierre entonces desde ahí ya esta mal ya que no hay parentecis de apertura.
 - En este momento se estaría finalizando la inspección de parentesis retornado false.
> - Mientras que la condición anterior no se cumpla podemos continuar con la inspección de parentesis
 - Entramos a un ciclo for que se encargará de iterar en el arreglo de parentesis parenthesisArray
    for (let i = 0; i < parenthesisArray.length; i++) {

 - Esta condicional if verifica que el parentesis situado en el valor de i, sea un parentesis de apertura
        if (parenthesisArray[i] in openParenthesis) {
        let j = i;
 - En caso de que se cumpla la condicional anterior, entraremos nuevamente en un ciclo, esta vez WHILE
 - Este ciclo se encarga de interar desde la posisión actual del arreglo parenthesisArray hacia atras
        while (j >= 0) {
            const p = parenthesisArray[j];
 - Itera hacia atras con la intención de encontrar parentesis de apertura que no han sido cerrados
 - Por eso entramos en la siguiente condicional IF que verifica que el parentesis recogido en la variable p pertenezca al gurpo de los parentesis de apertura
            if (p in openParenthesis) {
 - Al comprobar lo anterior, almacena el parentesis en el arreglo parenthesisPendingClose que se encargará de almacenar todos los parentesis que aun no han sido cerrados
            parenthesisPendingClose.push(p);
            j = -1;
            }
            j--;
 - La siguiente linea de código se encarga de recoger el ultimo parentesis almacenado en el arreglo de parentesis pendientes de cierre
            a = parenthesisPendingClose[parenthesisPendingClose.length - 1];
 - Asignamos el parentesis de cierre correspondiente al parentesis de apertura que recogimos en la linea anterior
            a = a == '(' ? ')' : a == '['? ']' : a == '{' ? '}' : '*';
        }
 - En la variable aux almacenamos el parentesis que está en la posisión actual del arreglo parenthesisArray
        aux = parenthesisArray[i];
 - Seleccionamos el parentesis de cierre correspondiente de acuerdo al parentesis recogido en la variable aux y lo asignamos a next. Esto se hace con la intensión de decir que este parentesis de cierre será el parentesis que puede seguir en el arreglo parenthesisArray en caso de que el siguiente parentesis no sea de apertura
        next = aux == '(' ? ')' : aux == '[' ? ']' : aux == '{' ? '}': '*';
 - Incrementamos en 1 el valor de open ya que esta variable llevará el conteo de los parentesis de apertura
        open++;
 - En caso de que el parentesis ubicado en la posisión actual del arreglo parenthesisArray no sea parentesis de apertura, entramos en esta condicional que verifica si es igual al parentesis asignado a la variable next (parentesis de cierre)
        } else if (parenthesisArray[i] == next) {
            redifineValues();
            close++;
 - En caso de que el parentesis actual tampoco seá igual al parentesis en next (parentesis de cierre), verificamos si es igual al parentesis almacenado en la variable "a" recordemos que "a" guarda el parentesis de cierre correspondiente al ultimo parentesis alamacenado en el arreglo de parentesis pendietes de ser cerrados.
        } else if (parenthesisArray[i] == a) {
            redifineValues();
            close++;
        } else return false;
    }
> - Con referencia a la funcion implementada "redifineValues()"
    function redifineValues() {
        next = '*';
        parenthesisPendingClose.pop();
        a = parenthesisPendingClose[parenthesisPendingClose.length - 1];
        a = a == '(' ? ')' : a == '['? ']' : a == '{' ? '}' : '*';
    }
 - Esta función lo que hace basicamente es asignarle un * a las variables next y "a". Recordemos que esta función se llama cuando el parentesis actual en el arreglo parenthesisArray es un parentesis de cierre y el * es una forma de decir que no hay parentesis de cierre con el que se pueda comparar el proximo parentesis en parenthesisArray

> - Lo ultimo que resta por hacer es definir que el total de parentesis de apertura sea igual al total de parentesis de cierre y retornar true o false según corresponda
    return open == close ? true : false;