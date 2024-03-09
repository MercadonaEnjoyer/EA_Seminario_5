import { IPurchase } from './model';
import purchases from './schema';

export default class PurchaseService{

    public async createPurchase(purchase_params: IPurchase): Promise<IPurchase> {
        try {
            const session = new purchases(purchase_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async populatePurchase(query: any): Promise<IPurchase | null> {
        try {
            // Find the user document and populate the 'posts' field
            const purchase = await purchases.findOne(query).populate('buyer').populate('items').exec();
            if (!purchase) {
                return null;
            }
            // Convert _id to string
            const populatedUser: IPurchase = {
                ...purchase.toObject(),
                _id: purchase._id
            };
            return populatedUser;
        } catch (error) {
            throw error;
        }
    }
    
    public async filterPurchase(query: any): Promise<IPurchase> {
        try{
            return await purchases.findOne(query);
        }catch(error) {
            throw error;
        }
    }

    public async updatePurchase(purchase_params: IPurchase): Promise<void> {
        try {
            const query = { _id: purchase_params._id };
            await purchases.findOneAndUpdate(query, purchase_params);
        } catch (error) {
            throw error;
        }
    }

    public async deletePurchase(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await purchases.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }
}