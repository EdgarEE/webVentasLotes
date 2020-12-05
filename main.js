const grid = new Muuri('.grid',{
    layout : { 
        
        rounding : true , 
    }
});

window.addEventListener('load', () => {
    grid.refreshItems();
    document.getElementById('grid').classList.add('imagenes-cargadas');

//agregamos los listener de los enlaces para filtrar por categoria
    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento)=>{
        console.log(elemento);

        elemento.addEventListener('click', (evento)=>{
            evento.preventDefault();
            console.log(evento.target);
            enlaces.forEach((enlace)=> enlace.classList.remove('Activo'));
            evento.target.classList.add('Activo');

            const categoria = evento.target.innerHTML.toLowerCase();

            categoria === 'todos' ? grid.filter(`[data-category]`): grid.filter(`[data-category=${categoria}]`)

            
            console.log(categoria);

        });
    });

    //agregamos el listener para la barra de busqueda

    document.querySelector('#barra-busqueda').addEventListener('input', (evento)=>{
        const busqueda = evento.target.value;
        grid.filter(item =>item.getElement().dataset.etiquetas.includes(busqueda));
    })

    //listener para las imagenes
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento)=>{
        
        elemento.addEventListener('click', ()=>{
            const ruta = elemento.getAttribute('src');
            const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
            // console.log(descripcion);
            overlay.classList.add('activo')
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay .descripcion').innerHTML = descripcion;
            

        });
    });

    //eventlistener boton cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        
        overlay.classList.remove('activo');
    });
    //listener del overlay

    overlay.addEventListener('click', (evento)=>{
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    })
   
});