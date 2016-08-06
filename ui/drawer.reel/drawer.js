/**
 * @module ui/drawer.reel
 */
var AbstractDropZoneComponent = require("blue-shark/core/drag-drop/abstract-dropzone-component").AbstractDropZoneComponent,
    AbstractComponentActionDelegate = require("core/ui/abstract-component-action-delegate").AbstractComponentActionDelegate,
    WidgetWrapper = require("ui/dashboard/widgets/widget-wrapper.reel").WidgetWrapper,
    DrawerItem = require("ui/drawer.reel/drawer-item.reel").DrawerItem,
    Promise = require("montage/core/promise").Promise;

/**
 * @class Drawer
 * @extends Component
 */
exports.Drawer = AbstractDropZoneComponent.specialize(/** @lends Drawer# */ {

    enterDocument: {
        value: function (isFirstTime) {
            AbstractDropZoneComponent.prototype.enterDocument.call(this, isFirstTime);
            AbstractComponentActionDelegate.prototype.enterDocument.call(this, isFirstTime);

            if (isFirstTime) {
                this.application.addEventListener("userLogged", this, false);
            }
        }
    },

    exitDocument: {
        value: function () {
            AbstractDropZoneComponent.prototype.exitDocument.call(this);
            AbstractComponentActionDelegate.prototype.exitDocument.call(this);

            this._unToggledCurrentDrawerItemIfNeeded();
        }
    },

    handleUserLogged: {
        value: function () {
            var self = this;

            this._loadingPromise = Promise.all([
                this.application.applicationContextService.findCurrentUser(),
                this.application.widgetService.getAvailableWidgets()
            ]).then(function (arguments) {
                var availableWidgets = arguments[1];

                self.items = availableWidgets.toArray();
                self.currentUser = arguments[0];

                self.addRangeAtPathChangeListener("userWidgets", self, "_handleUserWidgetsChange");
            }).finally(function () {
                self._loadingPromise = null;
            });
        }
    },

    handleInfoToggleAction: {
        value: function (event) {
            var iteration = this._drawerItems._findIterationContainingElement(event.target.element);

            if (iteration) {
                var component,
                    i = 0;

                while ((component = iteration._childComponents[i++])) {
                    if (component instanceof DrawerItem) {
                        component.hasToggled = !component.hasToggled;

                        if (component.hasToggled && this._previousToggledDrawerItem && this._previousToggledDrawerItem !== component) {
                            this._previousToggledDrawerItem.hasToggled = false;
                        }

                        this._previousToggledDrawerItem = component;
                        break;
                    }
                }
            }
        }
    },

    handleCloseButtonAction: {
        value: function () {
            this.application.isDrawerOpen = false;
            this._unToggledCurrentDrawerItemIfNeeded();
        }
    },

    _unToggledCurrentDrawerItemIfNeeded: {
        value: function () {
            if (this._previousToggledDrawerItem) {
                this._previousToggledDrawerItem.hasToggled = false;
            }
        }
    },

    _handleUserWidgetsChange: {
        value: function (plus, minus) {
            var index, i, length;

            if (plus && (length = plus.length)) {
                for (i = 0; i < length; i++) {
                    if ((index = this.items.indexOf(plus[i])) > -1) {
                        this.items.splice(index, 1);
                    }
                }
            }

            if (minus && (length = minus.length)) {
                var self = this;

                this.application.widgetService.getAvailableWidgets().then(function (widgets) {
                    widgets = widgets.toArray(); //@todo: change widgets to array and not a map

                    for (i = 0; i < length; i++) {
                        if (widgets.indexOf(minus[i]) > -1) {
                            self.items.push(minus[i]);
                        }
                    }
                });
            }
        }
    },

    shouldAcceptComponent: {
        value: function (widgetWrapperComponent) {
            return this.userWidgets && widgetWrapperComponent instanceof WidgetWrapper;
        }
    },

    handleComponentDrop: {
        value: function (widgetWrapperComponent) {
            var index;

            if ((index = this.userWidgets.indexOf(widgetWrapperComponent.object)) > -1) {
                this.userWidgets.splice(index, 1);
            }
        }
    }

});