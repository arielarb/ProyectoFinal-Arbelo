//Class constructor para instanciar los espectáculos (llamados eventos) como objetos
class Evento {
  constructor(id, imagen, nombre, categoria, lugar, precio, fecha, cantidad, entradasDisponibles){
    this.id = id;
    this.imagen = imagen;
    this.nombre = nombre;
    this.categoria = categoria;
    this.lugar = lugar;
    this.precio = precio;
    this.fecha = fecha;
    this.cantidad = cantidad;
    this.entradasDisponibles = entradasDisponibles;
  }
  //Por cada entrada que se adquiere (como compra final, no como suma al carrito), se va restando esa cantidad de su respectivo stock
  restaEntradasDisponibles(){
    this.entradasDisponibles = this.entradasDisponibles - 1;
  }
}


//Creación de espectáculos disponibles como objetos a partir del class constructor anterior
const evento1 = new Evento(1, "https://cineargentinohoy.com.ar/wp-content/uploads/2022/08/1-scaled.jpeg", "'Casados con hijos'", "Teatro", "Teatro Gran Rex", 10000, "Lunes 25 de julio de 2023", 1, 500);
const evento2 = new Evento(2, "https://i.axs.com/2018/01/disney-on-ice-frozen-tickets_04-05-18_18_5a5e8ba257a65.png","'Frozen on Ice'", "Show infantil", "Luna Park", 8000, "Lunes 15 de junio de 2023", 1, 1000);
const evento3 = new Evento(3, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSACCMlsnC5faOJTHqycA7k0G34zdfDPiAqqA&usqp=CAU","'Solomun'", "Concierto", "Mandarine Park", 7000, "Sabado 8 de diciembre 2023", 1, 5000);
const evento4 = new Evento(4, "https://i1.sndcdn.com/avatars-000102321276-9sqdg3-t500x500.jpg","'La Delio Valdez'", "Concierto", "Teatro Metropolitan", 9000, "Jueves 30 de julio de 2023", 1, 800);
const evento5 = new Evento(5, "https://4.bp.blogspot.com/_4QdTFsWN00Q/TUzWj3YXbMI/AAAAAAAAAzs/IROEL9mdWpU/s1600/11+Toc+Toc.jpg","'TOC TOC'", "Teatro", "Teatro Gran Rex", 5000, "Viernes 15 de agosto de 2023", 1, 1000);

//Array de espectáculos
const listaEventos = [evento1, evento2, evento3, evento4, evento5];


//Guardar array en el Storage
localStorage.setItem("Eventos", JSON.stringify(listaEventos))