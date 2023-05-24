const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
const initialCargoHandlingData = require('../data/initialCargoHandlingData.json');
class CargoHandling extends Contract {
    constructor() {
        super('CargoHandling');
        this.nextCargoHandlingId = 0;
    }
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const CargoHandling = initialCargoHandlingData;
        for (let i = 0; i < CargoHandling.length; i++) {
            CargoHandling[i].docType = 'CargoHandling';
            CargoHandling[i].id = 'CargoHandling' + this.nextCargoHandlingId;
            await ctx.stub.putState('CargoHandling' + this.nextCargoHandlingId, Buffer.from(JSON.stringify(CargoHandling[this.nextCargoHandlingId])));
            console.info('Added <--> ', CargoHandling[this.nextCargoHandlingId++]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    async queryCargoHandling(ctx, CargoHandlingId) {
        const CargoHandlingAsBytes = await ctx.stub.getState(CargoHandlingId);
        if (!CargoHandlingAsBytes || CargoHandlingAsBytes.length === 0) {
            throw new Error(`${CargoHandlingId} does not exist`);
        }
        console.log(CargoHandlingAsBytes.toString());
        return CargoHandlingAsBytes.toString();
    }
    async addCargoHandling(ctx, CargoHandlingData) {
        const CargoHandling = JSON.parse(CargoHandlingData);
        CargoHandling.id = 'CargoHandling' + this.nextCargoHandlingId;
        const CargoHandlingAsBytes = await ctx.stub.getState(CargoHandling.CargoHandlingId);
        if (!CargoHandlingAsBytes || CargoHandlingAsBytes.length === 0) {
            CargoHandling.docType = 'CargoHandling';
            await ctx.stub.putState(CargoHandling.id, Buffer.from(JSON.stringify(CargoHandling)));
            return JSON.stringify(CargoHandling);
        } else {
            throw new Error(`${CargoHandling.id} already exist`);
        }
    }
    async listUnloadingShips(ctx) {
        const query = {
            selector: {
                docType: 'CargoHandling',
                status: 'unloading'
            }
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        const result = await iterator.next();
        return result.value.value.toString('utf8');
    }
    async acceptUnloadingRequest(ctx, CargoHandlingId,shipId) {
        const CargoHandlingAsBytes = await ctx.stub.getState(CargoHandlingId);
        if (!CargoHandlingAsBytes || CargoHandlingAsBytes.length === 0) {
            throw new Error(`${CargoHandlingId} does not exist`);
        }
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        const shipAsBytes = await ctx.stub.getState(shipId);
        const ship = JSON.parse(shipAsBytes.toString());
        if(ship.status === 'DOCKED'){

        const CargoHandling = JSON.parse(CargoHandlingAsBytes.toString());
        CargoHandling.status = 'unloading';
        ship.unloading = true;
        CargoHandling.shipId = shipId;
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
        await ctx.stub.putState(CargoHandlingId, Buffer.from(JSON.stringify(CargoHandling)));
        }else{
            throw new Error(`${shipId} is not docked`);
        }
    }
    async updateUnloadingStatus(ctx, CargoHandlingId, status) {
        const CargoHandlingAsBytes = await ctx.stub.getState(CargoHandlingId);
        if (!CargoHandlingAsBytes || CargoHandlingAsBytes.length === 0) {
            throw new Error(`${CargoHandlingId} does not exist`);
        }
        const CargoHandling = JSON.parse(CargoHandlingAsBytes.toString());
        CargoHandling.status = status;
        const shipAsBytes = await ctx.stub.getState(CargoHandling.shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${CargoHandling.shipId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
        ship.unloading = false;
        ship.status = 'unloaded';
        await ctx.stub.putState(CargoHandling.shipId, Buffer.from(JSON.stringify(ship)));
        CargoHandling.shipId = null;
        await ctx.stub.putState(CargoHandlingId, Buffer.from(JSON.stringify(CargoHandling)));
    }


   
    

    
}
module.exports = CargoHandling;