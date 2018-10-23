var scriptStringHeader = "";
var scriptStringContent = [];
var scriptStringFooter = "";

var addTemplate = $("#addTemplate");

var myCodeMirror = CodeMirror.fromTextArea(scriptTextArea, {
    theme: "mdn-like",
    keyMap: "sublime",
    mode: "htmlmixed",
    // mode: "handlebars",
    // mode: {name: "handlebars", base: "text/html"},
    lineNumbers: true,
    lineWrapping: true,
    lineWiseCopyCut: true,
    pasteLinesPerSelection: true,
     extraKeys: {
        "Ctrl-Space": "autocomplete",
        "F11": function (myCodeMirror) {
           myCodeMirror.setOption("fullScreen", !myCodeMirror.getOption("fullScreen")); },
       "Esc": function (myCodeMirror) {
            if (myCodeMirror.getOption("fullScreen")) myCodeMirror.setOption("fullScreen", false);
         },
         "Shift-Ctrl-F": function (myCodeMirror) {
            CodeMirror.commands["selectAll"](myCodeMirror);
            autoFormatSelection(myCodeMirror);
         }
     },
    indentWithTabs: true,
    autoCloseBrackets: true,
    closeTagEnabled: true,
    matchBrackets: true,
    autoCloseTags: true,
    findMatchingTag:true,
    matchTags:true,
    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    foldGutter: true,
    lint: true,
    showCursorWhenSelecting: true,
    styleActiveLine: true,
});
var doc = myCodeMirror.getDoc();
var editorContent = doc.getValue();



function autoFormatSelection(cm) {
    var range = getSelectedRange();
    cm.autoFormatRange(range.from, range.to);
}
$(".CodeMirror").append('<div id="toggleEditorSize" class="maximizeIcon" title="Toggle Full Screen"></div>');
$("#toggleEditorSize").click(function () {
    if (myCodeMirror.getOption("fullScreen")) {
        $(this).addClass("maximizeIcon");
        $(this).removeClass("minimizeIcon");
        myCodeMirror.setOption("fullScreen", false);
        $("#codeMirrorTemplate").show();
    } else {
        $(this).addClass("minimizeIcon");
        $(this).removeClass("maximizeIcon");
        myCodeMirror.setOption("fullScreen", true);
        $("#codeMirrorTemplate").hide();
    }
});

function getSelectedRange() {
    return {from: myCodeMirror.getCursor(true), to: myCodeMirror.getCursor(false)};
}
