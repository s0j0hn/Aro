(function() {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'whirl': ['/lib/whirl/dist/whirl.css'],
                'classyloader':       ['/lib/jquery-classyloader/js/jquery.classyloader.min.js'],
                'animo':              ['/lib/animo.js/animo.js'],
                'fastclick':          ['/lib/fastclick/lib/fastclick.js'],
                'modernizr':          ['/lib/modernizr/modernizr.custom.js'],
                'animate':            ['/lib/animate.css/animate.min.css'],
                'skycons':            ['/lib/skycons/skycons.js'],
                'icons':              ['/lib/fontawesome/css/font-awesome.css',
                    '/lib/simple-line-icons/css/simple-line-icons.css'],
                'weather-icons':      ['/lib/weather-icons/css/weather-icons.min.css',
                    '/lib/weather-icons/css/weather-icons-wind.min.css'],
                'sparklines':         ['/lib/sparkline/index.js'],
                'wysiwyg':            ['/lib/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    '/lib/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
                'slimscroll':         ['/lib/slimScroll/jquery.slimscroll.min.js'],
                'screenfull':         ['/lib/screenfull/dist/screenfull.js'],
                'vector-map':         ['/lib/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                    '/lib/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
                'vector-map-maps':    ['/lib/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                    '/lib/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
                'loadGoogleMapsJS':   ['/lib/load-google-maps/load-google-maps.js'],
                'flot-chart':         ['/lib/Flot/jquery.flot.js'],
                'flot-chart-plugins':
                    ['/lib/flot.tooltip/js/jquery.flot.tooltip.min.js',
                        '/lib/Flot/jquery.flot.resize.js',
                        '/lib/Flot/jquery.flot.pie.js',
                        '/lib/Flot/jquery.flot.time.js',
                        '/lib/Flot/jquery.flot.categories.js',
                        '/lib/flot-spline/js/jquery.flot.spline.min.js'],
                'moment' :            ['/lib/moment/min/moment-with-locales.min.js'],
                'inputmask':          ['/lib/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
                'flatdoc':            ['/lib/flatdoc/flatdoc.js'],
                'codemirror':
                    ['/lib/codemirror/lib/codemirror.js',
                        '/lib/codemirror/lib/codemirror.css'],
                // modes for common web files
                'codemirror-modes-web':
                    ['/lib/codemirror/mode/javascript/javascript.js',
                        '/lib/codemirror/mode/xml/xml.js',
                        '/lib/codemirror/mode/htmlmixed/htmlmixed.js',
                        '/lib/codemirror/mode/css/css.js'],
                'taginput' :
                    ['/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                        '/lib/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
                'filestyle':          ['/lib/bootstrap-filestyle/src/bootstrap-filestyle.js'],
                'chartjs':            ['/lib/Chart.js/Chart.js'],
                'morris':             ['/lib/raphael/raphael.js',
                    '/lib/morris.js/morris.js',
                    '/lib/morris.js/morris.css'],
                'loaders.css':          ['/lib/loaders.css/loaders.css'],
                'spinkit':              ['/lib/spinkit/css/spinkit.css']
            },
            // Angular based script (use the right module name)
            modules: [
                {name: 'toaster',
                    files:
                        ['/lib/angularjs-toaster/toaster.js',
                            '/lib/angularjs-toaster/toaster.css']},
                {name: 'localytics.directives',
                    files:
                        ['/lib/chosen_v1.2.0/chosen.jquery.min.js',
                            '/lib/chosen_v1.2.0/chosen.min.css',
                            '/lib/angular-chosen-localytics/dist/angular-chosen.js'],
                    serie: true},
                {name: 'ngDialog',
                    files:
                        ['/lib/ng-dialog/js/ngDialog.min.js',
                            '/lib/ng-dialog/css/ngDialog.min.css',
                            '/lib/ng-dialog/css/ngDialog-theme-default.min.css'] },
                {name: 'ngWig',
                    files:
                        ['/lib/ngWig/dist/ng-wig.min.js'] },
                {name: 'ngTable',
                    files:
                        ['/lib/ng-table/dist/ng-table.min.js',
                            '/lib/ng-table/dist/ng-table.min.css']},
                {name: 'ngTableExport',
                    files:
                        ['/lib/ng-table-export/ng-table-export.js']},
                {name: 'angularBootstrapNavTree',
                    files:
                        ['/lib/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                            '/lib/angular-bootstrap-nav-tree/dist/abn_tree.css']},
                {name: 'xeditable',
                    files:
                        ['/lib/angular-xeditable/dist/js/xeditable.js',
                            '/lib/angular-xeditable/dist/css/xeditable.css']},
                {name: 'angularFileUpload',
                    files:
                        ['/lib/angular-file-upload/dist/angular-file-upload.js']},
                {name: 'ngFileUpload',
                    files:
                        ['/lib/ng-file-upload/ng-file-upload-all.js']},
                {name: 'ngImgCrop',
                    files:
                        ['/lib/ng-img-crop/compile/unminified/ng-img-crop.js',
                            '/lib/ng-img-crop/compile/unminified/ng-img-crop.css']},
                {name: 'ui.select',
                    files:
                        ['/lib/angular-ui-select/dist/select.js',
                            '/lib/angular-ui-select/dist/select.css']},
                {name: 'ui.codemirror',
                    files:
                        ['/lib/angular-ui-codemirror/ui-codemirror.js']},
                {name: 'angular-carousel',
                    files:
                        ['/lib/angular-carousel/dist/angular-carousel.css',
                            '/lib/angular-carousel/dist/angular-carousel.js']},
                {name: 'infinite-scroll',
                    files:
                        ['/lib/ngInfiniteScroll/build/ng-infinite-scroll.js']},
                {name: 'ui.bootstrap-slider',
                    files:
                        ['/lib/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                            '/lib/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                            '/lib/angular-bootstrap-slider/slider.js'], serie: true},
                {name: 'ui.grid',
                    files:
                        ['/lib/angular-ui-grid/ui-grid.min.css',
                            '/lib/angular-ui-grid/ui-grid.min.js']},
                {name: 'summernote',
                    files:
                        ['/lib/bootstrap/js/modal.js',
                            '/lib/bootstrap/js/dropdown.js',
                            '/lib/bootstrap/js/tooltip.js',
                            '/lib/summernote/dist/summernote.css',
                            '/lib/summernote/dist/summernote.js',
                            '/lib/angular-summernote/dist/angular-summernote.js'
                        ], serie: true},
                {name: 'angular-rickshaw',
                    files:
                        ['/lib/d3/d3.min.js',
                            '/lib/rickshaw/rickshaw.js',
                            '/lib/rickshaw/rickshaw.min.css',
                            '/lib/angular-rickshaw/rickshaw.js'], serie: true},
                {name: 'angular-chartist',          files: ['/lib/chartist/dist/chartist.min.css',
                    '/lib/chartist/dist/chartist.js',
                    '/lib/angular-chartist.js/dist/angular-chartist.js'], serie: true},
                {name: 'ui.map',
                    files:
                        ['/lib/angular-ui-map/ui-map.js']},
                {name: 'datatables',
                    files:
                        ['/lib/datatables/media/css/jquery.dataTables.css',
                            '/lib/datatables/media/js/jquery.dataTables.js',
                            '/lib/datatables-buttons/js/dataTables.buttons.js',
                            //'/lib/datatables-buttons/css/buttons.bootstrap.css',
                            '/lib/datatables-buttons/js/buttons.bootstrap.js',
                            '/lib/datatables-buttons/js/buttons.colVis.js',
                            '/lib/datatables-buttons/js/buttons.flash.js',
                            '/lib/datatables-buttons/js/buttons.html5.js',
                            '/lib/datatables-buttons/js/buttons.print.js',
                            '/lib/angular-datatables/dist/angular-datatables.js',
                            '/lib/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js'],
                    serie: true},
                {name: 'angular-jqcloud',
                    files:
                        ['/lib/jqcloud2/dist/jqcloud.css',
                            '/lib/jqcloud2/dist/jqcloud.js',
                            '/lib/angular-jqcloud/angular-jqcloud.js']},
                {name: 'angularGrid',
                    files:
                        ['/lib/ag-grid/dist/styles/ag-grid.css',
                            '/lib/ag-grid/dist/ag-grid.js',
                            '/lib/ag-grid/dist/styles/theme-dark.css',
                            '/lib/ag-grid/dist/styles/theme-fresh.css']},
                {name: 'ng-nestable',
                    files:
                        ['/lib/ng-nestable/src/angular-nestable.js',
                            '/lib/nestable/jquery.nestable.js']},
                {name: 'akoenig.deckgrid',
                    files:
                        ['/lib/angular-deckgrid/angular-deckgrid.js']},
                {name: 'textAngular',
                    files:
                        ['/lib/textAngular/dist/textAngular.js',
                            '/lib/textAngular/dist/textAngularSetup.js'], serie: true},

                {name: 'angular-recaptcha',
                    files:
                        ['/lib/angular-recaptcha/release/angular-recaptcha.js']},

                {name: 'SweetAlert2',
                    files:
                        ['/lib/es6-promise/es6-promise.auto.min.js',
                            '/lib/sweetalert2/dist/sweetalert2.min.js',
                            '/lib/sweetalert2/dist/sweetalert2.min.css'], serie: true},
                {name: 'bm.bsTour',
                    files:
                        ['/lib/bootstrap-tour/build/css/bootstrap-tour.css',
                            '/lib/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                            '/lib/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'], serie: true},
                {name: 'ui.knob',
                    files:
                        ['/lib/angular-knob/src/angular-knob.js',
                            '/lib/jquery-knob/dist/jquery.knob.min.js']},
                {name: 'easypiechart',
                    files:
                        ['/lib/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']},
                {name: 'colorpicker.module',
                    files:
                        ['/lib/angular-bootstrap-colorpicker/css/colorpicker.css',
                            '/lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']},
                {name: 'ui.sortable',
                    files:
                        ['/lib/jquery-ui/jquery-ui.min.js',
                            '/lib/angular-ui-sortable/sortable.js'], serie: true},
                {name: 'ui.calendar',
                    files:
                        ['/lib/jquery-ui/jquery-ui.min.js',
                            '/lib/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                            '/lib/fullcalendar/dist/fullcalendar.min.js',
                            '/lib/fullcalendar/dist/gcal.js',
                            '/lib/fullcalendar/dist/fullcalendar.css',
                            '/lib/angular-ui-calendar/src/calendar.js'], serie: true}
            ]
        })
    ;


})();
