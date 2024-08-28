const mongoose = require("mongoose");
const Product = require('./ProductsModel.js');


const orderSchema = new mongoose.Schema({ 
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [ 
        {
            product: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product',
                required: true,
            },
            seller: {
                type: String
            },
            title: {
                type: String
            },
            price: {
                type: Number
            },
            description: {
                type: String
            },
            category: {
                type: String 
            },
            brand: {
                type: String 
            },
            quantity: {
                type: Number
            }
        }
    ],
    orderQuantity: {
        type: Number,
        default: 0
    },
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShippingAddress',
        required: true
    },
    paymentMethod: {
        type: String,
    },
    isPaid: {
        type: Boolean,
        default: true
    },
    isShipped: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    subTotal: {
        type: Number,
        default: 0
    },
    shippingCost: {
        type: Number,
        default: 0
    },
    vat: {
        type: Number,
        default: 0,
    },
    orderTotal: {
        type: Number,
        default: 0
    }
}, { timestamps: {createdAt: true, updatedAt: true} });

orderSchema.post('save', async (doc) => {

    // Decrement the ordered qty from the product countInStock once order is successful
    const order = doc.orderItems
    
    await Promise.all(order.map( async(p) => {
        let item = await Product.findById({_id: p.product})
        await Product.findByIdAndUpdate({_id: p.product}, {countInStock: item.countInStock - p.quantity})
    }))
    
})

module.exports = mongoose.model("Order", orderSchema); 