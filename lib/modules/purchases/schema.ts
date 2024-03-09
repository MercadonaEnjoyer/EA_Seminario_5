import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    buyer: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    price: { type: Number, required: true },
    items: [{ type: Schema.Types.ObjectId, ref: 'posts', required: true }] // Array of ObjectIds referencing the Post model   
});

export default mongoose.model('purchases', schema);
