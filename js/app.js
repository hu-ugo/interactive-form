/* focus on name input */
$('#name').focus();

//initially hide other job title input, show when 'other' is selected
$('#other-title').hide();
$('#title').on('change', function(){
  if($(this).val() === 'other'){
    $('#other-title').slideDown('slow');
  } else {
    $('#other-title').slideUp('slow');
  }
});

//hide select theme from design options
$('#design option').first().hide();
$('#color').prepend($('<option value="" disabled selected>Please select a T-shirt theme</option>'));
$('#color option').hide();

//hide colors depending on design selection and focus available options
$('#design').on('change', function(){
  if($(this).val() === 'js puns') {
    $('#color option[value="tomato"]').hide();
    $('#color option[value="steelblue"]').hide();
    $('#color option[value="dimgrey"]').hide();
    $('#color option[value="cornflowerblue"]').show().prop('selected', true);
    $('#color option[value="darkslategrey"]').show();
    $('#color option[value="gold"]').show();
  } else if($(this).val() === 'heart js') {
    $('#color option[value="cornflowerblue"]').hide();
    $('#color option[value="darkslategrey"]').hide();
    $('#color option[value="gold"]').hide();
    $('#color option[value="tomato"]').show().prop('selected', true);
    $('#color option[value="steelblue"]').show();
    $('#color option[value="dimgrey"]').show();
    // $('#color option')
  }
});

//register for activities basuraaaaa
// $('.activities input').on('change', function(){
//     if($(this).parent().is(':contains("9am")') && $(this).prop('checked')) {
//       $('[name="express"]').prop('disabled', true);
//       $('[name="build-tools"]').prop('disabled', true);
//     } else {
//       $('[name="express"]').prop('disabled', false);
//       $('[name="build-tools"]').prop('disabled', false);
//     }
// });

//add total cost and register for activities
const $totalCostP = $('<p></p>');
let totalCost = 0;
$('.activities').append($totalCostP);

$('.activities input').on('change', function() {
  const $clicked = $(this);
    const $text = $clicked.parent().text();
  const indexOfDollarSign = $text.indexOf('$');
  const $cost = parseInt($text.slice(indexOfDollarSign + 1));
  const indexOfDash = $text.indexOf('—');
  const indexOfComma = $text.indexOf(',');
  const dayAndTime = $text.slice(indexOfDash, indexOfComma)
  //add total cost
  if($clicked.is(':checked')) {
    totalCost += $cost;
  } else {
    totalCost -= $cost;
  }
  $totalCostP.text(`Total: $ ${totalCost}`);

  //disabling conflicting Activities
  const $activities = $('.activities input');
  for (let activity of $activities) {
    if ($(activity).parent().text().includes(dayAndTime) && $(activity).parent().text() !== $text) {
      // console.log($(activity).parent().text());
      if ($clicked.is(':checked')) {
        $(activity).prop('disabled', true);
      } else {
        $(activity).prop('disabled', false);
      }
    }
  }
});

/*** payment section ***/
$('option[value="credit card"]').prop('selected', true);
$('div p:contains("PayPal")').hide();
$('div p:contains("Bitcoin")').hide();
$('option[value="select_method"]').prop('disabled', true);

$('#payment').on('change', function(){
  if ($('option[value="paypal"]').is(':selected')) {
    $('#credit-card').slideUp();
    $('div p:contains("PayPal")').slideDown();
    $('div p:contains("Bitcoin")').hide();
  } else if ($('option[value="bitcoin"]').is(':selected')) {
    $('#credit-card').slideUp();
    $('div p:contains("Bitcoin")').slideDown();
    $('div p:contains("PayPal")').hide();
  } else {
    $('#credit-card').slideDown();
    $('div p:contains("PayPal")').hide();
    $('div p:contains("Bitcoin")').hide();
  }
});

/*** form validation ***/
const $nameInput = $('#name');
const $emailInput = $('#mail');
const $ccnum = $('#cc-num');
const $zip = $('#zip');
const $ccv = $('#ccv');

function isValidUsername(username) {
  return /^[a-z]+$/.test(username);
}

function isValidEmail(email) {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

function isValidCreditCard(creditcard) {
  return /^[1-9][0-9]{13,16}$/.test(creditcard);
}

function showOrHideTip(show, element) {
  if (show) {
    element.style.display = "inherit";
  } else {
    element.style.display = "none";
  }
}

$nameInput.on('input', function(e){
  const text = e.target.value;
  const valid = isValidUsername(text);
  const showTip = text !== "" && !valid; //short circuit (boolean)
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
  if (!valid) {
    $('button').on('click', function(e){
      event.preventDefault();
    });
  } else {
    return true;
  }
  console.log(valid);
});

$emailInput.on('input', function(e){
  const text = e.target.value;
  const valid = isValidEmail(text);
  const showTip = text !== "" && !valid; //short circuit
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
  if (valid !== true) {
    $('button').on('click', function(e){
      event.preventDefault();
    });
  } else {
    return true;
  }
});

$('.activities input').on('change', function(){
  const $checked = $(this).is(':checked');
  const aver = $('activities input:selected').length;
  console.log($checked);
  // if ($checked) {
  //   console.log('yes');
  // }
});

$ccnum.on('change', function(){
  const text = e.target.value;
  const valid = isValidCreditCard(text);
  const showTip = text !== "" && !valid; //short circuit
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
});

$zip.on('change', function(){
  const text = e.target.value;
  const valid = isValidCreditCard(text);
  const showTip = text !== "" && !valid; //short circuit
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
});

$ccv.on('change', function(){
  const text = e.target.value;
  const valid = isValidCreditCard(text);
  const showTip = text !== "" && !valid; //short circuit
  const tooltip = e.target.nextElementSibling;
  showOrHideTip(showTip, tooltip);
});

//validate credit card only when selected
$('#payment').on('change', function(){
  if ($('[value="credit card"]').is(':selected')) {

    // console.log('sera');
  }
});

// $('button').on('click', function(){
//  if (!aver) {
//    event.preventDefault();
//  }
// });

