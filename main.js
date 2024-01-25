$(document).ready(function() {
    // Inicializa DataTables
    const tabla = $('#tablaUniversidades').DataTable({
        lengthChange: false, // Desactiva el cambio de longitud ya que no se pide.
        
      });
  
    // Se agrega un evento de cambio al dropdown
    $('#selectorPais').on('change', function() {
      const paisSeleccionado = $(this).val();
      
      // Limpiar tabla antes de mostrar los datos
      tabla.clear().draw();
  
      // Se definen las dos URLs de la API
      const urlEstadosUnidos = 'http://universities.hipolabs.com/search?country=United+States';
      const urlMexico = 'http://universities.hipolabs.com/search?country=Mexico';
  
      // Determina cuál URL utilizar según la opción seleccionada
      let urlConsulta;
      if (paisSeleccionado === 'EstadosUnidos') {
        urlConsulta = urlEstadosUnidos;
      } else {
        urlConsulta = urlMexico;
      }
  
      // Realiza la solicitud fetch para obtener el JSON desde la API
      fetch(urlConsulta)
        .then(response => response.json())
        .then(data => {
          // Recorrer los datos y agregarlos a la tabla "tablaUniversidades"
          data.forEach(item => {
            tabla.row.add([
              item.name,
              item.alpha_two_code,
              item.country,
              item['state-province'],
              item.domains,
              item.web_pages.length > 0 ? item.web_pages[0] : 'N/A',
            ]).draw(false);
          });
        })
        .catch(error => console.error('Error al consultar los datos desde la API:', error));
    });
  
    // Al cargar la página, realiza la primera consulta con el país inicial
    const paisInicial = $('#selectorPais').val();
    $('#selectorPais').trigger('change'); // Simula el evento de cambio para la primera consulta
  });
  