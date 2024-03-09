import * as mongoose from 'mongoose';

export interface IPurchase {
    _id?: mongoose.Types.ObjectId;
    buyer: mongoose.Types.ObjectId;
    price: number;
    items: mongoose.Types.ObjectId[];
}