/**
 * @license
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
 * @fileoverview BGP blocks for SPARQL
 * @author miguel.ceriani@gmail.com (Miguel Ceriani)
 */
'use strict';

goog.provide('SparqlBlocks.Blocks.bgp');

goog.require('Blockly.Blocks');
goog.require('SparqlBlocks.Blocks.types');
var typeExt = SparqlBlocks.Blocks.types.getExtension;

//Blockly.Blocks.bgp.HUE = 120;

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#rh3u29
Blockly.Blocks['sparql_verb_objectlist'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendValueInput("VERB")
        .setCheck(typeExt("Verb"));
    //     .appendField("-[");
    // this.appendDummyInput()
    //     .appendField("]");
    this.appendStatementInput("OBJECT")
        .setCheck("ObjectList")
        .appendField("↳");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "PropertyList");
    this.setNextStatement(true, "PropertyList");
    this.setTooltip('');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#dt8jdf
Blockly.Blocks['sparql_verb_object'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(65);
    this.appendValueInput("VERB")
        .setCheck(typeExt("Verb"));
        // .appendField("-[");
    this.appendValueInput("OBJECT")
        .setCheck(typeExt("GraphTermOrVar"))
        .appendField("→");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "PropertyList");
    this.setNextStatement(true, "PropertyList");
    this.setTooltip('');
  }
};

/*
https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#adf4m7
Blockly.Blocks['property_list_path'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(260);
    this.appendStatementInput("NAME")
        .setCheck("object_list_path")
        .appendField(new Blockly.FieldVariable("item"), "SUBJECT");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "property_list");
    this.setNextStatement(true, "property_list");
    this.setTooltip('');
  }
};
*/

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#otezbs
Blockly.Blocks['sparql_subject_propertylist'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("SUBJECT")
        .setCheck(typeExt("ResourceOrVar"));
    this.appendStatementInput("PROPERTY_LIST")
        .setCheck("PropertyList")
//        .appendField("  ⌊");
        .appendField("has");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "TriplesBlock");
    this.setNextStatement(true, "TriplesBlock");
    this.setTooltip('');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#otezbs
Blockly.Blocks['sparql_typedsubject_propertylist'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("SUBJECT")
        .setCheck(typeExt("ResourceOrVar"));
    this.appendValueInput("TYPE")
        .setCheck(typeExt("ResourceOrVar"))
        .appendField("is a");
    this.appendStatementInput("PROPERTY_LIST")
        .setCheck("PropertyList")
//        .appendField("  ⌊");
        .appendField("  & has");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "TriplesBlock");
    this.setNextStatement(true, "TriplesBlock");
    this.setTooltip('');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#otezbs
Blockly.Blocks['sparql_anonsubject_propertylist'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendStatementInput("PROPERTY_LIST")
        .setCheck("PropertyList")
//        .appendField("◯━");
        .appendField("s.t. has");
    this.setInputsInline(true);
    this.setOutput(true, "Resource");
    this.setTooltip('');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9y53zb
Blockly.Blocks['sparql_subject_verb_objectlist'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("SUBJECT")
        .setCheck(typeExt("ResourceOrVar"));
    this.appendValueInput("VERB")
        .appendField("has")
        .setCheck(typeExt("Verb"));
//        .appendField(" -[");
    // this.appendDummyInput()
    //     .appendField("]");
    this.appendStatementInput("OBJECT_LIST")
        .setCheck("ObjectList")
        .appendField("↳");
//        .appendField("               ↳");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "TriplesBlock");
    this.setNextStatement(true, "TriplesBlock");
    this.setTooltip('');
  }
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#6x98e2
Blockly.Blocks['sparql_subject_verb_object'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(120);
    this.appendValueInput("SUBJECT")
        .setCheck(typeExt("ResourceOrVar"));
    this.appendValueInput("VERB")
        .appendField("has")
        .setCheck(typeExt("Verb"));
        // .appendField(" -[");
    this.appendValueInput("OBJECT")
        .setCheck(typeExt("GraphTermOrVar"))
        .appendField("→");
        // .appendField("]→ ");
    this.setInputsInline(true);
    this.setPreviousStatement(true, "TriplesBlock");
    this.setNextStatement(true, "TriplesBlock");
    this.setTooltip('');
  }
};