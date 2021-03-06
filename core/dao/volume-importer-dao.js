"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_dao_ng_1 = require('./abstract-dao-ng');
var VolumeImporterDao = (function (_super) {
    __extends(VolumeImporterDao, _super);
    function VolumeImporterDao() {
        _super.call(this, 'VolumeImporter');
    }
    VolumeImporterDao.prototype.list = function () {
        var self = this;
        return this.entries ?
            Promise.resolve(this.entries) :
            this.getNewInstance().then(function (volumeImporter) {
                volumeImporter._isNew = false;
                volumeImporter.id = '-';
                self.entries = [volumeImporter];
                self.entries._objectType = 'VolumeImporter';
                return self.entries;
            });
    };
    return VolumeImporterDao;
}(abstract_dao_ng_1.AbstractDao));
exports.VolumeImporterDao = VolumeImporterDao;
