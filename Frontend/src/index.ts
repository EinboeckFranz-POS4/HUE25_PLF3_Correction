import {CategoryDto, ProductDto, StoreDto, OrderItemReplayDto, OrderDto, 
    StoreApi, CategoryApi, ProductApi, OrderApi}
    from "./swagger";
import {BasketItem} from "./data/basketItem";

const baseUrl = 'http://localhost:5000';

const storeApi = new StoreApi(baseUrl);
const categoryApi = new CategoryApi(baseUrl);
const productApi = new ProductApi(baseUrl);
const orderApi = new OrderApi(baseUrl);

let products: ProductDto[] = [];
let basket: BasketItem[] = [];

$(_ => {
    $('#lblMsg').html('Ok');
    loadStores();
    
    $('#stores').on('change', _ => {
        const selectedStore = $('#stores :selected');
        
        updateStoreName(`${selectedStore.text()}`);
        loadProducts(+(selectedStore.val() ?? '-1'), +($('#categories :selected').val() ?? '-1'));
    });
    
    $('#categories').on('change', _ => {
        loadProducts(+($('#stores :selected').val() ?? '-1'), +($('#categories :selected').val() ?? '-1'));
    });
    
    $('#txtFilter').on('keyup', _ => {
        createProductTableBody(products.filter(x => x.productName?.includes($('#txtFilter').val()?.toString() ?? "") ?? false));
    });
    
    $('#btnSaveBasket').on('click', _ => {
        saveBasket();
        $('#btnClearBasket').trigger('click');
    }); 
    
    $('#btnClearBasket').on('click', _ => {
        basket = [];
        createBasketBody(basket);
    });
});

function Sum(values: number[]): number {
    if(values.length === 0)
        return 0;
    return values.reduce((sum, currentValue) => sum + currentValue);
}

function loadStores() {
    storeApi.storeGet().then(x => x.body)
        .then((data: StoreDto[]) => {
            const storeCombo = $('#stores');
            
            storeCombo.empty();
            data.forEach((x: StoreDto) => {
                $('<option>').val(`${x.storeId}`)
                    .text(`${x.storeName}`).appendTo(storeCombo); 
            });
            
            const selectedStore = $('#stores :selected');
            updateStoreName(`${selectedStore.text()}`);
            loadCategories(+(selectedStore.val() ?? '-1'));
        });
}

function loadCategories(selectedStoreId: number) {
    if(selectedStoreId === -1)
        return;

    categoryApi.categoryGet(selectedStoreId).then(x => x.body)
        .then((data: CategoryDto[]) => {
            const categoryCombo = $('#categories');
            
            categoryCombo.empty();
            data.forEach((x: CategoryDto) => {
                $('<option>').val(`${x.categoryId}`).text(`${x.categoryName}`).appendTo(categoryCombo);
            });
            loadProducts(selectedStoreId, 1);
        });
}

function loadProducts(storeId: number, categoryId: number) {
    if(storeId === -1 || categoryId === -1)
        return;
    productApi.productGet(categoryId, storeId).then(x => x.body)
        .then((data: ProductDto[]) => {
            products = data;
            createProductTableBody(products);
        });
}

function saveBasket() {
    const selectedStoreId = +$('#stores :selected').val()!;
    const orderItems: OrderItemReplayDto[] = [];
    basket.forEach((basketItem: BasketItem) => {
        orderItems.push(new class implements OrderItemReplayDto{
            productId = basketItem.productDto.productId;
            listPrice = basketItem.productDto.listPrice;
            quantity = basketItem.amount;
        });
    })
    orderApi.orderPost(selectedStoreId, orderItems).then(x => x.body)
        .then((orderDto: OrderDto) => alert(`Saved Order with OrderId ${orderDto.orderId}`));
}

function updateStoreName(storeName: string) {
    $('#storeName').text(storeName);
}

function createProductTableBody(productDtos: ProductDto[]) {
    const productTable = $('#tblProductsBody');
    
    productTable.empty();
    productDtos.forEach((productDto: ProductDto) => productTable.append(createTableRow(productDto)));
}

function createBasketBody(basket: BasketItem[]) {
    const basketBody = $('#tblBasketBody');

    basketBody.empty();
    basket.forEach((basketItem: BasketItem) => basketBody.append(createTableRow(undefined, basketItem, true)));
    $('#basketSum').text(Sum(basket.map(x => x.amount * x.productDto.listPrice!)).toFixed(2));
    if(basket.length === 0)
        $('#stores').removeAttr('disabled');
}

function createTableRow(product?: ProductDto, basketItem?: BasketItem, inBasket: boolean = false): JQuery {
    if ((product === undefined && !inBasket) || (basketItem === undefined && inBasket))
        return $('<tr>');

    const row = $('<tr>');

    const amountField = inBasket
        ? $('<label>').text(basketItem?.amount ?? 0)
        : $('<input>').attr('type', 'number').val(0);

    const button = $('<button>').text(inBasket ? '-' : '+')
        .addClass(inBasket ? 'btn btn-danger' : 'btn btn-success')
        .on('click', _ => {
            if(inBasket) {
                basket = basket.filter(x => x !== basketItem);
                createBasketBody(basket);
            } else {
                const foundOne = basket.find(x => x.productDto === product);
                const amount = +(amountField.val() ?? '0');
                if(amount === 0) {
                    alert('Cannot add an Product with quantity 0');
                    return;
                }

                if(foundOne !== undefined)
                    foundOne.amount += +(amountField.val() ?? '0');
                else
                    basket.push(new BasketItem (+(amountField.val() ?? '0'), product!));
                amountField.val(0);
                $('#stores').attr('disabled', "true");
                createBasketBody(basket);
            }
        });

    if(inBasket) {
        row.append(
            $('<td>').append(button),
            $('<td>').append(amountField),
            $('<td>').text(basketItem?.productDto.productName!),
            $('<td>').text(basketItem?.productDto.brand!),
            $('<td>').text(basketItem?.productDto.category!),
            $('<td>').text(basketItem?.productDto.modelYear!),
            $('<td>').text(basketItem?.productDto.listPrice!),
        );
    } else {
        row.append(
            $('<td>').append(button),
            $('<td>').append(amountField),
            $('<td>').text(product?.productName!),
            $('<td>').text(product?.brand!),
            $('<td>').text(product?.category!),
            $('<td>').text(product?.modelYear!),
            $('<td>').text(product?.listPrice!),
        );
    }

    return row;
}