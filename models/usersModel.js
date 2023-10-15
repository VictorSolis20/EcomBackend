const { mongoose, Schema } = require("mongoose");

const AddressSchema = Schema({
    street: {
        type: String,
    },
    number: {
        type: Number,
    },
    city: {
        type: String,
    }
})

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        address: {
            type: AddressSchema
        },
        admin: {
            type: Boolean,
            default: false
        },
        state: {
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);