const { Contract } = require('fabric-contract-api');
const initialCustomDutyData = require('../data/initialCustomDutyData.json');
class CustomDuty extends Contract {

    constructor() {
        super('CustomDuty');
        this.nextCustomDutyId = 0;
    }
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const customDuty = initialCustomDutyData;
        for (let i = 0; i < customDuty.length; i++) {
            customDuty[i].docType = 'customDuty';
            customDuty[i].id = 'CUSTOMDUTY' + this.nextCustomDutyId;
            await ctx.stub.putState('CUSTOMDUTY' + this.nextCustomDutyId, Buffer.from(JSON.stringify(customDuty[this.nextCustomDutyId])));
           const customFiIndex= ctx.stub.createCompositeKey('customDuty', [customDuty[i].customDutyId, customDuty[i].whoRegistered.ledgerUser]);
           const FiCustomIndex= ctx.stub.createCompositeKey('customDuty', [ customDuty[i].whoRegistered.ledgerUser,customDuty[i].customDutyId,]);
           await ctx.stub.putState(customFiIndex, Buffer.from('\u0000'));
              await ctx.stub.putState(FiCustomIndex, Buffer.from('\u0000'));
            console.info('Added <--> ', customDuty[this.nextCustomDutyId++]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }
    async queryCustomDuty(ctx, customDutyId) {
        const customDutyAsBytes = await ctx.stub.getState(customDutyId);
        if (!customDutyAsBytes || customDutyAsBytes.length === 0) {
            throw new Error(`${customDutyId} does not exist`);
        }
        console.log(customDutyAsBytes.toString());
        return customDutyAsBytes.toString();
    }
    async addCustomDuty(ctx, customDutyData,FiId) {
        const customDuty = JSON.parse(customDutyData);
        customDuty.id = 'CUSTOMDUTY' + this.nextCustomDutyId;
        const customDutyAsBytes = await ctx.stub.getState(customDuty.customDutyId);
        if (!customDutyAsBytes || customDutyAsBytes.length === 0) {
            customDuty.docType = 'customDuty';
            await ctx.stub.putState(customDuty.id, Buffer.from(JSON.stringify(customDuty)));
            const customFiIndex= ctx.stub.createCompositeKey('customDuty', [customDuty.customDutyId, customDuty.whoRegistered.ledgerUser]);
            const FiCustomIndex= ctx.stub.createCompositeKey('customDuty', [ customDuty.whoRegistered.ledgerUser,customDuty.customDutyId,]);
            await ctx.stub.putState(customFiIndex, Buffer.from('\u0000'));
            await ctx.stub.putState(FiCustomIndex, Buffer.from('\u0000'));

            return JSON.stringify(customDuty);
        } else {
            throw new Error(`${customDuty.id} already exist`);
        }
    }
    async listCustomDuty(ctx) {
        const query = {
            selector: {
                docType: 'customDuty',
            }
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        const result = await iterator.next();
        return result.value.value.toString('utf8');
    }
    async listCustomDutyByFi(ctx,FiId) {
        const query = {
            selector: {
                docType: 'customDuty',
                whoRegistered:FiId
            }
        };
        const iterator = await ctx.stub.getQueryResult(JSON.stringify(query));
        const result = await iterator.next();
        return result.value.value.toString('utf8');
    }
    async acceptShipEntry(ctx, customDutyId,shipId) {

        const customDutyAsBytes = await ctx.stub.getState(customDutyId);
        if (!customDutyAsBytes || customDutyAsBytes.length === 0) {
            throw new Error(`${customDutyId} does not exist`);
        }
        const customDuty = JSON.parse(customDutyAsBytes.toString());
        if(customDuty.status==='REQUESTING ENTRY'){
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
        ship.status = 'accepted';
        ship.customDutyId=customDutyId;
        await ctx.stub.putState(customDutyId, Buffer.from(JSON.stringify(customDuty)));
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
    }
}
    async rejectShipEntry(ctx, customDutyId,shipId) {
        const customDutyAsBytes = await ctx.stub.getState(customDutyId);
        if (!customDutyAsBytes || customDutyAsBytes.length === 0) {
            throw new Error(`${customDutyId} does not exist`);
        }
        const customDuty = JSON.parse(customDutyAsBytes.toString());
        if(customDuty.status==='REQUESTING ENTRY'){
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
        ship.status = 'rejected';
        ship.customDutyId=customDutyId;
        await ctx.stub.putState(customDutyId, Buffer.from(JSON.stringify(customDuty)));
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
    }
    else{
        throw new Error(`${customDutyId} is not requesting entry`);
    }
}
    async acceptExitOfShip(ctx, customDutyId,shipId) {
        const customDutyAsBytes = await ctx.stub.getState(customDutyId);
        if (!customDutyAsBytes || customDutyAsBytes.length === 0) {
            throw new Error(`${customDutyId} does not exist`);
        }
        const customDuty = JSON.parse(customDutyAsBytes.toString());
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
        if(ship.status === 'unloaded' || ship.status ==='REQUESTING EXIT'){
        ship.status = 'EXIT ACCEPTED';
        ship.customDutyId=customDutyId;
        await ctx.stub.putState(customDutyId, Buffer.from(JSON.stringify(customDuty)));
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
    }else{
        throw new Error(`${shipId} is not unloaded`);
    }
}
    async rejectExitOfShip(ctx, customDutyId,shipId) {
        const customDutyAsBytes = await ctx.stub.getState(customDutyId);
        if (!customDutyAsBytes || customDutyAsBytes.length === 0) {
            throw new Error(`${customDutyId} does not exist`);
        }
        const customDuty = JSON.parse(customDutyAsBytes.toString());
        const shipAsBytes = await ctx.stub.getState(shipId);
        if (!shipAsBytes || shipAsBytes.length === 0) {
            throw new Error(`${shipId} does not exist`);
        }
        const ship = JSON.parse(shipAsBytes.toString());
        if(ship.status === 'unloaded'){
        ship.status = 'EXIT REJECTED';
        ship.customDutyId=customDutyId;
        await ctx.stub.putState(customDutyId, Buffer.from(JSON.stringify(customDuty)));
        await ctx.stub.putState(shipId, Buffer.from(JSON.stringify(ship)));
    }else{
        throw new Error(`${shipId} is not unloaded`);
    }
}

}
module.exports = CustomDuty;
