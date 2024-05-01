$(document).ready(function () {
    cardapio.eventos.init();
  });
  var cardapio = {};
  var MEU_CARRINHO = [];
  var MEU_ENDERECO = null;
  var VALOR_CARRINHO = 0;
  cardapio.eventos = {init: () => {
    cardapio.metodos.obterItensCardapio();
  }};
  cardapio.metodos = {obterItensCardapio: (_0x1ffa6c = "burgers", _0x2585af = false) => {
    let elizabeth = MENU[_0x1ffa6c];
    if (!_0x2585af) {
      $("#itensCardapio").html("");
      $("#btnVerMais").removeClass("hidden");
    }
    $.each(elizabeth, (milvia, xola) => {
      let hannaleigh = cardapio.templates.item.replace(/\${imagem}/g, xola.img).replace(/\${nome}/g, xola.name).replace(/\${preco}/g, xola.price.toFixed(2).replace(".", ",")).replace(/\${id}/g, xola.id);
      console.log("vermais", _0x2585af);
      console.log("i", milvia);
      if (_0x2585af && milvia >= 8 && milvia < 12) {
        $("#itensCardapio").append(hannaleigh);
      }
      if (!_0x2585af && milvia < 8) {
        $("#itensCardapio").append(hannaleigh);
      }
    });
    $(".container-menu a").removeClass("active");
    $("#menu-" + _0x1ffa6c).addClass("active");
  }, verMais: () => {
    var badri = $(".container-menu a.active").attr("id").split("menu-")[1];
    console.log("ativo", badri);
    cardapio.metodos.obterItensCardapio(badri, true);
    $("#btnVerMais").addClass("hidden");
  }, clickItemMenu: bisher => {
    $("#itensCardapio .card-item").removeClass("active");
    $("#" + bisher).addClass("active");
  }, diminuirQuantidade: leroya => {
    let mosley = parseInt($("#qntd-" + leroya).text());
    if (mosley > 0) {
      $("#qntd-" + leroya).text(mosley - 1);
    }
  }, aumentarQuantidade: felipe => {
    let dim = parseInt($("#qntd-" + felipe).text());
    console.log(dim);
    $("#qntd-" + felipe).text(dim + 1);
  }, adicionarAoCarrinho: lyrica => {
    let teondra = parseInt($("#qntd-" + lyrica).text());
    if (teondra > 0) {
      var rabecka = $(".container-menu a.active").attr("id").split("menu-")[1];
      let laquia = MENU[rabecka];
      let midred = $.grep(laquia, (annael, antionna) => {
        return annael.id == lyrica;
      });
      if (midred.length > 0) {
        let kamyar = $.grep(MEU_CARRINHO, (ima, nakyiah) => {
          return ima.id == lyrica;
        });
        console.log("existe", kamyar);
        if (kamyar.length > 0) {
          let equasia = MEU_CARRINHO.findIndex(masie => masie.id == lyrica);
          console.log("objIndex", equasia);
          MEU_CARRINHO[equasia].qntd = MEU_CARRINHO[equasia].qntd + teondra;
        } else {
          midred[0].qntd = teondra;
          MEU_CARRINHO.push(midred[0]);
        }
        cardapio.metodos.mensagem("Item adicionado ao carrinho", "green");
        $("#qntd-" + lyrica).text(0);
        cardapio.metodos.atualizarBadgeTotal();
      }
    }
  }, atualizarBadgeTotal: () => {
    var avey = 0;
    $.each(MEU_CARRINHO, (welch, rosaland) => {
      avey += rosaland.qntd;
    });
    if (avey > 0) {
      $(".botao-carrinho").removeClass("hidden");
      $(".container-total-carrinho").removeClass("hidden");
    } else {
      $(".botao-carrinho").addClass("hidden");
      $(".container-total-carrinho").addClass("hidden");
    }
    $(".badge-total-carrinho").html(avey);
  }, abrirCarrinho: yosselin => {
    if (yosselin) {
      $("#modalCarrinho").removeClass("hidden");
      cardapio.metodos.carregarCarrinho();
    } else {
      $("#modalCarrinho").addClass("hidden");
    }
  }, carregarEtapa: ivanah => {
    if (ivanah == 1) {
      $("#lblTituloEtapa").text("Seu carrinho:");
      $("#itensCarrinho").removeClass("hidden");
      $("#localEntrega").addClass("hidden");
      $("#resumoCarrinho").addClass("hidden");
      $(".etapa").removeClass("active");
      $(".etapa1").addClass("active");
      $("#btnEtapaPedido").removeClass("hidden");
      $("#btnEtapaEndereco").addClass("hidden");
      $("#btnEtapaResumo").addClass("hidden");
      $("#btnVoltar").addClass("hidden");
    }
    if (ivanah == 2) {
      $("#lblTituloEtapa").text("Endereço de entrega:");
      $("#itensCarrinho").addClass("hidden");
      $("#localEntrega").removeClass("hidden");
      $("#resumoCarrinho").addClass("hidden");
      $(".etapa").removeClass("active");
      $(".etapa1").addClass("active");
      $(".etapa2").addClass("active");
      $("#btnEtapaPedido").addClass("hidden");
      $("#btnEtapaEndereco").removeClass("hidden");
      $("#btnEtapaResumo").addClass("hidden");
      $("#btnVoltar").removeClass("hidden");
    }
    if (ivanah == 3) {
      $("#lblTituloEtapa").text("Resumo do pedido:");
      $("#itensCarrinho").addClass("hidden");
      $("#localEntrega").addClass("hidden");
      $("#resumoCarrinho").removeClass("hidden");
      $(".etapa").removeClass("active");
      $(".etapa1").addClass("active");
      $(".etapa2").addClass("active");
      $(".etapa3").addClass("active");
      $("#btnEtapaPedido").addClass("hidden");
      $("#btnEtapaEndereco").addClass("hidden");
      $("#btnEtapaResumo").removeClass("hidden");
      $("#btnVoltar").removeClass("hidden");
    }
  }, voltarEtapa: () => {
    let anya = $(".etapa.active").length;
    cardapio.metodos.carregarEtapa(anya - 1);
  }, carregarCarrinho: () => {
    cardapio.metodos.carregarEtapa(1);
    if (MEU_CARRINHO.length > 0) {
      $("#itensCarrinho").html("");
      $.each(MEU_CARRINHO, (koyasha, jakeya) => {
        let vanelly = cardapio.templates.itemCarrinho.replace(/\${imagem}/g, jakeya.img).replace(/\${nome}/g, jakeya.name).replace(/\${preco}/g, jakeya.price.toFixed(2).replace(".", ",")).replace(/\${id}/g, jakeya.id).replace(/\${qntd}/g, jakeya.qntd);
        $("#itensCarrinho").append(vanelly);
        if (koyasha + 1 == MEU_CARRINHO.length) {
          cardapio.metodos.carregarValores();
        }
      });
    } else {
      $("#itensCarrinho").html('<p class="carrinho-vazio"><i class="fa fa-shopping-bag"></i>Seu carrinho está vazio.</p>');
      cardapio.metodos.carregarValores();
    }
  }, removerItemCarrinho: justilia => {
    MEU_CARRINHO = $.grep(MEU_CARRINHO, (shetal, clancey) => {
      return shetal.id != justilia;
    });
    cardapio.metodos.carregarCarrinho();
    cardapio.metodos.atualizarBadgeTotal();
  }, diminuirQuantidadeCarrinho: geza => {
    let jela = parseInt($("#qntd-carrinho-" + geza).text());
    if (jela > 1) {
      $("#qntd-carrinho-" + geza).text(jela - 1);
      cardapio.metodos.atualizarCarrinho(geza, jela - 1);
    } else {
      cardapio.metodos.removerItemCarrinho(geza);
    }
  }, aumentarQuantidadeCarrinho: rushelle => {
    let yetzali = parseInt($("#qntd-carrinho-" + rushelle).text());
    console.log(yetzali);
    $("#qntd-carrinho-" + rushelle).text(yetzali + 1);
    cardapio.metodos.atualizarCarrinho(rushelle, yetzali + 1);
  }, atualizarCarrinho: (shallen, mobin) => {
    let nadiah = MEU_CARRINHO.findIndex(koy => koy.id == shallen);
    MEU_CARRINHO[nadiah].qntd = mobin;
    cardapio.metodos.atualizarBadgeTotal();
    cardapio.metodos.carregarValores();
  }, carregarValores: () => {
    VALOR_CARRINHO = 0;
    $("#lblSubTotal").text("R$ 0,00");
    $("#lblValorEntrega").text("+ R$ 0,00");
    $("#lblValorTotal").text("R$ 0,00");
    $.each(MEU_CARRINHO, (ryliegh, selby) => {
      VALOR_CARRINHO += parseFloat(selby.price * selby.qntd);
      if (ryliegh + 1 == MEU_CARRINHO.length) {
        $("#lblSubTotal").text("R$ " + VALOR_CARRINHO.toFixed(2).replace(".", ","));
        $("#lblValorEntrega").text("+ R$ " + 5..toFixed(2).replace(".", ","));
        $("#lblValorTotal").text("R$ " + (VALOR_CARRINHO + 5).toFixed(2).replace(".", ","));
      }
    });
  }, carregarEndereco: () => {
    if (MEU_CARRINHO.length <= 0) {
      cardapio.metodos.mensagem("Seu carrinho está vazio :/");
      return;
    }
    cardapio.metodos.carregarEtapa(2);
  }, buscarCep: () => {
    var hartley = $("#txtCEP").val().replace(/\D/g, "");
    if (hartley != "") {
      if (/^[0-9]{8}$/.test(hartley)) {
        $.getJSON("https://viacep.com.br/ws/" + hartley + "/json/?callback=?", function (paisliegh) {
          if (!("erro" in paisliegh)) {
            $("#txtEndereco").val(paisliegh.logradouro);
            $("#txtBairro").val(paisliegh.bairro);
            $("#txtCidade").val(paisliegh.localidade);
            $("#ddlUf").val(paisliegh.uf);
            $("#txtNumero").focus();
          } else {
            cardapio.metodos.mensagem("CEP não encontrado. Preencha as informações manualmente, por favor.");
            $("#txtCEP").focus();
          }
        });
      } else {
        cardapio.metodos.mensagem("Formato de CEP inválido.");
        $("#txtCEP").focus();
      }
    } else {
      cardapio.metodos.mensagem("Informe o CEP, por favor.");
      $("#txtCEP").focus();
    }
  }, resumoPedido: () => {
    let marda = $("#txtCEP").val().trim();
    let beyza = $("#txtEndereco").val();
    let benzel = $("#txtBairro").val();
    let baotran = $("#txtCidade").val();
    let radu = $("#ddlUf").val();
    let jencie = $("#txtNumero").val();
    let jeris = $("#txtComplemento").val();
    if (marda.length <= 0) {
      cardapio.metodos.mensagem("Informe o CEP, por favor.");
      $("#txtCEP").focus();
      return;
    }
    if (beyza.length <= 0) {
      cardapio.metodos.mensagem("Informe o Endereço, por favor.");
      $("#txtEndereco").focus();
      return;
    }
    if (benzel.length <= 0) {
      cardapio.metodos.mensagem("Informe o Bairro, por favor.");
      $("#txtBairro").focus();
      return;
    }
    if (baotran.length <= 0) {
      cardapio.metodos.mensagem("Informe a Cidade, por favor.");
      $("#txtCidade").focus();
      return;
    }
    if (radu == "-1") {
      cardapio.metodos.mensagem("Informe a UF, por favor.");
      $("#ddlUf").focus();
      return;
    }
    if (jencie.length <= 0) {
      cardapio.metodos.mensagem("Informe o Número, por favor.");
      $("#txtNumero").focus();
      return;
    }
    MEU_ENDERECO = {cep: marda, endereco: beyza, bairro: benzel, cidade: baotran, uf: radu, numero: jencie, complemento: jeris};
    cardapio.metodos.carregarEtapa(3);
    cardapio.metodos.carregarResumo();
  }, carregarResumo: () => {
    $("#listaItensResumo").html("");
    $.each(MEU_CARRINHO, (raidel, hachalu) => {
      let arcola = cardapio.templates.itemResumo.replace(/\${imagem}/g, hachalu.img).replace(/\${nome}/g, hachalu.name).replace(/\${preco}/g, hachalu.price.toFixed(2).replace(".", ",")).replace(/\${qntd}/g, hachalu.qntd);
      $("#listaItensResumo").append(arcola);
    });
    $("#resumoEndereco").html(MEU_ENDERECO.endereco + ", " + MEU_ENDERECO.numero + ", " + MEU_ENDERECO.bairro);
    $("#cidadeEndereco").html(MEU_ENDERECO.cidade + "-" + MEU_ENDERECO.uf + " / " + MEU_ENDERECO.cep);
    cardapio.metodos.finalizarPedido();
  }, finalizarPedido: () => {
    if (MEU_CARRINHO.length > 0 && MEU_ENDERECO != null) {
      var kharon = "Olá! gostaria de fazer um pedido:";
      kharon += "\n*Itens do pedido:*\n\n${itens}";
      kharon += "\n*Endereço de entrega:*";
      kharon += "\n" + MEU_ENDERECO.endereco + ", " + MEU_ENDERECO.numero + ", " + MEU_ENDERECO.bairro;
      kharon += "\n" + MEU_ENDERECO.cidade + "-" + MEU_ENDERECO.uf + " / " + MEU_ENDERECO.cep;
      kharon += "\n\n*Total (ENTREGA SOMAR + R$5,00): R$ " + VALOR_CARRINHO.toFixed(2).replace(".", ",") + "*";
      var loki = "";
      $.each(MEU_CARRINHO, (jonathandavid, christana) => {
        loki += "*" + christana.qntd + "x* " + christana.name + " ....... R$ " + christana.price.toFixed(2).replace(".", ",") + " \n";
        if (jonathandavid + 1 == MEU_CARRINHO.length) {
          kharon = kharon.replace(/\${itens}/g, loki);
          let erielle = encodeURI(kharon);
          let arison = "https://wa.me/5537999389584?text=" + erielle;
          $("#btnEtapaResumo").attr("href", arison);
        }
      });
    }
  }, carregarBotaoReserva: () => {
    let enyssa = encodeURI("Olá! gostaria de fazer uma *reserva*");
    let ieshea = "https://wa.me/5537999389584?text=" + enyssa;
    $("#btnEtapaResumo").attr("href", ieshea);
  }, abrirDepoimento: ashee => {
    $("#depoimento-1").addClass("hidden");
    $("#depoimento-2").addClass("hidden");
    $("#depoimento-3").addClass("hidden");
    $("#btnDepoimento-1").removeClass("active");
    $("#btnDepoimento-2").removeClass("active");
    $("#btnDepoimento-3").removeClass("active");
    $("#depoimento-" + ashee).removeClass("hidden");
    $("#btnDepoimento-" + ashee).addClass("active");
  }, mensagem: (sheryel, _0x22df4b = "red", _0x573867 = 3500) => {
    let pau = Math.floor(Date.now() * Math.random()).toString();
    let winnell = '<div id="msg-' + pau + '" class="animated fadeInDown toast ' + _0x22df4b + '">' + sheryel + "</div>";
    $("#container-mensagens").append(winnell);
    setTimeout(() => {
      $("#msg-" + pau).removeClass("fadeInDown");
      $("#msg-" + pau).addClass("fadeOutUp");
      setTimeout(() => {
        $("#msg-" + pau).remove();
      }, 800);
    }, _0x573867);
  }};
  cardapio.templates = {item: '\n        <div class="col-12 col-lg-3 col-md-3 col-sm-6 mb-5 wow fadeInUp">\n            <div class="card card-item" id="${id}" onclick="cardapio.metodos.clickItemMenu(\'${id}\')">\n                <div class="img-produto">\n                    <img src="${imagem}"/>\n                </div>\n                <p class="title-produto text-center mt-4">\n                    <b>${nome}</b>\n                </p>\n                <p class="price-produto text-center">\n                    <b>R$ ${preco}</b>\n                </p>\n                <div class="add-carrinho">\n                    <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidade(\'${id}\')"><i class="fas fa-minus"></i></span>\n                    <span class="add-numero-itens" id="qntd-${id}">0</span>\n                    <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidade(\'${id}\')"><i class="fas fa-plus"></i></span>\n                    <span class="btn btn-add" onclick="cardapio.metodos.adicionarAoCarrinho(\'${id}\')"><i class="fa fa-shopping-bag"></i></span>\n                </div>\n            </div>\n        </div>\n    ', itemCarrinho: '\n        <div class="col-12 item-carrinho animated fadeInUp">\n            <div class="img-produto">\n                <img src="${imagem}"/>\n            </div>\n            <div class="dados-produto">\n                <p class="title-produto">\n                    <b>${nome}</b>\n                </p>\n                <p class="price-produto">\n                    <b>R$ ${preco}</b>\n                </p>\n            </div>\n            <div class="add-carrinho">\n                <span class="btn-menos" onclick="cardapio.metodos.diminuirQuantidadeCarrinho(\'${id}\')"><i class="fas fa-minus"></i></span>\n                <span class="add-numero-itens" id="qntd-carrinho-${id}">${qntd}</span>\n                <span class="btn-mais" onclick="cardapio.metodos.aumentarQuantidadeCarrinho(\'${id}\')"><i class="fas fa-plus"></i></span>\n                <span class="btn btn-remove no-mobile" onclick="cardapio.metodos.removerItemCarrinho(\'${id}\')"><i class="fa fa-times"></i></span>\n            </div>\n        </div>\n    ', itemResumo: '\n        <div class="col-12 item-carrinho resumo">\n            <div class="img-produto-resumo">\n                <img src="${imagem}"/>\n            </div>\n            <div class="dados-produto">\n                <p class="title-produto-resumo">\n                    <b>${nome}</b>\n                </p>\n                <p class="price-produto-resumo">\n                    <b>R$ ${preco}</b>\n                </p>\n            </div>\n            <p class="quantidade-produto-resumo">\n                x <b>${qntd}</b>\n            </p>\n        </div>\n    '};
  