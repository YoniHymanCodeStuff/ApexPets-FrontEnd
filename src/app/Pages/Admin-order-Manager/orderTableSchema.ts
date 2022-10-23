export const OrderTableSchema = [
                    
    
    //pending/shipping/delivered 
    
  
    {
        key: "orderId",
        type: "number",
        label: "Order Id"
    },
    {
        key: "orderTimeStamp",
        type: "Date",
        label: "Order Timestamp"
    },
    {
        key: "orderStatus",    
        type: "orderStatus",
        label: "Order Status"
    },
    {
        key: "deliveryTimeStamp",
        type: "Date",
        label: "Delivery Timestamp"
    },
    {
        key: "orderedAnimalId",
        type: "number",
        label: "Ordered Product Id"
    },
    {
        key: "orderedAnimalName",
        type: "text",
        label: "Ordered Animal"
    },
    {
        key: "price",
        type: "number",
        label: "Price"
    },
    {
        key: "customerId",
        type: "number",
        label: "Customer Id"
    },
  
    {
        key: "customerName",
        type: "text",
        label: "Customer Name"
    },

    {
        key: "customerUserName",
        type: "text",
        label: "Customer Username"
    },
    {
        key: "customerEmail",
        type: "text",
        label: "Customer Email"
    },
    {
        key: "customerAddress",
        type: "text",
        label: "Delivery Address"
    },
    {
        key: "customerPhoneNumber",
        type: "number",
        label: "Customer Phone Number"
    }
]