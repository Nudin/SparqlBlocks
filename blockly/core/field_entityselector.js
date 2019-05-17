/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2013 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Angle input field.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.FieldEntitySelector');

goog.require('Blockly.FieldTextInput');
goog.require('goog.math');
goog.require('goog.userAgent');


/**
 * Class for an editable angle field.
 * @param {string} text The initial content of the field.
 * @param {string} entityType Type of the entity (item, property, …)
 * @param {Function=} opt_validator An optional function that is called
 *     to validate any constraints on what the user entered.  Takes the new
 *     text as an argument and returns the accepted text or null to abort
 *     the change.
 * @extends {Blockly.FieldTextInput}
 * @constructor
 */
Blockly.FieldEntitySelector = function(text, entityType, opt_validator) {
  Blockly.FieldEntitySelector.superClass_.constructor.call(this, text, opt_validator);
  this.entityType = entityType;
};
goog.inherits(Blockly.FieldEntitySelector, Blockly.FieldTextInput);


/**
 * Clean up this FieldEntitySelector, as well as the inherited FieldTextInput.
 * @return {!Function} Closure to call on destruction of the WidgetDiv.
 * @private
 */
Blockly.FieldEntitySelector.prototype.dispose_ = function() {
  var thisField = this;
  return function() {
    Blockly.FieldEntitySelector.superClass_.dispose_.call(thisField)();
    thisField.gauge_ = null;
    if (thisField.clickWrapper_) {
      Blockly.unbindEvent_(thisField.clickWrapper_);
    }
    if (thisField.moveWrapper1_) {
      Blockly.unbindEvent_(thisField.moveWrapper1_);
    }
    if (thisField.moveWrapper2_) {
      Blockly.unbindEvent_(thisField.moveWrapper2_);
    }
  };
};

/**
 * Show the inline free-text editor on top of the text.
 * @private
 */
Blockly.FieldEntitySelector.prototype.showEditor_ = function() {
  var noFocus =
      goog.userAgent.MOBILE || goog.userAgent.ANDROID || goog.userAgent.IPAD;
  // Mobile browsers have issues with in-line textareas (focus & keyboards).
  Blockly.FieldEntitySelector.superClass_.showEditor_.call(this, noFocus);
  var div = Blockly.WidgetDiv.DIV;
  if (!div.firstChild) {
    // Mobile interface uses window.prompt.
    return;
  }

  var ENTITY_SEARCH_API_ENDPOINT_PATH = 'https://www.wikidata.org/w/';
  var ENTITY_SEARCH_API_ENDPOINT_REQUEST = 'api.php?action=wbsearchentities&search={term}&format=json&language=en&uselang=en&type={entityType}&continue=0';
  var ENTITYSEARCHENDPOINT = ENTITY_SEARCH_API_ENDPOINT_PATH + ENTITY_SEARCH_API_ENDPOINT_REQUEST;

  this.selector = $('<select>')
    .addClass("entityselector")
    .appendTo(div)
    .select2({
      placeholder: 'Select an ' + this.entityType,
      width: 'auto',
      minimumInputLength: 1,
      ajax: {//TODO: implement inversion of control
        url: ENTITYSEARCHENDPOINT.replace( '&search={term}', '' ).replace( '{entityType}', this.entityType),
        dataType: 'jsonp',
        delay: 250,
        data: function (params) {
          return {
            search: params.term, // search term
          };
        },
        processResults: function (data, params) {
          return {
            results: data.search.map( function( d ){
              return {
                id: d.id,
                text: d.label,
                data: d
              };
            } ),
          };
        },
        cache: true
      }
    })
   .on('select2:select', function (e) {
      Blockly.FieldTextInput.htmlInput_.value = e.params.data.id;
   });

  this.clickWrapper_ =
    Blockly.bindEvent_(this.selector, 'click', this, Blockly.WidgetDiv.hide);

};




/**
 * @param {?string} text New text.
 */
Blockly.FieldEntitySelector.prototype.setText = function(text) {
  Blockly.FieldEntitySelector.superClass_.setText.call(this, text);
  if (!this.textElement_ || !this.selector) {
    // Not rendered yet.
    return;
  }
  // Cached width is obsolete.  Clear it.
  this.size_.width = 0;
};


/**
 * Ensure that only a QID may be entered.
 * @param {string} text The user's text.
 * @return {?string} A string representing a valid QID, or null if invalid.
 */
Blockly.FieldEntitySelector.prototype.classValidator = function(text) {
  if (text === null) {
    return null;
  }
  var n = parseInt(text.substr(1) || 0);
  if (isNaN(n)) {
    return null;
  }
  return String(text);
};
