var Component = require("montage/ui/component").Component,
    NetworkAggregationProtocols = require("core/model/enumerations/network-aggregation-protocols").NetworkAggregationProtocols,
    NetworkInterfaceType = require("core/model/enumerations/network-interface-type").NetworkInterfaceType,
    Model = require("core/model/model").Model;

/**
 * @class Lagg
 * @extends Component
 */
var Lagg = exports.Lagg = Component.specialize({

    _object: {
        value: null
    },

    ipWithNetmaskConverter: {
        value: {
            convert: function(value) {
                var alias = {label: value.label, value:{}};
                var splitValue = value.label.split("/");

                alias.value.address = splitValue[0];

                // These needs to be checked based on if the address is IPv4 or IPv6
                alias.value.netmask = parseInt(splitValue[1], 10);
                alias.value.type = "INET"
                return alias;
            },
            validator: {
                validate: function(value) {
                    // This function needs to check if the string value is
                    // a valid ip address/netmask combination (ipv4 or ipv6)
                    return true;
                }
            }
        }
    },

    object: {
        set: function (networkInterface) {
            if (networkInterface && networkInterface.type === NetworkInterfaceType.LAGG) {
                this._object = networkInterface;

                if (networkInterface) {

                    // Filter port options
                    //FIXME: when move to FetchDataWithCriteria when it will have been implemented.
                    this.application.dataService.fetchData(Model.NetworkInterface).then(function (networkInterfaces) {
                        var portOptions = [],
                            _networkInterface;

                        for (var i = 0, length = networkInterfaces.length; i < length; i++) {
                            _networkInterface = networkInterfaces[i];

                            if (_networkInterface.type === NetworkInterfaceType.ETHER) {
                                portOptions.push(_networkInterface);
                            }
                        }

                        this.portOptions = portOptions;
                    }.bind(this));

                    // Convert aliases for multiple select
                    var _aliasOption;
                    this.aliasOptions = [];

                    for (var i = 0, length = networkInterface.aliases.length; i < length; i++ ) {
                        _aliasOption = { value: networkInterface.aliases[i] };
                        _aliasOption.label = _aliasOption.value.address + "/" + _aliasOption.value.netmask;
                        this.aliasOptions.push( _aliasOption );
                    }

                }
            } else {
                this._object = null;
            }
        },
        get: function () {
            return this._object;
        }
    },

    laggProtocolOptions: {
        value: NetworkAggregationProtocols.members
    },

    portOptions: {
        value: null
    },

    aliasOptions: {
        value: null
    }

});
