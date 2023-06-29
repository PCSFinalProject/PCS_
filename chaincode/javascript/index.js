/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const PCS = require('./lib/PCS');
const  CargoHandling = require('./lib/cargoHandling');
const Ship = require('./lib/ShipAgency');
const TrafficDept = require('./lib/trafficDept');
const customDuty    =   require('./lib/customDuty');

module.exports.PCS = PCS;
module.exports.contracts = [ PCS, CargoHandling, Ship, TrafficDept, customDuty ];
