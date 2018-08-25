
$(document).ready(function () {

    loadItems();
    purchaseOrder();
    getMoney();

    function loadItems() {

        var listContent = $('#listContent');

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/items',
            success: function (data, status) {
                $.each(data, function (index, item) {
                    var name = item.name;
                    var price = item.price.toFixed(2);
                    var quantity = item.quantity;
                    var id = item.id;

                    var row = '<button id= "onClickButton"; onclick= "itemSelected(' + id + '); itemCost('
                        + price + ')" class="col-md-4" style = "border-radius: 25px; border: 3px solid #9b721f; margin: 5px; width: 200px; padding: 25px; background-image:url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrbRVF1XoCmqVmV2W3FJmNuhQzoDS7GyapvBe9H1GdY5znM4hpA)">';
                    row += '<li style="list-style-type: none">';
                    row += '<h5 style="text-align:left">' + id + '<h5>';
                    row += '<h4>' + name + '</h4>';
                    row += '<h4>$' + price + '<h4>';
                    row += '<h5>Quantity: ' + quantity + '<h5>' + '</li>' + '</br>';
                    row += '</li>';
                    row += '</button>';
                    listContent.append(row);
                });
            }
        });
    }
});

function purchaseOrder() {

    $('#rightSideBottomCol').hide();

    $('#purchase').click(function (event) {

        var itemNumber = $('#itemNumber').val();
        var totalChange = parseFloat($('#totalChange').val());
        var itemMessage = parseFloat($('#itemMessage').val());
        var changeNeeded = (itemMessage.toFixed(2) - totalChange).toFixed(2);

        if (itemNumber === '') {

            $('#itemMessage').val('Item must be selected');

        } if (totalChange < itemMessage) {

            var itemID = $('#itemNumber').val();
            $('#itemMessage').val('Insert $' + changeNeeded+' and reselect');

        } if (totalChange >= itemMessage) {

            $('#rightSideBottomCol').slideDown(2000);

            $('#itemMessage').val('');
            $('#itemMessage').val('Thank You!');
            $('#purchase').text('Return');

            $('#purchase').click(function (event) {
                location.reload();
            });

            var changeEntered = $('#totalChange').val();
            var changeMessage = $('#changeBack');

            $.ajax({

                type: 'GET',
                url: 'http://localhost:8080/money/' + changeEntered + '/item/' + itemNumber,
                success: function (data, status) {

                    var quarters = data.quarters;
                    var dimes = data.dimes;
                    var nickels = data.nickels;
                    var formatter = '<p>';

                    formatter += 'Quarters: ' + quarters + '<br/>';
                    formatter += 'Dimes: ' + dimes + '<br/>';
                    formatter += 'Nickles: ' + nickels + '<br/>';
                    formatter += '</p>';
                    changeMessage.append(formatter);
                },
                error: function () {
                    $('#itemMessage').val('SOLD OUT!')
                }
            });
        }
    });
}

function getMoney() {



    $('#totalChange').hide();
    $('#buttonsHeading').hide();


    $('#addDollar').click(function (event) {
        $('#totalChange').fadeIn(2000);
        $('#buttonsHeading').slideDown(1000);
        var currentChange = $('#totalChange').val();
        var dollar = $('#addDollar').val();
        var total = parseFloat(currentChange) + parseFloat(dollar);
        var fixedTotal = total.toFixed(2);
        $('#totalChange').val(fixedTotal)
    });

    $('#addQuarter').click(function (event) {
        $('#totalChange').fadeIn(2000);
        $('#buttonsHeading').slideDown(1000);
        var currentChange = $('#totalChange').val();
        var quarter = $('#addQuarter').val();
        var total = parseFloat(currentChange) + parseFloat(quarter);
        var fixedTotal = total.toFixed(2);
        $('#totalChange').val(fixedTotal);
    });

    $('#addDime').click(function (event) {
        $('#totalChange').fadeIn(2000);
        $('#buttonsHeading').slideDown(1000);
        var currentChange = $('#totalChange').val();
        var dime = $('#addDime').val();
        var total = parseFloat(currentChange) + parseFloat(dime);
        var fixedTotal = total.toFixed(2);
        $('#totalChange').val(fixedTotal);
    });

    $('#addNickle').click(function (event) {
        $('#totalChange').fadeIn(2000);
        $('#buttonsHeading').slideDown(1000);
        var currentChange = $('#totalChange').val();
        var nickle = $('#addNickle').val();
        var total = parseFloat(currentChange) + parseFloat(nickle);
        var fixedTotal = total.toFixed(2);
        $('#totalChange').val(fixedTotal);
    });


}

function itemSelected(id) {
    document.getElementById("itemNumber").value = id;
}

function itemCost(price) {
    document.getElementById("itemMessage").value = price;
}