# Genoma Works Challenge

@MejorConTocino, está en busca de los mejores restaurantes del mundo, y le pidió ayuda a sus seguidores para construir una base de datos que le permita llevar registro de estos. ¡Dado que le entrego la mejor solución, podré acompañarla en su recorrido por el mundo probando distintos manjares! (lo voy a cobrar).

## Cómo ejecutar esto

En el directorio del proyecto, iniciar el servidor de backend:

```python setup.py```

> Nota: Puede que deba usar `python3 setup.py` si tiene múltiples instalaciones de Python en su máquina.

Luego, en una nueva terminal, instalar las bibliotecas necesarias con:

```npm install```

Y luego iniciar el servidor del frontend:

```npm start```

### Alternativa

Puedes ejecutar ambos en una sola terminal:

```python setup.py & npm start```

## Tecnologías usadas

En general se ha elegido usar lo más básico y simple posible. Para la base de datos de ha utilizado SQLite que viene dentro de las bibliotecas estándar de Python.

En tanto al servidor, también se han utilizado las bibliotecas que vienen incluidas por defecto, con `http.server`.

Para el frontend, se ha utilizado un servidor React con pocos componentes, y se ha utilizado la biblioteca [Bootstrap](https://getbootstrap.com/) para estilar los componentes. Esta última elección se ha realizado por la simplicidad de uso de esta, por su alta adopción en la industria y por experiencia del equipo.

## Por hacer

Este ha sido un corto entretenimiento, pero tiene una gran cantidad de falencias básicas que **deberían** ser enfrentadas pronto (si realmente se quisiera usar esta herramienta para algo).

1. Mostrar indicadores de carga siempre que se haga alguna solicitud al *backend*. Estas pueden ser lentas y no se puede dejar al usuario con la duda de si su solicitud se está procesando o no.
1. Repensar la interfaz para algo más ordenado, bonito, con una imagen de marca más clara y con enlaces de interés, como el instagram de @MejorConTocino.
1. Probar la compatibilidad con más sistemas operativos y navegadores. Durante el desarrollo rápido no fue considerado como una propiedad.

## Contacto

Desarrollado por Vicente Saona Urmeneta con propósitos educativos, ningún derecho reservado.

Cualquier duda, referirse a mi correo: vicente.saona@sansano.usm.cl