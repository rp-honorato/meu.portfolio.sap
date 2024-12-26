sap.ui.define([
    "sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/Popover",
	"sap/m/Button",
	"sap/m/library"
],
function (Device, Controller, JSONModel, Popover, Button, library) {
    "use strict";

    return Controller.extend("meu.portfolio.sap.controller.View1", {
        onInit: function () {

            let oModel = new JSONModel(sap.ui.require.toUrl("meu/portfolio/sap/model/data.json"));
            console.log(oModel.getData());
            this.getView().setModel(oModel);
            this._setToggleButtonTooltip(!Device.system.desktop);
		
        },

        onItemSelect: function (oEvent) {
			let oItem = oEvent.getParameter("item");
			this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
		},
        
        handleUserNamePress: function (event) {
			let oPopover = new Popover({
				showHeader: false,
				placement: PlacementType.Bottom,
				content: [
					new Button({
						text: 'Feedback',
						type: ButtonType.Transparent
					}),
					new Button({
						text: 'Help',
						type: ButtonType.Transparent
					}),
					new Button({
						text: 'Logout',
						type: ButtonType.Transparent
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			oPopover.openBy(event.getSource());
		},

        onSideNavButtonPress: function () {
			let oToolPage = this.byId("toolPage");
			let bSideExpanded = oToolPage.getSideExpanded();

			this._setToggleButtonTooltip(bSideExpanded);

			oToolPage.setSideExpanded(!oToolPage.getSideExpanded());
		},
        
        _setToggleButtonTooltip: function (bLarge) {
			let oToggleButton = this.byId('sideNavigationToggleButton');
			if (bLarge) {
				oToggleButton.setTooltip('Large Size Navigation');
			} else {
				oToggleButton.setTooltip('Small Size Navigation');
			}
		}
    });
});
