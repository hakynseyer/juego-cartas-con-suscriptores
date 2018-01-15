'use strict'

// NO CODIGO SPAGUETI POR FAVOR, dañan mis hermosos ojos marrones ;P... hehehe [by: Hakyn Seyer]

class enrutadorSPA {
    constructor () {
        this.herramientaJD1 = new herramientasJD1()
    }

    cargarVista (vista) {
        switch (vista) {
            case 'cargando':
                return this.buscarVista(vista).then(() => {
                    this.generadorCargando(true, true)
                })
                break
            case 'tablero':
                let tiempoEspera = 3000

                this.cargarVista('cargando').then(() => {
                    this.buscarVista(vista).then(() => {
                        setTimeout(() => {
                            $("#carga-texto").html("<h2> Iniciando Juego </h2>");
                            this.destruccionVistas('cargando', 'destruirArriba')
                        }, tiempoEspera)
                    })
                })
                break
            default:
                this.buscarVista(vista)

        }
    }

    buscarVista(vista) {
        // console.log(`${window.location.origin}/app/vistas/${vista}.php`)
        return $.ajax({
            url: `app/vistas/${vista}.php`,
            type: 'GET',
            success: (vistaConseguida) => {
                switch (vista) {
                    case 'cargando':
                        this.agregarHtml(vistaConseguida, {marco: 'cargando'})
                        break
                    default:
                        this.agregarHtml(vistaConseguida, {marco: 'juego', modo: 'unico'})
                }		
            },
            error: () => {
                // Si no logra encontrar el archivo php, entonces reinviarlo a una pagina php existente 404 o quizás redireccionarlo a otra vista default... Como tu quieras :P
                console.error(`Hasta que has decidido ver este mensaje mio. Mis sensores binarios me dicen que no se encuentra la pagina "${vista}"... No me hagas spamear <br> durante 1 hora... ¡CONCENTRATE!`)
                // this.cargarVista('bienvenida')
            }
        })
    }

    agregarHtml(vista, modoAgregacion) {
        if (typeof (modoAgregacion) === 'object') {
            if (modoAgregacion.marco === 'cargando') {
                $('#marcoCargando').html(vista)
            } else if (modoAgregacion.marco === 'juego') {
                switch (modoAgregacion.modo) {
                    case 'unico':
                        $('#marcoDelJuego').html(vista)
                        break
                    case 'lista':
                        // En desuso por si en un futuro se require agregar html sin borrar el anterior
                        $('#marcoDelJuego').append(vista)
                        break
                    default:
                        console.error('Hum... parece ser que escribiste mal el modo de agregacion html... ¡Claro que lo has escrito mal, ¿quien crees que soy yo?... ¿Un ser humano? !')
                        $('#marcoDelJuego').html(vista)
                }
            }
        } else console.error('Te has olvidado de agregar el objeto para colocar el html. No sé si llorar o... bueno, seguir llorando')
    }

    generadorCargando (icono, texto) {
        if (icono) {
            var iconos = [
                '<i class="fab fa-accessible-icon fa-spin fa-10x"></i>',
                '<i class="far fa-lemon fa-spin fa-10x"></i>',
                '<i class="fas fa-coffee fa-spin fa-10x"></i>',
                '<i class="fab fa-gitkraken fa-spin fa-10x"></i>',
                '<i class="fab fa-grav fa-spin fa-10x"></i>',
                '<i class="far fa-money-bill-alt fa-spin fa-10x"></i>',
                '<i class="fas fa-code fa-spin fa-10x"></i>'
            ];	
            var iconoElegido = this.herramientaJD1.numeroAleatorio(0, iconos.length);

            $("#carga-spinner").html(iconos[iconoElegido]);
        }

        if (texto) {
            var textoCarga = [
                'Exprimiendo la comida',
                'Incluyendo BR +18',
                'Creando H7 for history',
                'Tomando bebidas energéticas',
                'Tomando el 5º café del día'
            ];
            var textoElegido = this.herramientaJD1.numeroAleatorio(0, textoCarga.length);

            $("#carga-texto").html("<h2>" + textoCarga[textoElegido] + "</h2>");
        }
    }

    destruccionVistas (vista, animacionDestructiva) {
        return new Promise (resolve => {
            if (typeof (animacionDestructiva) !== 'undefined') {
                switch (animacionDestructiva) {
                    case 'destruirArriba':
                        $(`#${vista}`).animate({'top': '-100%'}, 2000, () => {
                            $(`#${vista}`).remove()
                            resolve()
                        })
                        break
                    default:
                        this.destruccionVistas(vista, 'destruirArriba')
                }
            } else console.error('Te has olvidado de agregar la animacion para la destrucción... Si te desconcentras nunca terminaremos')
        })
    }
}

class herramientasJD1 {
    numeroAleatorio (minimo, maximo) {
        return Math.floor((Math.random() * maximo) + minimo);
    }
}

class ajaxDatos {
    constructor(archivo) { 
        this.url = `app/controlador/${archivo}.php`;
    }
    defaultAjax(datos, ajaxCallback) {
        $.ajax({
            type: 'POST',
            url: this.url,
            dataType: 'JSON',
            cache: false,
            data: datos,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                ajaxCallback(respuesta);
            },
            error: function (error) {
                console.log(`Error del servidor ${JSON.stringify(error)}`)
            }
        }); 
    }
}

class formularios {
    registro () {
        const ajaxFormulario = new ajaxDatos('registro')
        
        let formData = new FormData($('#form-registro')[0]);

        ajaxFormulario.defaultAjax(formData, respuesta => {
            console.log(respuesta)
        })
    }
}

class eventosJuego {
    registro () {
        enrutadorHS.cargarVista('registro')
    }

    login () {
        enrutadorHS.cargarVista('login')
    }

    menuCartas () {
        enrutadorHS.cargarVista('menuCartas')
    }

    menuPrincipal () {
        enrutadorHS.cargarVista('menuPrincipal')
    }
}

// [!] Importante: Arriba de esta linea, deberán ir todas las clases sin excepción

var losEventos = new eventosJuego()
var losFormularios = new formularios()
var enrutadorHS = new enrutadorSPA()

document.addEventListener('DOMContentLoaded', function(){
    enrutadorHS.cargarVista('bienvenida')
}, false)
