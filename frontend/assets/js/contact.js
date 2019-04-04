const contact = {};
contact.data = [];

contact.cancelForm = function (id, index)
{
    contact.toggle();
    $('#contact-edit input').val('');
    $('ul.navbar-nav li:nth-child(1)').addClass('active'); 
    $('ul.navbar-nav li:nth-child(2)').removeClass('active');
};


contact.supprimer = function (id, index)
{
    $.ajax({
        url: '/api/contacts/' + id,
        method: 'DELETE'
    }).done(function (contacts) {
        $('#contact table tbody tr.'+id).hide(1500);
    });
};


contact.saveForm = function ()
{
	//récupérer les informations du formulaire
	const nom = $('#nom').val().toLowerCase();
	const prenom = $('#prenom').val().toLowerCase();
    const id = $('#id').val();
    const _num=[];
    $('input[name="numero[]"]').each(function(){
        _num.push($(this).val());
    });
	$.ajax({
	url: '/api/contacts' + ( id != null ? '/'+id  : ''),
	type: 'post',
	data: {
            id: id,
            nom: nom,
            prenom: prenom,
            numero: _num
        }
	}).done(function(data) {
        const index = contact.data.findIndex(function(f){
            return f.id === data.id;
        });
        if(-1 === index) {
            contact.data.push(data);
        }
        else {
            contact.data[index] = data;

        }
        contact.init();
        contact.toggle();
        $('ul.navbar-nav li:nth-child(1)').addClass('active'); 
        $('ul.navbar-nav li:nth-child(2)').removeClass('active');
        $('#contact-edit input').val(''); 
	});
};


contact.edit = function (id, index)
{
    contact.toggle();
    suprTousInputNum();
    const _contact = contact.data.find(function(form) {
        return form.id === id;
    });
    const numeros = _contact.numeros.map(function(numero){
        return numero.numero;
    });
    if(_contact) {
        $('#id').val(_contact.id);
        $('#nom').val(_contact.nom);
        $('#prenom').val(_contact.prenom);
        $('#numero').val(numeros[0]);
        for (var i = 1; i < 3; i++)
        {
            if(numeros[i] !=null) {
                ajouterInput();
                afficherAjoutInput();
                affichagedeletInput();
                $('#numero'+i).val(numeros[i]);
            }
        }
        testinputs();
    }
};


contact.toggle = function()
{
    $('#contact, #contact-edit').toggle();

};


contact.init = function ()
{
    $.ajax({
        url: '/api/contacts',
        type: 'GET'
    }).done(function (contacts) {
        contact.data = contacts;
        $('#contact').show();
        contact.refreshTable();
    });
};


contact.refreshTable = function ()
{
    $('#contact table tbody').empty();
    contact.data.forEach(function (contact, index) {
        const numeros = contact.numeros.map(function(numero){
            return numero.numero;
        });
        $('#contact table tbody').append(
            '<tr class="' + contact.id + '"><td>' + contact.nom + '</td>' +
            '<td>' + contact.prenom + '</td>' +
            '<td>' + numeros.join('<br/> ') +'</td>' +
            '<td><button type="button" class="btn btn-danger" data-toggle="modal" data-target="#myModal' + contact.id + '">Supprimer</button>' +
            '<button onclick="contact.edit(' + contact.id + ', ' + index + ')" class="btn btn-primary">Modifier</button>' +
            '<div class="modal fade" id="myModal' + contact.id + '">' +
                '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                        '<div class="modal-body">' +
                            '<div class="alert alert-danger"><span class="glyphicon glyphicon-warning-sign"></span> Veuillez confirmer la suppression ?</div>' +
                        '</div>' +
                        '<div class="modal-footer">' +
                            '<button class="btn btn-primary" data-dismiss="modal" onclick="contact.supprimer(' + contact.id + ', ' + index + ')">Oui</button>' +
                            '<button type="button" class="btn btn-secondary" data-dismiss="modal">Non</button>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div></td>' +
        '</tr>');
    });
};
