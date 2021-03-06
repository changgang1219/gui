"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var abstract_dao_ng_1 = require('./abstract-dao-ng');
var TaskDao = (function (_super) {
    __extends(TaskDao, _super);
    function TaskDao() {
        _super.call(this, 'Task');
    }
    TaskDao.prototype.submit = function (name, args) {
        if (args === void 0) { args = []; }
        return this.middlewareClient.submitTask(name, args);
    };
    return TaskDao;
}(abstract_dao_ng_1.AbstractDao));
exports.TaskDao = TaskDao;
