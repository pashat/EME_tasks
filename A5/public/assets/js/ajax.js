$(document).ready(function() {
	// 	// Befüllung der Tabble mit allen Eigenschaften
	$.getJSON( "/items", function( data ) {
		//die Tabelle wird Zeilenweise erstellt, wobei item das aktuelle Land ist
		$.each(data.items, function(i, item) {

			var tblRow = "<tr>" +
				"<td>" + item.id + "</td>" +
				"<td>" + item.name + "</td>" +
				"<td>" + item['birth_rate_per_1000'] + "</td>" +
				"<td>" + item['cell_phones_per_100'] + "</td>"  +
				"<td>" + item['children_per_woman'] + "</td>"  +
				"<td>" + item['electricity_consumption_per_capita']+ "</td>"  +
				"<td>" + item['internet_user_per_100'] + "</td>" +
				"</tr>";
		$(tblRow).appendTo("#table_body");
		});
	});



	$.getJSON( "/properties", function( property ) {
		$.each(property, function(i) {
			var options = "<option value=" + i + ">"+ property[i] + "</option>";
		$(options).appendTo("#prop_selection");
		});
	});

	$('#hide_selected_prop').click('submit', function(event) {
		event.preventDefault();
        var num = $("#prop_selection").val();
		num++;
        $.get("/properties/" + num, function(data) {
			$('td:nth-child('+num+')').hide();
			$('th:nth-child('+num+')').hide();
		});
	});

	$('#show_selected_prop').click('submit', function(event) {
		event.preventDefault();
        var num = $("#prop_selection").val();
		num++;
        $.get("/properties/" + num, function(data) {
			$('th:nth-child('+num+')').show();
			$('td:nth-child('+num+')').show();
		});
	});



    $('#country_add').on('submit', function(event) {
        event.preventDefault();

        var country_name = $('#country_name');
				var property1_input = $('#country_birth');
				var property2_input = $('#country_cellphone');

        $.ajax({
            url: '/items',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: country_name.val(), ["birth_rate_per_1000"]: property1_input.val(), ['cell_phones_per_100']: property2_input.val()}),
            success: function() {
							location.reload();
            }
        });
    });


	$('#country_delete').on('submit', function(event) {
		event.preventDefault();

		if($('#country_delete_id').val() == false) {
			$.ajax({
				url: '/items',
				method: 'DELETE',
				contentType: 'application/json',
				success: function() {
					location.reload();
				}
			});
		}
	});

	$('#country_delete').on('submit', function(event) {
		event.preventDefault();
		if($('#country_delete_id').val()) {
			var id = $('#country_delete_id').val();

			$.ajax({
				url: '/items/' + id,
				method: 'DELETE',
				contentType: 'application/json',
				success: function() {
					location.reload();
				}
			});
		}
	});
});
