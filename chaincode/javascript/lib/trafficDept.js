const { Contract } = require('fabric-contract-api');
const ClientIdentity = require('fabric-shim').ClientIdentity;

class TrafficDept extends Contract {

    constructor() {
        super('TrafficDept');
        this.nextTrafficDeptId = 0;
    }
    async allocateBerth(ctx, shipId, berthId) {
        // Retrieve the ship and berth data from the ledger
        const shipAsBytes = await ctx.stub.getState(shipId);
        const berthAsBytes = await ctx.stub.getState(berthId);
    
        // Verify that the ship and berth exist
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`Ship ${shipId} does not exist`);
        }
        if (!berthAsBytes || berthAsBytes.length === 0) {
            throw new Error(`Berth ${berthId} does not exist`);
        }
    
        // Parse the ship and berth data from JSON
        const ship = JSON.parse(shipAsBytes.toString());
        const berth = JSON.parse(berthAsBytes.toString());
    
        // Verify that the ship is not already assigned to a berth
        if (ship.berthId !== null) {
            throw new Error(`Ship ${shipId} is already assigned to berth ${ship.berthId}`);
        }
    
        // Verify that the berth is empty
        if (!berth.empty) {
            throw new Error(`Berth ${berthId} is already occupied`);
        }
        if(ship.status === 'accepted'){
        // Allocate the berth to the ship and update the ledger
        ship.berthId = berthId;
        berth.empty = false;
        ship.status = 'DOCKED';
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
        await ctx.stub.putState(berthId, Buffer.from(JSON.stringify(berth)));
        }else{
            throw new Error(`Ship ${shipId} is not accepted`);
        }
    }
    
    async  requestEmptyBerth(ctx, portId, shipId) {
        const portAsBytes = await ctx.stub.getState(portId);
        if (!portAsBytes || portAsBytes.length === 0) {
          throw new Error(`Port with id ${portId} does not exist`);
        }
        
        const query = {
          selector: {
            docType: 'berth',
            portId: portId,
            occupied: false
          }
        };
        
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        const result = await iterator.next();
        
        if (result.value) {
          const berth = result.value.value.toString('utf8');
      
          const newBerth = JSON.parse(berth);
          newBerth.occupied = true;
          newBerth.shipId = shipId;
      
          await ctx.stub.putState(newBerth.id, Buffer.from(JSON.stringify(newBerth)));
          return newBerth;
        } else {
          throw new Error(`No empty berths found at port ${portId}`);
        }
      }
      
    async verifyExit(ctx, shipId, berthId) {
        const shipAsBytes = await ctx.stub.getState(shipId);
        const berthAsBytes = await ctx.stub.getState(berthId);
        if(!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`Ship ${shipId} does not exist`);
        }
        if(!berthAsBytes || berthAsBytes.length === 0) {
            throw new Error(`Berth ${berthId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
        const berth = JSON.parse(berthAsBytes.toString());
        if(ship.berthId !== berthId) {
            throw new Error(`Ship ${shipId} is not assigned to berth ${berthId}`);
        }
        if(berth.empty) {
            throw new Error(`Berth ${berthId} is empty`);
        }
        if(ship.berthId === berthId) {
         return true;
           
        }
        if(berth.empty === false) {
            return true;
        }
       return false;


    }


}
module.exports = TrafficDept;
        