# Enunciado 1

> Estás subiendo una escalera de N peldaños. En cada momento, puedes subir 1 o 2 peldaños. ¿En cuántas formas diferentes puedes subir las escalera?

# Razonamiento

_Escribir aquí el razonamiento al puzzle_
> Si tengo una escalera de 1 peldaño solo la puedo subir de una manera, subiendo un peldaño
> Si tengo una escalera de 2 peldaños, la puedo subir de dos maneras, subiendo un peldaño a la vez o subiendo 2 peldaños a la vez
> Si tengo una escalera de 3 peldaños, la puedo subir de tres maneras, subiendo un peldaño a la vez, subiendo 1 peldaño y luego 2 o subiendo 2 peldaños y luego 1
> Siguendo el esquema panteado me di cuenta que apartir de una escalera de 3 peldaños el número de formas de subir la escalera, es la suma de las dos formas de subir la escalera anteriores
> Por lo tanto implementé dos variables first = 1 y second = 2 que representan las formas de subir la escalera de 1 y 2 peldaños respectivamente
> Después tengo una condicional if que cuestiona si args es menor a 3, esto debido a que si es igual a 1 o a 2, no aplica la parte de sumar las dos formas anteriores de subir escaleras para obtener la siguiente
> El ciclo for nos ayuda a ir sumando las dos formas anteriores de subir la escalera y las asigna a la constante last que representa el ultimo número de formas de subir la escalera de n peldaños
> Después reasigna valores a las variables first y second colocando a first el valor de second y a second el valor de last. De esta manera para la iteracion cuando i = 4, first = 2 y second = 3 por lo tanto last = 5 y al reasignar valores first = 3 y second = 5
> De esta manera es como se logra obtener el numero de formas de subir una escalera de n peldaños