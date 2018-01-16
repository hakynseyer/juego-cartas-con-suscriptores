'use strict'

// NO CODIGO SPAGUETI POR FAVOR, dañan mis hermosos ojos marrones ;P... hehehe [by: Hakyn Seyer]

class enrutadorSPA {
    constructor () {
        this.herramientaJD1 = new herramientasJD1()
    }

    cargarVista (vista, informacion) {
        switch (vista) {
            case 'cargando':
                return this.buscarVista(vista).then(() => {
                    this.generadorCargando(true, true)
                    this.agregandoVistas(vista, {tipo: 'personalizado', clase: 'cargandoHS-entrada'})
                })
                break
            case 'tablero':
                let tiempoEspera = 3000

                this.cargarVista('cargando').then(() => {
                    this.buscarVista(vista).then(() => {
                        setTimeout(() => {
                            if (typeof (informacion) !== 'undefiend')
                            $("#carga-texto").html(`<div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center; align-items: center;">
                            <h2> Bienvenido </h2>
                            <h2> "${informacion.toUpperCase()}" </h2>
                            </div>`);
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

    agregandoVistas (vista, animacionEntrada) {
        return new Promise (resolve => {
            if (typeof (animacionEntrada) === 'object') {
                switch (animacionEntrada.tipo) {
                    case 'personalizado':
                        $(`#${vista}`).addClass(animacionEntrada.clase)
                        resolve()
                        break
                }
            } else console.error('Te has olvidado de agregar la animacion para la entrada... Si te desconcentras nunca terminaremos')
        })
    }

    destruccionVistas (vista, animacionDestructiva) {
        return new Promise (resolve => {
            if (typeof (animacionDestructiva) !== 'undefined') {
                switch (animacionDestructiva) {
                    case 'destruirArriba':
                        $(`#${vista}`).animate({'top': '-100%'}, 2100, () => {
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

    entradasElementos (elemento, animacionEntrada, reemplazo) {
        return new Promise (resolve => {
            if (typeof (animacionEntrada) !== 'undefined' && typeof (elemento) === 'object') {
                switch (animacionEntrada) {
                    case 'normal':
                        $(`#${elemento.id}`).css('display', 'inline-block')
                        
                        if (typeof (elemento.inyectar) === 'object') {
                            $(`#${elemento.inyectar.id}`).html(elemento.inyectar.mensaje)
                        }

                        if (typeof (reemplazo) !== 'undefined') {
                            $(`#${reemplazo}`).animate({'opacity': 0}, 500, () => {
                                $(`#${reemplazo}`).css('display', 'none')
                                $(`#${elemento.id}`).animate({'opacity': 1}, 1000)
                            })
                        } else $(`#${elemento.id}`).animate({'opacity': 1}, 1000)

                        resolve()
                        break
                }
            }
        })
    }

    salidasElementos (elemento, animacionSalida) {
        return new Promise (resolve => {
            if (typeof (animacionSalida) !== 'undefined') {
                switch (animacionSalida) {
                    case 'normal':
                        $(`#${elemento}`).animate({'opacity': 0}, 500, () => {
                            $(`#${elemento}`).css('display', 'none')
                        })
                        resolve()
                        break
                    case 'opacidadDirecta':
                        $(`#${elemento}`).css('opacity', 0)
                        resolve()
                        break
                }
            }
        })
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

        this.herramientaJD1 = new herramientasJD1()
        
        let formData = new FormData($('#form-registro')[0]);

        ajaxFormulario.defaultAjax(formData, respuesta => {
            if (respuesta) {
                this.herramientaJD1.entradasElementos({id: 'registro-correcto'}, 'normal', 'formRegistro')
            }
        })
    }
    login () {
        this.herramientaJD1 = new herramientasJD1()

        if ($('#errorFormulario').find('span').text().length) {
            this.herramientaJD1.salidasElementos('errorFormulario', 'opacidadDirecta')
        }

        const ajaxFormulario = new ajaxDatos('login')
        

        let formData = new FormData($('#formLogin')[0])

        ajaxFormulario.defaultAjax(formData, respuesta => {
            if (respuesta.respuesta) {
                enrutadorHS.cargarVista('tablero', respuesta.usuario)
            } else if (!respuesta.respuesta) {
                this.herramientaJD1.entradasElementos({id: 'errorFormulario', inyectar: {id: 'spanFormularioError', mensaje: respuesta.mensaje}}, 'normal')
            }
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
