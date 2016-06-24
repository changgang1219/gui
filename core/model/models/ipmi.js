var Montage = require("montage/core/core").Montage;

exports.Ipmi = Montage.specialize({
    _address: {
        value: null
    },
    address: {
        set: function (value) {
            if (this._address !== value) {
                this._address = value;
            }
        },
        get: function () {
            return this._address;
        }
    },
    _dhcp: {
        value: null
    },
    dhcp: {
        set: function (value) {
            if (this._dhcp !== value) {
                this._dhcp = value;
            }
        },
        get: function () {
            return this._dhcp;
        }
    },
    _gateway: {
        value: null
    },
    gateway: {
        set: function (value) {
            if (this._gateway !== value) {
                this._gateway = value;
            }
        },
        get: function () {
            return this._gateway;
        }
    },
    _id: {
        value: null
    },
    id: {
        set: function (value) {
            if (this._id !== value) {
                this._id = value;
            }
        },
        get: function () {
            return this._id;
        }
    },
    _netmask: {
        value: null
    },
    netmask: {
        set: function (value) {
            if (this._netmask !== value) {
                this._netmask = value;
            }
        },
        get: function () {
            return this._netmask;
        }
    },
    _password: {
        value: null
    },
    password: {
        set: function (value) {
            if (this._password !== value) {
                this._password = value;
            }
        },
        get: function () {
            return this._password;
        }
    },
    _vlan_id: {
        value: null
    },
    vlan_id: {
        set: function (value) {
            if (this._vlan_id !== value) {
                this._vlan_id = value;
            }
        },
        get: function () {
            return this._vlan_id;
        }
    }
});