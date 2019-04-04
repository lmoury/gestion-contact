$(document).ready(function () {
	testinputs();

  $(':input').on("change keyup", function(e){
    testinputs();
  })
});

function surligne(champ, erreur)
{
   if(erreur) {
	   champ.style.borderColor = "red";
   }
   else {
	   champ.style.borderColor = "";
   }
}

function verifString(champ)
{
    var valide=/^[a-zA-Z]+$/;
    var num = champ.value;
    if(num != '') {
        if(valide.test(num) && (champ.value.length > 0 || champ.value.length < 25)) {
            surligne(champ, false);
            $('.error'+champ.id).remove();
            return true;
        }
        else {
            surligne(champ, true);
            if(!$('.form-group div').hasClass('error'+champ.id)) {
                 $(champ).after('<div class="erreur error'+champ.id+'">Caractères invalides.</div>');
            }
            return false;
        }
    }
    else {
        surligne(champ, true);
        if(!$('.form-group div').hasClass('error'+champ.id)) {
            $(champ).after('<div class="erreur error'+champ.id+'">Veuillez compléter ce champ.</div>');
        }
        return false;
    }
}

function verifNum(champ)
{
    var valide=/^(\+|0)\d+$/;
    num = champ.value;
    if(num != '') {
        $('.error'+champ.id).remove();
        if(valide.test(num) && (num.length > 6 && num.length < 115)){
            surligne(champ, false);
            $('.error'+champ.id).remove();
            return true;
        }
        else{
            surligne(champ, true);
            if(!$('.form-group div').hasClass('error'+champ.id)) {
                 $(champ).after('<div class="erreur error'+champ.id+'">Numéro de téléphone invalide.</div>');
            }
            return false;
        }
    }
    else {
        surligne(champ, true);
        if(!$('.form-group div').hasClass('error'+champ.id)) {
             $(champ).after('<div class="erreur error'+champ.id+'">Veuillez compléter ce champ.</div>');
        }
        return false;
    }
}


function testinputs()
{
    var t=true;

    $('#contact-edit input[required]').each(function(i) {
        if ( $(this).val()=="" ) {
            t=false;
            return false;
        }
        else if ($('.form-group div').hasClass('erreur')) {
            console.log('FIN');
            t=false;
            return false;
        }
    })

    if (t) $('#contact-edit :submit').prop( "disabled", false )
    else      $('#contact-edit :submit').prop( "disabled", true )
}


function ajouterInput()
{
    var id = eval($('#contact-edit .form-group:last').attr('id')+'+1');
    if(id < 3) {
        $("#contact-edit .form-group:last").after('<div class="form-group gsm numero" id="'+id+'"><label for="numero">Numero '+id+'</label><input type="text" class="form-control" id="numero'+id+'" name="numero[]" onblur="verifNum(this);" required></div>');
        affichagedeletInput();
        afficherAjoutInput();
        testinputs();
        $(':input').on("change keyup", function(e){
            testinputs();
        })
    }
};

function deleteInput()
{
    $("#contact-edit .form-group.numero:last").remove();
    affichagedeletInput();
    afficherAjoutInput();
    testinputs();
};

function affichagedeletInput()
{
    if ($('#contact-edit .form-group:last').hasClass('numero')) {
        $('#deletInput').show();
    }
    else {
        $('#deletInput').hide();
    }
};

function afficherAjoutInput()
{
    var valId = $('#contact-edit .form-group:last').attr('id');
    if(valId < 2) {
        $('#ajoutInput').show();
    }
    else {
        $('#ajoutInput').hide();
    }
};

function suprTousInputNum()
{
    for (var i = 0; i < 2; i++)
    {
        deleteInput();
    }
};
