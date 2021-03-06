/**
 * @module ui/volume-dataset-permissions.reel
 */
var Component = require("montage/ui/component").Component,
    Model = require("core/model/model").Model,
    UnixPermissionsConverter = require("core/converter/unix-permissions-converter").UnixPermissionsConverter;

/**
 * @class VolumeDatasetPermissions
 * @extends Component
 */
exports.VolumeDatasetPermissions = Component.specialize(/** @lends VolumeDatasetPermissions# */ {

    users: {
        value: null
    },

    groups: {
        value: null
    },

    _permissionsConverter: {
        value: null
    },

    permissionsConverter: {
        get: function() {
            if (!this._permissionsConverter) {
                this._permissionsConverter = new UnixPermissionsConverter();
            }
            return this._permissionsConverter;
        }
    },

    _object: {
        value: null
    },

    object: {
        get: function() {
            return this._object;
        },
        set: function(object) {
            if (this._object !== object) {
                this._object = object;

                if (object) {
                    this._ensureDefaultPermissionsAreSet();
                }
            }
        }
    },

    _fetchUsersPromise: {
        value: null
    },

    _fetchGroupsPromise: {
        value: null
    },
    
    templateDidLoad: {
        value: function () {
            //Preload data before entering in the dom, in order to avoid graphic glitches
            this._loadUsersIfNeeded();
            this._loadGroupsIfNeeded();
        }
    },

    enterDocument: {
        value: function () {
            this._loadUsersIfNeeded();
            this._loadGroupsIfNeeded();
            this._ensureDefaultPermissionsAreSet();
        }
    },

    _ensureDefaultPermissionsAreSet: {
        value: function () {
            var self = this;

            return this.application.storageService.ensureDefaultPermissionsAreSet(this._object)
                .then(function() {
                    // Set default permissions when creating datasets
                    if (self._object._isNew) {
                        self._object.permissions.modes = self.permissionsConverter.revert('775');
                    }
                });
        }
    },

    _loadUsersIfNeeded: {
        value: function() {
            if ((!this._fetchGroupsPromise && !this.users) || (this.users && this.users.length === 0)) {
                var self = this;

                this._fetchUsersPromise = this.application.dataService.fetchData(Model.User).then(function (users) {
                    self.users = users;
                    self._fetchUsersPromise = null;
                });
            }
        }
    },

    _loadGroupsIfNeeded: {
        value: function() {
            if ((!this._fetchGroupsPromise && !this.groups) || (this.groups && this.groups.length === 0)) {
                var self = this;

                this._fetchGroupsPromise = this.application.dataService.fetchData(Model.Group).then(function (groups) {
                    self.groups = groups;
                    self._fetchGroupsPromise = null;
                });
            }
        }
    }

});
