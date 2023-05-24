const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;
const initialShip = require('../data/initShipAgency.json');

class Ship extends Contract {

    constructor() {
        super('ShipAgency');
        this.nextShipId = 0;
    }
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger Of Ship ===========');
        const shipAgency = initialShip;
        for (let i = 0; i < shipAgency.length; i++) {
            shipAgency[i].docType = 'shipAgency';
            shipAgency[i].id = 'SHIPAGENCY' + this.nextShipId;
            await ctx.stub.putState('SHIPAGENCY' +this.nextShipId , Buffer.from(JSON.stringify(shipAgency[this.nextShipId])));
            console.info('Added <--> ', shipAgency[this.nextShipId++]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    async queryShip(ctx, shipId) {
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        console.log(shipAsBytes.toString());
        return shipAsBytes.toString();
    }
    async addShip(ctx,shipData){
        const ship = JSON.parse(shipData);
        shipData.id = 'SHIPAGENCY' + this.nextShipId;
        const shipAsBytes = await ctx.stub.getState(ship.shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            ship.docType = 'shipAgency';
            await ctx.stub.putState(ship.id, Buffer.from(JSON.stringify(ship)));
            return JSON.stringify(ship);
        }else{
            throw new Error(`${ship.id} already exist`);
        }
    }
    async updateShip(ctx,shipId,shipData){
        const ship = JSON.parse(shipData);
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
        return JSON.stringify(ship);
    }


    async removeShip(shipId){
        try{
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        await ctx.stub.deleteState(shipId);
    }catch(err){
        console.log(err);
    }
    }
    async requestEntry(ctx,shipId,portId){
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
        ship.portId = portId;
        ship.status = 'REQUESTING ENTRY';
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
        return JSON.stringify(ship);
    }
    async requestExit(ctx,shipId){
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
       if(ship.status == 'unloaded'){
        ship.status ="REQUESTING EXIT";
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
        return JSON.stringify(ship);
       }else{
              throw new Error(`${shipId} is not completed`);
         }
        
    }
    async  ExitPort(ctx, shipId) {
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
        if(ship.status == 'EXIT ACCEPTED'){
            ship.portId = null;
            ship.status = 'EXITED';
            await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
            return JSON.stringify(ship);
        }else{
            throw new Error(`${shipId} is not completed`);
        }
    }


    async queryAllShip(ctx) {
        const startKey = 'SHIPAGENCY0';
        const endKey =  'SHIPAGENCY999';
        const iterator = await ctx.stub.getStateByRange(startKey, endKey);
        
    const result = [];
  while (true) {
    const res = await iterator.next();
    if (res.value && res.value.value.toString()) {
      const ship = JSON.parse(res.value.value.toString());
      result.push(ship);
    }
    if (res.done) {
      await iterator.close();
      return result;
    }
  }
}
    async queryAllShipByPort(ctx,portId) {
       const query = {
            selector: {
                docType: 'shipAgency',
                portId: portId
            }
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        while (true) {

        const result = await iterator.next();
        if (result.value && result.value.value.toString()) {
            const ship = JSON.parse(result.value.value.toString());
            return ship;
        }
        if (result.done) {
            await iterator.close();
            return null;
        }
        
    }
    
}




}
module.exports = Ship;