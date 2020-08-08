$(document).ready( function(){

  var rodada = 1;

  //matriz inicial jogo
  var matriz_jogo = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]


  $('#btn_iniciar_jogo').click( function(){
      //valida a digitação dos apelidos dos jogadores
      if($('#entrada_apelido_jogador_1').val() == ''){
          alert('Apelido do jogador 1 não foi preenchido');
          return false;
      }
      if($('#entrada_apelido_jogador_2').val() == ''){
          alert('Apelido do jogador 2 não foi preenchido');
          return false;
      }
      //exibir os apelidos, criar os spans
      $('#nome_jogador_1').html($('#entrada_apelido_jogador_1').val());
      $('#nome_jogador_2').html($('#entrada_apelido_jogador_2').val());
      //controlar visualização das divs
      $('#pagina_inicial').addClass('d-none');
      $('#palco_jogo').removeClass('d-none');
  });
  
  $('.jogada').click(function() {
    var id_campo_clicado = this.id;
    $('#'+id_campo_clicado).removeClass('jogada');
    $('#'+id_campo_clicado).off();
    jogada(id_campo_clicado);
  });


  function jogada(id) {
    var icone = '';
    var ponto = 0;

    if((rodada % 2) == 1) {
      icone = 'url("../imagens/marcacao_1.png")';
      ponto = -1;
    }
    else {
      icone = 'url("../imagens/marcacao_2.png")';
      ponto = 1;
    }

    rodada++;

    $('#'+id).css('background-Image', icone);
    

    matriz_jogo[id[0]][id[1]] = ponto;

    //console.log(matriz_jogo);

    verifica_combinacao();
  }


  function verifica_combinacao(){
      //verifica na horizontal linha A
      var pontosHorizontal = 0;
      var pontosVertical = 0;
      var pontosDiagonal = 0;

      for (let i = 0; i < 3; i++) {
        pontosHorizontal = 0;
        pontosVertical = 0;
        for(var j = 0; j < 3; j++){
          pontosHorizontal += matriz_jogo[i][j];
          pontosVertical += matriz_jogo[j][i];
        }
        ganhador(pontosHorizontal);
        ganhador(pontosVertical);
      }
      
      //verificar na diagonal
      pontosDiagonal = 0;
      pontosDiagonal = matriz_jogo[0][0] + matriz_jogo[1][1] + matriz_jogo[2][2];
      ganhador(pontosDiagonal);
      pontosDiagonal = 0;
      pontosDiagonal = matriz_jogo[0][2] + matriz_jogo[1][1] + matriz_jogo[2][0];
      ganhador(pontosDiagonal);
  }

  function ganhador(pontos){
    if (rodada <= 9){
      if(pontos == -3){
          var jogada_1 = $('#entrada_apelido_jogador_1').val();
          //alert(jogada_1 + ' é o vencedor');
          $('#vencedor').html('Parabéns ' + jogada_1).val();
          $('#jogador01').addClass('bouncing');
          $('.jogada').off();
      } else if(pontos == 3){
          var jogada_2 = $('#entrada_apelido_jogador_2').val();
          //alert(jogada_2 + ' é o vencedor');
          $('#vencedor').html('Parabéns ' + jogada_2).val();
          $('#jogador01').addClass('bouncing');
          $('.jogada').off();
      }
      $('#vitoria').removeClass('d-none');
    }
    else {
      $('#vencedor').html('Partida empatada').val();
      $('#vitoria').show();
    }
  }
});