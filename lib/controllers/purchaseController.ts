import { Request, Response } from 'express';
import { IPurchase } from '../modules/purchases/model';
import e = require('express');
import PurchaseService from '../modules/purchases/service';

const mongoose = require('mongoose');

export class PurchaseController {

    private purchase_service: PurchaseService = new PurchaseService();
    

    public async createPurchase(req: Request, res: Response) {
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.buyer && req.body.price && req.body.items){
                const pruchase_params: IPurchase = {
                    buyer: req.body.buyer,
                    price: req.body.price,
                    items: req.body.items
                };
                const purchase_data = await this.purchase_service.createPurchase(pruchase_params);
                return res.status(201).json({ message: 'Purchase created successfully', post: purchase_data });
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async getPurchase(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const purchase_filter = { _id: req.params.id };
                // Fetch user
                const purchase_data = await this.purchase_service.populatePurchase(purchase_filter);
                // Send success response
                return res.status(200).json({ data: purchase_data, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async changePurchase(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const purchase_filter = { _id: req.params.id };
                // Fetch user
                const purchase_data = await this.purchase_service.filterPurchase(purchase_filter);
                if (!purchase_data) {
                    // Send failure response if user not found
                    return res.status(400).json({ error: 'Purchase not found'});
                }
    
                const purchase_params: IPurchase = {
                    _id: new mongoose.Types.ObjectId(req.params.id),
                    buyer: req.body.buyer || purchase_data.buyer,
                    price: req.body.price || purchase_data.price,
                    items: req.body.items || purchase_data.items,
                };
                // Update user
                await this.purchase_service.updatePurchase(purchase_params);
                //get new user data
                const new_user_data = await this.purchase_service.filterPurchase(purchase_filter);
                // Send success response
                return res.status(200).json({ data: new_user_data, message: 'Successful'});
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing ID parameter' });
            }
        } catch (error) {
            // Catch and handle any errors
            console.error("Error updating:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        
    }

    public async deletePurchase(req: Request, res: Response) {
        try {
            if (req.params.id) {
                // Delete purchase
                const delete_details = await this.purchase_service.deletePurchase(req.params.id);
                if (delete_details.deletedCount !== 0) {
                    // Send success response if purchase deleted
                    return res.status(200).json({ message: 'Successful'});
                } else {
                    // Send failure response if purchase not found
                    return res.status(400).json({ error: 'Purchase not found' });
                }
            } else {
                // Send error response if ID parameter is missing
                return res.status(400).json({ error: 'Missing Id' });
            }
        } catch (error) {
            // Catch and handle any errors
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}