$(document).ready(function () {

	$('.nav-item').click(function(){
		$('.nav-item').removeClass('active');
		$(this).addClass('active');
	}); 


	$("#search").on("keyup", function()
	{
		var value = $(this).val().toLowerCase();
		$("#myTable tr").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});


	contact.init();
});

function ajouterContact()
{
	$('#contact').hide();
	$('#contact-edit').show();
	$('#contact-edit input').val('');
	suprTousInputNum();
	testinputs();
}

function listeContact()
{
	$('#contact').show();
	$('#contact-edit').hide();
}
