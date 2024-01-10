export function fetchMeals() {
    return fetch('http://localhost:3000/meals').then((res) => {
        return res.json()
    })
}

export function submitOrder(orderItems, customerData) {
    return fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            order: {
                items: orderItems,
                customer: customerData
            }
        })
    }).then((res) => {
        return res.json()
    })
}