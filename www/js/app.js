 $(function () {
     var $document = $(document);
     var selector = '[data-rangeslider]';
     var $inputRange = $(selector); /** * Example functionality to demonstrate a value feedback * and change the output's value. */

     $.fn.getFloat = function() {
     	return parseFloat($(this).val());
     }


     
     for (var i = $inputRange.length - 1; i >= 0; i--) {
         valueOutput($inputRange[i], $($inputRange[i]).attr('name'));
     } /** * Update value output */


     $document.on('input', selector, function (e) {
         valueOutput(e.target, $(e.target).attr('name'));
     }); 


     /** * Initialize the elements */
     $inputRange.rangeslider({
         polyfill: false
     });
 });

function calculateTip(manual) {
	if (manual) {
		$('#bill').val($('#bill-value').val());
		$('#tip-percent').val($('#tip-percent-value').val());
	}
	var tipPercent 	= $('#tip-percent').getFloat()/100;
	var bill 		= $('#bill').getFloat();
	var tipTotal 	= tipPercent*bill;
	var people		= $('#split-ways').getFloat();

	$('#tip-total').html( displayMoney( tipTotal ) );
	$('#grand-total').html( displayMoney( tipTotal+bill ) );
	$('#per-person').html( displayMoney( (tipTotal+bill)/people ) );
}

function displayMoney(value) {
	value = parseFloat(value)*100;
	value = Math.round(value);
	value = value/100;

	return value.toFixed(2);
}

function valueOutput(element, name) {
 var value = element.value;
 var output = element.parentNode.getElementsByTagName('output')[0];

 switch (name) {
 	case 'bill':
 		prepend = "Bill: ";
 		append  = "";
 		value 	= "<input type='number' onChange='calculateTip(true)' value='" + parseFloat(value).toFixed(2) + "' step='.01' id='bill-value'>";
 		break;
 	case 'tip-percent':
 		prepend = "Tip Percent: ";
 		append  = "";
 		value 	= "<input type='number' onChange='calculateTip(true)' value='" + parseFloat(value).toFixed(2) + "' step='.01' id='tip-percent-value'>";
 		break; 
 	case 'split-ways':
 		prepend = "Split ";
 		value 	= parseInt(value);
 		if (value == 1) {
 			append = " way";
 		} else {
 			append = " ways";
 		}
 		break;
 	default:
 		prepend = "error";
 		append 	= "error";
 		break;
 }
 output.innerHTML = prepend  + value + append;
 calculateTip();

} /** * Initial value output */

$(document).ready(function() {
	$('input').on('change', function () {
		console.log($(this).val());
	});

	$('.about-screen').fadeOut();
	
	$('.nav a').click(function() {
		$('.panel').fadeOut();
		target = $(this).data('target');

		setTimeout(function() {
			$(target).fadeIn();
		}, 300);

		$('.active').removeClass('active');
		$(this).parent().addClass('active');
	});
})
