///////////////////////////////////////////////////////////////////////////
// Copyright © Esri. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////

define(['dojo/_base/declare', 'jimu/BaseWidgetSetting', 'jimu/LayerInfos/LayerInfos', 'dijit/_WidgetsInTemplateMixin', './LayerSelector', 'dijit/form/CheckBox', 'jimu/dijit/CheckBox'], function (declare, BaseWidgetSetting, LayerInfos, _WidgetsInTemplateMixin, LayerSelector) {
  return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {

    baseClass: 'jimu-widget-layerList-setting',

    startup: function startup() {
      this.inherited(arguments);
      this.setConfig(this.config);
      this.createLayerSelector();
    },

    createLayerSelector: function createLayerSelector() {
      var layerInfosObj = LayerInfos.getInstanceSync();
      this.layerSelector = new LayerSelector({
        operLayerInfos: layerInfosObj,
        config: this.config
      }).placeAt(this.layerSelectorDiv);
    },

    setConfig: function setConfig(config) {
      // compitible with old verion, undefined means 'show title'
      var titleValue = config.showTitle === false ? false : true;
      this.showTitle.setValue(titleValue);
      this.showBasemap.setValue(config.showBasemap);
      this.showLegend.setValue(config.showLegend);
      this.expandAllLayersByDefault.setValue(config.expandAllLayersByDefault);
      if (config.contextMenu) {
        this.zoomto.setValue(config.contextMenu.ZoomTo);
        this.transparency.setValue(config.contextMenu.Transparency);
        this.setVisibilityRange.setValue(config.contextMenu.SetVisibilityRange);
        this.controlPopup.setValue(config.contextMenu.EnableOrDisablePopup);
        this.controlLabels.setValue(config.contextMenu.ControlLabels);
        this.moveupDown.setValue(config.contextMenu.MoveupOrMovedown);
        this.table.setValue(config.contextMenu.OpenAttributeTable);
        this.url.setValue(config.contextMenu.DescriptionOrShowItemDetailsOrDownload);
      }
    },

    getConfig: function getConfig() {
      this.config.showTitle = this.showTitle.getValue();
      this.config.showBasemap = this.showBasemap.getValue();
      this.config.showLegend = this.showLegend.getValue();
      this.config.expandAllLayersByDefault = this.expandAllLayersByDefault.getValue();
      if (!this.config.contextMenu) {
        this.config.contextMenu = {};
      }
      this.config.contextMenu.ZoomTo = this.zoomto.getValue();
      this.config.contextMenu.Transparency = this.transparency.getValue();
      this.config.contextMenu.SetVisibilityRange = this.setVisibilityRange.getValue();
      this.config.contextMenu.EnableOrDisablePopup = this.controlPopup.getValue();
      this.config.contextMenu.ControlLabels = this.controlLabels.getValue();
      this.config.contextMenu.MoveupOrMovedown = this.moveupDown.getValue();
      this.config.contextMenu.OpenAttributeTable = this.table.getValue();
      this.config.contextMenu.DescriptionOrShowItemDetailsOrDownload = this.url.getValue();
      this.config.layerOptions = this.layerSelector.getLayerOptions();
      return this.config;
    }

  });
});
//# sourceMappingURL=Setting.js.map