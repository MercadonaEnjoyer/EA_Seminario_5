import { Application, Request, Response } from 'express';
import { PurchaseController } from '../controllers/purchaseController';

export class PurchaseRoutes {

    private post_controller: PurchaseController = new PurchaseController();

    public route(app: Application) {
        
        app.post('/purchase', (req: Request, res: Response) => {
            this.post_controller.createPurchase(req, res);
        });

        app.get('/purchase/:id', (req: Request, res: Response) => {
            this.post_controller.getPurchase(req, res);
        });
        
        app.put('/purchase/:id', (req: Request, res: Response) => {
            this.post_controller.changePurchase(req, res);
        });
        
        app.delete('/purchase/:id', (req: Request, res: Response) => {
            this.post_controller.deletePurchase(req, res);
        });
    }
}