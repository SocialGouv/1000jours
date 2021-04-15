// https://ckeditor.com/docs/ckeditor5/latest/api/module_core_editor_editorconfig-EditorConfig.html

////// CONFIGURATION TEMPLATE: uncomment desired lines to override default config.
////// While all lines are commented, config will not change anything.

module.exports = {
  htmlEmbed: {
    // showPreviews: true
  },
  image: {
    // styles: [
    //     'alignLeft',
    //     'alignCenter',
    //     'alignRight',
    // ],
    // resizeOptions: [
    //     {
    //         name: 'resizeImage:original',
    //         value: null,
    //         icon: 'original'
    //     },
    //     {
    //         name: 'resizeImage:50',
    //         value: '50',
    //         icon: 'medium'
    //     },
    //     {
    //         name: 'resizeImage:75',
    //         value: '75',
    //         icon: 'large'
    //     }
    // ],
    // toolbar: [
    //     'imageStyle:alignLeft',
    //     'imageStyle:alignCenter',
    //     'imageStyle:alignRight',
    //     '|',
    //     'imageTextAlternative',
    //     '|',
    //     'resizeImage:50',
    //     'resizeImage:75',
    //     'resizeImage:original',
    //     '|',
    //     'linkImage',
    // ]
  },
  table: {
    // contentToolbar: [
    //     'tableColumn',
    //     'tableRow',
    //     'mergeTableCells',
    //     'tableProperties',
    //     'tableCellProperties',
    // ]
  },
  toolbar: {
    items: [
      "fontFamily",
      "fontSize",
      "fontColor",
      "|",
      "bold",
      "italic",
      "underline",
      "code",
      "link",
      "bulletedList",
      "numberedList",
      "insertImage",
      "strapiMediaLib",
      "|",
      "alignment",
      "indent",
      "outdent",
      "|",
      "specialCharacters",
      "blockQuote",
      "insertTable",
      "mediaEmbed",
      "htmlEmbed",
      "codeBlock",
      "horizontalLine",
      "|",
      "fullScreen",
      "undo",
      "redo",
    ],
    // shouldNotGroupWhenFull: true
  },
};
