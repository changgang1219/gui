"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_dao_ng_1 = require('./abstract-dao-ng');
var ReplicationDao = (function (_super) {
    __extends(ReplicationDao, _super);
    function ReplicationDao() {
        _super.call(this, 'Replication');
    }
    ReplicationDao.prototype.replicateDataset = function (dataset, replicationOptions, transportOptions) {
        return this.middlewareClient.submitTask('replication.replicate_dataset', [dataset, replicationOptions, transportOptions]);
    };
    return ReplicationDao;
}(abstract_dao_ng_1.AbstractDao));
exports.ReplicationDao = ReplicationDao;
