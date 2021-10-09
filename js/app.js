(function() {
    'use strict';
    const numEqua1 = document.querySelector('.numero1');
    const numEqua2 = document.querySelector('.numero2');
    const equal = document.querySelector('.simbolo');
    const numResposta = document.querySelector('.numero3');
    const pergunta1 = document.querySelector('.pergunta1')
    const pergunta2 = document.querySelector('.pergunta2')
    const pergunta3 = document.querySelector('.pergunta3')
    const errado = document.querySelector('#errado');
    const correto = document.querySelector('#correto');
    const simbolo = document.querySelector(".menu ul");
    const titulo = document.querySelector('title');



    const obj = {
        adi: adicacao,
        sub: subtracao,
        mult: multiplicacao,
        div: divicao
    }

    simbolo.querySelector('[data-simbol="adi"]').addEventListener("click", marcarTexto)
    simbolo.querySelector('[data-simbol="sub"]').addEventListener("click", marcarTexto)
    simbolo.querySelector('[data-simbol="mult"]').addEventListener("click", marcarTexto)
    simbolo.querySelector('[data-simbol="div"]').addEventListener("click", marcarTexto)








    function adicacao() {

        let random1 = Math.floor(Math.random() * 13);
        let random2 = Math.floor(Math.random() * 13);

        let repostasIdiotas1 = Math.floor(Math.random() * 10);
        let repostasIdiotas2 = Math.floor(Math.random() * 10);
        let resposta = random1 + random2;
        equal.innerHTML = '+';
        numerosAleatorios(random1, random2, repostasIdiotas1, repostasIdiotas2, resposta)
        titulo.innerHTML = 'Adição';


    }

    function subtracao() {
        let random1 = Math.floor(Math.random() * 13);
        let random2 = Math.floor(Math.random() * 13);

        let repostasIdiotas1 = Math.floor(Math.random() * 10);
        let repostasIdiotas2 = Math.floor(Math.random() * 10);


        if (random1 > random2) {
            let resposta = random1 - random2;
            numerosAleatorios(random1, random2, repostasIdiotas1, repostasIdiotas2, resposta);
        } else {
            let resposta = random2 - random1;
            numerosAleatorios(random2, random1, repostasIdiotas1, repostasIdiotas2, resposta);
        }

        equal.innerHTML = '-';
        titulo.innerHTML = 'Subtração';

    }

    function multiplicacao() {
        let random1 = Math.floor(Math.random() * 13);
        let random2 = Math.floor(Math.random() * 13);

        let repostasIdiotas1 = Math.floor(Math.random() * 50);
        let repostasIdiotas2 = Math.floor(Math.random() * 50);
        let resposta = random1 * random2;
        equal.innerHTML = '*';
        numerosAleatorios(random1, random2, repostasIdiotas1, repostasIdiotas2, resposta);
        titulo.innerHTML = 'Multiplicação';

    }


    function divicao() {
        let random1 = Math.floor(Math.random() * 13) + 1;
        let random2 = Math.floor(Math.random() * 13) + 1;

        let repostasIdiotas1 = Math.floor(Math.random() * 10) / 10;
        let repostasIdiotas2 = Math.floor(Math.random() * 10);


        if (random1 > random2) {
            let resposta = random1 / random2;

            Number.isInteger(resposta) == false ? resposta = resposta.toFixed(1) : resposta;

            numerosAleatorios(random1, random2, repostasIdiotas1, repostasIdiotas2, resposta);
        } else {
            let resposta = random2 / random1;
            Number.isInteger(resposta) == false ? resposta = resposta.toFixed(1) : resposta;
            numerosAleatorios(random2, random1, repostasIdiotas1, repostasIdiotas2, resposta);
        }

        equal.innerHTML = '/';
        titulo.innerHTML = 'Divisão';


    }

    function marcarTexto(elemento) {
        const dataSimbol = elemento.target;

        [...simbolo.querySelectorAll('li a')].forEach(el => {
            el.removeAttribute('class')
        })
        dataSimbol.setAttribute("class", "marcado")

        obj[dataSimbol.dataset.simbol]()
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    function numerosAleatorios(random1, random2, repostasIdiotas1, repostasIdiotas2, resposta) {

        repostasIdiotas1 == repostasIdiotas2 || repostasIdiotas1 == resposta ? repostasIdiotas1 = (repostasIdiotas1 + 1) : repostasIdiotas1;

        repostasIdiotas2 == repostasIdiotas1 || repostasIdiotas2 == resposta ? repostasIdiotas2 = (repostasIdiotas2 + 1) : repostasIdiotas2;



        let todasRespostas = [repostasIdiotas1, repostasIdiotas2, resposta]

        numEqua1.innerHTML = random1;
        numEqua2.innerHTML = random2;


        shuffle(todasRespostas)

        pergunta1.innerHTML = todasRespostas[0];
        pergunta2.innerHTML = todasRespostas[1];
        pergunta3.innerHTML = todasRespostas[2];
    }

    function clique() {
        pergunta1.addEventListener('mouseup', respostaCorreta);
        pergunta2.addEventListener('mouseup', respostaCorreta);
        pergunta3.addEventListener('mouseup', respostaCorreta);
    }

    clique();



    function respostaCorreta(e) {

        const resposta = eval(numEqua1.innerHTML + equal.innerHTML + numEqua2.innerHTML);

        console.log(e.target.innerHTML)
        if (Number(e.target.innerHTML).toFixed(1) == resposta.toFixed(1)) {
            correto.play()

            numResposta.innerHTML = e.target.innerHTML;
            numResposta.classList.add('acerto')
            pergunta1.removeEventListener('mouseup', respostaCorreta);
            pergunta2.removeEventListener('mouseup', respostaCorreta);
            pergunta3.removeEventListener('mouseup', respostaCorreta);

            setTimeout(function() {
                numResposta.classList.remove('acerto')
                numResposta.innerHTML = '?';
                obj[document.querySelector('.marcado').dataset.simbol]()
                clique();
            }, 1300);
            return
        }
        errado.play()

    }

    adicacao()


})()