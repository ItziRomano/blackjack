
const miModulo = ( ()=> {
    'use strict'
    
    
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
    
    
    let puntosJugadores = [];
    
    // referencias de html
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');
    
    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    // esta funcion inicializa el juego
          const inicializarJuego = ( numJugadores = 2 ) => {
            deck = crearDeck();

            puntosJugadores = [];
            for( let i = 0; i< numJugadores; i++ ) {
                puntosJugadores.push(0);
            }

         
        // puntosJugador = 0;
        // puntosComputadora = 0;
        
        puntosHTML.forEach( elem => elem.innerText = 0 );
        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
    
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );
        // divCartasComputadora.innerHTML = '';
        // divCartasJugador.innerHTML = '';
    
        btnPedir.disabled = false;
        btnDetener.disabled = false;
            // console.log({ puntosJugadores});
        }
    
    // esta funcion crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        for( let i = 2; i <= 10; i++ ) {
            for( let tipo of tipos ) {
            deck.push( i + tipo);
            }
            
        }
    
        for( let tipo of tipos ) {
            for( let esp of especiales ) {
                deck.push(esp + tipo);
            }
        }
        return _.shuffle( deck );
    }
    
    
    // esta funcion me permite tomar una carta
    const pedirCarta = ( ) => {
        
        if( deck.length === 0 ) {
            throw 'No hay cartas en el deck';
        }
         
    
        return deck.pop();
    }
    
    // pedir carta
    const valorCarta = ( carta ) => {
         const valor = carta.substring(0, carta.length - 1);
         return ( isNaN(valor)) ? 
                (valor === 'A' ) ? 11 : 10
                :valor * 1
    }
    
// turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) =>{

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }


    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
         imgCarta.src = `assets/cartas/${ carta }.png`;
         imgCarta.classList.add('carta');
         divCartasJugadores[turno].append( imgCarta );
         
    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores
        
        setTimeout(() => {
            if( puntosComputadora === puntosMinimos) {
               alert('Nadie gana :(');
            }else if ( puntosMinimos > 21 ) {
               alert('Computadora gana')
            }else if ( puntosComputadora > 21 ) {
               alert('Jugador gana');
            }else{
               alert('Computadora gana');
            }
           }, 100 );
    }

    // turno de la computadora
     const turnoComputadora = ( puntosMinimos ) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1 );
        // puntosComputadora = puntosComputadora + valorCarta( carta );
        // puntosHTML[1].innerText = puntosComputadora;
    
        // <img class="carta" src= "assets/cartas/2S.png">
        //  const imgCarta = document.createElement('img');
        //  imgCarta.src = `assets/cartas/${ carta }.png`;
        //  imgCarta.classList.add('carta');
        //  divCartasComputadora.append( imgCarta )
    
        //  if ( puntosMinimos > 21 ) {
        //     break;
        //  }
    
        } while( ( puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 ) );
    
        determinarGanador();
    }
        
    // eventos
    btnPedir.addEventListener('click', () => {
        
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );

        crearCarta( carta, 0);
        // puntosJugador = puntosJugador + valorCarta( carta );
        // puntosHTML[0].innerText = puntosJugador;
    
        // <img class="carta" src= "assets/cartas/2S.png">
        //  const imgCarta = document.createElement('img');
        //  imgCarta.src = `assets/cartas/${ carta }.png`;
        //  imgCarta.classList.add('carta');
        //  divCartasJugador.append( imgCarta )
    
         if( puntosJugador > 21 ) {
            console.warn('Ya perdiste')
            btnPedir.disabled = true;
            turnoComputadora( puntosJugador );
    
         } else if ( puntosJugador === 21 ) {
            console.warn('21, genial!')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
    
            turnoComputadora( puntosJugador );
    
         }
    });
    
    // boton detener
    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    
        turnoComputadora( puntosJugadores[0] );
    })
    
    // boton juego nuevo
    // btnNuevo.addEventListener('click',() => {
        
    // //     // console.clear();
    //     inicializarJuego();
        
    // });


    return {
        nuevoJuego: inicializarJuego
    };

})();








